import { NextRequest, NextResponse } from 'next/server'
import { checkPaymentStatus } from '@/lib/payment/monitor'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const orderId = searchParams.get('orderId')

    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID required' },
        { status: 400 }
      )
    }

    const result = await checkPaymentStatus(orderId)

    return NextResponse.json(result)
  } catch (error) {
    console.error('Payment check error:', error)
    return NextResponse.json(
      { error: 'Failed to check payment status' },
      { status: 500 }
    )
  }
}
