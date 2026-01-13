import { NextRequest, NextResponse } from 'next/server'
import { createOrder } from '@/lib/db/orders'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { items, total, customerWallet, shippingAddress } = body

    if (!items || !total || !customerWallet || !shippingAddress) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const order = await createOrder({
      items,
      total,
      customerWallet,
      shippingAddress,
    })

    return NextResponse.json(order)
  } catch (error) {
    console.error('Order creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}
