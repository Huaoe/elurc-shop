import { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { getOrder } from '@/lib/db/orders'
import OrderDetailsClient from './_components/OrderDetailsClient'
import OrderDetailsWithPolling from './_components/OrderDetailsWithPolling'
import OrderDetailsHeader from '@/components/features/orders/OrderDetailsHeader'
import OrderTimeline from '@/components/features/orders/OrderTimeline'
import TransactionDetails from '@/components/features/order/TransactionDetails'
import OrderSummary from '@/components/features/order/OrderSummary'
import ShippingInfo from '@/components/features/order/ShippingInfo'
import OrderActions from '@/components/features/orders/OrderActions'
import OrderStatusHistory from '@/components/features/order/OrderStatusHistory'

interface OrderDetailsPageProps {
  params: Promise<{ orderId: string }>
}

export async function generateMetadata({
  params,
}: OrderDetailsPageProps): Promise<Metadata> {
  const { orderId } = await params
  const order = await getOrder(orderId)

  if (!order) {
    return {
      title: 'Order Not Found | elurc-market',
    }
  }

  return {
    title: `Order ${order.orderNumber} | elurc-market`,
    description: `View details for order ${order.orderNumber}`,
  }
}

export default async function OrderDetailsPage({
  params,
}: OrderDetailsPageProps) {
  const { orderId } = await params

  if (!orderId) {
    redirect('/orders')
  }

  const order = await getOrder(orderId)

  if (!order) {
    notFound()
  }

  // Map overpaid/underpaid to 'paid' for components that don't handle these statuses
  const displayStatus = (order.status === 'overpaid' || order.status === 'underpaid') 
    ? 'paid' 
    : order.status

  // Transform order items to match OrderSummary expected type
  const transformedItems = order.items.map((item) => {
    if (typeof item.product === 'number') {
      return {
        product: { id: String(item.product), name: 'Product', image: undefined },
        quantity: item.quantity,
        priceSnapshot: item.priceSnapshot,
      }
    }
    
    const firstImage = item.product.images?.[0]?.image
    const imageUrl = typeof firstImage === 'object' && firstImage !== null ? firstImage.url : undefined
    
    return {
      product: {
        id: String(item.product.id),
        name: item.product.name,
        image: imageUrl || undefined,
      },
      quantity: item.quantity,
      priceSnapshot: item.priceSnapshot,
    }
  })

  // Transform status history to match expected type
  const transformedHistory = order.statusHistory?.map((entry) => ({
    status: entry.status,
    timestamp: entry.timestamp,
    changedBy: entry.changedBy || undefined,
    reason: entry.reason || undefined,
  })) || []

  // Convert paidAt to number for OrderTimeline
  const paidAtTimestamp = order.paidAt 
    ? (typeof order.paidAt === 'string' ? new Date(order.paidAt).getTime() : order.paidAt)
    : null

  // Convert paidAt to string for TransactionDetails
  const paidAtString = order.paidAt 
    ? (typeof order.paidAt === 'string' ? order.paidAt : new Date(order.paidAt).toISOString())
    : null

  return (
    <OrderDetailsClient customerWallet={order.customerWallet}>
      <OrderDetailsWithPolling
        orderId={String(order.id)}
        initialStatus={order.status}
        orderNumber={order.orderNumber}
      >
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <OrderDetailsHeader
            orderNumber={order.orderNumber}
            status={displayStatus}
            createdAt={order.createdAt}
          />

          <div className="mt-8 space-y-8">
            <OrderTimeline
              status={displayStatus}
              createdAt={order.createdAt}
              paidAt={paidAtTimestamp}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {order.transactionSignature && (
                  <TransactionDetails
                    signature={order.transactionSignature}
                    amountElurc={order.amountElurc}
                    amountEur={order.amountEur}
                    timestamp={paidAtString}
                    senderWallet={order.customerWallet}
                  />
                )}

                <OrderSummary
                  items={transformedItems}
                  amountElurc={order.amountElurc}
                  amountEur={order.amountEur}
                />

                <ShippingInfo address={order.shippingAddress} />

                {transformedHistory.length > 0 && (
                  <OrderStatusHistory history={transformedHistory} />
                )}
              </div>

              <div className="lg:col-span-1">
                <OrderActions
                  orderId={String(order.id)}
                  orderNumber={order.orderNumber}
                  transactionSignature={order.transactionSignature}
                />
              </div>
            </div>
          </div>
        </div>
      </OrderDetailsWithPolling>
    </OrderDetailsClient>
  )
}
