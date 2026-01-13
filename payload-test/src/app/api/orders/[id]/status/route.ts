import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    if (!id) {
      return NextResponse.json(
        { error: 'Order ID required' },
        { status: 400 }
      )
    }

    const payload = await getPayload({ config })

    const order = await payload.findByID({
      collection: 'orders',
      id,
    })

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }

    const nextStatus = getNextExpectedStatus(order.status)

    return NextResponse.json({
      orderId: order.id,
      status: order.status,
      statusUpdatedAt: order.updatedAt,
      nextExpectedStatus: nextStatus,
      estimatedDelivery: calculateDeliveryEstimate(order),
    })
  } catch (error) {
    console.error('Status check error:', error)
    return NextResponse.json(
      { error: 'Failed to check order status' },
      { status: 500 }
    )
  }
}

function getNextExpectedStatus(
  currentStatus: string
): string | null {
  const statusFlow = {
    pending: 'paid',
    paid: 'processing',
    processing: 'fulfilled',
    fulfilled: null,
    cancelled: null,
    timeout: null,
  }

  return statusFlow[currentStatus as keyof typeof statusFlow] || null
}

function calculateDeliveryEstimate(order: { status: string; updatedAt: string }): string | null {
  if (order.status === 'fulfilled' || order.status === 'cancelled' || order.status === 'timeout') {
    return null
  }

  const now = new Date()
  const processingDays = 1
  const shippingDays = 3

  const estimatedDate = new Date(now)
  estimatedDate.setDate(estimatedDate.getDate() + processingDays + shippingDays)

  return estimatedDate.toISOString()
}
