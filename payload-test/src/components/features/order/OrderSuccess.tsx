'use client'

import { useState } from 'react'
import { CheckCircle, Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

interface OrderSuccessProps {
  orderNumber: string
}

export default function OrderSuccess({ orderNumber }: OrderSuccessProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(orderNumber)
      setCopied(true)
      toast.success('Order number copied')
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error('Failed to copy order number')
    }
  }

  return (
    <div className="text-center space-y-4">
      <div className="flex justify-center">
        <CheckCircle className="h-20 w-20 text-green-500" />
      </div>
      
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">
          Payment Received!
        </h1>
        <p className="text-xl text-muted-foreground">
          Thank you for your order
        </p>
      </div>

      <div className="bg-muted/50 rounded-lg p-6 inline-block">
        <p className="text-sm text-muted-foreground mb-2">Order Number</p>
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold font-mono">
            #{orderNumber}
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCopy}
            aria-label="Copy order number"
          >
            {copied ? (
              <Check className="h-5 w-5 text-green-500" />
            ) : (
              <Copy className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
