import { Metadata } from 'next'
import OrderHistoryClient from './_components/OrderHistoryClient'

export const metadata: Metadata = {
  title: 'Order History | elurc-market',
  description: 'View your past orders and track their status',
}

export default function OrderHistoryPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Order History</h1>
      <OrderHistoryClient />
    </div>
  )
}
