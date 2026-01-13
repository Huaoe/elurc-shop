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
            status={order.status}
            createdAt={order.createdAt}
          />

          <div className="mt-8 space-y-8">
            <OrderTimeline
              status={order.status}
              createdAt={order.createdAt}
              paidAt={order.paidAt}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {order.transactionSignature && (
                  <TransactionDetails
                    signature={order.transactionSignature}
                    amountElurc={order.amountElurc}
                    amountEur={order.amountEur}
                    timestamp={order.paidAt}
                    senderWallet={order.customerWallet}
                  />
                )}

                <OrderSummary
                  items={order.items}
                  amountElurc={order.amountElurc}
                  amountEur={order.amountEur}
                />

                <ShippingInfo address={order.shippingAddress} />

                {order.statusHistory && order.statusHistory.length > 0 && (
                  <OrderStatusHistory history={order.statusHistory} />
                )}
              </div>

              <div className="lg:col-span-1">
                <OrderActions
                  orderId={order.id}
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
