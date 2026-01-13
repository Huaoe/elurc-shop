import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const payload = await getPayload({ config })
    const body = await request.json()
    const { trackingNumber, notes } = body

    const order = await payload.findByID({
      collection: 'orders',
      id: params.id,
      depth: 2,
    })

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    if (order.status !== 'paid' && order.status !== 'processing') {
      return NextResponse.json(
        { error: 'Order must be paid before fulfillment' },
        { status: 400 }
      )
    }

    if (order.status === 'fulfilled') {
      return NextResponse.json(
        { error: 'Order is already fulfilled' },
        { status: 400 }
      )
    }

    for (const item of order.items) {
      const product = await payload.findByID({
        collection: 'cms_products',
        id: typeof item.product === 'string' ? item.product : item.product.id,
      })

      if (product.stock < item.quantity) {
        return NextResponse.json(
          {
            error: `Insufficient inventory for product: ${product.name}. Available: ${product.stock}, Required: ${item.quantity}`,
          },
          { status: 400 }
        )
      }
    }

    for (const item of order.items) {
      const product = await payload.findByID({
        collection: 'cms_products',
        id: typeof item.product === 'string' ? item.product : item.product.id,
      })

      await payload.update({
        collection: 'cms_products',
        id: product.id,
        data: {
          stock: product.stock - item.quantity,
        },
      })
    }

    const updatedOrder = await payload.update({
      collection: 'orders',
      id: params.id,
      data: {
        status: 'fulfilled',
        fulfilledAt: new Date().toISOString(),
        trackingNumber: trackingNumber || order.trackingNumber,
        adminNotes: notes
          ? `${order.adminNotes || ''}\n\nFulfillment: ${notes}`.trim()
          : order.adminNotes,
      },
    })

    try {
      await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/email/shipping-confirmation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId: params.id,
          orderNumber: order.orderNumber,
          customerEmail: order.customerEmail,
          trackingNumber: trackingNumber || order.trackingNumber,
        }),
      })
    } catch (emailError) {
      console.error('Failed to send shipping confirmation email:', emailError)
    }

    return NextResponse.json({
      success: true,
      order: updatedOrder,
      message: 'Order fulfilled successfully',
    })
  } catch (error) {
    console.error('Fulfill order error:', error)
    return NextResponse.json(
      { error: 'Failed to fulfill order' },
      { status: 500 }
    )
  }
}
