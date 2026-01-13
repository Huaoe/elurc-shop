# Story 1.4: Design System Components

Status: review

## Story

As a **developer**,
I want to **create reusable design system components beyond the basic shadcn/ui library**,
so that **the elurc-market application has consistent, accessible, and brand-aligned UI elements for product displays, pricing, and e-commerce interactions**.

## Acceptance Criteria

1. **AC1: Product Card Component**
   - Displays product image, name, price in ELURC and EUR
   - Shows stock status indicator (in stock/out of stock)
   - Includes "Add to Cart" button with loading state
   - Responsive design (mobile and desktop variants)
   - Hover effects and touch-friendly interactions
   - Uses design system tokens for spacing, colors, typography

2. **AC2: Price Display Component**
   - Shows ELURC price prominently
   - Displays EUR conversion in smaller text
   - Uses JetBrains Mono font for ELURC amounts
   - Supports different sizes (small, medium, large)
   - Optional currency symbol display

3. **AC3: Stock Status Badge**
   - Visual indicator for product availability
   - Color-coded: Green (in stock), Red (out of stock), Amber (low stock)
   - Accessible with ARIA labels
   - Consistent with Badge component from Story 1.2

4. **AC4: Loading States Component**
   - Skeleton loaders for product cards
   - Spinner component for async operations
   - Progress indicators for multi-step processes
   - Accessible loading announcements

5. **AC5: Empty State Component**
   - Displays when no products/items found
   - Includes icon, heading, description, and optional CTA
   - Responsive and centered layout
   - Uses design system spacing and typography

6. **AC6: Component Documentation**
   - Usage examples for each component
   - Props documentation with TypeScript interfaces
   - Accessibility notes
   - Added to ComponentShowcase page

## Tasks / Subtasks

