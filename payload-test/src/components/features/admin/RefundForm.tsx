'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2 } from 'lucide-react'

interface RefundFormProps {
  orderId: string
  orderNumber: string
  orderAmount: number
  customerWallet: string
  onSuccess?: (data: any) => void
  onCancel?: () => void
}

export const RefundForm = ({
  orderId,
  orderNumber,
  orderAmount,
  customerWallet,
  onSuccess,
  onCancel,
}: RefundFormProps) => {
  const [refundAmount, setRefundAmount] = useState('')
  const [walletAddress, setWalletAddress] = useState(customerWallet)
  const [reason, setReason] = useState('')
  const [adminNotes, setAdminNotes] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [walletOverride, setWalletOverride] = useState(false)

  const maxRefundAmount = orderAmount / 1_000_000

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsProcessing(true)

    try {
      const refundAmountLamports = parseFloat(refundAmount) * 1_000_000

      const response = await fetch('/api/admin/refunds/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId,
          refundAmount: refundAmountLamports,
          walletAddress,
          reason,
          adminNotes,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to process refund')
      }

      if (onSuccess) {
        onSuccess(data)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process refund')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="orderNumber">Order Number</Label>
          <Input id="orderNumber" value={orderNumber} disabled />
        </div>

        <div>
          <Label htmlFor="orderAmount">Order Amount</Label>
          <Input
            id="orderAmount"
            value={`${maxRefundAmount.toFixed(2)} ELURC`}
            disabled
          />
        </div>

        <div>
          <Label htmlFor="refundAmount">
            Refund Amount (ELURC) <span className="text-red-500">*</span>
          </Label>
          <Input
            id="refundAmount"
            type="number"
            step="0.01"
            min="0.001"
            max={maxRefundAmount}
            value={refundAmount}
            onChange={(e) => setRefundAmount(e.target.value)}
            placeholder="Enter refund amount"
            required
          />
          <p className="text-sm text-muted-foreground mt-1">
            Maximum refundable: {maxRefundAmount.toFixed(2)} ELURC
          </p>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <Label htmlFor="walletAddress">
              Wallet Address <span className="text-red-500">*</span>
            </Label>
            {!walletOverride && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setWalletOverride(true)}
              >
                Override
              </Button>
            )}
          </div>
          <Input
            id="walletAddress"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            placeholder="Solana wallet address"
            disabled={!walletOverride}
            required
          />
          {walletOverride && (
            <Alert className="mt-2">
              <AlertDescription>
                ⚠️ You are overriding the customer wallet address. Please double-check the address before proceeding.
              </AlertDescription>
            </Alert>
          )}
        </div>

        <div>
          <Label htmlFor="reason">
            Refund Reason <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Enter reason for refund"
            rows={3}
            required
          />
        </div>

        <div>
          <Label htmlFor="adminNotes">Admin Notes (Internal)</Label>
          <Textarea
            id="adminNotes"
            value={adminNotes}
            onChange={(e) => setAdminNotes(e.target.value)}
            placeholder="Internal notes (not visible to customer)"
            rows={2}
          />
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex gap-3">
        <Button
          type="submit"
          disabled={isProcessing}
          className="flex-1"
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing Refund...
            </>
          ) : (
            'Process Refund'
          )}
        </Button>
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isProcessing}
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  )
}
