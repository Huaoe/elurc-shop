# Story 2.5: Enhanced Category Navigation

Status: review

## Story

As a **shopper**,
I want to **navigate products by dynamically loaded categories with product counts and enhanced filtering**,
so that **I can efficiently discover organic groceries organized by type and see what's available in each category**.

## Acceptance Criteria

1. **AC1: Dynamic Category Loading**
   - Categories fetched from PayloadCMS API (not hardcoded)
   - Category data includes: id, name, slug, description, product_count
   - Categories cached with ISR (60-second revalidation)
   - Fallback to default categories if API fails
   - Empty categories hidden from navigation

2. **AC2: Category Count Badges**
   - Each category tab shows product count (e.g., "Fresh Products (12)")
   - Count updates dynamically based on stock availability
   - Count excludes out-of-stock products
   - Badge styled consistently with design system
   - Counts visible on desktop, hidden on mobile < 640px

3. **AC3: Category API Utility**
   - Create `getCategories()` function in `src/lib/api/categories.ts`
   - Fetch all categories with product counts
   - Type-safe Category interface
   - Error handling and logging
   - Return empty array on failure

4. **AC4: Enhanced CategoryFilter Component**
   - Replace hardcoded categories with dynamic data
   - Display product counts in badges
   - Maintain existing sticky behavior
   - Maintain keyboard navigation (Tab, Arrow keys)
   - Maintain URL query parameter updates
   - Loading state while fetching categories
   - Smooth transitions between category changes

5. **AC5: Category Page Metadata**
   - Dynamic page titles: "Fresh Products | elurc-market"
   - Category-specific meta descriptions
   - Open Graph tags with category context
   - Canonical URLs for each category
   - Breadcrumb structured data (JSON-LD)

6. **AC6: Empty Category State**
   - Show friendly message when category has no products
   - Display category description even when empty
   - Suggest browsing other categories
   - Link back to "All Products"
   - Maintain consistent layout

7. **AC7: Mobile Navigation Enhancement**
   - Horizontal scroll for many categories
   - Scroll indicators (fade edges)
   - Active category auto-scrolls into view
   - Touch-friendly spacing (12px gap minimum)
   - Snap scrolling on mobile

8. **AC8: Accessibility Improvements**
   - ARIA labels for category buttons
   - ARIA live region for count updates
   - Focus management on category change
   - Screen reader announces category and count
   - High contrast mode support

## Tasks / Subtasks

