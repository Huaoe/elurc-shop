---
story_id: 3-2-shopping-cart-page
epic: Epic 3 - Shopping Cart & Wallet
title: Shopping Cart Page
status: ready-for-dev
created: 2026-01-13
---

# Story 3-2: Shopping Cart Page

## Overview

Create a dedicated shopping cart page where users can review their cart items, adjust quantities, remove items, see totals in ELURC and EUR, and proceed to checkout.

## User Story

**As a** shopper  
**I want** to view and manage all items in my shopping cart on a dedicated page  
**So that** I can review my order, make adjustments, and proceed to checkout

## Acceptance Criteria

### Cart Page Layout
- [ ] Route: `/cart` accessible from cart badge and navigation
- [ ] Responsive layout (mobile-first: 375px, tablet: 768px, desktop: 1024px+)
- [ ] Page title: "Shopping Cart"
- [ ] Breadcrumb navigation: Home > Cart
- [ ] Uses Forest Green & Gold theme

### Cart Items Display
- [ ] Display all cart items in a list/table format
- [ ] Each item shows:
  - Product image (thumbnail)
  - Product name (linked to product detail page)
  - Category badge
  - Unit price in ELURC + EUR conversion
  - Quantity selector with +/- buttons
  - Line total (quantity × price) in ELURC + EUR
  - Remove button
- [ ] Items sorted by date added (newest first)
- [ ] Responsive: Stack items on mobile, table on desktop

### Quantity Controls
- [ ] Inline quantity selector for each item
- [ ] Increment (+) and decrement (-) buttons
- [ ] Direct input field for quantity
- [ ] Enforce min quantity: 1
- [ ] Enforce max quantity: available stock
- [ ] Show stock limit warning if quantity exceeds available
- [ ] Update line total immediately on quantity change
- [ ] Debounce quantity updates (300ms)

### Remove Items
- [ ] Remove button for each cart item
- [ ] Confirmation dialog: "Remove [Product Name] from cart?"
- [ ] Update cart totals immediately after removal
- [ ] Show toast notification: "Removed [Product Name] from cart"
- [ ] Animate item removal (fade out)

### Cart Summary
- [ ] Fixed sidebar on desktop, bottom section on mobile
- [ ] Display:
  - Subtotal in ELURC (prominent)
  - Subtotal in EUR (secondary, converted)
  - Item count: "X items"
  - Shipping: "Calculated at checkout"
- [ ] Update totals in real-time on cart changes
- [ ] Clear visual hierarchy (ELURC primary, EUR secondary)

### Empty Cart State
- [ ] Show when cart has 0 items
- [ ] Empty state illustration/icon
- [ ] Message: "Your cart is empty"
- [ ] CTA button: "Browse Products" → `/products`
- [ ] Helpful text: "Add products to your cart to get started"

### Checkout CTA
- [ ] Primary button: "Proceed to Checkout"
- [ ] Disabled when cart is empty
- [ ] Links to `/checkout` (Story 4-1)
- [ ] Shows item count: "Checkout (X items)"
- [ ] Prominent placement (cart summary)
- [ ] Sticky on mobile for easy access

### Stock Validation
- [ ] Check stock availability on page load
- [ ] Show warning for out-of-stock items
- [ ] Show warning for items exceeding available stock
- [ ] Disable checkout if any items invalid
- [ ] Provide "Remove unavailable items" action

### Performance
- [ ] Page load < 2 seconds
- [ ] Quantity updates < 300ms
- [ ] Smooth animations for add/remove
- [ ] No layout shift (CLS < 0.1)

### Accessibility
- [ ] WCAG 2.1 AA compliant
- [ ] Keyboard navigation for all controls
- [ ] Screen reader announcements for cart updates
- [ ] Focus management for dialogs
- [ ] Touch targets minimum 44x44px
- [ ] Proper heading hierarchy

### SEO
- [ ] Meta title: "Shopping Cart - elurc-market"
- [ ] Meta description: "Review your cart and proceed to checkout"
- [ ] noindex, nofollow (cart pages typically not indexed)

## Technical Implementation

### File Structure
```
src/app/(frontend)/cart/
├── page.tsx                    # Cart page route
└── _components/
    ├── CartItemRow.tsx         # Individual cart item
    ├── CartSummary.tsx         # Cart totals sidebar
    ├── EmptyCart.tsx           # Empty state
    └── RemoveItemDialog.tsx    # Confirmation dialog
```

### Key Components

#### page.tsx (Cart Page)
```typescript
- Server component wrapper
- Fetch any needed data
- Render CartItemRow for each item
- Render CartSummary
- Handle empty state
```

#### CartItemRow.tsx
```typescript
- Display product info (image, name, price)
- Quantity selector with +/- buttons
- Remove button
- Line total calculation
- Stock validation warnings
- Responsive layout (mobile/desktop)
```

