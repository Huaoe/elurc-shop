---
story_id: 2-0-home-landing-page
epic: Epic 2 - Product Catalog
title: Home/Landing Page
status: ready-for-dev
created: 2026-01-13
---

# Story 2-0: Home/Landing Page

## Overview

Create a compelling marketing/landing home page that serves as the entry point to the elurc-market e-commerce platform. This page should introduce the concept of ELURC token payments, showcase the value proposition, and guide users toward browsing the product catalog.

## User Story

**As a** first-time visitor  
**I want** to understand what elurc-market offers and how ELURC payments work  
**So that** I feel confident exploring the product catalog and making purchases

## Acceptance Criteria

### Visual Design
- [ ] Hero section with compelling headline and call-to-action
- [ ] Uses the Forest Green & Gold theme from globals.css
- [ ] Responsive layout (mobile-first: 375px, tablet: 768px, desktop: 1024px+)
- [ ] High-quality hero image or illustration showcasing fresh/dry products
- [ ] Consistent with design system (Shadcn/UI components, Tailwind classes)

### Content Sections
- [ ] **Hero Section**
  - Main headline introducing elurc-market
  - Subheadline explaining ELURC token payments
  - Primary CTA button: "Browse Products" → links to `/products`
  - Secondary CTA button: "Learn About ELURC" → links to info section or external resource
  
- [ ] **Value Propositions** (3-4 key benefits)
  - Fast blockchain payments
  - Transparent pricing in ELURC + EUR conversion
  - Fresh and dry products delivered
  - Secure Phantom wallet integration
  
- [ ] **How It Works** (3-step process)
  - Step 1: Browse products
  - Step 2: Connect Phantom wallet
  - Step 3: Pay with ELURC tokens
  
- [ ] **Featured Categories**
  - Visual cards for "Fresh Products" and "Dry Products"
  - Each card links to category filter on product listing page
  - Category icons using Lucide React
  
- [ ] **Trust Indicators**
  - Solana blockchain badge
  - Phantom wallet compatible badge
  - Secure payments indicator

### Technical Requirements
- [ ] Route: `/` (root path)
- [ ] File location: `src/app/(frontend)/page.tsx`
- [ ] Server-side rendered (Next.js App Router default)
- [ ] Optimized images using Next.js `<Image>` component
- [ ] Semantic HTML structure (header, main, section, footer)
- [ ] Proper heading hierarchy (h1, h2, h3)

### Accessibility
- [ ] WCAG 2.1 AA compliant
- [ ] Keyboard navigable CTAs
- [ ] Focus indicators visible on all interactive elements
- [ ] Alt text for all images
- [ ] Sufficient color contrast (4.5:1 for text, 3:1 for large text)
- [ ] Touch targets minimum 44x44px

### Performance
- [ ] Initial page load < 3 seconds on 4G
- [ ] LCP (Largest Contentful Paint) < 2.5 seconds
- [ ] Images optimized and lazy-loaded where appropriate
- [ ] No layout shift (CLS < 0.1)

### SEO
- [ ] Meta title: "elurc-market - Shop with ELURC Tokens"
- [ ] Meta description highlighting ELURC payments and product offerings
- [ ] Open Graph tags for social sharing
- [ ] Structured data (Organization schema)

## Technical Implementation

### File Structure
```
src/app/(frontend)/
├── page.tsx                    # Home/landing page
└── _components/
    └── home/
        ├── HeroSection.tsx
        ├── ValuePropositions.tsx
        ├── HowItWorks.tsx
        ├── FeaturedCategories.tsx
        └── TrustIndicators.tsx
```

### Key Components

#### HeroSection.tsx
```typescript
- Full-width hero with background image/gradient
- Headline (h1): "Welcome to elurc-market"
- Subheadline: "Shop fresh and dry products with ELURC tokens"
- Primary CTA: Link to /products
- Secondary CTA: Link to ELURC info
```

