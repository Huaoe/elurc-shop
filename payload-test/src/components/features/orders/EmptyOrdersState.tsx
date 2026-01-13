import { Button } from '@/components/ui/button'
import { ShoppingBag } from 'lucide-react'
import Link from 'next/link'

export default function EmptyOrdersState() {
  return (
    <div className="text-center py-12">
      <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
      <h2 className="text-2xl font-semibold mb-2">No orders yet</h2>
      <p className="text-muted-foreground mb-6">
        Start shopping to see your order history here
      </p>
      <Button asChild size="lg">
        <Link href="/products">Browse Products</Link>
      </Button>
    </div>
  )
}
