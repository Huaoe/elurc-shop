'use client'

import { useEffect } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { useRouter } from 'next/navigation'

interface OrderDetailsClientProps {
  customerWallet: string
  children: React.ReactNode
}

export default function OrderDetailsClient({
  customerWallet,
  children,
}: OrderDetailsClientProps) {
  const { publicKey, connected } = useWallet()
  const router = useRouter()

  useEffect(() => {
    if (!connected) {
      router.push('/orders')
      return
    }

    if (publicKey && publicKey.toBase58() !== customerWallet) {
      router.push('/orders')
    }
  }, [connected, publicKey, customerWallet, router])

  if (!connected || !publicKey || publicKey.toBase58() !== customerWallet) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-muted-foreground">Verifying access...</p>
      </div>
    )
  }

  return <>{children}</>
}
