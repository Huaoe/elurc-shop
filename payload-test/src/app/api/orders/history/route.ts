import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const wallet = searchParams.get('wallet')

    if (!wallet) {
      return NextResponse.json(
        { error: 'Wallet address required' },
        { status: 400 }
      )
    }

    const payload = await getPayload({ config })

    const orders = await payload.find({
      collection: 'orders',
      where: {
        customerWallet: {
          equals: wallet,
        },
      },
      sort: '-createdAt',
      depth: 1,
    })

    const orderSummaries = orders.docs.map((order) => ({
      id: order.id,
      orderNumber: order.orderNumber,
      status: order.status,
      amountElurc: order.amountElurc,
      amountEur: order.amountEur,
      itemCount: order.items?.length || 0,
      createdAt: order.createdAt,
      paidAt: order.paidAt || null,
    }))

    return NextResponse.json({
      orders: orderSummaries,
      total: orders.totalDocs,
    })
  } catch (error) {
    console.error('Order history error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch order history' },
      { status: 500 }
    )
  }
}
