'use client'

import { useEffect, useState } from 'react'
import { CheckCircle, Package, Truck, XCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

interface OrderStatusNotificationProps {
  newStatus: string
  oldStatus: string
  orderNumber: string
  onDismiss?: () => void
}

const statusMessages = {
  paid: {
    icon: CheckCircle,
    title: 'Payment Confirmed',
    description: 'Your payment has been received and confirmed.',
    variant: 'default' as const,
  },
  processing: {
    icon: Package,
    title: 'Order Processing',
    description: "We're preparing your order for shipment.",
    variant: 'default' as const,
  },
  fulfilled: {
    icon: Truck,
    title: 'Order Shipped',
    description: 'Your order is on its way!',
    variant: 'default' as const,
  },
  cancelled: {
    icon: XCircle,
    title: 'Order Cancelled',
    description: 'This order has been cancelled.',
    variant: 'destructive' as const,
  },
}

export default function OrderStatusNotification({
  newStatus,
  oldStatus: _oldStatus,
  orderNumber,
  onDismiss,
}: OrderStatusNotificationProps) {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false)
      onDismiss?.()
    }, 5000)

    return () => clearTimeout(timer)
  }, [onDismiss])

  if (!show || !statusMessages[newStatus as keyof typeof statusMessages]) {
    return null
  }

  const config = statusMessages[newStatus as keyof typeof statusMessages]
  const Icon = config.icon

  return (
    <div className="fixed top-4 right-4 z-50 max-w-md animate-in slide-in-from-top">
      <Alert variant={config.variant}>
        <Icon className="h-4 w-4" />
        <AlertTitle>{config.title}</AlertTitle>
        <AlertDescription>
          {config.description}
          <br />
          <span className="text-sm font-mono">{orderNumber}</span>
        </AlertDescription>
      </Alert>
    </div>
  )
}
