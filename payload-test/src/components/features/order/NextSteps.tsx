import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Mail, Package, HelpCircle } from 'lucide-react'

export default function NextSteps() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>What Happens Next?</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-3">
          <Mail className="h-5 w-5 text-primary mt-0.5 shrink-0" />
          <div>
            <p className="font-medium mb-1">Email Confirmation</p>
            <p className="text-sm text-muted-foreground">
              You&apos;ll receive an order confirmation email shortly
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Package className="h-5 w-5 text-primary mt-0.5 shrink-0" />
          <div>
            <p className="font-medium mb-1">Order Processing</p>
            <p className="text-sm text-muted-foreground">
              We&apos;ll prepare your order and ship it within 2-3 business days
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <HelpCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
          <div>
            <p className="font-medium mb-1">Need Help?</p>
            <p className="text-sm text-muted-foreground">
              Contact us at support@elurc-market.com for any questions
            </p>
          </div>
        </div>

        <div className="bg-primary/10 rounded-lg p-4 mt-4">
          <p className="text-sm font-medium text-primary">
            Save your order number for tracking and support
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
