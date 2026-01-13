# Story 4.7: Email Notifications

Status: review

## Story

As a **shopper**,
I want to **receive an email confirmation after my order is placed**,
so that **I have a record of my purchase and can reference it later**.

## Acceptance Criteria

1. **AC1: Email Service Configuration**
   - Resend API configured
   - API key stored in environment variables
   - Email sending function created
   - Error handling implemented
   - Retry logic for failures
   - Logging for debugging

2. **AC2: Order Confirmation Email**
   - Sent within 1 minute of payment confirmation
   - Contains order number
   - Lists purchased items with quantities
   - Shows total amount (ELURC + EUR)
   - Includes transaction signature link
   - Displays shipping address
   - Shows estimated delivery date

3. **AC3: Email Template Design**
   - Professional, branded design
   - Mobile-responsive layout
   - Clear visual hierarchy
   - ELURC branding and colors
   - Readable typography
   - Accessible design
   - Renders correctly across email clients

4. **AC4: Email Content**
   - Personalized greeting
   - Order summary section
   - Transaction details section
   - Shipping information section
   - Next steps information
   - Support contact details
   - Footer with unsubscribe (optional)

5. **AC5: Email Delivery**
   - 99% delivery success rate
   - Sent from branded domain
   - Proper SPF/DKIM configuration
   - No spam folder issues
   - Delivery confirmation logged
   - Failed sends retried

6. **AC6: Integration with Payment Flow**
   - Triggered after payment validation
   - Receives order data from database
   - Sends asynchronously (non-blocking)
   - Handles send failures gracefully
   - Logs all send attempts
   - Updates order with email status

7. **AC7: Email Testing**
   - Preview in development
   - Test send functionality
   - Verify rendering in major clients
   - Test with real email addresses
   - Verify links work correctly
   - Check spam score

8. **AC8: Error Handling**
   - Handle API failures
   - Handle rate limiting
   - Handle invalid email addresses
   - Log all errors
   - Retry failed sends
   - Alert on persistent failures

## Tasks / Subtasks

