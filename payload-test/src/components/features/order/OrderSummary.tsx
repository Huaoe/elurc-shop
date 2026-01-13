import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

interface OrderItem {
  product: {
    id: string
    name: string
    image?: string
  }
  quantity: number
  priceSnapshot: {
    elurc: number
    eur: number
  }
}

interface OrderSummaryProps {
  items: OrderItem[]
  amountElurc: number
  amountEur: number
}

export default function OrderSummary({
  items,
  amountElurc,
  amountEur,
}: OrderSummaryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {items.map((item, index) => (
            <div key={index} className="flex justify-between items-start">
              <div className="flex-1">
                <p className="font-medium">{item.product.name}</p>
                <p className="text-sm text-muted-foreground">
                  Quantity: {item.quantity}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold">
                  {((item.priceSnapshot.elurc * item.quantity) / 1_000_000).toFixed(2)} ELURC
                </p>
                <p className="text-sm text-muted-foreground">
                  €{((item.priceSnapshot.eur * item.quantity) / 100).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <Separator />

        <div className="flex justify-between items-center">
          <p className="text-lg font-bold">Total</p>
          <div className="text-right">
            <p className="text-lg font-bold">
              {(amountElurc / 1_000_000).toFixed(2)} ELURC
            </p>
            <p className="text-sm text-muted-foreground">
              €{(amountEur / 100).toFixed(2)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
