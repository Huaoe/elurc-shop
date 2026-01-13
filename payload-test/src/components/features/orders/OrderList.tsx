import OrderCard from './OrderCard'

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

interface OrderListProps {
  orders: OrderSummary[]
}

export default function OrderList({ orders }: OrderListProps) {
  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  )
}
