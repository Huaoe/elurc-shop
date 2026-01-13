import { CartItem } from '@/types/cart'

interface OrderSummaryProps {
  items: CartItem[]
  total: { elurc: number; eur: number }
}

function formatElurPrice(lamports: number): string {
  return (lamports / 1000000).toFixed(2)
}

function formatEurPrice(cents: number): string {
  return `€${(cents / 100).toFixed(2)}`
}

export default function OrderSummary({ items, total }: OrderSummaryProps) {
  return (
    <div className="bg-card rounded-lg border p-6 lg:sticky lg:top-4">
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>
      
      <div className="space-y-3 mb-4">
        {items.map((item) => (
          <div key={item.product.id} className="flex justify-between text-sm">
            <div className="flex-1">
              <p className="font-medium">{item.product.name}</p>
              <p className="text-muted-foreground">Qty: {item.quantity}</p>
            </div>
            <div className="text-right">
              <p className="font-medium">{formatElurPrice(item.priceSnapshot.elurc * item.quantity)} ELURC</p>
              <p className="text-muted-foreground text-xs">
                {formatEurPrice(item.priceSnapshot.eur * item.quantity)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t pt-4">
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <div className="text-right">
            <p className="text-primary">{formatElurPrice(total.elurc)} ELURC</p>
            <p className="text-sm text-muted-foreground font-normal">
              {formatEurPrice(total.eur)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
