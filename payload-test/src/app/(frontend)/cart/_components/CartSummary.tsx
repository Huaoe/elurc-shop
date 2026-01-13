'use client'

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface CartSummaryProps {
  itemCount: number;
  subtotalElurc: number;
  subtotalEur: number;
  hasInvalidItems?: boolean;
}

export default function CartSummary({
  itemCount,
  subtotalElurc,
  subtotalEur,
  hasInvalidItems = false,
}: CartSummaryProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-6 sticky top-4">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>

      <div className="space-y-3 mb-4">
        <div className="flex justify-between text-base">
          <span className="text-gray-600">Items</span>
          <span className="text-gray-900">{itemCount}</span>
        </div>

        <Separator />

        <div className="flex justify-between items-baseline">
          <span className="text-base text-gray-600">Subtotal</span>
          <div className="text-right">
            <p className="text-xl font-bold text-gray-900">
              {(subtotalElurc / 1000000).toFixed(2)} ELURC
            </p>
            <p className="text-sm text-gray-600">
              €{(subtotalEur / 100).toFixed(2)}
            </p>
          </div>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping</span>
          <span className="text-gray-600">Calculated at checkout</span>
        </div>
      </div>

      <Separator className="my-4" />

      <div className="flex justify-between items-baseline mb-6">
        <span className="text-lg font-semibold text-gray-900">Total</span>
        <div className="text-right">
          <p className="text-2xl font-bold text-primary">
            {(subtotalElurc / 1000000).toFixed(2)} ELURC
          </p>
          <p className="text-base text-gray-600">
            €{(subtotalEur / 100).toFixed(2)}
          </p>
        </div>
      </div>

      {hasInvalidItems && (
        <p className="text-sm text-error mb-4">
          Please remove unavailable items before checkout
        </p>
      )}

      <Button
        asChild
        size="lg"
        className="w-full"
        disabled={itemCount === 0 || hasInvalidItems}
      >
        <Link href="/checkout">
          Proceed to Checkout {itemCount > 0 && `(${itemCount} items)`}
        </Link>
      </Button>

      <p className="text-xs text-gray-500 text-center mt-4">
        Secure payment with ELURC tokens on Solana blockchain
      </p>
    </div>
  );
}