- [x] **Task 1: Create ProductCard component** (AC: #1)
  - [x] Create `src/components/product/ProductCard.tsx`
  - [x] Implement image display with fallback
  - [x] Add product name and description
  - [x] Integrate PriceDisplay component
  - [x] Add StockStatusBadge component
  - [x] Implement "Add to Cart" button with states
  - [x] Style with design system tokens
  - [x] Test responsive behavior

- [x] **Task 2: Create PriceDisplay component** (AC: #2)
  - [x] Create `src/components/product/PriceDisplay.tsx`
  - [x] Display ELURC price with JetBrains Mono font
  - [x] Show EUR conversion below
  - [x] Support size variants (sm, md, lg)
  - [x] Add optional currency symbols
  - [x] Ensure proper number formatting

- [x] **Task 3: Create StockStatusBadge component** (AC: #3)
  - [x] Create `src/components/product/StockStatusBadge.tsx`
  - [x] Implement color-coded badges (success, error, warning)
  - [x] Add ARIA labels for accessibility
  - [x] Support different stock levels
  - [x] Use Badge component from shadcn/ui as base

- [x] **Task 4: Create loading state components** (AC: #4)
  - [x] Create `src/components/ui/skeleton.tsx` (if not exists)
  - [x] Create `src/components/ui/spinner.tsx`
  - [x] Create ProductCardSkeleton component
  - [x] Add accessible loading announcements
  - [x] Test with screen readers

- [x] **Task 5: Create EmptyState component** (AC: #5)
  - [x] Create `src/components/ui/EmptyState.tsx`
  - [x] Add icon support (Lucide icons)
  - [x] Implement heading and description
  - [x] Add optional CTA button
  - [x] Style with design system tokens
  - [x] Test responsive layout

- [x] **Task 6: Update ComponentShowcase** (AC: #6)
  - [x] Add ProductCard examples
  - [x] Add PriceDisplay examples
  - [x] Add StockStatusBadge examples
  - [x] Add loading state examples
  - [x] Add EmptyState examples
  - [x] Document component props and usage

## Dev Notes

### Technical Requirements

**Component Organization:**
```
src/components/
├── product/
│   ├── ProductCard.tsx
│   ├── PriceDisplay.tsx
│   └── StockStatusBadge.tsx
├── ui/
│   ├── skeleton.tsx
│   ├── spinner.tsx
│   └── EmptyState.tsx
└── ComponentShowcase.tsx
```

**Design System Integration:**
- Use Tailwind design tokens from Story 1.1
- Leverage shadcn/ui components (Button, Badge, Card) from Story 1.2
- Follow layout patterns from Story 1.3
- Maintain 44x44px touch targets
- Ensure WCAG 2.1 AA contrast ratios

### Previous Story Intelligence

**From Story 1.1 (Tailwind Design Tokens):**
- Complete design system available
- JetBrains Mono font configured for monospace
- Color palette: Primary Blue, Success Green, Warning Amber, Error Red
- Spacing scale: 4px base unit

**From Story 1.2 (shadcn/ui Setup):**
- Button, Card, Badge components available
- Radix UI primitives provide accessibility
- Import pattern: `@/components/ui/*`

**From Story 1.3 (Base Layout):**
- Layout components created
- Mobile-first responsive patterns established
- Component composition patterns demonstrated

## Dev Agent Record

### Agent Model Used

Claude 3.5 Sonnet (Cascade)

### Debug Log References

_To be filled by dev agent during implementation_

### Completion Notes List

**Story 1.4: Design System Components - COMPLETED**

**Implementation Summary:**
- Created complete product component library with PriceDisplay, StockStatusBadge, and ProductCard
- Implemented loading states (Skeleton, Spinner, ProductCardSkeleton)
- Created EmptyState component for no-results scenarios
- Updated ComponentShowcase with comprehensive examples
- All components use design system tokens from Story 1.1
- Leveraged shadcn/ui components from Story 1.2

**Key Technical Decisions:**
1. **PriceDisplay Component**: Uses JetBrains Mono font for ELURC amounts, supports 3 size variants, proper number formatting with toFixed(2)
2. **StockStatusBadge**: Color-coded with semantic colors (success/warning/destructive), ARIA labels for accessibility, configurable low stock threshold
3. **ProductCard**: Composition pattern combining PriceDisplay and StockStatusBadge, async Add to Cart with loading state, fallback for missing images
4. **Loading States**: Skeleton component for shimmer effect, Spinner with Lucide Loader2 icon, ProductCardSkeleton matching card structure
5. **EmptyState**: Flexible component with optional icon, heading, description, and CTA button

**Acceptance Criteria Validation:**
- ✅ AC1: ProductCard displays all required elements with responsive design
- ✅ AC2: PriceDisplay shows ELURC/EUR with JetBrains Mono, supports size variants
- ✅ AC3: StockStatusBadge color-coded with ARIA labels
- ✅ AC4: Loading states with skeleton loaders and spinner
- ✅ AC5: EmptyState with icon, text, and optional CTA
- ✅ AC6: All components documented in ComponentShowcase

**Component Architecture:**
- Server Components by default (PriceDisplay, StockStatusBadge, EmptyState, Skeleton, Spinner)
- Client Components where needed (ProductCard for Add to Cart interaction)
- Proper TypeScript interfaces for all props
- Accessibility-first with ARIA labels and semantic HTML
- Mobile-first responsive design

### File List

**Created Files:**
- `src/components/product/PriceDisplay.tsx` - ELURC/EUR price display component
- `src/components/product/StockStatusBadge.tsx` - Stock status indicator with color coding
- `src/components/product/ProductCard.tsx` - Complete product card with image, pricing, stock, and Add to Cart
- `src/components/product/ProductCardSkeleton.tsx` - Loading skeleton for product cards
- `src/components/ui/skeleton.tsx` - Base skeleton component (shadcn pattern)
- `src/components/ui/spinner.tsx` - Loading spinner with size variants
- `src/components/ui/EmptyState.tsx` - Empty state component with icon and CTA

**Modified Files:**
- `src/components/ComponentShowcase.tsx` - Added sections for all new components with examples

**Dependencies Used:**
- `lucide-react` - Icons (ShoppingCart, Loader2, ShoppingBag, Package)
- `next/image` - Optimized image component
- `@/components/ui/*` - shadcn/ui components (Card, Button, Badge)
