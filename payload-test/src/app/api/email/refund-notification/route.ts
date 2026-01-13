import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import RefundNotificationEmail from '../../../../../emails/RefundNotification'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { orderNumber, customerEmail, refundAmount, transactionSignature, reason } = body

    if (!orderNumber || !customerEmail || !refundAmount || !transactionSignature) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'ELURC Market <noreply@bretaigne.com>',
      to: [customerEmail],
      subject: `Refund Processed - Order ${orderNumber}`,
      react: RefundNotificationEmail({
        orderNumber,
        refundAmount,
        transactionSignature,
        reason,
      }),
    })

    if (error) {
      console.error('Resend API error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, emailId: data?.id })
  } catch (error) {
    console.error('Email sending error:', error)
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}
