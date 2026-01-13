'use client'

import { Loader2, CheckCircle, XCircle, Clock } from 'lucide-react'

interface PaymentStatusProps {
  status: 'pending' | 'confirmed' | 'timeout' | 'error'
  message?: string
  transactionSignature?: string
}

export default function PaymentStatus({
  status,
  message,
  transactionSignature,
}: PaymentStatusProps) {
  if (status === 'pending') {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <h3 className="text-lg font-semibold mb-2">Waiting for Payment</h3>
        <p className="text-sm text-muted-foreground text-center">
          Checking blockchain for your transaction...
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          This usually takes less than a minute
        </p>
      </div>
    )
  }

  if (status === 'confirmed') {
    const explorerUrl = `https://explorer.solana.com/tx/${transactionSignature}?cluster=${
      process.env.NEXT_PUBLIC_SOLANA_NETWORK || 'devnet'
    }`

    return (
      <div className="flex flex-col items-center justify-center py-8">
        <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
        <h3 className="text-lg font-semibold mb-2">Payment Confirmed!</h3>
        <p className="text-sm text-muted-foreground text-center mb-4">
          Your order has been confirmed
        </p>
        {transactionSignature && (
          <a
            href={explorerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:underline"
          >
            View transaction on Solana Explorer
          </a>
        )}
      </div>
    )
  }

  if (status === 'timeout') {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <Clock className="h-12 w-12 text-amber-500 mb-4" />
        <h3 className="text-lg font-semibold mb-2">Payment Timeout</h3>
        <p className="text-sm text-muted-foreground text-center">
          {message || 'Payment window has expired. Please try again.'}
        </p>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <XCircle className="h-12 w-12 text-destructive mb-4" />
        <h3 className="text-lg font-semibold mb-2">Error</h3>
        <p className="text-sm text-muted-foreground text-center">
          {message || 'Failed to check payment status. Please try again.'}
        </p>
      </div>
    )
  }

  return null
}
