import { Metadata } from 'next'
import CheckoutFlow from '@/components/features/checkout/CheckoutFlow'

export const metadata: Metadata = {
  title: 'Checkout | elurc-market',
  description: 'Complete your purchase with ELURC cryptocurrency',
}

export default function CheckoutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <CheckoutFlow />
    </div>
  )
}
