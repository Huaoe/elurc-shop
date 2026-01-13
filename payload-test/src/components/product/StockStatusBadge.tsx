import { Badge } from "@/components/ui/badge"

interface StockStatusBadgeProps {
  inStock: boolean
  stock?: number
  lowStockThreshold?: number
}

export const StockStatusBadge = ({
  inStock,
  stock = 0,
  lowStockThreshold = 5,
}: StockStatusBadgeProps) => {
  if (!inStock || stock === 0) {
    return (
      <Badge variant="destructive" aria-label="Out of stock">
        Out of Stock
      </Badge>
    )
  }

  if (stock <= lowStockThreshold) {
    return (
      <Badge
        variant="outline"
        className="border-warning text-warning"
        aria-label={`Low stock: ${stock} remaining`}
      >
        Low Stock ({stock})
      </Badge>
    )
  }

  return (
    <Badge variant="outline" className="border-success text-success" aria-label="In stock">
      In Stock
    </Badge>
  )
}
