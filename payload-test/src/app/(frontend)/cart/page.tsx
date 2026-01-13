'use client'

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/hooks/useCart";
import EmptyCart from "./_components/EmptyCart";
import CartItemRow from "./_components/CartItemRow";
import CartSummary from "./_components/CartSummary";

export default function CartPage() {
  const { items, updateQuantity, removeItem, itemCount, cartTotal } = useCart();

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    updateQuantity(productId, quantity);
  };

  const handleRemoveItem = (productId: string) => {
    const item = items.find(i => i.product.id === productId);
    if (item) {
      removeItem(productId);
      toast.success(`Removed ${item.product.name} from cart`);
    }
  };

  // Check for invalid items (out of stock or exceeds available)
  const hasInvalidItems = items.some(
    item => !item.product.in_stock || item.quantity > item.product.stock
  );

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <EmptyCart />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-gray-600 mb-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <ChevronRight className="w-4 h-4 mx-2" aria-hidden="true" />
          <span className="text-gray-900 font-medium">Shopping Cart</span>
        </nav>

        {/* Page Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
          Shopping Cart
        </h1>

        {/* Cart Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              {items.map((item) => (
                <CartItemRow
                  key={item.product.id}
                  item={item}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemove={handleRemoveItem}
                />
              ))}
            </div>

            {/* Continue Shopping Link */}
            <div className="mt-6">
              <Link
                href="/products"
                className="text-primary hover:text-primary-dark font-medium inline-flex items-center transition-colors"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <CartSummary
              itemCount={itemCount}
              subtotalElurc={cartTotal.elurc}
              subtotalEur={cartTotal.eur}
              hasInvalidItems={hasInvalidItems}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
