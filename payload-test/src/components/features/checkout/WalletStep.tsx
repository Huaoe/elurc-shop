'use client'

import { useWallet } from '@solana/wallet-adapter-react'
import { useEffect } from 'react'
import WalletButton from '@/components/features/wallet/WalletButton'
import ConnectedWallet from '@/components/features/wallet/ConnectedWallet'
import { CheckCircle2 } from 'lucide-react'

interface WalletStepProps {
  onConnected: () => void
}

export default function WalletStep({ onConnected }: WalletStepProps) {
  const { connected } = useWallet()

  useEffect(() => {
    if (connected) {
      const timer = setTimeout(() => {
        onConnected()
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [connected, onConnected])

  return (
    <div className="bg-card rounded-lg border p-6 md:p-8">
      <h2 className="text-2xl font-bold mb-6">Connect Your Wallet</h2>
      
      {!connected ? (
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Connect your Phantom wallet to proceed with checkout. Your wallet will be used to complete the payment.
          </p>
          <div className="flex justify-center py-8">
            <WalletButton />
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-green-600 dark:text-green-500">
            <CheckCircle2 className="h-6 w-6" />
            <p className="font-medium">Wallet Connected Successfully</p>
          </div>
          <div className="flex justify-center py-4">
            <ConnectedWallet />
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Proceeding to shipping address...
          </p>
        </div>
      )}
    </div>
  )
}
