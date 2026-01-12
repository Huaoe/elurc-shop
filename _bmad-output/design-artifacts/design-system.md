# Design System - elurc-market

## Brand Identity

### Mission
Enable Bretaigne's economic sovereignty through ELURC-powered organic grocery commerce.

### Brand Values
- **Transparency:** Clear pricing, visible transactions, honest communication
- **Sovereignty:** Economic independence, local empowerment
- **Simplicity:** Frictionless crypto payments, intuitive interfaces
- **Trust:** Reliable payments, secure transactions, community-focused

### Visual Tone
- Modern and clean
- Approachable yet professional
- Nature-inspired (organic products)
- Tech-forward (crypto integration)

---

## Color Palette

### Primary Colors

**ELURC Brand Color**
- Primary: `#2563EB` (Blue - representing trust and technology)
- Primary Dark: `#1E40AF` (Hover states)
- Primary Light: `#DBEAFE` (Backgrounds, highlights)
- Primary Contrast: `#FFFFFF` (Text on primary)

**Accent Colors**
- Organic Green: `#059669` (Fresh products, success states)
- Bretaigne Gold: `#D97706` (Premium items, highlights)

### Semantic Colors

**Success**
- Success: `#10B981` (Payment confirmed, in stock)
- Success Light: `#D1FAE5`
- Success Dark: `#047857`

**Warning**
- Warning: `#F59E0B` (Low stock, pending actions)
- Warning Light: `#FEF3C7`
- Warning Dark: `#D97706`

**Error**
- Error: `#EF4444` (Out of stock, payment failed)
- Error Light: `#FEE2E2`
- Error Dark: `#DC2626`

**Info**
- Info: `#3B82F6` (Informational messages)
- Info Light: `#DBEAFE`
- Info Dark: `#1D4ED8`

### Neutral Colors

**Grayscale**
- Gray 900: `#111827` (Primary text)
- Gray 700: `#374151` (Secondary text)
- Gray 500: `#6B7280` (Tertiary text, placeholders)
- Gray 300: `#D1D5DB` (Borders, dividers)
- Gray 100: `#F3F4F6` (Backgrounds)
- Gray 50: `#F9FAFB` (Page backgrounds)
- White: `#FFFFFF`

### Background Colors

**Page Backgrounds**
- Primary: `#FFFFFF`
- Secondary: `#F9FAFB`
- Elevated: `#FFFFFF` with shadow

**Component Backgrounds**
- Card: `#FFFFFF`
- Input: `#FFFFFF`
- Disabled: `#F3F4F6`

---

## Typography

### Font Families

**Primary Font: Inter**
- Usage: All UI text, body copy, headings
- Fallback: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
- Weights: 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)

**Monospace Font: JetBrains Mono**
- Usage: Wallet addresses, transaction IDs, code
- Fallback: `'Courier New', monospace`
- Weight: 400 (Regular)

### Type Scale

**Headings**

```css
H1 (Page Title)
- Mobile: 32px / 2rem, Bold (700), Line height: 1.2
- Desktop: 48px / 3rem, Bold (700), Line height: 1.2
- Letter spacing: -0.02em

H2 (Section Title)
- Mobile: 24px / 1.5rem, Bold (700), Line height: 1.3
- Desktop: 36px / 2.25rem, Bold (700), Line height: 1.3
- Letter spacing: -0.01em

H3 (Subsection Title)
- Mobile: 20px / 1.25rem, Semibold (600), Line height: 1.4
- Desktop: 24px / 1.5rem, Semibold (600), Line height: 1.4

H4 (Card Title)
- Mobile: 18px / 1.125rem, Semibold (600), Line height: 1.4
- Desktop: 20px / 1.25rem, Semibold (600), Line height: 1.4
```

**Body Text**

```css
Body Large
- Size: 18px / 1.125rem
- Weight: Regular (400)
- Line height: 1.6

Body Regular
- Size: 16px / 1rem
- Weight: Regular (400)
- Line height: 1.5

Body Small
- Size: 14px / 0.875rem
- Weight: Regular (400)
- Line height: 1.4

Caption
- Size: 12px / 0.75rem
- Weight: Regular (400)
- Line height: 1.3
```

**Special Text**

