import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-16 md:py-24 text-center">
      <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-6">
        <ShoppingBag className="w-12 h-12 text-gray-400" aria-hidden="true" />
      </div>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
        Your cart is empty
      </h2>
      <p className="text-base text-gray-600 mb-8 max-w-md">
        Add products to your cart to get started shopping with ELURC tokens
      </p>
      <Button asChild size="lg">
        <Link href="/products">Browse Products</Link>
      </Button>
    </div>
  );
}
