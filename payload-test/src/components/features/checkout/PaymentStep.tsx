'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ShippingFormData } from '@/lib/validation/checkout'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { useCartStore } from '@/store/cart'
import { useWallet } from '@solana/wallet-adapter-react'
import { generatePaymentURI } from '@/lib/utils/solana-pay'
import { usePaymentMonitoring } from '@/hooks/usePaymentMonitoring'
import PaymentQRCode from './PaymentQRCode'
import PaymentInstructions from './PaymentInstructions'
import PaymentStatus from './PaymentStatus'
import { toast } from 'sonner'

interface PaymentStepProps {
  shippingData: ShippingFormData | null
  onBack: () => void
}

export default function PaymentStep({ shippingData, onBack }: PaymentStepProps) {
  const router = useRouter()
  const { publicKey } = useWallet()
  const { items, getCartTotal, clearCart } = useCartStore()
  const cartTotal = getCartTotal()
  const [qrSize, setQrSize] = useState(200)
  const [orderId, setOrderId] = useState<string | null>(null)
  const [isCreatingOrder, setIsCreatingOrder] = useState(false)
  
  useEffect(() => {
    const updateSize = () => {
      setQrSize(window.innerWidth < 768 ? 200 : 300)
    }
    
    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  useEffect(() => {
    async function initOrder() {
      if (!publicKey || !shippingData || orderId || isCreatingOrder) return

      setIsCreatingOrder(true)
      try {
        const response = await fetch('/api/orders/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            items: items.map(item => ({
              product: item.product.id,
              quantity: item.quantity,
              priceSnapshot: {
                elurc: item.priceSnapshot.elurc,
                eur: item.priceSnapshot.eur,
              },
            })),
            total: cartTotal,
            customerWallet: publicKey.toBase58(),
            customerEmail: shippingData.email,
            shippingAddress: {
              fullName: shippingData.fullName,
              streetAddress: shippingData.streetAddress,
              city: shippingData.city,
              postalCode: shippingData.postalCode,
              phoneNumber: shippingData.phoneNumber,
            },
          }),
        })

        if (!response.ok) {
          throw new Error('Failed to create order')
        }

        const order = await response.json()
        setOrderId(String(order.id))
      } catch (error) {
        console.error('Failed to create order:', error)
        toast.error('Failed to create order. Please try again.')
      } finally {
        setIsCreatingOrder(false)
      }
    }

    initOrder()
  }, [publicKey, shippingData, items, cartTotal, orderId, isCreatingOrder])

  const { status, transactionSignature, message } = usePaymentMonitoring({
    orderId: orderId || '',
    enabled: !!orderId,
    onConfirmed: (signature) => {
      toast.success('Payment confirmed!')
      clearCart()
      router.push(`/order-confirmation?orderId=${orderId}&tx=${signature}`)
    },
    onTimeout: () => {
      toast.error('Payment timeout. Please try again.')
    },
    onError: (error) => {
      toast.error(error)
    },
  })
  
  const shopWalletAddress = process.env.NEXT_PUBLIC_SHOP_WALLET_ADDRESS || ''
  const elurTokenAddress = process.env.NEXT_PUBLIC_ELURC_TOKEN_ADDRESS || ''
  
  const paymentURI = generatePaymentURI({
    recipient: shopWalletAddress,
    amount: cartTotal.elurc / 1_000_000,
    splToken: elurTokenAddress,
    label: 'elurc-market',
    message: `Order ${orderId || 'payment'}`,
  })

  if (isCreatingOrder || !orderId) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Creating your order...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="bg-muted/50 rounded-lg p-4">
        <h3 className="font-semibold mb-2">Shipping To:</h3>
        {shippingData && (
          <div className="text-sm text-muted-foreground space-y-1">
            <p>{shippingData.fullName}</p>
            <p>{shippingData.email}</p>
            <p>{shippingData.streetAddress}</p>
            <p>{shippingData.city}, {shippingData.postalCode}</p>
            <p>{shippingData.phoneNumber}</p>
          </div>
        )}
      </div>

      <div className="bg-card rounded-lg border p-6 md:p-8">
        <PaymentQRCode 
          paymentURI={paymentURI} 
          size={qrSize} 
        />
        
        <div className="mt-6">
          <PaymentInstructions
            shopWalletAddress={shopWalletAddress}
            amount={cartTotal.elurc / 1_000_000}
            eurAmount={cartTotal.eur}
          />
        </div>
      </div>

      <PaymentStatus
        status={status}
        message={message}
        transactionSignature={transactionSignature}
      />

      {status === 'pending' && (
        <div className="flex gap-4">
          <Button type="button" variant="outline" onClick={onBack} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>
      )}
    </div>
  )
}