```css
Price (ELURC)
- Size: 20px / 1.25rem
- Weight: Bold (700)
- Color: Gray 900

Price (EUR Conversion)
- Size: 14px / 0.875rem
- Weight: Regular (400)
- Color: Gray 500

Wallet Address
- Size: 14px / 0.875rem
- Weight: Regular (400)
- Font: Monospace
- Color: Gray 700

Button Text
- Size: 16px / 1rem
- Weight: Semibold (600)
- Letter spacing: 0.01em
```

### Text Colors

- Primary: Gray 900 `#111827`
- Secondary: Gray 700 `#374151`
- Tertiary: Gray 500 `#6B7280`
- Disabled: Gray 400 `#9CA3AF`
- On Primary: White `#FFFFFF`
- Link: Primary `#2563EB`
- Link Hover: Primary Dark `#1E40AF`

---

## Spacing System

### Base Unit: 4px

**Spacing Scale**
- `xs`: 4px (0.25rem)
- `sm`: 8px (0.5rem)
- `md`: 16px (1rem)
- `lg`: 24px (1.5rem)
- `xl`: 32px (2rem)
- `2xl`: 48px (3rem)
- `3xl`: 64px (4rem)
- `4xl`: 96px (6rem)

### Component Spacing

**Padding**
- Button: 12px 24px (vertical, horizontal)
- Card: 16px (mobile), 24px (desktop)
- Input: 12px 16px
- Section: 24px (mobile), 48px (desktop)

**Margin**
- Between sections: 48px (mobile), 64px (desktop)
- Between cards: 16px
- Between form fields: 16px
- Between paragraphs: 12px

### Layout Grid

**Container**
- Max width: 1280px
- Padding: 16px (mobile), 24px (desktop)
- Margin: 0 auto

**Grid Columns**
- Mobile: 2 columns
- Tablet: 3 columns
- Desktop: 4 columns
- Gap: 16px (mobile), 24px (desktop)

---

## Components

### Buttons

**Primary Button**
```css
Background: Primary (#2563EB)
Color: White
Height: 48px (mobile), 44px (desktop)
Padding: 12px 24px
Border radius: 8px
Font: 16px, Semibold (600)
Shadow: 0 1px 2px rgba(0,0,0,0.05)

Hover:
  Background: Primary Dark (#1E40AF)
  Shadow: 0 4px 6px rgba(0,0,0,0.1)

Active:
  Background: #1E3A8A
  Shadow: inset 0 2px 4px rgba(0,0,0,0.1)

Disabled:
  Background: Gray 300 (#D1D5DB)
  Color: Gray 500 (#6B7280)
  Cursor: not-allowed
```

**Secondary Button**
```css
Background: Transparent
Border: 2px solid Primary (#2563EB)
Color: Primary (#2563EB)
Height: 48px (mobile), 44px (desktop)
Padding: 12px 24px
Border radius: 8px
Font: 16px, Semibold (600)

Hover:
  Background: Primary Light (#DBEAFE)
  Border color: Primary Dark (#1E40AF)

Active:
  Background: #BFDBFE
```

**Text Button**
```css
Background: Transparent
Color: Primary (#2563EB)
Padding: 8px 16px
Font: 16px, Medium (500)

Hover:
  Color: Primary Dark (#1E40AF)
  Text decoration: underline
```

**Icon Button**
```css
Size: 44x44px
Background: Transparent
Border radius: 8px
Icon size: 24x24px

Hover:
  Background: Gray 100 (#F3F4F6)

Active:
  Background: Gray 200 (#E5E7EB)
```

### Cards

**Product Card**
```css
Background: White
Border: 1px solid Gray 300 (#D1D5DB)
Border radius: 12px
Padding: 16px
Shadow: 0 1px 3px rgba(0,0,0,0.1)

Hover:
  Shadow: 0 4px 6px rgba(0,0,0,0.1)
  Transform: translateY(-2px)
  Transition: all 0.2s ease

Structure:
  - Product image (square, aspect ratio 1:1)
  - Product name (H4)
  - Price (ELURC bold, EUR small)
  - Stock badge
  - Add to cart button
```

**Cart Item Card**
```css
Background: White
Border bottom: 1px solid Gray 200 (#E5E7EB)
Padding: 16px 0

Structure:
  - Product image (64x64px)
  - Product info (name, unit price)
  - Quantity controls
  - Line total
  - Remove button
```

**Info Card**
```css
Background: Info Light (#DBEAFE)
Border: 1px solid Info (#3B82F6)
Border radius: 8px
Padding: 16px
Icon: Info icon (24px)
```

