import { NextRequest, NextResponse } from 'next/server'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import { Connection, Keypair, PublicKey, Transaction } from '@solana/web3.js'
import { getAssociatedTokenAddress, createTransferInstruction, TOKEN_PROGRAM_ID } from '@solana/spl-token'
import bs58 from 'bs58'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const payload = await getPayloadHMR({ config: configPromise })
    const { id } = await params
    const body = await request.json()
    const { refundAmount, refundReason } = body

    if (!refundAmount || refundAmount <= 0) {
      return NextResponse.json(
        { success: false, error: { message: 'Invalid refund amount', code: 'INVALID_AMOUNT' } },
        { status: 400 }
      )
    }

    const order = await payload.findByID({
      collection: 'orders',
      id,
    })

    if (!order) {
      return NextResponse.json(
        { success: false, error: { message: 'Order not found', code: 'ORDER_NOT_FOUND' } },
        { status: 404 }
      )
    }

    if (!order.paymentDiscrepancy?.hasDiscrepancy || order.paymentDiscrepancy?.type !== 'overpayment') {
      return NextResponse.json(
        { success: false, error: { message: 'Order does not have an overpayment', code: 'NO_OVERPAYMENT' } },
        { status: 400 }
      )
    }

    if (order.refundInfo?.refundTransactionSignature) {
      return NextResponse.json(
        { success: false, error: { message: 'Refund already processed', code: 'REFUND_EXISTS' } },
        { status: 400 }
      )
    }

    const shopPrivateKey = process.env.SHOP_WALLET_PRIVATE_KEY
    if (!shopPrivateKey) {
      console.error('[Refund] Shop wallet private key not configured')
      return NextResponse.json(
        { success: false, error: { message: 'Refund service not configured', code: 'SERVICE_ERROR' } },
        { status: 500 }
      )
    }

    const connection = new Connection(
      process.env.NEXT_PUBLIC_SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com',
      'confirmed'
    )

    const shopKeypair = Keypair.fromSecretKey(bs58.decode(shopPrivateKey))
    const customerWallet = new PublicKey(order.customerWallet)
    const elurTokenMint = new PublicKey(process.env.NEXT_PUBLIC_ELURC_TOKEN_ADDRESS!)

    const shopTokenAccount = await getAssociatedTokenAddress(
      elurTokenMint,
      shopKeypair.publicKey
    )

    const customerTokenAccount = await getAssociatedTokenAddress(
      elurTokenMint,
      customerWallet
    )

    const transaction = new Transaction().add(
      createTransferInstruction(
        shopTokenAccount,
        customerTokenAccount,
        shopKeypair.publicKey,
        refundAmount,
        [],
        TOKEN_PROGRAM_ID
      )
    )

    const { blockhash } = await connection.getLatestBlockhash()
    transaction.recentBlockhash = blockhash
    transaction.feePayer = shopKeypair.publicKey

    const signature = await connection.sendTransaction(transaction, [shopKeypair])
    
    await connection.confirmTransaction(signature, 'confirmed')

    console.log('[Refund] Transaction sent:', signature)

    await payload.update({
      collection: 'orders',
      id,
      data: {
        refundInfo: {
          refundAmount,
          refundWallet: order.customerWallet,
          refundTransactionSignature: signature,
          refundInitiatedAt: new Date().toISOString(),
          refundCompletedAt: new Date().toISOString(),
          refundReason: refundReason || 'Overpayment refund',
        },
        paymentDiscrepancy: {
          ...order.paymentDiscrepancy,
          resolution: 'refund_completed',
          resolutionNotes: `Refund of ${(refundAmount / 1_000_000).toFixed(2)} ELURC completed. Transaction: ${signature}`,
        },
      },
    })

    return NextResponse.json({
      success: true,
      data: {
        transactionSignature: signature,
        refundAmount,
        message: 'Refund processed successfully',
      },
    })
  } catch (error) {
    console.error('[Refund] Error processing refund:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          message: error instanceof Error ? error.message : 'Failed to process refund',
          code: 'REFUND_ERROR',
        },
      },
      { status: 500 }
    )
  }
}
