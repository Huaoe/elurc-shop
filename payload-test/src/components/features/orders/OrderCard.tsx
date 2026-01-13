import Link from 'next/link'
import { formatDistance } from 'date-fns'
import OrderStatusBadge from './OrderStatusBadge'
import { Card, CardContent } from '@/components/ui/card'
import { ChevronRight } from 'lucide-react'

interface OrderSummary {
  id: string
  orderNumber: string
  status: 'pending' | 'paid' | 'processing' | 'fulfilled' | 'cancelled' | 'timeout'
  amountElurc: number
  amountEur: number
  itemCount: number
  createdAt: string
  paidAt: string | null
}

interface OrderCardProps {
  order: OrderSummary
}

export default function OrderCard({ order }: OrderCardProps) {
  const orderDate = new Date(order.createdAt)
  const timeAgo = formatDistance(orderDate, new Date(), { addSuffix: true })

  return (
    <Link href={`/orders/${order.id}`}>
      <Card className="hover:shadow-md transition-shadow cursor-pointer">
        <CardContent className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-3">
                <h3 className="font-semibold text-lg font-mono">
                  {order.orderNumber}
                </h3>
                <OrderStatusBadge status={order.status} />
              </div>
              
              <div className="text-sm text-muted-foreground">
                <p>{timeAgo}</p>
                <p>{order.itemCount} {order.itemCount === 1 ? 'item' : 'items'}</p>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-primary">
                  {(order.amountElurc / 1000000).toFixed(2)} ELURC
                </span>
                <span className="text-sm text-muted-foreground">
                  ≈ €{(order.amountEur / 100).toFixed(2)}
                </span>
              </div>
            </div>

            <ChevronRight className="h-5 w-5 text-muted-foreground mt-1" />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