### Forms

**Input Field**
```css
Background: White
Border: 1px solid Gray 300 (#D1D5DB)
Border radius: 8px
Height: 48px
Padding: 12px 16px
Font: 16px, Regular (400)
Color: Gray 900

Focus:
  Border: 2px solid Primary (#2563EB)
  Outline: none
  Shadow: 0 0 0 3px rgba(37,99,235,0.1)

Error:
  Border: 2px solid Error (#EF4444)
  Shadow: 0 0 0 3px rgba(239,68,68,0.1)

Disabled:
  Background: Gray 100 (#F3F4F6)
  Color: Gray 500 (#6B7280)
  Cursor: not-allowed
```

**Label**
```css
Font: 14px, Medium (500)
Color: Gray 700
Margin bottom: 6px
```

**Error Message**
```css
Font: 14px, Regular (400)
Color: Error (#EF4444)
Margin top: 6px
Icon: Error icon (16px)
```

**Helper Text**
```css
Font: 14px, Regular (400)
Color: Gray 500
Margin top: 6px
```

### Badges

**Stock Badge**
```css
In Stock:
  Background: Success Light (#D1FAE5)
  Color: Success Dark (#047857)
  
Low Stock:
  Background: Warning Light (#FEF3C7)
  Color: Warning Dark (#D97706)
  
Out of Stock:
  Background: Error Light (#FEE2E2)
  Color: Error Dark (#DC2626)

Style:
  Padding: 4px 12px
  Border radius: 12px (pill)
  Font: 12px, Medium (500)
  Display: inline-block
```

**Cart Count Badge**
```css
Background: Error (#EF4444)
Color: White
Size: 20px (circle)
Font: 12px, Bold (700)
Position: Absolute (top-right of cart icon)
Border: 2px solid White
```

### Modals

**Modal Overlay**
```css
Background: rgba(0,0,0,0.5)
Position: Fixed
Z-index: 1000
```

**Modal Container**
```css
Background: White
Border radius: 16px
Max width: 500px (mobile: 90vw)
Padding: 24px
Shadow: 0 20px 25px rgba(0,0,0,0.1)
Position: Centered

Header:
  - Title (H3)
  - Close button (icon button)
  - Border bottom: 1px solid Gray 200

Body:
  - Padding: 24px 0

Footer:
  - Border top: 1px solid Gray 200
  - Padding top: 16px
  - Buttons (right-aligned)
```

### Toast Notifications

**Toast Container**
```css
Position: Fixed bottom-right
Padding: 16px
Max width: 400px
Z-index: 2000

Success Toast:
  Background: Success (#10B981)
  Color: White
  Icon: Check mark

Error Toast:
  Background: Error (#EF4444)
  Color: White
  Icon: X mark

Info Toast:
  Background: Info (#3B82F6)
  Color: White
  Icon: Info icon

Style:
  Border radius: 8px
  Padding: 16px
  Shadow: 0 10px 15px rgba(0,0,0,0.1)
  Animation: Slide in from bottom
  Duration: 3 seconds (auto-dismiss)
```

### Loading States

**Spinner**
```css
Size: 24px (small), 40px (medium), 64px (large)
Color: Primary (#2563EB)
Animation: Rotate 360deg, 1s linear infinite
```

**Skeleton Screen**
```css
Background: Linear gradient
  From: Gray 200 (#E5E7EB)
  To: Gray 300 (#D1D5DB)
Animation: Shimmer effect
Border radius: Match component
```

**Progress Bar**
```css
Height: 4px
Background: Gray 200 (#E5E7EB)
Border radius: 2px

Fill:
  Background: Primary (#2563EB)
  Animation: Indeterminate (for unknown duration)
```

---

## Icons

### Icon Library
**Recommended:** Lucide Icons (React)
- Consistent stroke width: 2px
- Default size: 24x24px
- Scalable and accessible

### Icon Sizes
- Small: 16px (inline with text)
- Medium: 24px (default)
- Large: 32px (feature icons)
- XLarge: 48px (empty states)