#### CartSummary.tsx
```typescript
- Display subtotal (ELURC + EUR)
- Display item count
- Shipping note
- Checkout CTA button
- Sticky positioning on mobile
- Fixed sidebar on desktop
```

#### EmptyCart.tsx
```typescript
- Empty state illustration
- Helpful message
- "Browse Products" CTA
- Centered layout
```

#### RemoveItemDialog.tsx
```typescript
- Confirmation dialog
- Product name in message
- Cancel and Confirm buttons
- Accessible (focus trap, ESC to close)
```

### Dependencies
- Zustand cart store (from Story 3-1)
- useCart hook (from Story 3-1)
- Shadcn/UI: Button, Dialog, Badge, Separator
- Lucide React: Trash2, Plus, Minus, ShoppingBag
- Next.js Link and Image
- Sonner for toast notifications

### Data Flow
1. Page loads → useCart hook retrieves cart state
2. Render CartItemRow for each item
3. User adjusts quantity → updateQuantity action → cart store updates → UI re-renders
4. User removes item → removeItem action → cart store updates → UI re-renders
5. Cart totals recalculate automatically via cart store

## Design Specifications

### Color Usage (Forest Green & Gold Theme)
- **Primary buttons**: `--color-primary` (#2D5016)
- **Remove button**: `--color-error` (#8B4513) on hover
- **Prices (ELURC)**: `--color-gray-900` (prominent)
- **Prices (EUR)**: `--color-gray-600` (secondary)
- **Borders**: `--color-gray-200`
- **Background**: white with `--color-gray-50` sections

### Typography
- **Page title**: text-3xl md:text-4xl, font-bold
- **Product names**: text-lg, font-semibold
- **Prices**: text-base, font-medium (ELURC), text-sm (EUR)
- **Totals**: text-xl md:text-2xl, font-bold

### Spacing
- **Section padding**: py-8 md:py-12
- **Container**: max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
- **Item spacing**: gap-4 md:gap-6

### Layout
**Desktop (1024px+):**
- Two-column layout: Cart items (70%) | Summary (30%)
- Table-like display for cart items
- Fixed sidebar for summary

**Tablet (768px-1023px):**
- Single column with summary below items
- Card-based item display

**Mobile (375px-767px):**
- Single column, stacked layout
- Sticky summary at bottom
- Simplified item cards

## Testing Checklist

### Functional Testing
- [ ] Cart items display correctly with all details
- [ ] Quantity controls work (increment, decrement, direct input)
- [ ] Remove item works with confirmation
- [ ] Cart totals calculate correctly
- [ ] Empty cart state displays when cart is empty
- [ ] Checkout button navigates to checkout page
- [ ] Stock validation warnings appear correctly
- [ ] Cart persists across page refresh

### Accessibility Testing
- [ ] Keyboard navigation works for all controls
- [ ] Screen reader announces cart updates
- [ ] Focus management in dialogs
- [ ] All interactive elements have proper labels
- [ ] Touch targets meet 44x44px minimum

### Performance Testing
- [ ] Page load < 2 seconds
- [ ] Quantity updates are smooth and responsive
- [ ] No layout shift on load or updates
- [ ] Animations are smooth (60fps)

### Responsive Testing
- [ ] Layout works on mobile (375px)
- [ ] Layout works on tablet (768px)
- [ ] Layout works on desktop (1024px+)
- [ ] Sticky summary works on mobile

## Definition of Done

- [ ] All acceptance criteria met
- [ ] Cart page fully functional at `/cart` route
- [ ] All cart operations work (view, update, remove)
- [ ] Empty cart state implemented
- [ ] Cart summary with totals and checkout CTA
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] Accessibility requirements met (WCAG 2.1 AA)
- [ ] Stock validation implemented
- [ ] Toast notifications for all actions
- [ ] Code follows Next.js and React best practices
- [ ] Integrated with cart store from Story 3-1
- [ ] Tested across major browsers

## Notes

- This story builds on Story 3-1 (Cart State Management)
- Cart store and useCart hook already implemented
- Focus on UI/UX for cart review and management
- Checkout functionality will be in Story 4-1
- Stock validation is critical for good UX

## Related Stories

- **3-1**: Cart State Management (provides cart store and hooks)
- **4-1**: Checkout Flow (destination for "Proceed to Checkout")
- **2-2**: Product Listing Page (link back to products)
- **2-3**: Product Detail Page (product links)

## Future Enhancements (Post-MVP)

- Save for later functionality
- Recommended products based on cart
- Promo code/discount input
- Estimated delivery date
- Cart sharing (shareable link)
- Bulk actions (remove all, update all)
