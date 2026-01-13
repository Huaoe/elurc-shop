'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { Product } from '@/types/product'
import QuantitySelector from './QuantitySelector'
import { useCart } from '@/hooks/useCart'

interface AddToCartBarProps {
  product: Product
}

export default function AddToCartBar({ product }: AddToCartBarProps) {
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()

  const handleAddToCart = () => {
    if (!product.in_stock) return

    try {
      addItem(product, quantity)
      toast.success(`Added ${quantity} × ${product.name} to cart`)
    } catch {
      toast.error('Failed to add to cart')
    }
  }

  return (
    <div className="sticky bottom-0 left-0 right-0 bg-background border-t p-4 mt-8">
      <div className="container mx-auto flex items-center gap-4">
        <QuantitySelector
          quantity={quantity}
          onQuantityChange={setQuantity}
          maxQuantity={product.stock}
          disabled={!product.in_stock}
        />
        
        <Button
          className="flex-1"
          size="lg"
          onClick={handleAddToCart}
          disabled={!product.in_stock}
        >
          Add {quantity > 1 ? `${quantity} ` : ''}to Cart
        </Button>
      </div>
    </div>
  )
}
