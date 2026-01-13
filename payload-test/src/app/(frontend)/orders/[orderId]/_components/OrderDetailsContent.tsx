'use client'

import { useOrderStatusPolling } from '@/hooks/useOrderStatusPolling'
import OrderDetailsHeader from '@/components/features/orders/OrderDetailsHeader'
import OrderTimeline from '@/components/features/orders/OrderTimeline'
import TransactionDetails from '@/components/features/order/TransactionDetails'
import OrderSummary from '@/components/features/order/OrderSummary'
import ShippingInfo from '@/components/features/order/ShippingInfo'
import OrderActions from '@/components/features/orders/OrderActions'
import OrderStatusHistory from '@/components/features/order/OrderStatusHistory'

interface OrderDetailsContentProps {
  orderId: string
  orderNumber: string
  status: string
  createdAt: number
  paidAtTimestamp: number | null
  paidAtString: string | null
  transactionSignature: string | null
  amountElurc: number
  amountEur: number
  customerWallet: string
  transformedItems: Array<{
    product: { id: string; name: string; image?: string }
    quantity: number
    priceSnapshot: number
  }>
  shippingAddress: any
  transformedHistory: Array<{
    status: string
    timestamp: number
    changedBy?: string
    reason?: string
  }>
}

export default function OrderDetailsContent({
  orderId,
  orderNumber,
  status,
  createdAt,
  paidAtTimestamp,
  paidAtString,
  transactionSignature,
  amountElurc,
  amountEur,
  customerWallet,
  transformedItems,
  shippingAddress,
  transformedHistory,
}: OrderDetailsContentProps) {
  const { isPolling } = useOrderStatusPolling({
    orderId,
    initialStatus: status,
    enabled: true,
    interval: 30000,
  })

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <OrderDetailsHeader
        orderNumber={orderNumber}
        status={status as any}
        createdAt={createdAt}
        isPolling={isPolling}
      />

      <div className="mt-8 space-y-8">
        <OrderTimeline
          status={status as any}
          createdAt={createdAt}
          paidAt={paidAtTimestamp}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {transactionSignature && (
              <TransactionDetails
                signature={transactionSignature}
                amountElurc={amountElurc}
                amountEur={amountEur}
                timestamp={paidAtString}
                senderWallet={customerWallet}
              />
            )}

            <OrderSummary
              items={transformedItems}
              amountElurc={amountElurc}
              amountEur={amountEur}
            />

            <ShippingInfo address={shippingAddress} />

            {transformedHistory.length > 0 && (
              <OrderStatusHistory history={transformedHistory} />
            )}
          </div>

          <div className="lg:col-span-1">
            <OrderActions
              orderId={orderId}
              orderNumber={orderNumber}
              transactionSignature={transactionSignature}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
