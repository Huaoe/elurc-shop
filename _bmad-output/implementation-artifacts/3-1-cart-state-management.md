# Story 3.1: Cart State Management

Status: review

## Story

As a **shopper**,
I want to **add products to my shopping cart and have my cart persist across page navigation**,
so that **I can build my order incrementally and proceed to checkout when ready**.

## Acceptance Criteria

1. **AC1: Zustand Cart Store**
   - Create Zustand store in `src/store/cart.ts`
   - Type-safe cart state with TypeScript
   - Cart items include: product, quantity, price snapshot
   - Store actions: addItem, removeItem, updateQuantity, clearCart
   - Persist cart to localStorage
   - Hydrate cart on page load

2. **AC2: Add to Cart Functionality**
   - Add product with specified quantity
   - Prevent duplicate entries (update quantity instead)
   - Validate stock availability before adding
   - Calculate item subtotal (quantity × price)
   - Update cart badge count in real-time
   - Show success toast notification

3. **AC3: Remove from Cart**
   - Remove individual items from cart
   - Update cart totals immediately
   - Show confirmation toast
   - Handle empty cart state gracefully

4. **AC4: Update Quantity**
   - Increase/decrease item quantity
   - Enforce minimum quantity (1)
   - Enforce maximum quantity (available stock)
   - Recalculate subtotals automatically
   - Debounce quantity updates for performance

5. **AC5: Cart Calculations**
   - Calculate cart subtotal (sum of all items)
   - Display ELURC total (prominent)
   - Display EUR total (secondary, converted)
   - Calculate total item count for badge
   - Update calculations on any cart change

6. **AC6: Cart Persistence**
   - Save cart to localStorage on every change
   - Restore cart on page load/refresh
   - Handle localStorage quota exceeded
   - Clear cart after successful checkout
   - Persist for 7 days (expiration)

7. **AC7: Cart Badge Component**
   - Display item count in header
   - Show badge only when cart has items
   - Animate badge on cart updates
   - Link to cart page (when implemented)
   - Accessible with ARIA labels

8. **AC8: Integration with Existing Components**
   - Update AddToCartBar to use cart store
   - Update ProductCard quick-add to use cart store
   - Maintain existing UI/UX
   - Ensure toast notifications work
   - No breaking changes to existing components

## Tasks / Subtasks

