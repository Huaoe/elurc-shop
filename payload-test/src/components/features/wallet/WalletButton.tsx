'use client'

import { useWallet } from '@solana/wallet-adapter-react'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'
import { Button } from '@/components/ui/button'
import { Wallet } from 'lucide-react'

export default function WalletButton() {
  const { connecting } = useWallet()
  const { setVisible } = useWalletModal()

  const handleClick = () => {
    setVisible(true)
  }

  return (
    <Button
      size="lg"
      disabled={connecting}
      onClick={handleClick}
      className="gap-2 min-h-[44px] min-w-[44px]"
    >
      <Wallet className="h-5 w-5" />
      <span className="hidden sm:inline">
        {connecting ? 'Connecting...' : 'Connect Wallet'}
      </span>
    </Button>
  )
}
