import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const orderId = searchParams.get('orderId')

    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      )
    }

    const payload = await getPayload({ config })

    const refunds = await payload.find({
      collection: 'refunds',
      where: {
        order: {
          equals: orderId,
        },
      },
      sort: '-createdAt',
      limit: 100,
    })

    return NextResponse.json({
      success: true,
      refunds: refunds.docs,
      total: refunds.totalDocs,
    })
  } catch (error) {
    console.error('Fetch refund history error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch refund history' },
      { status: 500 }
    )
  }
}
