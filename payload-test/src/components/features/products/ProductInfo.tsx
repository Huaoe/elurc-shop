import { Badge } from '@/components/ui/badge'
import { Product } from '@/types/product'

interface ProductInfoProps {
  product: Product
}

function formatElurPrice(lamports: number): string {
  return (lamports / 1000000).toFixed(2)
}

function formatEurPrice(cents: number): string {
  return `€${(cents / 100).toFixed(2)}`
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const stockStatus = product.in_stock
    ? product.stock < 10
      ? 'Low Stock'
      : 'In Stock'
    : 'Out of Stock'

  const stockVariant: 'default' | 'destructive' | 'secondary' = product.in_stock
    ? product.stock < 10
      ? 'secondary'
      : 'default'
    : 'destructive'

  return (
    <div className="mt-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
        <p className="text-muted-foreground">
          {typeof product.category === 'object' ? product.category.name : 'Uncategorized'}
        </p>
      </div>

      <div className="space-y-1">
        <p className="text-4xl font-bold text-primary">
          {formatElurPrice(product.price_elurc)} ELURC
        </p>
        <p className="text-xl text-muted-foreground">
          {formatEurPrice(product.price_eur)}
        </p>
      </div>

      <Badge variant={stockVariant}>
        {product.in_stock && '✓ '}
        {stockStatus}
      </Badge>

      {product.description && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p className="text-muted-foreground whitespace-pre-wrap">
            {product.description}
          </p>
        </div>
      )}

      <div>
        <h2 className="text-xl font-semibold mb-2">Details</h2>
        <ul className="space-y-1 text-muted-foreground">
          <li>• Category: {typeof product.category === 'object' ? product.category.name : 'N/A'}</li>
          <li>• Stock: {product.stock} available</li>
        </ul>
      </div>
    </div>
  )
}
