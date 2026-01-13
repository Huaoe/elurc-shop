import { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { getOrder } from '@/lib/db/orders'
import OrderSuccess from '@/components/features/order/OrderSuccess'
import TransactionDetails from '@/components/features/order/TransactionDetails'
import OrderSummary from '@/components/features/order/OrderSummary'
import ShippingInfo from '@/components/features/order/ShippingInfo'
import NextSteps from '@/components/features/order/NextSteps'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Order Confirmation | elurc-market',
  description: 'Your order has been confirmed',
}

interface OrderConfirmationPageProps {
  searchParams: Promise<{ orderId?: string; tx?: string }>
}

export default async function OrderConfirmationPage({
  searchParams,
}: OrderConfirmationPageProps) {
  const params = await searchParams
  const { orderId } = params

  if (!orderId) {
    redirect('/')
  }

  const order = await getOrder(orderId)

  if (!order) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <OrderSuccess orderNumber={order.orderNumber} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2 space-y-6">
          <TransactionDetails
            signature={order.transactionSignature}
            amountElurc={order.amountElurc}
            amountEur={order.amountEur}
            timestamp={order.paidAt}
            senderWallet={order.customerWallet}
          />

          <OrderSummary
            items={order.items}
            amountElurc={order.amountElurc}
            amountEur={order.amountEur}
          />

          <ShippingInfo address={order.shippingAddress} />
        </div>

        <div className="lg:col-span-1">
          <NextSteps />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
        <Button asChild size="lg">
          <Link href="/products">Continue Shopping</Link>
        </Button>
        {order.transactionSignature && (
          <Button asChild variant="outline" size="lg">
            <a
              href={`https://explorer.solana.com/tx/${order.transactionSignature}?cluster=${
                process.env.NEXT_PUBLIC_SOLANA_NETWORK || 'devnet'
              }`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Transaction
            </a>
          </Button>
        )}
      </div>
    </div>
  )
}
