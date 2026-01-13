import { Resend } from 'resend'
import { render } from '@react-email/render'
import OrderConfirmationEmail from '../../../emails/OrderConfirmation'

const resend = new Resend(process.env.RESEND_API_KEY)

interface OrderData {
  orderNumber: string
  customerName: string
  customerEmail: string
  items: Array<{
    name: string
    quantity: number
    price: {
      elurc: number
      eur: number
    }
  }>
  total: {
    elurc: number
    eur: number
  }
  transactionSignature: string
  shippingAddress: {
    fullName: string
    streetAddress: string
    city: string
    postalCode: string
  }
  orderDate: string
}

export async function sendOrderConfirmationEmail(
  orderData: OrderData
): Promise<{ success: boolean; error?: string; messageId?: string }> {
  try {
    console.log('[Email] Sending order confirmation to:', orderData.customerEmail)

    if (!process.env.RESEND_API_KEY) {
      console.warn('[Email] RESEND_API_KEY not configured, email will not be sent')
      return {
        success: false,
        error: 'Email service not configured',
      }
    }

    const emailHtml = await render(
      OrderConfirmationEmail({
        orderNumber: orderData.orderNumber,
        customerName: orderData.customerName,
        items: orderData.items,
        total: orderData.total,
        transactionSignature: orderData.transactionSignature,
        shippingAddress: orderData.shippingAddress,
        orderDate: orderData.orderDate,
      })
    )

    const result = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'elurc-market <onboarding@resend.dev>',
      to: orderData.customerEmail,
      subject: `Order #${orderData.orderNumber} Confirmed - elurc-market`,
      html: emailHtml,
    })

    if (result.error) {
      console.error('[Email] Failed to send:', result.error)
      return {
        success: false,
        error: result.error.message,
      }
    }

    console.log('[Email] ✅ Email sent successfully:', result.data?.id)
    return {
      success: true,
      messageId: result.data?.id,
    }
  } catch (error) {
    console.error('[Email] Error sending email:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
