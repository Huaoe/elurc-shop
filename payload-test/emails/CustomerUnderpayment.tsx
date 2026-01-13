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

interface CustomerUnderpaymentEmailProps {
  orderNumber: string
  customerName: string
  expectedAmount: number
  actualAmount: number
  shortageAmount: number
  customerWallet: string
  transactionSignature: string
  orderDate: string
}

export default function CustomerUnderpaymentEmail({
  orderNumber,
  customerName,
  expectedAmount,
  actualAmount,
  shortageAmount,
  customerWallet: _customerWallet,
  transactionSignature,
  orderDate,
}: CustomerUnderpaymentEmailProps) {
  const explorerUrl = `https://explorer.solana.com/tx/${transactionSignature}?cluster=${
    process.env.NEXT_PUBLIC_SOLANA_NETWORK || 'mainnet-beta'
  }`

  return (
    <Html>
      <Head />
      <Preview>Payment Shortage Detected - Order #{orderNumber} Requires Attention</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={h1}>elurc-market</Heading>
            <Text style={tagline}>Bretaigne&apos;s Organic Marketplace</Text>
          </Section>

          <Section style={noticeSection}>
            <Text style={noticeIcon}>⚠️</Text>
            <Heading style={h2}>Payment Shortage Detected</Heading>
            <Text style={paragraph}>
              Hi {customerName}, we noticed the payment for your order was slightly less than the required amount.
              Your order is currently on hold until this is resolved.
            </Text>
          </Section>

          <Section style={orderNumberSection}>
            <Text style={label}>Order Number</Text>
            <Text style={orderNumberStyle}>#{orderNumber}</Text>
            <Text style={smallText}>Order Date: {orderDate}</Text>
          </Section>

          <Hr style={hr} />

          <Section style={paymentBox}>
            <Heading style={h3}>Payment Details</Heading>
            <div style={detailRow}>
              <Text style={detailLabel}>Order Total:</Text>
              <Text style={detailValue}>
                {(expectedAmount / 1_000_000).toFixed(2)} ELURC
              </Text>
            </div>
            <div style={detailRow}>
              <Text style={detailLabel}>Amount Paid:</Text>
              <Text style={detailValue}>
                {(actualAmount / 1_000_000).toFixed(2)} ELURC
              </Text>
            </div>
            <Hr style={hr} />
            <div style={detailRow}>
              <Text style={detailLabel}>Shortage:</Text>
              <Text style={{ ...detailValue, color: '#ef4444', fontWeight: 'bold' }}>
                {(Math.abs(shortageAmount) / 1_000_000).toFixed(2)} ELURC
              </Text>
            </div>
          </Section>

          <Hr style={hr} />

          <Section style={section}>
            <Heading style={h3}>What You Need to Do</Heading>
            <Text style={paragraph}>
              To complete your order, please choose one of the following options:
            </Text>
            <Text style={paragraph}>
              <strong>Option 1: Send Additional Payment</strong>
              <br />
              Send the remaining {(Math.abs(shortageAmount) / 1_000_000).toFixed(2)} ELURC to complete your order.
              Please contact our support team for payment instructions.
            </Text>
            <Text style={paragraph}>
              <strong>Option 2: Contact Support</strong>
              <br />
              If you believe this is an error or would like to discuss other options, please reach out to our team.
            </Text>
          </Section>

          <Hr style={hr} />

          <Section style={section}>
            <Heading style={h3}>Order Status</Heading>
            <Text style={paragraph}>
              • Your order is currently <strong>on hold</strong>
              <br />
              • We will not process or ship your order until payment is complete
              <br />
              • Your items remain reserved for 48 hours
              <br />
              • After 48 hours, the order may be cancelled if unresolved
            </Text>
          </Section>

          <Hr style={hr} />

          <Section style={section}>
            <Heading style={h3}>Transaction Details</Heading>
            <Text style={paragraph}>
              Your payment has been received on the Solana blockchain.
            </Text>
            <Link href={explorerUrl} style={link}>
              View Transaction on Solana Explorer →
            </Link>
          </Section>

          <Hr style={hr} />

          <Section style={actionSection}>
            <Heading style={h3}>Need Help?</Heading>
            <Text style={paragraph}>
              Our support team is here to help resolve this quickly:
            </Text>
            <Link href="mailto:support@elurc-market.com" style={button}>
              Contact Support
            </Link>
          </Section>

          <Section style={footer}>
            <Text style={footerText}>
              Thank you for your understanding.
              <br />
              elurc-market - Bretaigne&apos;s Organic Marketplace
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

const noticeSection = {
  padding: '32px 24px',
  textAlign: 'center' as const,
}

const noticeIcon = {
  fontSize: '48px',
  margin: '0 0 16px',
  color: '#f59e0b',
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

const orderNumberStyle = {
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

const paymentBox = {
  padding: '24px',
  backgroundColor: '#fef2f2',
  margin: '0 24px',
  borderRadius: '8px',
  border: '2px solid #ef4444',
}

const detailRow = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '12px',
}

const detailLabel = {
  color: '#6b7280',
  fontSize: '16px',
  margin: '0',
}

const detailValue = {
  color: '#1f2937',
  fontSize: '16px',
  fontWeight: '600',
  margin: '0',
  fontFamily: 'monospace',
}

const section = {
  padding: '24px',
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

const actionSection = {
  padding: '24px',
  textAlign: 'center' as const,
}

const button = {
  backgroundColor: '#10b981',
  borderRadius: '8px',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 24px',
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
