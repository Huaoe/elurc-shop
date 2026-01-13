'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useWallet } from '@solana/wallet-adapter-react'
import { useCartStore } from '@/store/cart'
import { useCheckoutStore } from '@/store/checkout'
import ProgressIndicator from './ProgressIndicator'
import WalletStep from './WalletStep'
import ShippingStep from './ShippingStep'
import PaymentStep from './PaymentStep'
import OrderSummary from './OrderSummary'
import { ShippingFormData } from '@/lib/validation/checkout'

export default function CheckoutFlow() {
  const router = useRouter()
  const { items, getCartTotal } = useCartStore()
  const { connected } = useWallet()
  const {
    currentStep,
    shippingData,
    setCurrentStep,
    setShippingData,
    previousStep,
  } = useCheckoutStore()

  const [localStep, setLocalStep] = useState(currentStep)
  const cartTotal = getCartTotal()

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      router.push('/cart')
    }
  }, [items, router])

  // Auto-advance from step 1 if wallet already connected
  useEffect(() => {
    if (localStep === 1 && connected) {
      const timer = setTimeout(() => {
        setLocalStep(2)
        setCurrentStep(2)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [localStep, connected, setCurrentStep])

  const handleWalletConnected = () => {
    setLocalStep(2)
    setCurrentStep(2)
  }

  const handleShippingSubmit = (data: ShippingFormData) => {
    setShippingData(data)
    setLocalStep(3)
    setCurrentStep(3)
  }

  const handleBack = () => {
    if (localStep > 1) {
      const newStep = localStep - 1
      setLocalStep(newStep)
      setCurrentStep(newStep)
      previousStep()
    }
  }

  if (items.length === 0) {
    return null // Will redirect
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <ProgressIndicator currentStep={localStep} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2">
          {localStep === 1 && (
            <WalletStep onConnected={handleWalletConnected} />
          )}
          {localStep === 2 && (
            <ShippingStep 
              initialData={shippingData}
              onSubmit={handleShippingSubmit}
              onBack={handleBack}
            />
          )}
          {localStep === 3 && (
            <PaymentStep 
              shippingData={shippingData}
              onBack={handleBack}
            />
          )}
        </div>

        <div className="lg:col-span-1">
          <OrderSummary items={items} total={cartTotal} />
        </div>
      </div>
    </div>
  )
}
