import { Keypair, PublicKey, Transaction, sendAndConfirmTransaction } from '@solana/web3.js'
import { createTransferInstruction, getAssociatedTokenAddress } from '@solana/spl-token'
import { getConnection } from './connection'

export interface RefundResult {
  success: boolean
  signature?: string
  error?: string
}

export interface RefundParams {
  recipientWallet: string
  amount: number
  shopWalletKeypair: Keypair
  tokenMintAddress: string
}

export async function executeRefund(params: RefundParams): Promise<RefundResult> {
  const { recipientWallet, amount, shopWalletKeypair, tokenMintAddress } = params

  try {
    const connection = getConnection()
    const tokenMint = new PublicKey(tokenMintAddress)
    const recipient = new PublicKey(recipientWallet)

    const shopTokenAccount = await getAssociatedTokenAddress(
      tokenMint,
      shopWalletKeypair.publicKey
    )

    const recipientTokenAccount = await getAssociatedTokenAddress(
      tokenMint,
      recipient
    )

    const transferInstruction = createTransferInstruction(
      shopTokenAccount,
      recipientTokenAccount,
      shopWalletKeypair.publicKey,
      amount
    )

    const transaction = new Transaction().add(transferInstruction)

    const { blockhash } = await connection.getLatestBlockhash('confirmed')
    transaction.recentBlockhash = blockhash
    transaction.feePayer = shopWalletKeypair.publicKey

    const signature = await sendAndConfirmTransaction(
      connection,
      transaction,
      [shopWalletKeypair],
      {
        commitment: 'confirmed',
        maxRetries: 3,
      }
    )

    return {
      success: true,
      signature,
    }
  } catch (error) {
    console.error('Refund execution error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    }
  }
}

export async function validateRefundAmount(
  orderAmount: number,
  refundAmount: number,
  previousRefunds: number = 0
): Promise<{ valid: boolean; error?: string }> {
  const minRefundAmount = 1000

  if (refundAmount < minRefundAmount) {
    return {
      valid: false,
      error: `Refund amount must be at least ${minRefundAmount} ELURC`,
    }
  }

  const totalRefunded = previousRefunds + refundAmount
  if (totalRefunded > orderAmount) {
    return {
      valid: false,
      error: `Total refund amount (${totalRefunded}) exceeds order amount (${orderAmount})`,
    }
  }

  return { valid: true }
}

export function loadShopWalletKeypair(): Keypair {
  const privateKeyString = process.env.SHOP_WALLET_PRIVATE_KEY

  if (!privateKeyString) {
    throw new Error('SHOP_WALLET_PRIVATE_KEY environment variable is not set')
  }

  try {
    const privateKeyArray = JSON.parse(privateKeyString)
    return Keypair.fromSecretKey(new Uint8Array(privateKeyArray))
  } catch (_error) {
    throw new Error('Invalid SHOP_WALLET_PRIVATE_KEY format. Must be a JSON array of numbers.')
  }
}

export async function checkShopWalletBalance(
  tokenMintAddress: string
): Promise<{ balance: number; error?: string }> {
  try {
    const connection = getConnection()
    const shopKeypair = loadShopWalletKeypair()
    const tokenMint = new PublicKey(tokenMintAddress)

    const shopTokenAccount = await getAssociatedTokenAddress(
      tokenMint,
      shopKeypair.publicKey
    )

    const accountInfo = await connection.getTokenAccountBalance(shopTokenAccount)
    
    return {
      balance: parseInt(accountInfo.value.amount),
    }
  } catch (error) {
    return {
      balance: 0,
      error: error instanceof Error ? error.message : 'Failed to check balance',
    }
  }
}
