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
    const { reason, restoreInventory = true } = body

    if (!reason) {
      return NextResponse.json(
        { error: 'Cancellation reason is required' },
        { status: 400 }
      )
    }

    const order = await payload.findByID({
      collection: 'orders',
      id: params.id,
      depth: 2,
    })

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    if (order.status === 'cancelled') {
      return NextResponse.json(
        { error: 'Order is already cancelled' },
        { status: 400 }
      )
    }

    if (order.status === 'fulfilled') {
      return NextResponse.json(
        { error: 'Cannot cancel a fulfilled order' },
        { status: 400 }
      )
    }

    if (restoreInventory && order.status === 'processing') {
      for (const item of order.items) {
        const product = await payload.findByID({
          collection: 'cms_products',
          id: typeof item.product === 'string' ? item.product : item.product.id,
        })

        await payload.update({
          collection: 'cms_products',
          id: product.id,
          data: {
            stock: product.stock + item.quantity,
          },
        })
      }
    }

    const updatedOrder = await payload.update({
      collection: 'orders',
      id: params.id,
      data: {
        status: 'cancelled',
        adminNotes: `${order.adminNotes || ''}\n\nCancelled: ${reason}`.trim(),
      },
    })

    try {
      await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/email/order-cancelled`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId: params.id,
          orderNumber: order.orderNumber,
          customerEmail: order.customerEmail,
          reason,
        }),
      })
    } catch (emailError) {
      console.error('Failed to send cancellation email:', emailError)
    }

    return NextResponse.json({
      success: true,
      order: updatedOrder,
      message: 'Order cancelled successfully',
      inventoryRestored: restoreInventory && order.status === 'processing',
    })
  } catch (error) {
    console.error('Cancel order error:', error)
    return NextResponse.json(
      { error: 'Failed to cancel order' },
      { status: 500 }
    )
  }
}
