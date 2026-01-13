import { NextRequest, NextResponse } from 'next/server'
import { getOrder } from '@/lib/db/orders'
import { sendOrderConfirmationEmail } from '@/lib/email/send'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { orderId } = body

    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID required' },
        { status: 400 }
      )
    }

    const order = await getOrder(orderId)

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }

    const result = await sendOrderConfirmationEmail({
      orderNumber: order.orderNumber,
      customerName: order.shippingAddress.fullName,
      customerEmail: order.customerEmail,
      items: order.items.map(item => ({
        name: typeof item.product === 'object' ? item.product.name : 'Product',
        quantity: item.quantity,
        price: item.priceSnapshot,
      })),
      total: {
        elurc: order.amountElurc,
        eur: order.amountEur,
      },
      transactionSignature: order.transactionSignature || '',
      shippingAddress: order.shippingAddress,
      orderDate: new Date(order.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    })

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      messageId: result.messageId,
    })
  } catch (error) {
    console.error('Email API error:', error)
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}
