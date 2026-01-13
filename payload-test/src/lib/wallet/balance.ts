import { Connection, PublicKey } from '@solana/web3.js'
import { getAccount, getAssociatedTokenAddress } from '@solana/spl-token'

export async function getElurBalance(
  connection: Connection,
  walletAddress: PublicKey,
  tokenMintAddress: PublicKey
): Promise<number> {
  try {
    const tokenAccountAddress = await getAssociatedTokenAddress(
      tokenMintAddress,
      walletAddress
    )
    
    const tokenAccount = await getAccount(connection, tokenAccountAddress)
    
    return Number(tokenAccount.amount) / 1_000_000
  } catch (error) {
    console.error('Error fetching ELURC balance:', error)
    return 0
  }
}

export function formatBalance(balance: number): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  }).format(balance)
}
