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
} from '@react-email/components'

interface RefundNotificationEmailProps {
  orderNumber: string
  refundAmount: number
  transactionSignature: string
  reason: string
  customerName?: string
}

export const RefundNotificationEmail = ({
  orderNumber,
  refundAmount,
  transactionSignature,
  reason,
  customerName,
}: RefundNotificationEmailProps) => {
  const refundAmountElurc = (refundAmount / 1_000_000).toFixed(2)
  const explorerUrl = `https://explorer.solana.com/tx/${transactionSignature}?cluster=devnet`

  return (
    <Html>
      <Head />
      <Preview>Refund processed for order {orderNumber}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Refund Processed</Heading>
          
          {customerName && (
            <Text style={text}>Hello {customerName},</Text>
          )}
          
          <Text style={text}>
            We have processed a refund for your order <strong>{orderNumber}</strong>.
          </Text>

          <Section style={infoSection}>
            <Text style={infoLabel}>Refund Amount:</Text>
            <Text style={infoValue}>{refundAmountElurc} ELURC</Text>
            
            <Text style={infoLabel}>Reason:</Text>
            <Text style={infoValue}>{reason}</Text>
            
            <Text style={infoLabel}>Transaction Signature:</Text>
            <Text style={infoValueSmall}>{transactionSignature}</Text>
          </Section>

          <Text style={text}>
            The refund has been sent to your wallet. You can view the transaction on Solana Explorer:
          </Text>

          <Section style={buttonSection}>
            <Link href={explorerUrl} style={button}>
              View Transaction
            </Link>
          </Section>

          <Text style={text}>
            The refund should appear in your wallet within a few minutes. If you have any questions or concerns, please contact our support team.
          </Text>

          <Text style={footer}>
            Thank you for shopping with ELURC Market
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export default RefundNotificationEmail

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

const h1 = {
  color: '#333',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0',
  padding: '0 40px',
}

const text = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '16px 0',
  padding: '0 40px',
}

const infoSection = {
  backgroundColor: '#f4f4f4',
  borderRadius: '8px',
  margin: '24px 40px',
  padding: '24px',
}

const infoLabel = {
  color: '#666',
  fontSize: '14px',
  fontWeight: 'bold',
  margin: '8px 0 4px 0',
}

const infoValue = {
  color: '#333',
  fontSize: '16px',
  margin: '0 0 16px 0',
}

const infoValueSmall = {
  color: '#333',
  fontSize: '12px',
  margin: '0 0 16px 0',
  wordBreak: 'break-all' as const,
}

const buttonSection = {
  margin: '32px 40px',
  textAlign: 'center' as const,
}

const button = {
  backgroundColor: '#5469d4',
  borderRadius: '4px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 24px',
}

const footer = {
  color: '#8898aa',
  fontSize: '14px',
  lineHeight: '24px',
  margin: '32px 0',
  padding: '0 40px',
  textAlign: 'center' as const,
}
