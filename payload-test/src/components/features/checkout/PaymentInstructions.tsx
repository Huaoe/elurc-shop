'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Copy, Check, ExternalLink } from 'lucide-react'
import { toast } from 'sonner'

interface PaymentInstructionsProps {
  shopWalletAddress: string
  amount: number
  eurAmount: number
}

export default function PaymentInstructions({
  shopWalletAddress,
  amount,
  eurAmount,
}: PaymentInstructionsProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shopWalletAddress)
      setCopied(true)
      toast.success('Wallet address copied')
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error('Failed to copy address')
    }
  }

  const network = process.env.NEXT_PUBLIC_SOLANA_NETWORK || 'devnet'
  const explorerUrl = `https://explorer.solana.com/address/${shopWalletAddress}?cluster=${network}`

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Scan to Pay</h2>
        <p className="text-muted-foreground">
          Scan this QR code with your Phantom mobile wallet
        </p>
      </div>

      <div className="bg-card rounded-lg border p-6 space-y-4">
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-1">Amount to send</p>
          <p className="text-3xl font-bold text-primary">
            {amount.toFixed(2)} ELURC
          </p>
          <p className="text-sm text-muted-foreground">
            ≈ €{(eurAmount / 100).toFixed(2)}
          </p>
        </div>

        <div className="border-t pt-4">
          <p className="text-sm font-medium mb-2">Or copy wallet address:</p>
          <div className="flex items-center gap-2">
            <code className="flex-1 bg-muted px-3 py-2 rounded text-sm font-mono truncate">
              {shopWalletAddress}
            </code>
            <Button
              variant="outline"
              size="icon"
              onClick={handleCopy}
              aria-label="Copy wallet address"
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <a
            href={explorerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-foreground transition-colors"
          >
            Verify on Solana Explorer
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>

      <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
        <p className="text-sm text-amber-800 dark:text-amber-200">
          ⏱️ <strong>Payment timeout:</strong> Please complete payment within 10 minutes
        </p>
      </div>
    </div>
  )
}
