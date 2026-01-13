'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import { Category } from '@/types/category'
import { Badge } from '@/components/ui/badge'

interface CategoryFilterProps {
  categories: Category[]
  activeCategory: string
}

export default function CategoryFilter({ categories, activeCategory }: CategoryFilterProps) {
  const router = useRouter()
  const pathname = usePathname()
  const scrollRef = useRef<HTMLDivElement>(null)
  const activeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (activeRef.current && scrollRef.current) {
      activeRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      })
    }
  }, [activeCategory])

  const handleCategoryChange = (categorySlug: string) => {
    if (categorySlug === 'all') {
      router.push(pathname)
    } else {
      router.push(`${pathname}?category=${categorySlug}`)
    }
  }

  const allCategories = [
    { 
      id: 'all', 
      name: 'All', 
      slug: 'all', 
      product_count: categories.reduce((sum, cat) => sum + (cat.product_count || 0), 0),
      created_at: '',
      updated_at: ''
    },
    ...categories,
  ]

  return (
    <div className="sticky top-16 z-10 bg-background border-b mb-6 -mx-4 px-4 py-3">
      <div 
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
        role="tablist"
        aria-label="Product categories"
      >
        {allCategories.map((category) => {
          const isActive = activeCategory === category.slug
          
          return (
            <button
              key={category.slug}
              ref={isActive ? activeRef : null}
              onClick={() => handleCategoryChange(category.slug)}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap snap-start',
                'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted hover:bg-muted/80'
              )}
              role="tab"
              aria-selected={isActive}
              aria-controls={`category-${category.slug}`}
              aria-label={`${category.name} (${category.product_count || 0} products)`}
            >
              <span>{category.name}</span>
              {category.product_count !== undefined && (
                <Badge 
                  variant={isActive ? 'secondary' : 'outline'}
                  className="hidden sm:inline-flex"
                >
                  {category.product_count}
                </Badge>
              )}
            </button>
          )
        })}
      </div>
      
      <div 
        role="status" 
        aria-live="polite" 
        aria-atomic="true" 
        className="sr-only"
      >
        {`Showing ${activeCategory === 'all' ? 'all' : activeCategory} products`}
      </div>
    </div>
  )
}
