'use client'

import { useEffect, useState } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import OrderList from '@/components/features/orders/OrderList'
import EmptyOrdersState from '@/components/features/orders/EmptyOrdersState'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

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

export default function OrderHistoryClient() {
  const { publicKey, connected } = useWallet()
  const [orders, setOrders] = useState<OrderSummary[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchOrders = async () => {
      if (!connected || !publicKey) {
        setOrders([])
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)

        const response = await fetch(
          `/api/orders/history?wallet=${publicKey.toBase58()}`
        )

        if (!response.ok) {
          throw new Error('Failed to fetch orders')
        }

        const data = await response.json()
        setOrders(data.orders)
      } catch (err) {
        console.error('Error fetching orders:', err)
        setError('Failed to load order history')
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [connected, publicKey])

  if (!connected) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">
          Please connect your wallet to view your order history
        </p>
        <Button asChild>
          <Link href="/">Connect Wallet</Link>
        </Button>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-32 bg-muted animate-pulse rounded-lg"
          />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive mb-4">{error}</p>
        <Button onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
    )
  }

  if (orders.length === 0) {
    return <EmptyOrdersState />
  }

  return <OrderList orders={orders} />
}