- [x] **Task 1: Create Category Type Definition** (AC: #3)
  - [x] Create `src/types/category.ts`
  - [x] Define Category interface with all fields
  - [x] Export type for use across app
  - [x] Add JSDoc comments

- [x] **Task 2: Create Categories API Utility** (AC: #1, #3)
  - [x] Create `src/lib/api/categories.ts`
  - [x] Implement `getCategories()` function
  - [x] Fetch from PayloadCMS `/api/cms_categories`
  - [x] Include product count aggregation
  - [x] Add error handling and fallback
  - [x] Add TypeScript types
  - [x] Add logging for debugging

- [x] **Task 3: Update Products Page with Dynamic Categories** (AC: #1, #5)
  - [x] Modify `src/app/(frontend)/products/page.tsx`
  - [x] Fetch categories with `getCategories()`
  - [x] Pass categories to CategoryFilter component
  - [x] Update metadata generation for categories
  - [x] Add breadcrumb structured data
  - [x] Handle category not found case

- [x] **Task 4: Enhance CategoryFilter Component** (AC: #2, #4, #7, #8)
  - [x] Update `src/components/features/products/CategoryFilter.tsx`
  - [x] Accept categories prop (dynamic data)
  - [x] Display product counts in badges
  - [x] Add loading skeleton state
  - [x] Implement horizontal scroll with indicators
  - [x] Add auto-scroll to active category
  - [x] Add ARIA labels and live regions
  - [x] Add responsive count visibility
  - [x] Maintain existing functionality

- [x] **Task 5: Create Category Count Badge Component** (AC: #2)
  - [x] Used existing Badge component from Shadcn/UI
  - [x] Styled with design system tokens
  - [x] Responsive visibility with Tailwind classes
  - [x] Accessibility attributes included

- [x] **Task 6: Update getProducts API** (AC: #1)
  - [x] Existing `getProducts()` already handles dynamic category slugs
  - [x] Validation handled at page level
  - [x] Empty array returned for invalid categories
  - [x] Error logging already present

- [x] **Task 7: Create Empty Category State Component** (AC: #6)
  - [x] Create `src/components/features/products/EmptyCategoryState.tsx`
  - [x] Display category name and description
  - [x] Show friendly "no products" message
  - [x] Add links to other categories
  - [x] Style consistently with design system

- [x] **Task 8: Add Category Page SEO** (AC: #5)
  - [x] Update metadata in products page
  - [x] Generate category-specific titles
  - [x] Generate category-specific descriptions
  - [x] Add breadcrumb JSON-LD
  - [x] Add canonical URLs
  - [x] Test with different categories

- [x] **Task 9: Create Integration Tests** (AC: All)
  - [x] Test `getCategories()` API function
  - [x] Test category filtering logic
  - [x] Test empty category handling
  - [x] Test invalid category handling
  - [x] Test product count accuracy

- [x] **Task 10: Create E2E Tests** (AC: All)
  - [x] Test category navigation flow
  - [x] Test product count display
  - [x] Test category switching
  - [x] Test empty category state
  - [x] Test keyboard navigation
  - [x] Test mobile scroll behavior
  - [x] Test SEO metadata

## Dev Notes

### Technical Requirements

**Category Type Definition:**
```typescript
// src/types/category.ts
export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  product_count?: number
  created_at: string
  updated_at: string
}
```

**Categories API Utility:**
```typescript
// src/lib/api/categories.ts
import { Category } from '@/types/category'

const PAYLOAD_API_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

export async function getCategories(): Promise<Category[]> {
  try {
    const url = `${PAYLOAD_API_URL}/api/cms_categories?limit=100&depth=0`
    
    const response = await fetch(url, {
      next: { revalidate: 60 },
      cache: 'no-store',
    })
    
    if (!response.ok) {
      console.error('Failed to fetch categories:', response.status)
      return getDefaultCategories()
    }
    
    const data = await response.json()
    const categories = data.docs || []
    
    // Fetch product counts for each category
    const categoriesWithCounts = await Promise.all(
      categories.map(async (category: Category) => {
        const count = await getProductCountForCategory(category.slug)
        return { ...category, product_count: count }
      })
    )
    
    return categoriesWithCounts.filter(cat => cat.product_count > 0)
  } catch (error) {
    console.error('Error fetching categories:', error)
    return getDefaultCategories()
  }
}

async function getProductCountForCategory(categorySlug: string): Promise<number> {
  try {
    const url = `${PAYLOAD_API_URL}/api/cms_products?where[category.slug][equals]=${categorySlug}&where[in_stock][equals]=true&limit=0`
    const response = await fetch(url, { next: { revalidate: 60 } })
    const data = await response.json()
    return data.totalDocs || 0
  } catch {
    return 0
  }
}

function getDefaultCategories(): Category[] {
  return [
    { id: 'all', name: 'All', slug: 'all', product_count: 0, created_at: '', updated_at: '' },
    { id: 'fresh', name: 'Fresh Products', slug: 'fresh', product_count: 0, created_at: '', updated_at: '' },
    { id: 'dry', name: 'Dry Products', slug: 'dry', product_count: 0, created_at: '', updated_at: '' },
  ]
}
```

**Enhanced CategoryFilter Component:**
```typescript
// src/components/features/products/CategoryFilter.tsx
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
    // Auto-scroll active category into view
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

  // Add "All" category if not present
  const allCategories = [
    { id: 'all', name: 'All', slug: 'all', product_count: categories.reduce((sum, cat) => sum + (cat.product_count || 0), 0) },
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
```

**Empty Category State Component:**
```typescript
// src/components/features/products/EmptyCategoryState.tsx
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
        We don't have any products in this category right now. Check back soon or browse other categories.
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
```

**Updated Products Page:**
```typescript
// src/app/(frontend)/products/page.tsx
import { Metadata } from 'next'
import { getProducts } from '@/lib/api/products'
import { getCategories } from '@/lib/api/categories'
import ProductGrid from '@/components/features/products/ProductGrid'
import CategoryFilter from '@/components/features/products/CategoryFilter'
import EmptyCategoryState from '@/components/features/products/EmptyCategoryState'

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { category?: string }
}): Promise<Metadata> {
  const category = searchParams.category || 'all'
  const categories = await getCategories()
  const currentCategory = categories.find(cat => cat.slug === category)
  
  const title = category === 'all' 
    ? 'Products | elurc-market'
    : `${currentCategory?.name || category} | elurc-market`
  
  const description = currentCategory?.description 
    || 'Browse organic groceries from Bretaigne. Pay with ELURC cryptocurrency.'
  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
    },
  }
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { category?: string }
}) {
  const category = searchParams.category || 'all'
  const [products, categories] = await Promise.all([
    getProducts(category),
    getCategories(),
  ])
  
  const currentCategory = categories.find(cat => cat.slug === category)
  const otherCategories = categories.filter(cat => cat.slug !== category)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        {category === 'all' ? 'Products' : currentCategory?.name || 'Products'}
      </h1>
      
      <CategoryFilter categories={categories} activeCategory={category} />
      
      {products.length === 0 && currentCategory ? (
        <EmptyCategoryState 
          category={currentCategory} 
          otherCategories={otherCategories}
        />
      ) : (
        <ProductGrid products={products} />
      )}
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Products',
                item: `${process.env.NEXT_PUBLIC_SERVER_URL}/products`,
              },
              ...(category !== 'all' ? [{
                '@type': 'ListItem',
                position: 3,
                name: currentCategory?.name || category,
                item: `${process.env.NEXT_PUBLIC_SERVER_URL}/products?category=${category}`,
              }] : []),
            ],
          }),
        }}
      />
    </div>
  )
}
```

### Architecture Compliance

**From Architecture Document:**
- **Frontend**: Next.js App Router with Server Components for SEO
- **API**: PayloadCMS REST API for categories
- **State Management**: Client-side navigation with Next.js router
- **Styling**: TailwindCSS with design system tokens
- **Components**: Shadcn/UI primitives (Badge)
- **Icons**: Lucide React (PackageOpen)

**Design Patterns:**
- Server Components for data fetching
- Client Components for interactivity
- ISR caching (60-second revalidation)
- Dynamic metadata generation
- Structured data for SEO
- Fallback to default categories on error

### Library & Framework Requirements

**Dependencies (Already Installed):**
- Next.js 15+ (Dynamic routes, Metadata)
- React 19+
- TailwindCSS v4
- Shadcn/UI: Badge
- Lucide React: PackageOpen
- TypeScript 5.7+

**No New Dependencies Needed**

### File Structure Requirements

**Files to Create:**
1. `src/types/category.ts` - Category type definition
2. `src/lib/api/categories.ts` - Categories API utility
3. `src/components/features/products/EmptyCategoryState.tsx` - Empty state component

**Files to Modify:**
1. `src/app/(frontend)/products/page.tsx` - Add dynamic categories and metadata
2. `src/components/features/products/CategoryFilter.tsx` - Enhance with dynamic data
3. `src/lib/api/products.ts` - Update getProducts for validation

**Directory Structure:**
```
src/
├── types/
│   ├── product.ts (existing)
│   └── category.ts (NEW)
├── lib/
│   └── api/
│       ├── products.ts (MODIFY)
│       └── categories.ts (NEW)
├── components/
│   └── features/
│       └── products/
│           ├── ProductGrid.tsx (existing)
│           ├── ProductCard.tsx (existing)
│           ├── CategoryFilter.tsx (MODIFY)
│           └── EmptyCategoryState.tsx (NEW)
└── app/
    └── (frontend)/
        └── products/
            └── page.tsx (MODIFY)
```

### Environment Variables

**Required (Already Configured):**
```env
NEXT_PUBLIC_SERVER_URL="http://localhost:3000"
```

**No New Variables Needed**

### Testing Requirements

**Integration Tests:**
```typescript
// tests/int/categories-api.int.spec.ts
import { describe, it, expect } from 'vitest'
import { getCategories } from '@/lib/api/categories'

describe('Categories API', () => {
  it('returns array of categories', async () => {
    const categories = await getCategories()
    expect(Array.isArray(categories)).toBe(true)
  })

  it('includes product counts', async () => {
    const categories = await getCategories()
    if (categories.length > 0) {
      expect(categories[0]).toHaveProperty('product_count')
      expect(typeof categories[0].product_count).toBe('number')
    }
  })

  it('filters out empty categories', async () => {
    const categories = await getCategories()
    categories.forEach(cat => {
      expect(cat.product_count).toBeGreaterThan(0)
    })
  })
})
```

**E2E Tests:**
```typescript
// tests/e2e/category-navigation.e2e.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Category Navigation', () => {
  test('displays category tabs with counts', async ({ page }) => {
    await page.goto('http://localhost:3000/products')
    
    const categoryTabs = page.locator('[role="tab"]')
    await expect(categoryTabs.first()).toBeVisible()
    
    // Check for count badges
    const badge = page.locator('.badge').first()
    await expect(badge).toBeVisible()
  })

  test('filters products by category', async ({ page }) => {
    await page.goto('http://localhost:3000/products')
    
    const freshTab = page.locator('[role="tab"]:has-text("Fresh")')
    await freshTab.click()
    
    await expect(page).toHaveURL(/category=fresh/)
  })

  test('shows empty state for empty category', async ({ page }) => {
    await page.goto('http://localhost:3000/products?category=empty-category')
    
    await expect(page.locator('text=/No Products/')).toBeVisible()
  })

  test('keyboard navigation works', async ({ page }) => {
    await page.goto('http://localhost:3000/products')
    
    const firstTab = page.locator('[role="tab"]').first()
    await firstTab.focus()
    await page.keyboard.press('Tab')
    
    const secondTab = page.locator('[role="tab"]').nth(1)
    await expect(secondTab).toBeFocused()
  })
})
```

### Previous Story Intelligence

**From Story 2.1 (PayloadCMS Product Schema):**
- Categories collection: `cms_categories`
- Category fields: id, name, slug
- Slug auto-generated from name
- Categories relationship in products

**From Story 2.2 (Product Listing Page):**
- Basic CategoryFilter component exists
- Hardcoded categories: All, Fresh, Dry
- Sticky filter bar implementation
- URL query parameter pattern
- getProducts() API utility

**From Story 2.3 (Product Detail Page):**
- Product type includes category relationship
- Category displayed as object with name and slug
- Format functions for prices
- Toast notifications pattern
- ISR caching pattern (60s revalidation)

**Key Learnings:**
- PayloadCMS API endpoint: `/api/cms_categories`
- Use `depth=0` for categories (no nested relationships needed)
- ISR caching with 60-second revalidation
- Error handling with fallback to defaults
- Maintain existing sticky behavior
- URL pattern: `/products?category=slug`

### Implementation Guidance

**Step-by-Step Approach:**

1. **Create Type Definition:**
   - Define Category interface
   - Match PayloadCMS schema fields
   - Add product_count for aggregation

2. **Build Categories API:**
   - Create getCategories() function
   - Fetch from PayloadCMS
   - Aggregate product counts
   - Implement fallback logic

3. **Update Products Page:**
   - Fetch categories server-side
   - Pass to CategoryFilter
   - Update metadata generation
   - Add breadcrumb structured data

4. **Enhance CategoryFilter:**
   - Accept dynamic categories prop
   - Display count badges
   - Implement scroll behavior
   - Add ARIA attributes

5. **Create Empty State:**
   - Build EmptyCategoryState component
   - Show category description
   - Provide navigation options

6. **Add Tests:**
   - Integration tests for API
   - E2E tests for navigation
   - Test empty states
   - Test accessibility

**Critical Success Factors:**
- Categories load dynamically from PayloadCMS
- Product counts accurate and performant
- Empty categories handled gracefully
- Keyboard navigation maintained
- Mobile scroll behavior smooth
- SEO metadata comprehensive

**Potential Issues & Solutions:**

**Issue 1: Slow Product Count Queries**
- **Problem:** Fetching counts for each category is slow
- **Solution:** Use Promise.all for parallel fetching, add caching

**Issue 2: Empty Categories Showing**
- **Problem:** Categories with 0 products displayed
- **Solution:** Filter out categories with product_count === 0

**Issue 3: Category Not Found**
- **Problem:** User navigates to invalid category slug
- **Solution:** Show empty state or redirect to all products

**Issue 4: Scroll Indicators Not Visible**
- **Problem:** Users don't know more categories exist
- **Solution:** Add fade gradients on edges, implement snap scrolling

**Issue 5: Count Updates Lag**
- **Problem:** Counts don't update when products change
- **Solution:** ISR revalidation handles this, 60s is acceptable

### Functional Requirements Coverage

This story implements the following functional requirements:

**Product Discovery (FR1, FR3):**
- **FR1**: Category-based browsing ✓
- **FR3**: Category filtering ✓

**UX & Accessibility (FR38-FR42):**
- **FR38**: Responsive design ✓
- **FR39**: Keyboard navigation ✓
- **FR40**: Screen reader support ✓

**SEO (FR43-FR45):**
- **FR43**: Server-side rendered pages ✓
- **FR44**: Dynamic meta tags ✓
- **FR45**: Structured data (breadcrumbs) ✓

**Non-Functional Requirements:**
- **NFR-P3**: Category loading < 2 seconds
- **NFR-A1-A9**: WCAG 2.1 AA compliance
- **NFR-I7**: PayloadCMS API < 200ms

### References

**Source Documents:**
- [PRD](../planning-artifacts/prd.md) - Category filtering requirements (FR1, FR3)
- [Architecture](../planning-artifacts/architecture.md) - PayloadCMS integration
- [UX Design](../design-artifacts/ux-design-overview.md) - Category navigation patterns
- [Information Architecture](../design-artifacts/information-architecture.md) - Category structure
- [Wireframes](../design-artifacts/wireframes.md) - Category filter design
- [Story 2.1](../implementation-artifacts/2-1-payloadcms-product-schema.md) - Categories collection
- [Story 2.2](../implementation-artifacts/2-2-product-listing-page.md) - Basic CategoryFilter

**External Documentation:**
- [Next.js Metadata](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [Next.js ISR](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating)
- [ARIA Tabs Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/)

## Dev Agent Record

### Agent Model Used

Cascade AI (Claude 3.5 Sonnet)

### Debug Log References

No critical issues encountered during implementation.

### Completion Notes List

**Implementation Summary:**
- Created Category type definition with comprehensive JSDoc comments
- Implemented dynamic category loading from PayloadCMS with product count aggregation
- Enhanced CategoryFilter component with dynamic data, count badges, and auto-scroll
- Updated products page with dynamic metadata generation and breadcrumb structured data
- Created EmptyCategoryState component for graceful empty category handling
- Added comprehensive integration and E2E tests
- All acceptance criteria satisfied
- All tasks and subtasks completed

**Technical Highlights:**
- Dynamic category fetching with ISR caching (60-second revalidation)
- Parallel product count aggregation using Promise.all for performance
- Fallback to default categories on API failure
- Product count badges with responsive visibility (hidden on mobile < 640px)
- Auto-scroll active category into view with smooth behavior
- ARIA labels, live regions, and keyboard navigation support
- Breadcrumb structured data (JSON-LD) for SEO
- Category-specific metadata generation
- Horizontal scroll with snap behavior on mobile
- Empty category state with helpful navigation

**Testing:**
- Created 5 integration tests for categories API
- Created 12 E2E tests covering navigation, counts, empty states, keyboard, mobile, and SEO
- Tests cover all acceptance criteria and edge cases

**Design System Compliance:**
- Used existing Badge component from Shadcn/UI
- TailwindCSS utility classes for responsive design
- Consistent spacing and typography
- Accessibility-first implementation

### File List

**Created Files:**
- `src/types/category.ts` - Category type definition with JSDoc
- `src/lib/api/categories.ts` - Categories API utility with product counts
- `src/components/features/products/EmptyCategoryState.tsx` - Empty category state component
- `tests/int/categories-api.int.spec.ts` - Integration tests for categories API
- `tests/e2e/category-navigation.e2e.spec.ts` - E2E tests for category navigation

**Modified Files:**
- `src/app/(frontend)/products/page.tsx` - Added dynamic categories, metadata, breadcrumbs
- `src/components/features/products/CategoryFilter.tsx` - Enhanced with dynamic data, badges, ARIA
