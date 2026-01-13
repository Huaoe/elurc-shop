import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Hr,
} from '@react-email/components'

interface OrderItem {
  name: string
  quantity: number
  price: {
    elurc: number
    eur: number
  }
}

interface OrderConfirmationEmailProps {
  orderNumber: string
  customerName: string
  items: OrderItem[]
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
    process.env.NEXT_PUBLIC_SOLANA_NETWORK || 'mainnet-beta'
  }`

  return (
    <Html>
      <Head />
      <Preview>Order #{orderNumber} confirmed - Thank you for your purchase!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={h1}>elurc-market</Heading>
            <Text style={tagline}>Bretaigne&apos;s Organic Marketplace</Text>
          </Section>

          <Section style={successSection}>
            <Text style={successIcon}>✓</Text>
            <Heading style={h2}>Payment Received!</Heading>
            <Text style={paragraph}>
              Hi {customerName}, thank you for your order. We&apos;ll start preparing it right away.
            </Text>
          </Section>

          <Section style={orderNumberSection}>
            <Text style={label}>Order Number</Text>
            <Text style={orderNumber}>#{orderNumber}</Text>
            <Text style={smallText}>Order Date: {orderDate}</Text>
          </Section>

          <Hr style={hr} />

          <Section style={section}>
            <Heading style={h3}>Order Summary</Heading>
            {items.map((item, index) => (
              <div key={index} style={itemRow}>
                <div style={itemLeft}>
                  <Text style={itemName}>{item.name}</Text>
                  <Text style={itemQuantity}>Qty: {item.quantity}</Text>
                </div>
                <div style={itemRight}>
                  <Text style={itemPrice}>
                    {((item.price.elurc * item.quantity) / 1_000_000).toFixed(2)} ELURC
                  </Text>
                  <Text style={itemPriceEur}>
                    €{((item.price.eur * item.quantity) / 100).toFixed(2)}
                  </Text>
                </div>
              </div>
            ))}
            <Hr style={hr} />
            <div style={totalRow}>
              <Text style={totalLabel}>Total</Text>
              <div style={totalRight}>
                <Text style={totalAmount}>{(total.elurc / 1_000_000).toFixed(2)} ELURC</Text>
                <Text style={totalAmountEur}>€{(total.eur / 100).toFixed(2)}</Text>
              </div>
            </div>
          </Section>

          <Hr style={hr} />

          <Section style={section}>
            <Heading style={h3}>Transaction Details</Heading>
            <Text style={paragraph}>
              Your payment has been confirmed on the Solana blockchain.
            </Text>
            <Link href={explorerUrl} style={link}>
              View Transaction on Solana Explorer →
            </Link>
          </Section>

          <Hr style={hr} />

          <Section style={section}>
            <Heading style={h3}>Shipping Information</Heading>
            <Text style={paragraph}>
              <strong>{shippingAddress.fullName}</strong>
              <br />
              {shippingAddress.streetAddress}
              <br />
              {shippingAddress.city}, {shippingAddress.postalCode}
            </Text>
            <Text style={smallText}>
              Estimated delivery: 2-3 business days
            </Text>
          </Section>

          <Hr style={hr} />

          <Section style={section}>
            <Heading style={h3}>What Happens Next?</Heading>
            <Text style={paragraph}>
              • We&apos;ll prepare your order and ship it within 2-3 business days
              <br />
              • You&apos;ll receive a shipping confirmation email with tracking
              <br />
              • If you have any questions, contact us at support@elurc-market.com
            </Text>
          </Section>

          <Section style={footer}>
            <Text style={footerText}>
              Thank you for shopping with elurc-market!
              <br />
              Bretaigne&apos;s Organic Marketplace
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
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
  margin: '0 0 8px',
  padding: '0',
  lineHeight: '1.2',
}

const tagline = {
  color: '#ffffff',
  fontSize: '14px',
  margin: '0',
  padding: '0',
}

const successSection = {
  padding: '32px 24px',
  textAlign: 'center' as const,
}

const successIcon = {
  fontSize: '48px',
  margin: '0 0 16px',
  color: '#10b981',
}

const h2 = {
  color: '#1f2937',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '0 0 16px',
  padding: '0',
}

const h3 = {
  color: '#1f2937',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0 0 12px',
  padding: '0',
}

const paragraph = {
  color: '#4b5563',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0 0 16px',
}

const orderNumberSection = {
  padding: '24px',
  textAlign: 'center' as const,
  backgroundColor: '#f9fafb',
  margin: '0 24px',
  borderRadius: '8px',
}

const label = {
  color: '#6b7280',
  fontSize: '12px',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.5px',
  margin: '0 0 8px',
}

const orderNumber = {
  color: '#1f2937',
  fontSize: '28px',
  fontWeight: 'bold',
  margin: '0 0 8px',
  fontFamily: 'monospace',
}

const smallText = {
  color: '#6b7280',
  fontSize: '14px',
  margin: '0',
}

const section = {
  padding: '24px',
}

const itemRow = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '16px',
}

const itemLeft = {
  flex: 1,
}

const itemRight = {
  textAlign: 'right' as const,
}

const itemName = {
  color: '#1f2937',
  fontSize: '16px',
  fontWeight: '500',
  margin: '0 0 4px',
}

const itemQuantity = {
  color: '#6b7280',
  fontSize: '14px',
  margin: '0',
}

const itemPrice = {
  color: '#1f2937',
  fontSize: '16px',
  fontWeight: '500',
  margin: '0 0 4px',
}

const itemPriceEur = {
  color: '#6b7280',
  fontSize: '14px',
  margin: '0',
}

const totalRow = {
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '16px',
}

const totalLabel = {
  color: '#1f2937',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0',
}

const totalRight = {
  textAlign: 'right' as const,
}

const totalAmount = {
  color: '#1f2937',
  fontSize: '20px',
  fontWeight: 'bold',
  margin: '0 0 4px',
}

const totalAmountEur = {
  color: '#6b7280',
  fontSize: '16px',
  margin: '0',
}

const hr = {
  borderColor: '#e5e7eb',
  margin: '24px 0',
}

const link = {
  color: '#10b981',
  fontSize: '16px',
  textDecoration: 'underline',
}

const footer = {
  padding: '24px',
  textAlign: 'center' as const,
}

const footerText = {
  color: '#6b7280',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '0',
}
