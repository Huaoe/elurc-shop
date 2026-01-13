'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { Product } from '@/types/product'
import { useCart } from '@/hooks/useCart'

interface ProductCardProps {
  product: Product
}

function formatElurPrice(lamports: number): string {
  return (lamports / 1000000).toFixed(2)
}

function formatEurPrice(cents: number): string {
  return `€${(cents / 100).toFixed(2)}`
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!product.in_stock) return
    
    try {
      addItem(product, 1)
      toast.success(`${product.name} added to cart`)
    } catch {
      toast.error('Failed to add to cart')
    }
  }

  const stockStatus = product.in_stock
    ? product.stock < 10
      ? 'Low Stock'
      : 'In Stock'
    : 'Out of Stock'

  const stockVariant: 'default' | 'destructive' | 'outline' | 'secondary' = product.in_stock
    ? product.stock < 10
      ? 'secondary'
      : 'default'
    : 'destructive'

  const imageUrl = product.images?.[0]?.image?.url || product.images?.[0]?.url
  const imageAlt = product.images?.[0]?.image?.alt || product.images?.[0]?.alt || product.name

  return (
    <Link href={`/products/${product.slug}`} className="group" data-testid="product-card">
      <div className="relative bg-card rounded-lg border overflow-hidden transition-shadow hover:shadow-md">
        <div className="relative aspect-square bg-muted">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              No Image
            </div>
          )}
          
          <Badge
            variant={stockVariant}
            className="absolute top-2 right-2"
          >
            {stockStatus}
          </Badge>
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-sm mb-2 line-clamp-2">
            {product.name}
          </h3>
          
          <div className="mb-3">
            <p className="text-lg font-bold text-primary">
              {formatElurPrice(product.price_elurc)} ELURC
            </p>
            <p className="text-sm text-muted-foreground">
              {formatEurPrice(product.price_eur)}
            </p>
          </div>

          <Button
            size="sm"
            className="w-full"
            onClick={handleQuickAdd}
            disabled={!product.in_stock}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add to Cart
          </Button>
        </div>
      </div>
    </Link>
  )
}
