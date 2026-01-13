import { Package } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function EmptyProductsState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <Package className="h-16 w-16 text-muted-foreground mb-4" />
      <h2 className="text-2xl font-bold mb-2">No products found</h2>
      <p className="text-muted-foreground mb-6 max-w-md">
        We couldn&apos;t find any products in this category. Try browsing all products or check back later.
      </p>
      <Button asChild>
        <Link href="/products">Browse All Products</Link>
      </Button>
    </div>
  )
}
