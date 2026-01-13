import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import ShippingConfirmationEmail from '../../../../../emails/ShippingConfirmation'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { orderNumber, customerEmail, trackingNumber, customerName } = await request.json()

    if (!orderNumber || !customerEmail) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'ELURC Market <noreply@elurc-market.com>',
      to: [customerEmail],
      subject: `Order ${orderNumber} has been shipped!`,
      react: ShippingConfirmationEmail({
        orderNumber,
        trackingNumber,
        customerName: customerName || 'Customer',
      }),
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Email error:', error)
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}
