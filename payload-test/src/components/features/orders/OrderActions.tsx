'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ExternalLink, Mail, Printer } from 'lucide-react'

interface OrderActionsProps {
  orderId: string
  orderNumber: string
  transactionSignature: string | null
}

export default function OrderActions({
  orderId,
  orderNumber,
  transactionSignature,
}: OrderActionsProps) {
  const handlePrint = () => {
    window.print()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {transactionSignature && (
          <Button asChild variant="outline" className="w-full">
            <a
              href={`https://explorer.solana.com/tx/${transactionSignature}?cluster=${
                process.env.NEXT_PUBLIC_SOLANA_NETWORK || 'devnet'
              }`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              View Transaction
            </a>
          </Button>
        )}

        <Button asChild variant="outline" className="w-full">
          <a href="mailto:support@elurc-market.com">
            <Mail className="h-4 w-4 mr-2" />
            Contact Support
          </a>
        </Button>

        <Button variant="outline" className="w-full" onClick={handlePrint}>
          <Printer className="h-4 w-4 mr-2" />
          Print Order
        </Button>
      </CardContent>
    </Card>
  )
}
