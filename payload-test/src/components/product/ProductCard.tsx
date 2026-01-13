"use client"

import Image from "next/image"
import { useState } from "react"
import { ShoppingCart } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PriceDisplay } from "./PriceDisplay"
import { StockStatusBadge } from "./StockStatusBadge"
import { cn } from "@/lib/utils"

interface Product {
  id: string
  name: string
  description?: string
  price_elurc: number
  price_eur: number
  image?: string
  stock: number
  in_stock: boolean
}

interface ProductCardProps {
  product: Product
  onAddToCart?: (productId: string) => void
  loading?: boolean
  className?: string
}

export const ProductCard = ({
  product,
  onAddToCart,
  loading = false,
  className,
}: ProductCardProps) => {
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = async () => {
    if (!product.in_stock || !onAddToCart) return

    setIsAdding(true)
    try {
      await onAddToCart(product.id)
    } finally {
      setIsAdding(false)
    }
  }

  return (
    <Card
      className={cn(
        "overflow-hidden transition-shadow hover:shadow-lg",
        className
      )}
    >
      {/* Product Image */}
      <div className="relative aspect-square w-full bg-muted">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <ShoppingCart className="size-16" />
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        {/* Name and Description */}
        <div>
          <h3 className="font-semibold text-lg line-clamp-1">
            {product.name}
          </h3>
          {product.description && (
            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
              {product.description}
            </p>
          )}
        </div>

        {/* Price */}
        <PriceDisplay
          elurc={product.price_elurc}
          eur={product.price_eur}
          size="md"
        />

        {/* Stock Status */}
        <StockStatusBadge
          inStock={product.in_stock}
          stock={product.stock}
        />

        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          disabled={!product.in_stock || isAdding || loading}
          className="w-full"
          size="lg"
        >
          <ShoppingCart className="size-4 mr-2" />
          {isAdding ? "Adding..." : "Add to Cart"}
        </Button>
      </div>
    </Card>
  )
}
