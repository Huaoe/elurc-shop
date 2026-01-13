import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { executeRefund, validateRefundAmount, loadShopWalletKeypair } from '@/lib/solana/refund'
import { PublicKey } from '@solana/web3.js'

interface ProcessRefundRequest {
  orderId: string
  refundAmount: number
  walletAddress: string
  reason: string
  adminNotes?: string
}

export async function POST(request: NextRequest) {
  try {
    const payload = await getPayload({ config })
    const body: ProcessRefundRequest = await request.json()
    const { orderId, refundAmount, walletAddress, reason, adminNotes } = body

    if (!orderId || !refundAmount || !walletAddress || !reason) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    try {
      new PublicKey(walletAddress)
    } catch {
      return NextResponse.json(
        { success: false, error: 'Invalid wallet address format' },
        { status: 400 }
      )
    }

    const order = await payload.findByID({
      collection: 'orders',
      id: orderId,
      depth: 2,
    })

    if (!order) {
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      )
    }

    const existingRefunds = await payload.find({
      collection: 'refunds',
      where: {
        order: {
          equals: orderId,
        },
        status: {
          equals: 'completed',
        },
      },
    })

    const totalPreviousRefunds = existingRefunds.docs.reduce(
      (sum, refund) => sum + (refund.amount || 0),
      0
    )

    const validation = await validateRefundAmount(
      order.amountElurc,
      refundAmount,
      totalPreviousRefunds
    )

    if (!validation.valid) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: 400 }
      )
    }

    const tokenMintAddress = process.env.NEXT_PUBLIC_ELURC_TOKEN_ADDRESS
    if (!tokenMintAddress) {
      return NextResponse.json(
        { success: false, error: 'Token mint address not configured' },
        { status: 500 }
      )
    }

    const refundRecord = await payload.create({
      collection: 'refunds',
      data: {
        refundNumber: `REF-${Date.now()}-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
        order: parseInt(orderId, 10),
        status: 'pending',
        amount: refundAmount,
        walletAddress,
        reason,
        adminNotes,
        ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
      },
      draft: false,
    })

    await payload.update({
      collection: 'refunds',
      id: refundRecord.id,
      data: {
        status: 'processing',
      },
    })

    const shopWalletKeypair = loadShopWalletKeypair()

    const refundResult = await executeRefund({
      recipientWallet: walletAddress,
      amount: refundAmount,
      shopWalletKeypair,
      tokenMintAddress,
    })

    if (!refundResult.success) {
      await payload.update({
        collection: 'refunds',
        id: refundRecord.id,
        data: {
          status: 'failed',
          errorMessage: refundResult.error,
          failedAt: new Date().toISOString(),
        },
      })

      return NextResponse.json(
        { success: false, error: refundResult.error },
        { status: 500 }
      )
    }

    await payload.update({
      collection: 'refunds',
      id: refundRecord.id,
      data: {
        status: 'completed',
        transactionSignature: refundResult.signature,
        completedAt: new Date().toISOString(),
      },
    })

    const updatedOrder = await payload.update({
      collection: 'orders',
      id: orderId,
      data: {
        refundInfo: {
          refundAmount,
          refundWallet: walletAddress,
          refundTransactionSignature: refundResult.signature,
          refundInitiatedAt: refundRecord.createdAt,
          refundCompletedAt: new Date().toISOString(),
          refundReason: reason,
        },
      },
    })

    try {
      await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/email/refund-notification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId,
          orderNumber: order.orderNumber,
          customerEmail: order.customerEmail,
          refundAmount,
          transactionSignature: refundResult.signature,
          reason,
        }),
      })
    } catch (emailError) {
      console.error('Failed to send refund notification email:', emailError)
    }

    return NextResponse.json({
      success: true,
      data: {
        refundId: refundRecord.id,
        transactionSignature: refundResult.signature,
        refundAmount,
        order: updatedOrder,
      },
    })
  } catch (error) {
    console.error('Process refund error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to process refund' },
      { status: 500 }
    )
  }
}
