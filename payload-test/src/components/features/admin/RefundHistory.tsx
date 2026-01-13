'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ExternalLink, Loader2 } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface Refund {
  id: string
  refundNumber: string
  status: string
  amount: number
  walletAddress: string
  reason: string
  transactionSignature?: string
  createdAt: string
  completedAt?: string
}

interface RefundHistoryProps {
  orderId: string
}

export const RefundHistory = ({ orderId }: RefundHistoryProps) => {
  const [refunds, setRefunds] = useState<Refund[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRefunds = async () => {
      try {
        const response = await fetch(`/api/admin/refunds/history?orderId=${orderId}`)
        
        if (!response.ok) {
          throw new Error('Failed to fetch refund history')
        }

        const data = await response.json()
        setRefunds(data.refunds || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load refund history')
      } finally {
        setIsLoading(false)
      }
    }

    fetchRefunds()
  }, [orderId])

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
      completed: 'default',
      processing: 'secondary',
      failed: 'destructive',
      pending: 'outline',
    }

    return (
      <Badge variant={variants[status] || 'outline'}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const getExplorerUrl = (signature: string) => {
    const network = process.env.NEXT_PUBLIC_SOLANA_NETWORK || 'devnet'
    return `https://explorer.solana.com/tx/${signature}?cluster=${network}`
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin" />
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  if (refunds.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-muted-foreground">
          No refunds found for this order
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Refund History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {refunds.map((refund) => (
            <div
              key={refund.id}
              className="border rounded-lg p-4 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{refund.refundNumber}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(refund.createdAt).toLocaleString()}
                  </p>
                </div>
                {getStatusBadge(refund.status)}
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Amount:</span>
                  <p className="font-mono">
                    {(refund.amount / 1_000_000).toFixed(2)} ELURC
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Wallet:</span>
                  <p className="font-mono text-xs">
                    {refund.walletAddress.slice(0, 8)}...
                    {refund.walletAddress.slice(-8)}
                  </p>
                </div>
              </div>

              <div>
                <span className="text-sm text-muted-foreground">Reason:</span>
                <p className="text-sm">{refund.reason}</p>
              </div>

              {refund.transactionSignature && (
                <div>
                  <a
                    href={getExplorerUrl(refund.transactionSignature)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                  >
                    View Transaction
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
