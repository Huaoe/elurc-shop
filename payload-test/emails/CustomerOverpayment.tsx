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

interface CustomerOverpaymentEmailProps {
  orderNumber: string
  customerName: string
  expectedAmount: number
  actualAmount: number
  refundAmount: number
  customerWallet: string
  transactionSignature: string
  orderDate: string
}

export default function CustomerOverpaymentEmail({
  orderNumber,
  customerName,
  expectedAmount,
  actualAmount,
  refundAmount,
  customerWallet,
  transactionSignature,
  orderDate,
}: CustomerOverpaymentEmailProps) {
  const explorerUrl = `https://explorer.solana.com/tx/${transactionSignature}?cluster=${
    process.env.NEXT_PUBLIC_SOLANA_NETWORK || 'mainnet-beta'
  }`

  return (
    <Html>
      <Head />
      <Preview>Overpayment Detected - Refund Being Processed for Order #{orderNumber}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={h1}>elurc-market</Heading>
            <Text style={tagline}>Bretaigne&apos;s Organic Marketplace</Text>
          </Section>

          <Section style={noticeSection}>
            <Text style={noticeIcon}>ℹ️</Text>
            <Heading style={h2}>Overpayment Detected</Heading>
            <Text style={paragraph}>
              Hi {customerName}, we noticed you sent more ELURC than required for your order.
              Don&apos;t worry - we&apos;ll refund the excess amount to your wallet.
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
              <Text style={detailLabel}>Refund Amount:</Text>
              <Text style={{ ...detailValue, color: '#10b981', fontWeight: 'bold' }}>
                {(refundAmount / 1_000_000).toFixed(2)} ELURC
              </Text>
            </div>
          </Section>

          <Hr style={hr} />

          <Section style={section}>
            <Heading style={h3}>What Happens Next?</Heading>
            <Text style={paragraph}>
              • Your order will be processed normally
              <br />
              • We&apos;ll initiate a refund for the excess amount within 24 hours
              <br />
              • The refund will be sent to your wallet: {customerWallet.slice(0, 8)}...{customerWallet.slice(-8)}
              <br />
              • You&apos;ll receive a confirmation email once the refund is complete
            </Text>
          </Section>

          <Hr style={hr} />

          <Section style={section}>
            <Heading style={h3}>Transaction Details</Heading>
            <Text style={paragraph}>
              Your original payment has been confirmed on the Solana blockchain.
            </Text>
            <Link href={explorerUrl} style={link}>
              View Transaction on Solana Explorer →
            </Link>
          </Section>

          <Hr style={hr} />

          <Section style={section}>
            <Heading style={h3}>Need Help?</Heading>
            <Text style={paragraph}>
              If you have any questions about this overpayment or refund, please contact our support team:
              <br />
              <Link href="mailto:support@elurc-market.com" style={link}>
                support@elurc-market.com
              </Link>
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

const noticeSection = {
  padding: '32px 24px',
  textAlign: 'center' as const,
}

const noticeIcon = {
  fontSize: '48px',
  margin: '0 0 16px',
  color: '#3b82f6',
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
  backgroundColor: '#f0fdf4',
  margin: '0 24px',
  borderRadius: '8px',
  border: '2px solid #10b981',
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
