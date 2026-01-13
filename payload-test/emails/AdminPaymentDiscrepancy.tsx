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

interface AdminPaymentDiscrepancyEmailProps {
  orderNumber: string
  discrepancyType: 'overpayment' | 'underpayment'
  expectedAmount: number
  actualAmount: number
  differenceAmount: number
  customerEmail: string
  customerWallet: string
  transactionSignature: string
  orderDate: string
}

export default function AdminPaymentDiscrepancyEmail({
  orderNumber,
  discrepancyType,
  expectedAmount,
  actualAmount,
  differenceAmount,
  customerEmail,
  customerWallet,
  transactionSignature,
  orderDate,
}: AdminPaymentDiscrepancyEmailProps) {
  const explorerUrl = `https://explorer.solana.com/tx/${transactionSignature}?cluster=${
    process.env.NEXT_PUBLIC_SOLANA_NETWORK || 'mainnet-beta'
  }`

  const isOverpayment = discrepancyType === 'overpayment'
  const alertColor = isOverpayment ? '#f59e0b' : '#ef4444'
  const alertIcon = isOverpayment ? '⚠️' : '🚨'
  const alertTitle = isOverpayment ? 'Overpayment Detected' : 'Underpayment Detected'

  return (
    <Html>
      <Head />
      <Preview>
        {alertTitle} - Order #{orderNumber} requires attention
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={h1}>elurc-market Admin</Heading>
            <Text style={tagline}>Payment Discrepancy Alert</Text>
          </Section>

          <Section style={alertSection}>
            <Text style={{ ...alertIconStyle, color: alertColor }}>{alertIcon}</Text>
            <Heading style={{ ...h2, color: alertColor }}>{alertTitle}</Heading>
            <Text style={paragraph}>
              Order #{orderNumber} has a payment discrepancy that requires your attention.
            </Text>
          </Section>

          <Section style={discrepancyBox}>
            <Heading style={h3}>Payment Details</Heading>
            <div style={detailRow}>
              <Text style={detailLabel}>Expected Amount:</Text>
              <Text style={detailValue}>
                {(expectedAmount / 1_000_000).toFixed(2)} ELURC
              </Text>
            </div>
            <div style={detailRow}>
              <Text style={detailLabel}>Actual Amount:</Text>
              <Text style={detailValue}>
                {(actualAmount / 1_000_000).toFixed(2)} ELURC
              </Text>
            </div>
            <Hr style={hr} />
            <div style={detailRow}>
              <Text style={detailLabel}>Difference:</Text>
              <Text style={{ ...detailValue, color: alertColor, fontWeight: 'bold' }}>
                {isOverpayment ? '+' : ''}
                {(differenceAmount / 1_000_000).toFixed(2)} ELURC
              </Text>
            </div>
          </Section>

          <Hr style={hr} />

          <Section style={section}>
            <Heading style={h3}>Customer Information</Heading>
            <Text style={paragraph}>
              <strong>Email:</strong> {customerEmail}
              <br />
              <strong>Wallet:</strong> {customerWallet}
              <br />
              <strong>Order Date:</strong> {orderDate}
            </Text>
          </Section>

          <Hr style={hr} />

          <Section style={section}>
            <Heading style={h3}>Transaction Details</Heading>
            <Link href={explorerUrl} style={link}>
              View Transaction on Solana Explorer →
            </Link>
          </Section>

          <Hr style={hr} />

          <Section style={section}>
            <Heading style={h3}>Required Actions</Heading>
            {isOverpayment ? (
              <Text style={paragraph}>
                • Review the overpayment amount
                <br />
                • Initiate refund process for excess amount
                <br />
                • Notify customer about the overpayment and refund
                <br />
                • Update order status in admin panel
              </Text>
            ) : (
              <Text style={paragraph}>
                • Review the underpayment amount
                <br />
                • Contact customer to resolve payment shortage
                <br />
                • Hold order from fulfillment until resolved
                <br />
                • Consider manual approval if difference is negligible
              </Text>
            )}
          </Section>

          <Section style={actionSection}>
            <Link href={`${process.env.NEXT_PUBLIC_APP_URL}/admin/collections/orders`} style={button}>
              View Order in Admin Panel
            </Link>
          </Section>

          <Section style={footer}>
            <Text style={footerText}>
              This is an automated alert from elurc-market payment monitoring system.
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
  backgroundColor: '#1f2937',
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

const alertSection = {
  padding: '32px 24px',
  textAlign: 'center' as const,
}

const alertIconStyle = {
  fontSize: '48px',
  margin: '0 0 16px',
}

const h2 = {
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

const discrepancyBox = {
  padding: '24px',
  backgroundColor: '#fef3c7',
  margin: '0 24px',
  borderRadius: '8px',
  border: '2px solid #f59e0b',
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
