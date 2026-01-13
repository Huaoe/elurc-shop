'use client'

import { useState } from 'react'
import { useOrderStatusPolling } from '@/hooks/useOrderStatusPolling'
import OrderStatusNotification from '@/components/features/order/OrderStatusNotification'

interface OrderDetailsWithPollingProps {
  orderId: string
  initialStatus: string
  orderNumber: string
  children: React.ReactNode
}

export default function OrderDetailsWithPolling({
  orderId,
  initialStatus,
  orderNumber,
  children,
}: OrderDetailsWithPollingProps) {
  const [notification, setNotification] = useState<{
    newStatus: string
    oldStatus: string
  } | null>(null)

  const { status: _status, isPolling } = useOrderStatusPolling({
    orderId,
    initialStatus,
    enabled: true,
    interval: 30000,
    onStatusChange: (newStatus, oldStatus) => {
      setNotification({ newStatus, oldStatus })
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    },
  })

  return (
    <>
      {notification && (
        <OrderStatusNotification
          newStatus={notification.newStatus}
          oldStatus={notification.oldStatus}
          orderNumber={orderNumber}
          onDismiss={() => setNotification(null)}
        />
      )}

      {isPolling && (
        <div className="fixed bottom-4 right-4 text-xs text-muted-foreground bg-background/80 backdrop-blur-sm px-3 py-2 rounded-md border">
          Checking for updates...
        </div>
      )}

      {children}
    </>
  )
}
