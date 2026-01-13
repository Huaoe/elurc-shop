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

interface ShippingConfirmationEmailProps {
  orderNumber: string
  trackingNumber?: string
  customerName: string
}

export const ShippingConfirmationEmail = ({
  orderNumber,
  trackingNumber,
  customerName,
}: ShippingConfirmationEmailProps) => (
  <Html>
    <Head />
    <Preview>Your order {orderNumber} has been shipped!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Order Shipped! 📦</Heading>
        <Text style={text}>Hi {customerName},</Text>
        <Text style={text}>
          Great news! Your order <strong>{orderNumber}</strong> has been shipped and is on its way to you.
        </Text>
        {trackingNumber && (
          <Section style={trackingSection}>
            <Text style={trackingLabel}>Tracking Number:</Text>
            <Text style={trackingNumber}>{trackingNumber}</Text>
          </Section>
        )}
        <Text style={text}>
          You should receive your order within 3-7 business days depending on your location.
        </Text>
        <Text style={text}>
          If you have any questions about your order, please don't hesitate to contact us.
        </Text>
        <Text style={footer}>
          Thank you for shopping with ELURC Market!
        </Text>
      </Container>
    </Body>
  </Html>
)

export default ShippingConfirmationEmail

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
}

const h1 = {
  color: '#333',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0',
  padding: '0',
  textAlign: 'center' as const,
}

const text = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '16px 0',
  padding: '0 40px',
}

const trackingSection = {
  backgroundColor: '#f4f4f5',
  borderRadius: '8px',
  margin: '24px 40px',
  padding: '16px',
}

const trackingLabel = {
  color: '#666',
  fontSize: '14px',
  fontWeight: 'bold',
  margin: '0 0 8px 0',
}

const trackingNumber = {
  color: '#333',
  fontSize: '18px',
  fontFamily: 'monospace',
  fontWeight: 'bold',
  margin: '0',
}

const footer = {
  color: '#8898aa',
  fontSize: '14px',
  lineHeight: '24px',
  margin: '32px 0',
  padding: '0 40px',
  textAlign: 'center' as const,
}