#### ValuePropositions.tsx
```typescript
- Grid layout (1 col mobile, 2 cols tablet, 4 cols desktop)
- Each value prop: Icon + Title + Description
- Icons from Lucide React (Zap, Shield, Truck, Wallet)
```

#### HowItWorks.tsx
```typescript
- 3-step process with numbered steps
- Visual flow indicators (arrows/lines)
- Icons for each step
- Brief description under each step
```

#### FeaturedCategories.tsx
```typescript
- 2-column grid (Fresh | Dry)
- Category cards with:
  - Category image
  - Category name
  - Product count (dynamic from PayloadCMS)
  - "Shop Now" link to /products?category={slug}
```

#### TrustIndicators.tsx
```typescript
- Horizontal row of trust badges
- Solana logo + "Powered by Solana"
- Phantom logo + "Phantom Wallet Compatible"
- Shield icon + "Secure Payments"
```

### Dependencies
- Next.js Link component for navigation
- Lucide React for icons
- Shadcn/UI Button component
- Tailwind CSS for styling
- Next.js Image for optimized images

### Data Requirements
- Static content (no API calls needed initially)
- Optional: Fetch category product counts from PayloadCMS API
- Images stored in `/public/images/home/`

## Design Specifications

### Color Usage (Forest Green & Gold Theme)
- **Primary CTA buttons**: `--color-primary` (#2D5016) with gold hover effect
- **Secondary CTA buttons**: `--color-accent-gold` (#D4AF37) outline style
- **Hero background**: Gradient from `--color-primary-light` to white
- **Section backgrounds**: Alternating white and `--color-gray-50`
- **Text**: `--color-gray-900` for headings, `--color-gray-700` for body

### Typography
- **Hero headline**: text-5xl md:text-6xl lg:text-7xl, font-bold
- **Section headings**: text-3xl md:text-4xl, font-semibold
- **Body text**: text-base md:text-lg, font-normal
- **Font family**: Inter (from globals.css)

### Spacing
- **Section padding**: py-16 md:py-24 lg:py-32
- **Container max-width**: max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
- **Element spacing**: gap-8 md:gap-12 lg:gap-16

## Testing Checklist

### Functional Testing
- [ ] All CTAs navigate to correct routes
- [ ] Category cards link to filtered product pages
- [ ] Responsive layout works across breakpoints
- [ ] Images load correctly and are optimized

### Accessibility Testing
- [ ] Run axe DevTools - no violations
- [ ] Keyboard navigation works for all interactive elements
- [ ] Screen reader announces all content correctly
- [ ] Focus indicators visible and clear

### Performance Testing
- [ ] Lighthouse score > 90 for Performance
- [ ] Lighthouse score > 90 for Accessibility
- [ ] Lighthouse score > 90 for SEO
- [ ] Images properly sized and optimized

### Cross-Browser Testing
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (desktop and iOS)

## Definition of Done

- [ ] All acceptance criteria met
- [ ] Code follows Next.js and React best practices
- [ ] Components are modular and reusable
- [ ] Responsive design works on mobile, tablet, desktop
- [ ] Accessibility requirements met (WCAG 2.1 AA)
- [ ] Performance targets achieved
- [ ] SEO meta tags implemented
- [ ] Code reviewed and approved
- [ ] Tested across major browsers
- [ ] Deployed to development environment

## Notes

- This landing page is separate from the product listing page (story 2-2)
- Keep content concise and action-oriented
- Focus on building trust with first-time visitors
- Emphasize the unique value of ELURC token payments
- Consider adding testimonials or social proof in future iterations
- Hero image should be high-quality and represent the product offerings

## Related Stories

- **2-1**: PayloadCMS Product Schema (provides category data)
- **2-2**: Product Listing Page (destination for "Browse Products" CTA)
- **2-5**: Category Navigation (used in Featured Categories section)
- **1-4**: Design System Components (Shadcn/UI buttons, cards)

## Future Enhancements (Post-MVP)

- Customer testimonials section
- Live product showcase carousel
- Newsletter signup form
- ELURC price ticker/widget
- Video explainer about ELURC payments
- Blog/news section preview