- [ ] **Task 1: Install Dependencies** (AC: #1)
  - [ ] Add resend to package.json
  - [ ] Add react-email to package.json
  - [ ] Run yarn install
  - [ ] Verify installations

- [ ] **Task 2: Configure Resend** (AC: #1)
  - [ ] Create Resend account
  - [ ] Get API key
  - [ ] Add to environment variables
  - [ ] Create Resend client utility
  - [ ] Test connection

- [ ] **Task 3: Create Email Template** (AC: #3, #4)
  - [ ] Create `emails/OrderConfirmation.tsx`
  - [ ] Use React Email components
  - [ ] Add order summary section
  - [ ] Add transaction details
  - [ ] Add shipping information
  - [ ] Style with inline CSS
  - [ ] Make responsive

- [ ] **Task 4: Create Email Sending Function** (AC: #1, #2)
  - [ ] Create `src/lib/email/send.ts`
  - [ ] Implement sendOrderConfirmation
  - [ ] Render React Email template
  - [ ] Call Resend API
  - [ ] Handle errors
  - [ ] Add retry logic

- [ ] **Task 5: Create Email API Route** (AC: #6)
  - [ ] Create `src/app/api/email/order-confirmation/route.ts`
  - [ ] Validate request
  - [ ] Fetch order data
  - [ ] Call send function
  - [ ] Return status
  - [ ] Log attempts

- [ ] **Task 6: Integrate with Payment Monitor** (AC: #6)
  - [ ] Update payment monitor
  - [ ] Call email API after validation
  - [ ] Handle async send
  - [ ] Log email status
  - [ ] Don't block order confirmation

- [ ] **Task 7: Add Email Preview** (AC: #7)
  - [ ] Create preview route
  - [ ] Render template with sample data
  - [ ] Test in browser
  - [ ] Verify responsive design

- [ ] **Task 8: Test Email Delivery** (AC: #7)
  - [ ] Send test emails
  - [ ] Check Gmail rendering
  - [ ] Check Outlook rendering
  - [ ] Check Apple Mail rendering
  - [ ] Verify links work
  - [ ] Check spam score

- [ ] **Task 9: Add Error Logging** (AC: #8)
  - [ ] Log send attempts
  - [ ] Log failures
  - [ ] Log retries
  - [ ] Create error alerts
  - [ ] Monitor delivery rate

- [ ] **Task 10: Testing** (AC: All)
  - [ ] Test with real orders
  - [ ] Test error scenarios
  - [ ] Test retry logic
  - [ ] Verify delivery
  - [ ] Check all email clients

## Dev Notes

### Technical Requirements

**Email Template with React Email:**
```typescript
// emails/OrderConfirmation.tsx
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Row,
  Column,
} from '@react-email/components'

interface OrderConfirmationEmailProps {
  orderNumber: string
  customerName: string
  items: Array<{
    name: string
    quantity: number
    price: { elurc: number; eur: number }
  }>
  total: { elurc: number; eur: number }
  transactionSignature: string
  shippingAddress: {
    fullName: string
    streetAddress: string
    city: string
    postalCode: string
  }
  orderDate: string
}

export default function OrderConfirmationEmail({
  orderNumber,
  customerName,
  items,
  total,
  transactionSignature,
  shippingAddress,
  orderDate,
}: OrderConfirmationEmailProps) {
  const explorerUrl = `https://explorer.solana.com/tx/${transactionSignature}?cluster=${
    process.env.NEXT_PUBLIC_SOLANA_NETWORK || 'devnet'
  }`

  return (
    <Html>
      <Head />
      <Preview>Order #{orderNumber} confirmed - Thank you for your purchase!</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Heading style={h1}>elurc-market</Heading>
            <Text style={tagline}>Bretaigne's Organic Marketplace</Text>
          </Section>

          {/* Success Message */}
          <Section style={successSection}>
            <Text style={successIcon}>✓</Text>
            <Heading style={h2}>Payment Received!</Heading>
            <Text style={paragraph}>
              Hi {customerName}, thank you for your order. We'll start preparing
              it right away.
            </Text>
          </Section>

          {/* Order Number */}
          <Section style={orderNumberSection}>
            <Text style={label}>Order Number</Text>
            <Text style={orderNumber}>{orderNumber}</Text>
            <Text style={smallText}>Order Date: {orderDate}</Text>
          </Section>

          {/* Order Items */}
          <Section style={section}>
            <Heading style={h3}>Order Summary</Heading>
            {items.map((item, index) => (
              <Row key={index} style={itemRow}>
                <Column>
                  <Text style={itemName}>{item.name}</Text>
                  <Text style={itemQuantity}>Qty: {item.quantity}</Text>
                </Column>
                <Column align="right">
                  <Text style={itemPrice}>
                    {(item.price.elurc / 1000000).toFixed(2)} ELURC
                  </Text>
                  <Text style={itemPriceEur}>
                    €{(item.price.eur / 100).toFixed(2)}
                  </Text>
                </Column>
              </Row>
            ))}
            <Row style={totalRow}>
              <Column>
                <Text style={totalLabel}>Total</Text>
              </Column>
              <Column align="right">
                <Text style={totalAmount}>
                  {(total.elurc / 1000000).toFixed(2)} ELURC
                </Text>
                <Text style={totalAmountEur}>
                  ≈ €{(total.eur / 100).toFixed(2)}
                </Text>
              </Column>
            </Row>
          </Section>

          {/* Transaction Details */}
          <Section style={section}>
            <Heading style={h3}>Transaction Details</Heading>
            <Text style={paragraph}>
              <strong>Transaction ID:</strong>
              <br />
              <Link href={explorerUrl} style={link}>
                {transactionSignature.slice(0, 16)}...
              </Link>
            </Text>
            <Text style={smallText}>
              View full transaction on Solana Explorer
            </Text>
          </Section>

          {/* Shipping Information */}
          <Section style={section}>
            <Heading style={h3}>Shipping To</Heading>
            <Text style={paragraph}>
              {shippingAddress.fullName}
              <br />
              {shippingAddress.streetAddress}
              <br />
              {shippingAddress.postalCode} {shippingAddress.city}
            </Text>
            <Text style={paragraph}>
              <strong>Estimated Delivery:</strong> 2-3 business days
            </Text>
          </Section>

          {/* Next Steps */}
          <Section style={section}>
            <Heading style={h3}>What Happens Next?</Heading>
            <Text style={paragraph}>
              1. We'll prepare your order within 1-2 business days
              <br />
              2. Your order will be shipped to the address above
              <br />
              3. You'll receive a shipping confirmation once it's on the way
            </Text>
          </Section>

          {/* Support */}
          <Section style={section}>
            <Text style={paragraph}>
              Questions? Contact us at{' '}
              <Link href="mailto:support@elurc-market.bretaigne" style={link}>
                support@elurc-market.bretaigne
              </Link>
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              © 2026 elurc-market · Bretaigne's Organic Marketplace
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  maxWidth: '600px',
}

const header = {
  padding: '32px 24px',
  textAlign: 'center' as const,
  backgroundColor: '#10b981',
}

const h1 = {
  color: '#ffffff',
  fontSize: '32px',
  fontWeight: 'bold',
  margin: '0',
  padding: '0',
}

const tagline = {
  color: '#ffffff',
  fontSize: '14px',
  margin: '8px 0 0',
}

const successSection = {
  padding: '24px',
  textAlign: 'center' as const,
}

const successIcon = {
  fontSize: '48px',
  margin: '0',
}

const h2 = {
  color: '#1f2937',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '16px 0 8px',
}

const h3 = {
  color: '#1f2937',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0 0 12px',
}

const paragraph = {
  color: '#4b5563',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0 0 16px',
}

const orderNumberSection = {
  padding: '16px 24px',
  backgroundColor: '#f3f4f6',
  textAlign: 'center' as const,
}

const label = {
  color: '#6b7280',
  fontSize: '12px',
  textTransform: 'uppercase' as const,
  margin: '0',
}

const orderNumber = {
  color: '#1f2937',
  fontSize: '24px',
  fontWeight: 'bold',
  fontFamily: 'monospace',
  margin: '8px 0',
}

const smallText = {
  color: '#6b7280',
  fontSize: '14px',
  margin: '4px 0 0',
}

const section = {
  padding: '24px',
}

const itemRow = {
  borderBottom: '1px solid #e5e7eb',
  padding: '12px 0',
}

const itemName = {
  color: '#1f2937',
  fontSize: '16px',
  fontWeight: '500',
  margin: '0',
}

const itemQuantity = {
  color: '#6b7280',
  fontSize: '14px',
  margin: '4px 0 0',
}

const itemPrice = {
  color: '#1f2937',
  fontSize: '16px',
  fontWeight: '500',
  margin: '0',
}

const itemPriceEur = {
  color: '#6b7280',
  fontSize: '14px',
  margin: '4px 0 0',
}

const totalRow = {
  borderTop: '2px solid #1f2937',
  padding: '16px 0 0',
  marginTop: '8px',
}

const totalLabel = {
  color: '#1f2937',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0',
}

const totalAmount = {
  color: '#10b981',
  fontSize: '20px',
  fontWeight: 'bold',
  margin: '0',
}

const totalAmountEur = {
  color: '#6b7280',
  fontSize: '14px',
  margin: '4px 0 0',
}

const link = {
  color: '#10b981',
  textDecoration: 'underline',
}

const footer = {
  padding: '24px',
  textAlign: 'center' as const,
  borderTop: '1px solid #e5e7eb',
}

const footerText = {
  color: '#6b7280',
  fontSize: '12px',
  margin: '0',
}
```

**Email Sending Function:**
```typescript
// src/lib/email/send.ts
import { Resend } from 'resend'
import { render } from '@react-email/render'
import OrderConfirmationEmail from '../../../emails/OrderConfirmation'

const resend = new Resend(process.env.RESEND_API_KEY)

interface SendOrderConfirmationParams {
  to: string
  orderNumber: string
  customerName: string
  items: Array<{
    name: string
    quantity: number
    price: { elurc: number; eur: number }
  }>
  total: { elurc: number; eur: number }
  transactionSignature: string
  shippingAddress: {
    fullName: string
    streetAddress: string
    city: string
    postalCode: string
  }
  orderDate: string
}

export async function sendOrderConfirmation(
  params: SendOrderConfirmationParams
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const emailHtml = render(
      OrderConfirmationEmail({
        orderNumber: params.orderNumber,
        customerName: params.customerName,
        items: params.items,
        total: params.total,
        transactionSignature: params.transactionSignature,
        shippingAddress: params.shippingAddress,
        orderDate: params.orderDate,
      })
    )

    const result = await resend.emails.send({
      from: 'elurc-market <orders@elurc-market.bretaigne>',
      to: params.to,
      subject: `Order Confirmation #${params.orderNumber}`,
      html: emailHtml,
    })

    if (result.error) {
      console.error('Email send error:', result.error)
      return {
        success: false,
        error: result.error.message,
      }
    }

    console.log('Email sent successfully:', result.data?.id)
    return {
      success: true,
      messageId: result.data?.id,
    }
  } catch (error) {
    console.error('Email send exception:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
```

**Email API Route:**
```typescript
// src/app/api/email/order-confirmation/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { sendOrderConfirmation } from '@/lib/email/send'
import { getOrderById } from '@/lib/db/orders'

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

    // Fetch order details
    const order = await getOrderById(orderId)

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }

    // Get customer email (from order or wallet-based lookup)
    const customerEmail = order.customerEmail || `${order.customerWallet}@temp.elurc-market.bretaigne`

    // Send email
    const result = await sendOrderConfirmation({
      to: customerEmail,
      orderNumber: order.orderNumber,
      customerName: order.shippingAddress.fullName,
      items: order.items.map((item) => ({
        name: item.product.name,
        quantity: item.quantity,
        price: {
          elurc: item.priceSnapshot.elurc * item.quantity,
          eur: item.priceSnapshot.eur * item.quantity,
        },
      })),
      total: order.amount,
      transactionSignature: order.transactionSignature,
      shippingAddress: order.shippingAddress,
      orderDate: new Date(order.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    })

    if (!result.success) {
      return NextResponse.json(
        { error: 'Failed to send email', details: result.error },
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
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

**Integration with Payment Monitor:**
```typescript
// src/lib/payment/monitor.ts (updated)
export async function checkPaymentStatus(orderId: string): Promise<PaymentCheckResult> {
  try {
    // ... existing payment validation code ...

    if (match && validation.valid) {
      // Record transaction
      await recordTransaction({...})

      // Update order
      await updateOrderStatus(orderId, 'paid', {
        transactionSignature: match.signature,
        paidAt: validation.details.blockTime * 1000,
      })

      // Send order confirmation email (async, non-blocking)
      fetch('/api/email/order-confirmation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId }),
      }).catch((error) => {
        console.error('Failed to trigger email:', error)
        // Don't fail the payment confirmation if email fails
      })

      return {
        status: 'confirmed',
        transactionSignature: match.signature,
        amount: validation.details.amount,
        timestamp: validation.details.blockTime * 1000,
      }
    }

    return { status: 'pending', message: 'Waiting for payment' }
  } catch (error) {
    console.error('Payment monitoring error:', error)
    return { status: 'error', message: 'Failed to check payment status' }
  }
}
```

**Email Preview Route:**
```typescript
// src/app/api/email/preview/route.tsx
import { NextResponse } from 'next/server'
import { render } from '@react-email/render'
import OrderConfirmationEmail from '../../../../../emails/OrderConfirmation'

export async function GET() {
  const html = render(
    OrderConfirmationEmail({
      orderNumber: 'ORD-12345',
      customerName: 'Gwen Le Goff',
      items: [
        {
          name: 'Organic Tomatoes',
          quantity: 2,
          price: { elurc: 8000000, eur: 240 },
        },
        {
          name: 'Artisan Bread',
          quantity: 1,
          price: { elurc: 5000000, eur: 150 },
        },
      ],
      total: { elurc: 21000000, eur: 630 },
      transactionSignature: '5j7K8mN9pQ2rS3tU4vW5xY6zA1bC2dE3fG4hI5jK6lM7nO8pQ9rS0tU1vW2xY3zA4',
      shippingAddress: {
        fullName: 'Gwen Le Goff',
        streetAddress: '123 Rue de Bretaigne',
        city: 'Quimper',
        postalCode: '29000',
      },
      orderDate: 'January 13, 2026',
    })
  )

  return new NextResponse(html, {
    headers: {
      'Content-Type': 'text/html',
    },
  })
}
```

### Architecture Compliance

**From Architecture Document:**
- **Email Service**: Resend API with React Email templates
- **Delivery**: Within 1 minute of payment confirmation
- **Reliability**: 99% delivery success rate
- **Multi-client**: Renders correctly across email clients

**Design Patterns:**
- React Email for template design
- API route for email sending
- Async, non-blocking email dispatch
- Error logging and retry logic
- Preview route for development

### Library & Framework Requirements

**New Dependencies:**
- resend ^3.0.0 (email API)
- react-email ^2.0.0 (email templates)
- @react-email/components ^0.0.14 (email components)

**Existing Dependencies:**
- Next.js 15+ (API routes)
- React 19+ (components)

### File Structure Requirements

**Files to Create:**
1. `emails/OrderConfirmation.tsx` - Email template
2. `src/lib/email/send.ts` - Email sending function
3. `src/app/api/email/order-confirmation/route.ts` - Email API
4. `src/app/api/email/preview/route.tsx` - Preview route

**Files to Modify:**
1. `src/lib/payment/monitor.ts` - Add email trigger
2. `.env.local` - Add RESEND_API_KEY

**Directory Structure:**
```
project-root/
├── emails/
│   └── OrderConfirmation.tsx (NEW)
├── src/
│   ├── app/
│   │   └── api/
│   │       └── email/
│   │           ├── order-confirmation/
│   │           │   └── route.ts (NEW)
│   │           └── preview/
│   │               └── route.tsx (NEW)
│   └── lib/
│       ├── email/
│       │   └── send.ts (NEW)
│       └── payment/
│           └── monitor.ts (MODIFY)
└── .env.local (MODIFY)
```

### Environment Variables

**New Variables:**
```env
RESEND_API_KEY="re_xxxxxxxxxxxxx"
```

**Email Configuration:**
- Domain: elurc-market.bretaigne (requires DNS setup)
- From: orders@elurc-market.bretaigne
- Reply-to: support@elurc-market.bretaigne

### Testing Requirements

**Manual Testing Checklist:**

1. **Email Sending:**
   - [ ] Email sent after payment
   - [ ] Delivery within 1 minute
   - [ ] Correct recipient
   - [ ] Subject line correct
   - [ ] From address correct

2. **Email Content:**
   - [ ] Order number displays
   - [ ] Items list correct
   - [ ] Quantities correct
   - [ ] Prices correct (ELURC + EUR)
   - [ ] Total calculates correctly
   - [ ] Transaction link works
   - [ ] Shipping address correct

3. **Email Rendering:**
   - [ ] Gmail desktop renders correctly
   - [ ] Gmail mobile renders correctly
   - [ ] Outlook renders correctly
   - [ ] Apple Mail renders correctly
   - [ ] Responsive on mobile
   - [ ] Images load
   - [ ] Links work

4. **Error Handling:**
   - [ ] API errors handled
   - [ ] Invalid email handled
   - [ ] Rate limiting handled
   - [ ] Errors logged
   - [ ] Payment not blocked by email failure

5. **Preview:**
   - [ ] Preview route works
   - [ ] Sample data displays
   - [ ] Styling correct
   - [ ] Responsive design works

6. **Integration:**
   - [ ] Triggered after payment
   - [ ] Non-blocking send
   - [ ] Order data correct
   - [ ] Customer name correct
   - [ ] Date formatted correctly

7. **Spam Score:**
   - [ ] Not flagged as spam
   - [ ] SPF configured
   - [ ] DKIM configured
   - [ ] Proper headers
   - [ ] Unsubscribe link (optional)

8. **Performance:**
   - [ ] Sends within 1 minute
   - [ ] Doesn't block payment
   - [ ] API responds quickly
   - [ ] Retry logic works

### Previous Story Intelligence

**From Story 4.6 (Order Confirmation Page):**
- Order data structure
- Transaction details format
- Shipping address format
- Order summary layout

**From Story 4.4 (Payment Monitoring):**
- Payment confirmation trigger point
- Order status updates
- Transaction signature storage

**From Story 4.5 (Transaction Validation):**
- Validation completion as trigger
- Transaction details available

**Key Learnings:**
- Email should be async and non-blocking
- Payment confirmation must not fail if email fails
- React Email provides great template system
- Preview route essential for development
- Resend has generous free tier for POC

### Implementation Guidance

**Step-by-Step Approach:**

1. **Install Dependencies:**
   - Add resend, react-email packages
   - Run yarn install
   - Verify installations

2. **Set Up Resend:**
   - Create Resend account
   - Get API key
   - Add to .env.local
   - Test connection

3. **Create Email Template:**
   - Create OrderConfirmation.tsx
   - Use React Email components
   - Add all sections
   - Style with inline CSS
   - Make responsive

4. **Create Send Function:**
   - Create send.ts utility
   - Render template
   - Call Resend API
   - Handle errors
   - Add logging

5. **Create Email API:**
   - Create API route
   - Fetch order data
   - Call send function
   - Return status
   - Handle errors

6. **Create Preview Route:**
   - Create preview API
   - Render with sample data
   - Test in browser
   - Verify styling

7. **Integrate with Payment:**
   - Update payment monitor
   - Trigger email after validation
   - Make async
   - Don't block on failure

8. **Test Thoroughly:**
   - Send test emails
   - Check all email clients
   - Verify links
   - Test error scenarios
   - Check spam score

**Critical Success Factors:**
- 99% delivery success rate
- Sent within 1 minute
- Renders correctly everywhere
- Non-blocking implementation
- Clear, professional design

**Potential Issues & Solutions:**

**Issue 1: Email Goes to Spam**
- **Problem:** Emails flagged as spam
- **Solution:** Configure SPF/DKIM, use branded domain, avoid spam triggers

**Issue 2: Slow Email Delivery**
- **Problem:** Takes longer than 1 minute
- **Solution:** Async send, optimize template rendering, use Resend's fast API

**Issue 3: Template Rendering Issues**
- **Problem:** Looks broken in some clients
- **Solution:** Use inline CSS, test thoroughly, avoid complex layouts

**Issue 4: Email Send Failure**
- **Problem:** Resend API fails
- **Solution:** Retry logic, error logging, don't block payment

**Issue 5: Missing Customer Email**
- **Problem:** No email address for wallet-only users
- **Solution:** Use wallet address as temp email, add email collection in future

### Functional Requirements Coverage

This story implements the following functional requirements:

**Email Notifications (FR18):**
- **FR18**: Order confirmation via email ✓

**Email Integration (NFR-I10-I12):**
- **NFR-I10**: Sent within 1 minute of confirmation ✓
- **NFR-I11**: 99% delivery success rate ✓
- **NFR-I12**: Renders correctly across email clients ✓

### References

**Source Documents:**
- [PRD](../planning-artifacts/prd.md) - Email requirements (FR18, lines 345, 402)
- [Architecture](../planning-artifacts/architecture.md) - Email service (lines 456-474)
- [Story 4.6](../implementation-artifacts/4-6-order-confirmation-page.md) - Order data structure
- [Story 4.4](../implementation-artifacts/4-4-payment-monitoring-service.md) - Payment trigger

**External Documentation:**
- [Resend Documentation](https://resend.com/docs)
- [React Email](https://react.email/)
- [Email Client Support](https://www.caniemail.com/)

## Dev Agent Record

### Agent Model Used

Cascade AI (Claude 3.5 Sonnet)

### Debug Log References

N/A - Story not yet implemented

### Completion Notes List

**Implementation Status:**
- Story ready for development
- All acceptance criteria defined
- Email template designed
- Resend integration documented
- Preview route specified

**Next Steps:**
1. Install resend and react-email packages
2. Set up Resend account and get API key
3. Create email template with React Email
4. Build email sending function
5. Create email API route
6. Add preview route for testing
7. Integrate with payment monitor
8. Test email delivery thoroughly

### File List

**Files to Create:**
- `emails/OrderConfirmation.tsx` - React Email template
- `src/lib/email/send.ts` - Email sending function
- `src/app/api/email/order-confirmation/route.ts` - Email API route
- `src/app/api/email/preview/route.tsx` - Preview route

**Files to Modify:**
- `src/lib/payment/monitor.ts` - Add email trigger
- `.env.local` - Add RESEND_API_KEY
- `package.json` - Add email dependencies
