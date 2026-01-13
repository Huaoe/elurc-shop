interface Order {
  status: string
  createdAt: string
  paidAt?: string
  fulfilledAt?: string
}

interface DeliveryEstimate {
  estimatedDate: string | null
  deliveryWindow: string | null
  daysRemaining: number | null
}

const PROCESSING_DAYS = 1
const SHIPPING_DAYS_MIN = 2
const SHIPPING_DAYS_MAX = 3

export function calculateDeliveryEstimate(order: Order): DeliveryEstimate {
  if (order.status === 'fulfilled' || order.status === 'cancelled' || order.status === 'timeout') {
    return {
      estimatedDate: null,
      deliveryWindow: null,
      daysRemaining: null,
    }
  }

  const now = new Date()
  const startDate = order.paidAt ? new Date(order.paidAt) : new Date(order.createdAt)

  const minDate = new Date(startDate)
  minDate.setDate(minDate.getDate() + PROCESSING_DAYS + SHIPPING_DAYS_MIN)

  const maxDate = new Date(startDate)
  maxDate.setDate(maxDate.getDate() + PROCESSING_DAYS + SHIPPING_DAYS_MAX)

  const daysRemaining = Math.max(0, Math.ceil((maxDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)))

  return {
    estimatedDate: maxDate.toISOString(),
    deliveryWindow: `${SHIPPING_DAYS_MIN}-${SHIPPING_DAYS_MAX} business days`,
    daysRemaining,
  }
}

export function formatDeliveryEstimate(estimate: DeliveryEstimate): string {
  if (!estimate.estimatedDate) {
    return 'N/A'
  }

  const date = new Date(estimate.estimatedDate)
  const formatted = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  if (estimate.daysRemaining !== null && estimate.daysRemaining > 0) {
    return `${formatted} (${estimate.daysRemaining} days)`
  }

  return formatted
}

export function getDeliveryStatus(order: Order): {
  label: string
  variant: 'default' | 'secondary' | 'destructive' | 'outline'
} {
  switch (order.status) {
    case 'pending':
      return { label: 'Awaiting Payment', variant: 'secondary' }
    case 'paid':
      return { label: 'Payment Confirmed', variant: 'default' }
    case 'processing':
      return { label: 'Processing', variant: 'default' }
    case 'fulfilled':
      return { label: 'Delivered', variant: 'default' }
    case 'cancelled':
      return { label: 'Cancelled', variant: 'destructive' }
    case 'timeout':
      return { label: 'Payment Timeout', variant: 'destructive' }
    default:
      return { label: 'Unknown', variant: 'outline' }
  }
}