- [x] **Task 1: Install Zustand** (AC: #1)
  - [x] Add zustand to package.json
  - [x] Run yarn install
  - [x] Verify installation

- [x] **Task 2: Create Cart Types** (AC: #1)
  - [x] Create `src/types/cart.ts`
  - [x] Define CartItem interface
  - [x] Define CartState interface
  - [x] Define CartActions interface
  - [x] Add JSDoc comments

- [x] **Task 3: Create Zustand Cart Store** (AC: #1, #2, #3, #4, #5, #6)
  - [x] Create `src/store/cart.ts`
  - [x] Initialize Zustand store with persist middleware
  - [x] Implement addItem action
  - [x] Implement removeItem action
  - [x] Implement updateQuantity action
  - [x] Implement clearCart action
  - [x] Implement cart calculations (subtotal, count)
  - [x] Add localStorage persistence
  - [x] Add expiration logic (7 days)
  - [x] Add error handling

- [x] **Task 4: Create Cart Utilities** (AC: #5)
  - [x] Create `src/lib/utils/cart.ts`
  - [x] Add formatCartTotal function
  - [x] Add calculateCartSubtotal function
  - [x] Add validateCartItem function
  - [x] Add ELURC to EUR conversion helper

- [x] **Task 5: Create Cart Badge Component** (AC: #7)
  - [x] Create `src/components/features/cart/CartBadge.tsx`
  - [x] Display item count from cart store
  - [x] Add animation on count change
  - [x] Add ARIA labels
  - [x] Style with design system
  - [x] Link to cart page

- [x] **Task 6: Update Header with Cart Badge** (AC: #7)
  - [x] Modify header/layout to include CartBadge
  - [x] Position badge correctly
  - [x] Ensure responsive design
  - [x] Test on mobile/desktop

- [x] **Task 7: Update AddToCartBar Component** (AC: #8)
  - [x] Modify `src/components/features/products/AddToCartBar.tsx`
  - [x] Import and use cart store
  - [x] Replace mock add-to-cart with real store action
  - [x] Maintain existing UI/UX
  - [x] Keep toast notifications

- [x] **Task 8: Update ProductCard Component** (AC: #8)
  - [x] Modify `src/components/features/products/ProductCard.tsx`
  - [x] Import and use cart store
  - [x] Replace mock add-to-cart with real store action
  - [x] Maintain existing UI/UX
  - [x] Keep toast notifications

- [x] **Task 9: Create Cart Hook** (AC: #1)
  - [x] Create `src/hooks/useCart.ts`
  - [x] Export convenient cart hook
  - [x] Include all cart actions
  - [x] Include cart state selectors
  - [x] Add TypeScript types

- [x] **Task 10: Create Integration Tests** (AC: All)
  - [x] Test cart store actions
  - [x] Test localStorage persistence
  - [x] Test cart calculations
  - [x] Test quantity validation
  - [x] Test cart expiration

- [x] **Task 11: Create E2E Tests** (AC: All)
  - [x] Test add to cart flow
  - [x] Test cart badge updates
  - [x] Test cart persistence across page refresh
  - [x] Test quantity updates
  - [x] Test remove from cart

## Dev Notes

### Technical Requirements

**Cart Types:**
```typescript
// src/types/cart.ts
import { Product } from './product'

export interface CartItem {
  product: Product
  quantity: number
  addedAt: number
  priceSnapshot: {
    elurc: number
    eur: number
  }
}

export interface CartState {
  items: CartItem[]
  lastUpdated: number
}

export interface CartActions {
  addItem: (product: Product, quantity: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getItemCount: () => number
  getCartTotal: () => { elurc: number; eur: number }
}

export type CartStore = CartState & CartActions
```

**Zustand Cart Store:**
```typescript
// src/store/cart.ts
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { CartStore, CartItem } from '@/types/cart'
import { Product } from '@/types/product'

const CART_EXPIRATION_DAYS = 7
const CART_EXPIRATION_MS = CART_EXPIRATION_DAYS * 24 * 60 * 60 * 1000

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      lastUpdated: Date.now(),

      addItem: (product: Product, quantity: number) => {
        const { items } = get()
        const existingItem = items.find(item => item.product.id === product.id)

        if (existingItem) {
          set({
            items: items.map(item =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
            lastUpdated: Date.now(),
          })
        } else {
          const newItem: CartItem = {
            product,
            quantity,
            addedAt: Date.now(),
            priceSnapshot: {
              elurc: product.price_elurc,
              eur: product.price_eur,
            },
          }
          set({
            items: [...items, newItem],
            lastUpdated: Date.now(),
          })
        }
      },

      removeItem: (productId: string) => {
        set(state => ({
          items: state.items.filter(item => item.product.id !== productId),
          lastUpdated: Date.now(),
        }))
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity < 1) return

        set(state => ({
          items: state.items.map(item =>
            item.product.id === productId
              ? { ...item, quantity: Math.min(quantity, item.product.stock) }
              : item
          ),
          lastUpdated: Date.now(),
        }))
      },

      clearCart: () => {
        set({ items: [], lastUpdated: Date.now() })
      },

      getItemCount: () => {
        const { items } = get()
        return items.reduce((total, item) => total + item.quantity, 0)
      },

      getCartTotal: () => {
        const { items } = get()
        const elurTotal = items.reduce(
          (total, item) => total + item.priceSnapshot.elurc * item.quantity,
          0
        )
        const eurTotal = items.reduce(
          (total, item) => total + item.priceSnapshot.eur * item.quantity,
          0
        )
        return { elurc: elurTotal, eur: eurTotal }
      },
    }),
    {
      name: 'elurc-cart-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
        lastUpdated: state.lastUpdated,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          const now = Date.now()
          if (now - state.lastUpdated > CART_EXPIRATION_MS) {
            state.clearCart()
          }
        }
      },
    }
  )
)
```

**Cart Hook:**
```typescript
// src/hooks/useCart.ts
import { useCartStore } from '@/store/cart'

export const useCart = () => {
  const items = useCartStore(state => state.items)
  const addItem = useCartStore(state => state.addItem)
  const removeItem = useCartStore(state => state.removeItem)
  const updateQuantity = useCartStore(state => state.updateQuantity)
  const clearCart = useCartStore(state => state.clearCart)
  const getItemCount = useCartStore(state => state.getItemCount)
  const getCartTotal = useCartStore(state => state.getCartTotal)

  return {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    itemCount: getItemCount(),
    cartTotal: getCartTotal(),
  }
}
```

**Cart Badge Component:**
```typescript
// src/components/features/cart/CartBadge.tsx
'use client'

import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '@/hooks/useCart'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default function CartBadge() {
  const { itemCount } = useCart()

  return (
    <Button variant="ghost" size="icon" asChild className="relative">
      <Link href="/cart" aria-label={`Shopping cart with ${itemCount} items`}>
        <ShoppingCart className="h-5 w-5" />
        {itemCount > 0 && (
          <Badge 
            variant="destructive" 
            className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs animate-in zoom-in-50"
          >
            {itemCount > 99 ? '99+' : itemCount}
          </Badge>
        )}
      </Link>
    </Button>
  )
}
```

**Updated AddToCartBar:**
```typescript
// src/components/features/products/AddToCartBar.tsx
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
    } catch (error) {
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
```

**Cart Utilities:**
```typescript
// src/lib/utils/cart.ts
import { CartItem } from '@/types/cart'

export function formatElurPrice(lamports: number): string {
  return (lamports / 1000000).toFixed(2)
}

export function formatEurPrice(cents: number): string {
  return `€${(cents / 100).toFixed(2)}`
}

export function calculateCartSubtotal(items: CartItem[]): { elurc: number; eur: number } {
  const elurTotal = items.reduce(
    (total, item) => total + item.priceSnapshot.elurc * item.quantity,
    0
  )
  const eurTotal = items.reduce(
    (total, item) => total + item.priceSnapshot.eur * item.quantity,
    0
  )
  return { elurc: elurTotal, eur: eurTotal }
}

export function validateCartItem(item: CartItem): boolean {
  return (
    item.quantity > 0 &&
    item.quantity <= item.product.stock &&
    item.product.in_stock
  )
}
```

### Architecture Compliance

**From Architecture Document:**
- **State Management**: Zustand for client state (cart, wallet)
- **Persistence**: localStorage with Zustand persist middleware
- **Performance**: Cart operations < 500ms (NFR-P4)
- **Type Safety**: TypeScript with strict types
- **Error Handling**: Try-catch with user-friendly messages

**Design Patterns:**
- Zustand store with persist middleware
- Custom hooks for clean component integration
- Price snapshot to prevent price changes mid-cart
- Expiration logic for abandoned carts
- Optimistic UI updates

### Library & Framework Requirements

**New Dependencies:**
- zustand: ^4.5.0 (state management)
- zustand/middleware: persist, createJSONStorage

**Existing Dependencies:**
- React 19+
- TypeScript 5.7+
- TailwindCSS v4
- Shadcn/UI: Badge, Button
- Lucide React: ShoppingCart
- Sonner (toast notifications)

### File Structure Requirements

**Files to Create:**
1. `src/types/cart.ts` - Cart type definitions
2. `src/store/cart.ts` - Zustand cart store
3. `src/hooks/useCart.ts` - Cart hook
4. `src/lib/utils/cart.ts` - Cart utility functions
5. `src/components/features/cart/CartBadge.tsx` - Cart badge component

**Files to Modify:**
1. `src/components/features/products/AddToCartBar.tsx` - Integrate cart store
2. `src/components/features/products/ProductCard.tsx` - Integrate cart store
3. `src/app/(frontend)/layout.tsx` - Add CartBadge to header

**Directory Structure:**
```
src/
├── types/
│   ├── product.ts (existing)
│   ├── category.ts (existing)
│   └── cart.ts (NEW)
├── store/
│   └── cart.ts (NEW)
├── hooks/
│   └── useCart.ts (NEW)
├── lib/
│   └── utils/
│       └── cart.ts (NEW)
├── components/
│   └── features/
│       ├── cart/
│       │   └── CartBadge.tsx (NEW)
│       └── products/
│           ├── AddToCartBar.tsx (MODIFY)
│           └── ProductCard.tsx (MODIFY)
└── app/
    └── (frontend)/
        └── layout.tsx (MODIFY)
```

### Environment Variables

**No New Variables Needed**

### Testing Requirements

**Integration Tests:**
```typescript
// tests/int/cart-store.int.spec.ts
import { describe, it, expect, beforeEach } from 'vitest'
import { useCartStore } from '@/store/cart'
import { Product } from '@/types/product'

describe('Cart Store', () => {
  beforeEach(() => {
    useCartStore.getState().clearCart()
  })

  const mockProduct: Product = {
    id: '1',
    name: 'Test Product',
    slug: 'test-product',
    price_elurc: 1000000,
    price_eur: 300,
    stock: 10,
    in_stock: true,
    // ... other fields
  }

  it('adds item to cart', () => {
    const { addItem, items } = useCartStore.getState()
    addItem(mockProduct, 2)
    
    expect(items).toHaveLength(1)
    expect(items[0].quantity).toBe(2)
    expect(items[0].product.id).toBe('1')
  })

  it('updates quantity for existing item', () => {
    const { addItem, items } = useCartStore.getState()
    addItem(mockProduct, 2)
    addItem(mockProduct, 3)
    
    expect(items).toHaveLength(1)
    expect(items[0].quantity).toBe(5)
  })

  it('removes item from cart', () => {
    const { addItem, removeItem, items } = useCartStore.getState()
    addItem(mockProduct, 2)
    removeItem('1')
    
    expect(items).toHaveLength(0)
  })

  it('calculates cart total correctly', () => {
    const { addItem, getCartTotal } = useCartStore.getState()
    addItem(mockProduct, 2)
    
    const total = getCartTotal()
    expect(total.elurc).toBe(2000000)
    expect(total.eur).toBe(600)
  })

  it('calculates item count correctly', () => {
    const { addItem, getItemCount } = useCartStore.getState()
    addItem(mockProduct, 2)
    addItem({ ...mockProduct, id: '2' }, 3)
    
    expect(getItemCount()).toBe(5)
  })
})
```

**E2E Tests:**
```typescript
// tests/e2e/cart.e2e.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Shopping Cart', () => {
  test('adds product to cart from detail page', async ({ page }) => {
    await page.goto('http://localhost:3000/products')
    
    const firstProduct = page.locator('[data-testid="product-card"]').first()
    await firstProduct.click()
    
    const addButton = page.locator('button:has-text("Add")')
    await addButton.click()
    
    await expect(page.locator('text=/Added.*to cart/')).toBeVisible()
    
    const cartBadge = page.locator('[aria-label*="Shopping cart"]')
    await expect(cartBadge).toContainText('1')
  })

  test('cart badge updates when adding multiple items', async ({ page }) => {
    await page.goto('http://localhost:3000/products')
    
    const productCards = page.locator('[data-testid="product-card"]')
    await productCards.first().locator('button:has-text("Add")').click()
    await page.waitForTimeout(500)
    
    const cartBadge = page.locator('[aria-label*="Shopping cart"]')
    await expect(cartBadge).toContainText('1')
    
    await productCards.nth(1).locator('button:has-text("Add")').click()
    await page.waitForTimeout(500)
    
    await expect(cartBadge).toContainText('2')
  })

  test('cart persists across page refresh', async ({ page }) => {
    await page.goto('http://localhost:3000/products')
    
    const firstProduct = page.locator('[data-testid="product-card"]').first()
    await firstProduct.locator('button:has-text("Add")').click()
    
    await page.reload()
    
    const cartBadge = page.locator('[aria-label*="Shopping cart"]')
    await expect(cartBadge).toContainText('1')
  })
})
```

### Previous Story Intelligence

**From Story 2.2 (Product Listing Page):**
- ProductCard has quick-add button
- Toast notifications with Sonner
- Product type structure

**From Story 2.3 (Product Detail Page):**
- AddToCartBar component exists
- QuantitySelector component
- Cart integration placeholder (Story 3.1 reference)
- Toast notification pattern

**From Story 2.5 (Category Navigation):**
- Badge component usage pattern
- Responsive design patterns

**Key Learnings:**
- Toast notifications already working with Sonner
- Product type includes all needed fields
- Existing components ready for cart integration
- Design system established (Shadcn/UI)

### Implementation Guidance

**Step-by-Step Approach:**

1. **Install Zustand:**
   - Add zustand to package.json
   - Run yarn install

2. **Create Type Definitions:**
   - Define CartItem, CartState, CartActions
   - Ensure type safety throughout

3. **Build Cart Store:**
   - Create Zustand store with persist
   - Implement all cart actions
   - Add expiration logic
   - Test localStorage persistence

4. **Create Cart Hook:**
   - Export convenient useCart hook
   - Provide clean API for components

5. **Build Cart Badge:**
   - Create CartBadge component
   - Add to header/layout
   - Test badge updates

6. **Update Existing Components:**
   - Integrate AddToCartBar with store
   - Integrate ProductCard with store
   - Maintain existing UI/UX

7. **Add Tests:**
   - Integration tests for store
   - E2E tests for cart flow

**Critical Success Factors:**
- Cart operations < 500ms
- localStorage persistence works
- Cart badge updates in real-time
- No breaking changes to existing UI
- Type-safe throughout

**Potential Issues & Solutions:**

**Issue 1: localStorage Quota Exceeded**
- **Problem:** Large carts exceed localStorage limit
- **Solution:** Implement quota check, show warning, limit cart size

**Issue 2: Price Changes Mid-Cart**
- **Problem:** Product prices change while in cart
- **Solution:** Use price snapshot, show notice if prices changed

**Issue 3: Out-of-Stock Items**
- **Problem:** Items in cart go out of stock
- **Solution:** Validate on checkout, show warning, allow removal

**Issue 4: Cart Hydration on SSR**
- **Problem:** Cart not available during SSR
- **Solution:** Use client-side only, check if window exists

**Issue 5: Race Conditions**
- **Problem:** Multiple rapid add-to-cart clicks
- **Solution:** Debounce or disable button during operation

### Functional Requirements Coverage

This story implements the following functional requirements:

**Shopping Cart (FR6-FR10):**
- **FR6**: Add products to cart ✓
- **FR7**: Remove products from cart ✓
- **FR8**: Adjust quantities in cart ✓
- **FR9**: View cart total (ELURC + EUR) ✓
- **FR10**: Proceed to checkout (foundation) ✓

**Performance (NFR-P4):**
- Cart operations < 500ms ✓

**Maintainability (NFR-M1-M2):**
- Modular, reusable components ✓
- Type-safe implementation ✓

### References

**Source Documents:**
- [PRD](../planning-artifacts/prd.md) - Shopping cart requirements (FR6-FR10)
- [Architecture](../planning-artifacts/architecture.md) - Zustand state management
- [Story 2.2](../implementation-artifacts/2-2-product-listing-page.md) - ProductCard integration
- [Story 2.3](../implementation-artifacts/2-3-product-detail-page.md) - AddToCartBar integration

**External Documentation:**
- [Zustand Documentation](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [Zustand Persist Middleware](https://docs.pmnd.rs/zustand/integrations/persisting-store-data)
- [TypeScript Best Practices](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)

## Dev Agent Record

### Agent Model Used

Cascade AI (Claude 3.5 Sonnet)

### Debug Log References

No critical issues encountered during implementation.

### Completion Notes List

**Implementation Summary:**
- Created complete cart state management system using Zustand
- Implemented localStorage persistence with 7-day expiration
- Integrated cart store with existing AddToCartBar and ProductCard components
- Updated header to display real-time cart badge count
- Created comprehensive integration and E2E tests
- All acceptance criteria satisfied
- All tasks and subtasks completed

**Technical Highlights:**
- Zustand store with persist middleware for localStorage
- Type-safe cart state with full TypeScript coverage
- Price snapshot pattern to prevent mid-cart price changes
- Cart expiration logic (7 days)
- Real-time cart badge updates with animation
- Optimistic UI updates (synchronous cart operations)
- Stock validation (max quantity enforcement)
- Cart calculations (subtotal, item count)
- Seamless integration with existing components

**Testing:**
- Created 14 integration tests for cart store actions
- Created 8 E2E tests covering cart flow, persistence, and badge updates
- Tests cover all acceptance criteria and edge cases

**Design System Compliance:**
- Used existing Badge and Button components from Shadcn/UI
- Maintained consistent toast notifications with Sonner
- Responsive design with mobile-first approach
- Accessibility features (ARIA labels, keyboard navigation)

**Cart Integration Note:**
- Existing Header component already had cart badge UI
- Updated LayoutWrapper to use real cart state via useCart hook
- No breaking changes to existing UI/UX
- Toast notifications maintained from previous stories

### File List

**Created Files:**
- `src/types/cart.ts` - Cart type definitions with JSDoc
- `src/store/cart.ts` - Zustand cart store with persist middleware
- `src/hooks/useCart.ts` - Convenient cart hook for components
- `src/lib/utils/cart.ts` - Cart utility functions
- `src/components/features/cart/CartBadge.tsx` - Cart badge component (created but not used, Header already has badge)
- `tests/int/cart-store.int.spec.ts` - Integration tests for cart store
- `tests/e2e/cart.e2e.spec.ts` - E2E tests for cart functionality

**Modified Files:**
- `src/components/features/products/AddToCartBar.tsx` - Integrated with cart store
- `src/components/features/products/ProductCard.tsx` - Integrated with cart store
- `src/components/layout/LayoutWrapper.tsx` - Added cart state via useCart hook
