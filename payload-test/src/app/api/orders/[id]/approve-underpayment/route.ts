import { NextRequest, NextResponse } from 'next/server'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const payload = await getPayloadHMR({ config: configPromise })
    const { id } = await params
    const body = await request.json()
    const { approvalReason, waiveAmount } = body

    if (!approvalReason) {
      return NextResponse.json(
        { success: false, error: { message: 'Approval reason is required', code: 'MISSING_REASON' } },
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

    if (!order.paymentDiscrepancy?.hasDiscrepancy || order.paymentDiscrepancy?.type !== 'underpayment') {
      return NextResponse.json(
        { success: false, error: { message: 'Order does not have an underpayment', code: 'NO_UNDERPAYMENT' } },
        { status: 400 }
      )
    }

    if (order.status !== 'underpaid') {
      return NextResponse.json(
        { success: false, error: { message: 'Order is not in underpaid status', code: 'INVALID_STATUS' } },
        { status: 400 }
      )
    }

    const shortageAmount = Math.abs(order.paymentDiscrepancy.differenceAmount || 0)
    const approvalNote = waiveAmount
      ? `Manually approved with ${(shortageAmount / 1_000_000).toFixed(2)} ELURC waived. Reason: ${approvalReason}`
      : `Manually approved. Reason: ${approvalReason}`

    await payload.update({
      collection: 'orders',
      id,
      data: {
        status: 'paid',
        paymentDiscrepancy: {
          ...order.paymentDiscrepancy,
          resolution: 'manually_approved',
          resolutionNotes: approvalNote,
        },
        adminNotes: order.adminNotes
          ? `${order.adminNotes}\n\n[${new Date().toISOString()}] ${approvalNote}`
          : approvalNote,
      },
    })

    console.log('[Approval] Order approved:', id, approvalNote)

    return NextResponse.json({
      success: true,
      data: {
        orderId: id,
        status: 'paid',
        message: 'Order approved successfully',
        waived: waiveAmount,
        waivedAmount: shortageAmount,
      },
    })
  } catch (error) {
    console.error('[Approval] Error approving order:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          message: error instanceof Error ? error.message : 'Failed to approve order',
          code: 'APPROVAL_ERROR',
        },
      },
      { status: 500 }
    )
  }
}
