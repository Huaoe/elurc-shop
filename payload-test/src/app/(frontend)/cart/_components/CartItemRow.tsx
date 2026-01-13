'use client'

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import RemoveItemDialog from "./RemoveItemDialog";
import type { CartItem } from "@/types/cart";

interface CartItemRowProps {
  item: CartItem;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}

export default function CartItemRow({
  item,
  onUpdateQuantity,
  onRemove,
}: CartItemRowProps) {
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);
  const [quantity, setQuantity] = useState(item.quantity);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    if (newQuantity > item.product.stock) return;
    
    setQuantity(newQuantity);
    onUpdateQuantity(item.product.id, newQuantity);
  };

  const handleIncrement = () => {
    handleQuantityChange(quantity + 1);
  };

  const handleDecrement = () => {
    handleQuantityChange(quantity - 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      handleQuantityChange(value);
    }
  };

  const handleRemoveClick = () => {
    setShowRemoveDialog(true);
  };

  const handleConfirmRemove = () => {
    onRemove(item.product.id);
    setShowRemoveDialog(false);
  };

  const lineTotal = item.priceSnapshot.elurc * item.quantity;
  const lineTotalEur = item.priceSnapshot.eur * item.quantity;

  const isLowStock = item.product.stock < 5;
  const exceedsStock = quantity > item.product.stock;

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4 p-4 border-b border-gray-200 last:border-b-0">
        {/* Product Image */}
        <div className="shrink-0">
          <Link href={`/products/${item.product.slug}`}>
            <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-gray-100">
              {item.product.images?.[0]?.image?.url ? (
                <Image
                  src={item.product.images[0].image.url}
                  alt={item.product.images[0].image.alt || item.product.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No image
                </div>
              )}
            </div>
          </Link>
        </div>

        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <Link
                href={`/products/${item.product.slug}`}
                className="text-lg font-semibold text-gray-900 hover:text-primary transition-colors"
              >
                {item.product.name}
              </Link>
              {item.product.category && (
                <Badge variant="secondary" className="mt-1">
                  {item.product.category.name}
                </Badge>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleRemoveClick}
              aria-label={`Remove ${item.product.name} from cart`}
              className="text-gray-400 hover:text-error"
            >
              <Trash2 className="w-5 h-5" />
            </Button>
          </div>

          {/* Price */}
          <div className="mb-3">
            <p className="text-base font-medium text-gray-900">
              {(item.priceSnapshot.elurc / 1000000).toFixed(2)} ELURC
            </p>
            <p className="text-sm text-gray-600">
              €{(item.priceSnapshot.eur / 100).toFixed(2)}
            </p>
          </div>

          {/* Quantity Controls & Line Total */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Quantity Selector */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={handleDecrement}
                disabled={quantity <= 1}
                aria-label="Decrease quantity"
                className="h-10 w-10"
              >
                <Minus className="w-4 h-4" />
              </Button>
              <Input
                type="number"
                value={quantity}
                onChange={handleInputChange}
                min={1}
                max={item.product.stock}
                className="w-16 text-center h-10"
                aria-label="Quantity"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={handleIncrement}
                disabled={quantity >= item.product.stock}
                aria-label="Increase quantity"
                className="h-10 w-10"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            {/* Line Total */}
            <div className="text-right">
              <p className="text-lg font-bold text-gray-900">
                {(lineTotal / 1000000).toFixed(2)} ELURC
              </p>
              <p className="text-sm text-gray-600">
                €{(lineTotalEur / 100).toFixed(2)}
              </p>
            </div>
          </div>

          {/* Stock Warnings */}
          {exceedsStock && (
            <p className="text-sm text-error mt-2">
              Only {item.product.stock} available in stock
            </p>
          )}
          {isLowStock && !exceedsStock && (
            <p className="text-sm text-warning mt-2">
              Only {item.product.stock} left in stock
            </p>
          )}
        </div>
      </div>

      <RemoveItemDialog
        open={showRemoveDialog}
        onOpenChange={setShowRemoveDialog}
        productName={item.product.name}
        onConfirm={handleConfirmRemove}
      />
    </>
  );
}