### Icon Colors
- Default: Gray 700 (#374151)
- Active: Primary (#2563EB)
- Disabled: Gray 400 (#9CA3AF)
- On Primary: White (#FFFFFF)

### Required Icons
- Shopping cart
- Wallet
- Menu (hamburger)
- Close (X)
- Search
- Plus / Minus
- Trash
- Check mark
- Alert triangle
- Info circle
- External link
- Arrow left / right
- Chevron down / up
- Loading spinner
- QR code
- Copy
- Eye / Eye off

---

## Shadows

**Elevation System**

```css
Level 0 (Flat):
  box-shadow: none

Level 1 (Subtle):
  box-shadow: 0 1px 3px rgba(0,0,0,0.1)

Level 2 (Card):
  box-shadow: 0 4px 6px rgba(0,0,0,0.1)

Level 3 (Dropdown):
  box-shadow: 0 10px 15px rgba(0,0,0,0.1)

Level 4 (Modal):
  box-shadow: 0 20px 25px rgba(0,0,0,0.1)

Level 5 (Popup):
  box-shadow: 0 25px 50px rgba(0,0,0,0.25)
```

---

## Border Radius

**Radius Scale**
- `none`: 0px
- `sm`: 4px (small elements)
- `md`: 8px (buttons, inputs)
- `lg`: 12px (cards)
- `xl`: 16px (modals)
- `2xl`: 24px (large containers)
- `full`: 9999px (pills, circles)

---

## Animations & Transitions

### Timing Functions
- `ease-in`: Accelerating
- `ease-out`: Decelerating (default for most)
- `ease-in-out`: Smooth start and end
- `linear`: Constant speed (spinners)

### Durations
- `fast`: 150ms (hover states)
- `normal`: 200ms (default)
- `slow`: 300ms (page transitions)

### Common Transitions

**Hover Effects**
```css
transition: all 0.2s ease-out;
```

**Button Press**
```css
transition: transform 0.15s ease-in-out;
active: transform: scale(0.98);
```

**Modal Fade In**
```css
animation: fadeIn 0.3s ease-out;
```

**Toast Slide In**
```css
animation: slideInUp 0.3s ease-out;
```

**Skeleton Shimmer**
```css
animation: shimmer 1.5s infinite linear;
```

---

## Responsive Design

### Breakpoints

```css
Mobile: 0 - 767px
Tablet: 768px - 1023px
Desktop: 1024px+
Large Desktop: 1280px+
```

### Mobile-First Approach
- Design for mobile first
- Enhance for larger screens
- Use min-width media queries

### Touch Targets
- Minimum: 44x44px
- Recommended: 48x48px
- Spacing between: 8px minimum

### Responsive Typography
- Scale up headings on desktop
- Maintain readable line lengths (45-75 characters)
- Increase line height for mobile

---

## Accessibility

### Color Contrast
- Normal text: 4.5:1 minimum (WCAG AA)
- Large text (18px+): 3:1 minimum
- Interactive elements: 3:1 minimum

### Focus Indicators
```css
outline: 2px solid Primary (#2563EB)
outline-offset: 2px
border-radius: 4px
```

### Screen Reader Support
- Use semantic HTML
- Provide aria-labels for icons
- Announce dynamic content changes
- Skip links for navigation

### Keyboard Navigation
- Tab order follows visual order
- All interactive elements focusable
- Escape closes modals/dropdowns
- Enter/Space activates buttons

---

## Implementation Guidelines

### CSS Framework
**Recommended:** TailwindCSS
- Utility-first approach
- Customizable design tokens
- Built-in responsive utilities
- Excellent tree-shaking

### Component Library
**Recommended:** shadcn/ui
- Built on Radix UI primitives
- Fully accessible components
- Customizable with Tailwind
- Copy-paste components (no npm bloat)

### Icon Library
**Recommended:** Lucide React
- Consistent design
- Tree-shakeable
- TypeScript support
- Extensive icon set

### State Management
- React Context for global state (wallet, cart)
- Local state for component-specific data
- Server state with React Query (product data)

---

## Design Tokens (Tailwind Config)

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563EB',
          dark: '#1E40AF',
          light: '#DBEAFE',
        },
        success: {
          DEFAULT: '#10B981',
          light: '#D1FAE5',
          dark: '#047857',
        },
        warning: {
          DEFAULT: '#F59E0B',
          light: '#FEF3C7',
          dark: '#D97706',
        },
        error: {
          DEFAULT: '#EF4444',
          light: '#FEE2E2',
          dark: '#DC2626',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      spacing: {
        '18': '4.5rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
}
```
