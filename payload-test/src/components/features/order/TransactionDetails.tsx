'use client'

import { ExternalLink } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface TransactionDetailsProps {
  signature: string | null
  amountElurc: number
  amountEur: number
  timestamp: string | null
  senderWallet: string
}

export default function TransactionDetails({
  signature,
  amountElurc,
  amountEur,
  timestamp,
  senderWallet,
}: TransactionDetailsProps) {
  const network = process.env.NEXT_PUBLIC_SOLANA_NETWORK || 'devnet'
  const explorerUrl = signature
    ? `https://explorer.solana.com/tx/${signature}?cluster=${network}`
    : null

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Pending'
    return new Date(dateString).toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    })
  }

  const formatWallet = (wallet: string) => {
    return `${wallet.slice(0, 4)}...${wallet.slice(-4)}`
  }

  const isPaid = timestamp !== null

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isPaid ? 'Payment Received' : 'Payment Details'}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {signature && (
          <div>
            <p className="text-sm text-muted-foreground mb-1">Transaction Signature</p>
            <a
              href={explorerUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-primary hover:underline font-mono text-sm break-all"
            >
              {formatWallet(signature)}
              <ExternalLink className="h-4 w-4 shrink-0" />
            </a>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">{isPaid ? 'Amount Paid' : 'Amount Due'}</p>
            <p className="font-semibold">
              {(amountElurc / 1_000_000).toFixed(2)} ELURC
            </p>
            <p className="text-sm text-muted-foreground">
              ≈ €{(amountEur / 100).toFixed(2)}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-1">Payment Time</p>
            <p className="font-semibold">{formatDate(timestamp)}</p>
          </div>
        </div>

        <div>
          <p className="text-sm text-muted-foreground mb-1">Your Wallet</p>
          <p className="font-mono text-sm">{formatWallet(senderWallet)}</p>
        </div>
      </CardContent>
    </Card>
  )
}
