import Link from 'next/link'
import { PackageOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Category } from '@/types/category'

interface EmptyCategoryStateProps {
  category: Category
  otherCategories: Category[]
}

export default function EmptyCategoryState({ category, otherCategories }: EmptyCategoryStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <PackageOpen className="h-24 w-24 text-muted-foreground mb-6" />
      
      <h2 className="text-2xl font-bold mb-2">No Products in {category.name}</h2>
      
      {category.description && (
        <p className="text-muted-foreground mb-6 max-w-md">
          {category.description}
        </p>
      )}
      
      <p className="text-muted-foreground mb-8">
        We don&apos;t have any products in this category right now. Check back soon or browse other categories.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild>
          <Link href="/products">View All Products</Link>
        </Button>
        
        {otherCategories.length > 0 && (
          <Button variant="outline" asChild>
            <Link href={`/products?category=${otherCategories[0].slug}`}>
              Browse {otherCategories[0].name}
            </Link>
          </Button>
        )}
      </div>
    </div>
  )
}
