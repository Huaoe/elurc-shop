'use client'

import Link from 'next/link'
import { formatDistance } from 'date-fns'
import { ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import OrderStatusBadge from './OrderStatusBadge'
import { usePollingStatus } from '@/app/(frontend)/orders/[orderId]/_components/OrderDetailsWithPolling'

interface OrderDetailsHeaderProps {
  orderNumber: string
  status: 'pending' | 'paid' | 'processing' | 'fulfilled' | 'cancelled' | 'timeout'
  createdAt: number
}

export default function OrderDetailsHeader({
  orderNumber,
  status,
  createdAt,
}: OrderDetailsHeaderProps) {
  const { isPolling } = usePollingStatus()
  const orderDate = new Date(createdAt)
  const timeAgo = formatDistance(orderDate, new Date(), { addSuffix: true })

  return (
    <div className="space-y-4">
      <Button asChild variant="ghost" size="sm">
        <Link href="/orders">
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back to Orders
        </Link>
      </Button>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-mono">{orderNumber}</h1>
          <p className="text-muted-foreground mt-1">
            Placed {timeAgo} · {orderDate.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>

        <OrderStatusBadge status={status} isPolling={isPolling} />
      </div>

      <nav className="text-sm text-muted-foreground">
        <ol className="flex items-center gap-2">
          <li>
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/orders" className="hover:text-foreground">
              Orders
            </Link>
          </li>
          <li>/</li>
          <li className="text-foreground">{orderNumber}</li>
        </ol>
      </nav>
    </div>
  )
}
