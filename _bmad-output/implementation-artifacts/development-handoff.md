# Development Handoff Document - elurc-market

**Project:** elurc-market - Organic Grocery E-commerce with ELURC Payment  
**Handoff Date:** 2026-01-12  
**Phase:** Design → Development  
**Status:** Ready for Implementation

---

## Executive Summary

All planning and design phases are complete. The Next.js project has been initialized and is ready for development. This document provides everything needed to begin implementation.

**What's Complete:**
- ✅ Brainstorming and requirements gathering
- ✅ Product Requirements Document (PRD)
- ✅ Technical Architecture
- ✅ UX Design (Information Architecture, User Flows, Wireframes, Design System, Accessibility Specs)
- ✅ Next.js project initialization

**What's Next:**
- Configure design system (Tailwind + shadcn/ui)
- Build component library
- Implement features (product catalog, cart, checkout, payment, admin)
- Integrate blockchain and CMS

---

## Project Context

### Mission
Enable Bretaigne's economic sovereignty through ELURC-powered organic grocery commerce.

### Key Success Metrics
- **Transaction Detection:** 100% reliability (no missed payments)
- **Payment Confirmation:** < 1 minute from ELURC sent to order confirmed
- **Cart Completion Rate:** 25% (cart → payment)
- **Active Users:** 10 (3 months), 50 (12 months)

### Core User Journeys
1. **Gwen (Environmental Activist):** Browse products → Add to cart → Connect wallet → Enter shipping → Pay with ELURC → Receive confirmation
2. **Nedeleg (Tech Pioneer):** Validate crypto payment UX is smooth and friction-free
3. **Thomas (Shop Manager):** Manage products, fulfill orders, handle refunds and edge cases

---

## Technical Foundation

### Project Location
```
c:\Users\thoma\OneDrive\Documents\Projects\elurc-market\elurc-market\
```

### Initialized Stack
- **Framework:** Next.js 15+ (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **Linter:** ESLint
- **Structure:** `/src` directory with `@/*` import alias

### Required Dependencies (Not Yet Installed)

**UI Components:**
```bash
npx shadcn@latest init
npx shadcn@latest add button card input label badge toast
```

**Icons:**
```bash
npm install lucide-react
```

**Blockchain:**
```bash
npm install @solana/web3.js @solana/wallet-adapter-react @solana/wallet-adapter-react-ui @solana/wallet-adapter-wallets
```

**State Management:**
```bash
npm install @tanstack/react-query zustand
```

**Forms:**
```bash
npm install react-hook-form zod @hookform/resolvers
```

**CMS (PayloadCMS):**
```bash
npm install payload @payloadcms/next
```

**Email:**
```bash
npm install resend
```

**Database:**
```bash
npm install @prisma/client
npm install -D prisma
```

---

## Architecture Overview

### Technology Stack

**Frontend:**
- Next.js 15 (App Router, SSR/SSG)
- TypeScript
- TailwindCSS + shadcn/ui
- Lucide React (icons)
- React Query (server state)
- Zustand (client state)

**Backend:**
- Next.js API Routes
- PayloadCMS (headless CMS)
- Prisma ORM
- PostgreSQL (database)

**Blockchain:**
- Solana Web3.js
- Phantom Wallet SDK
- Helius RPC (recommended)

**Services:**
- Resend (email)
- Vercel (hosting)

### Project Structure

```
elurc-market/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (customer)/         # Customer-facing routes
│   │   │   ├── page.tsx        # Homepage
│   │   │   ├── products/       # Product catalog
│   │   │   ├── cart/           # Shopping cart
│   │   │   ├── checkout/       # Checkout flow
│   │   │   └── order/          # Order confirmation
│   │   ├── admin/              # Admin panel
│   │   │   ├── dashboard/
│   │   │   ├── products/
│   │   │   ├── orders/
│   │   │   └── transactions/
│   │   ├── api/                # API routes
│   │   │   ├── products/
│   │   │   ├── cart/
│   │   │   ├── orders/
│   │   │   ├── payments/
│   │   │   └── webhooks/
│   │   ├── layout.tsx          # Root layout
│   │   └── globals.css         # Global styles
│   ├── components/             # React components
│   │   ├── ui/                 # shadcn/ui components
│   │   ├── layout/             # Layout components
│   │   ├── product/            # Product components
│   │   ├── cart/               # Cart components
│   │   ├── checkout/           # Checkout components
│   │   └── admin/              # Admin components
│   ├── lib/                    # Utilities
│   │   ├── solana.ts           # Blockchain utilities
│   │   ├── prisma.ts           # Database client
│   │   ├── utils.ts            # General utilities
│   │   └── constants.ts        # Constants
│   ├── hooks/                  # Custom React hooks
│   ├── stores/                 # Zustand stores
│   ├── types/                  # TypeScript types
│   └── styles/                 # Additional styles
├── prisma/
│   └── schema.prisma           # Database schema
├── public/                     # Static assets
├── .env.local                  # Environment variables
└── tailwind.config.ts          # Tailwind configuration
```

### Database Schema (Prisma)

**Key Models:**
- `products` - Product catalog
- `categories` - Product categories
- `orders` - Customer orders
- `order_items` - Order line items
- `transactions` - ELURC payment transactions
- `customers` - Customer data (wallet-based)

See `@c:\Users\thoma\OneDrive\Documents\Projects\elurc-market\_bmad-output\planning-artifacts\architecture.md` for complete schema.

---

## Design System Specifications

### Color Palette

```javascript
// tailwind.config.ts
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
}
```

### Typography

**Font Family:**
- Primary: Inter (sans-serif)
- Monospace: JetBrains Mono (wallet addresses, transaction IDs)

**Type Scale:**
- H1: 32px mobile, 48px desktop, Bold
- H2: 24px mobile, 36px desktop, Bold
- H3: 20px mobile, 24px desktop, Semibold
- Body: 16px, Regular
- Small: 14px, Regular
- Caption: 12px, Regular

### Spacing

**Base Unit:** 4px

**Scale:**
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- 2xl: 48px
- 3xl: 64px

### Components

**Button Heights:**
- Mobile: 48px
- Desktop: 44px
- Padding: 12px 24px
- Border radius: 8px

**Touch Targets:**
- Minimum: 44x44px
- Spacing: 8px between targets

**Card Styling:**
- Border: 1px solid Gray 300
- Border radius: 12px
- Padding: 16px (mobile), 24px (desktop)
- Shadow: 0 1px 3px rgba(0,0,0,0.1)

See `@c:\Users\thoma\OneDrive\Documents\Projects\elurc-market\_bmad-output\design-artifacts\design-system.md` for complete specifications.

---

## Implementation Priorities

### Phase 1: MVP (Essential)

**Week 1: Foundation**
1. Configure Tailwind with design tokens
2. Set up shadcn/ui component library
3. Create base layout (Header, Footer, Navigation)
4. Build design system components (Button, Card, Input, Badge)
5. Set up Prisma + PostgreSQL
6. Configure PayloadCMS

**Week 2: Product Catalog**
1. PayloadCMS product schema
2. Product listing page (with category filter)
3. Product detail page
4. Product card component
5. Category navigation
6. Stock status indicators

**Week 3: Shopping Cart & Wallet**
1. Cart state management (Zustand)
2. Shopping cart page
3. Add to cart functionality
4. Quantity controls
5. Phantom wallet integration
6. Wallet connection UI

**Week 4: Checkout & Payment**
1. Checkout flow (3 steps)
2. Shipping address form
3. QR code generation
4. Payment monitoring service
5. Solana transaction validation
6. Order confirmation page
7. Email notifications (Resend)

**Week 5: Admin Panel**
1. Admin authentication
2. Product management (CRUD)
3. Order management dashboard
4. Order details view
5. Fulfillment actions
6. Transaction history

**Week 6: Edge Cases & Polish**
1. Overpayment/underpayment handling
2. Refund interface
3. Payment timeout handling
4. Error states and messages
5. Loading states
6. Accessibility audit

### Phase 2: Growth Features (Post-MVP)
- Advanced filtering and search
- Real-time transaction visualization
- Order tracking and history
- Inventory alerts
- Analytics dashboard
- Customer communication system

### Phase 3: Vision (Future)
- DAO integration
- Multi-vendor marketplace
- Mobile app
- Subscription features

---

## Critical Implementation Details

### 1. Wallet Integration

**Phantom Wallet Connection:**
```typescript
// Use @solana/wallet-adapter-react
import { useWallet } from '@solana/wallet-adapter-react';

const { publicKey, connected, connect, disconnect } = useWallet();
```

**Wallet as Identity:**
- No traditional authentication
- Wallet address = customer ID
- Store wallet address in orders and transactions

### 2. Payment Monitoring

**Architecture:**
- Backend service polls Solana blockchain every 5-10 seconds
- Watches shop wallet for incoming ELURC transactions
- Validates transaction amount matches cart total
- Confirms sender wallet matches connected wallet
- Updates order status upon confirmation

**Critical Requirements:**
- 100% transaction detection reliability
- < 1 minute confirmation time
- Handle edge cases (overpayment, underpayment)
- Transaction reversibility support

**Implementation Pattern:**
```typescript
// API route: /api/payments/monitor
// Poll Solana RPC for transactions to shop wallet
// Match transaction amount to pending order
// Validate sender address
// Update order status
// Send confirmation email
```

### 3. PayloadCMS Integration

**Product Schema:**
```typescript
{
  name: string
  slug: string
  description: string
  price_elurc: number
  price_eur: number (auto-calculated)
  category: 'fresh' | 'dry'
  images: Media[]
  stock: number
  in_stock: boolean
  created_at: timestamp
  updated_at: timestamp
}
```

**Admin Access:**
- Separate admin authentication
- Product CRUD operations
- Inventory management
- Order fulfillment

### 4. State Management

**Cart State (Zustand):**
```typescript
interface CartStore {
  items: CartItem[]
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  total: number
}
```

**Wallet State:**
```typescript
interface WalletStore {
  address: string | null
  connected: boolean
  connect: () => Promise<void>
  disconnect: () => void
}
```

### 5. Email Notifications

**Resend Integration:**
- Order confirmation (payment received)
- Shipping confirmation (order fulfilled)
- Refund confirmation
- Underpayment/overpayment notifications

**Templates:**
- React Email components
- Transactional email design
- Include transaction links (Solscan)

---

## Naming Conventions & Patterns

### Database (Prisma)
- **Tables:** `snake_case` plural (e.g., `products`, `order_items`)
- **Columns:** `snake_case` (e.g., `price_elurc`, `created_at`)
- **Relations:** Explicit naming (e.g., `order_items.order_id`)

### TypeScript
- **Interfaces:** PascalCase with `I` prefix (e.g., `IProduct`, `IOrder`)
- **Types:** PascalCase (e.g., `CartItem`, `PaymentStatus`)
- **Enums:** PascalCase (e.g., `OrderStatus`, `ProductCategory`)

### React Components
- **Files:** PascalCase (e.g., `ProductCard.tsx`, `CheckoutForm.tsx`)
- **Components:** PascalCase (e.g., `<ProductCard />`)
- **Props:** PascalCase with `Props` suffix (e.g., `ProductCardProps`)

### API Routes
- **REST pattern:** `/api/[resource]/[action]`
- **Examples:**
  - `GET /api/products` - List products
  - `GET /api/products/[id]` - Get product
  - `POST /api/cart/add` - Add to cart
  - `POST /api/orders/create` - Create order
  - `POST /api/payments/monitor` - Monitor payment

### File Organization
- **Components:** Group by feature (e.g., `components/product/`, `components/cart/`)
- **Utilities:** Single responsibility (e.g., `lib/solana.ts`, `lib/email.ts`)
- **Hooks:** Prefix with `use` (e.g., `useCart`, `useWallet`, `usePaymentMonitor`)

---

## Environment Variables

Create `.env.local`:

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/elurc_market"

# Solana
NEXT_PUBLIC_SOLANA_RPC_URL="https://api.mainnet-beta.solana.com"
NEXT_PUBLIC_SHOP_WALLET_ADDRESS="[YOUR_SHOP_WALLET_ADDRESS]"
SHOP_WALLET_PRIVATE_KEY="[YOUR_PRIVATE_KEY]" # For refunds only, never expose

# ELURC Token
NEXT_PUBLIC_ELURC_TOKEN_ADDRESS="[ELURC_TOKEN_MINT_ADDRESS]"

# PayloadCMS
PAYLOAD_SECRET="[RANDOM_SECRET]"
PAYLOAD_PUBLIC_SERVER_URL="http://localhost:3000"

# Email (Resend)
RESEND_API_KEY="[YOUR_RESEND_API_KEY]"
EMAIL_FROM="orders@elurc-market.bretaigne"

# Conversion Rate (ELURC to EUR)
NEXT_PUBLIC_ELURC_EUR_RATE="0.30" # 1 ELURC = €0.30

# Admin
ADMIN_EMAIL="thomas@elurc-market.bretaigne"
ADMIN_PASSWORD_HASH="[BCRYPT_HASH]"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NODE_ENV="development"
```

---

## Key Reference Documents

### Planning & Requirements
- **PRD:** `@c:\Users\thoma\OneDrive\Documents\Projects\elurc-market\_bmad-output\planning-artifacts\prd.md`
  - Success criteria, user journeys, functional requirements, non-functional requirements

- **Architecture:** `@c:\Users\thoma\OneDrive\Documents\Projects\elurc-market\_bmad-output\planning-artifacts\architecture.md`
  - Complete technical architecture, database schema, API design, integration patterns

### Design
- **Information Architecture:** `@c:\Users\thoma\OneDrive\Documents\Projects\elurc-market\_bmad-output\design-artifacts\information-architecture.md`
  - Site structure, navigation, URL patterns

- **User Flows:** `@c:\Users\thoma\OneDrive\Documents\Projects\elurc-market\_bmad-output\design-artifacts\user-flows.md`
  - Detailed interaction flows for all user journeys

- **Wireframes:** `@c:\Users\thoma\OneDrive\Documents\Projects\elurc-market\_bmad-output\design-artifacts\wireframes.md`
  - 14 screen wireframes (mobile + desktop + admin)
  - Component specifications

- **Design System:** `@c:\Users\thoma\OneDrive\Documents\Projects\elurc-market\_bmad-output\design-artifacts\design-system.md`
  - Complete design tokens, color palette, typography, components

- **Accessibility:** `@c:\Users\thoma\OneDrive\Documents\Projects\elurc-market\_bmad-output\design-artifacts\accessibility-specs.md`
  - WCAG 2.1 AA compliance guidelines

---

## Development Workflow Recommendations

### 1. Start with Design System
```bash
cd elurc-market
npx shadcn@latest init
# Configure Tailwind with design tokens
# Build base components (Button, Card, Input, Badge)
```

### 2. Set Up Database
```bash
npx prisma init
# Create schema based on architecture.md
npx prisma migrate dev --name init
npx prisma generate
```

### 3. Configure PayloadCMS
```bash
npm install payload @payloadcms/next
# Set up collections (Products, Categories, Orders)
# Configure admin panel
```

### 4. Build Features Incrementally
- Start with static homepage
- Add product catalog (read-only)
- Implement cart functionality
- Add wallet integration
- Build checkout flow
- Implement payment monitoring
- Create admin panel

### 5. Test Continuously
- Unit tests for utilities
- Integration tests for API routes
- E2E tests for critical flows (checkout, payment)
- Accessibility testing (axe, Lighthouse)

---

## Critical Success Factors

### Must-Have for Launch
1. **100% payment detection** - No missed transactions
2. **< 1 minute confirmation** - Fast payment feedback
3. **Mobile-first UX** - Optimized for mobile wallets
4. **WCAG 2.1 AA** - Accessible to all users
5. **Edge case handling** - Overpayment, underpayment, timeouts
6. **Admin refund capability** - Support operations

### Performance Targets
- Initial page load: < 3 seconds (4G mobile)
- Time to Interactive: < 4 seconds
- Cart operations: < 500ms response
- Payment confirmation: < 60 seconds

### Security Requirements
- HTTPS/TLS 1.3
- Wallet private keys never in client code
- Transaction validation on blockchain
- Admin authentication
- Input sanitization
- CSRF protection

---

## Known Challenges & Solutions

### Challenge 1: Payment Monitoring Reliability
**Issue:** Must detect 100% of ELURC transactions  
**Solution:**
- Poll Solana RPC every 5-10 seconds
- Use reliable RPC provider (Helius recommended)
- Implement exponential backoff on rate limits
- Log all polling attempts
- Alert on missed transactions

### Challenge 2: Wallet Connection UX
**Issue:** Users unfamiliar with crypto wallets  
**Solution:**
- Clear onboarding instructions
- Visual wallet connection feedback
- Error messages with solutions
- Support documentation
- Test with non-crypto users

### Challenge 3: Inventory Management
**Issue:** Fresh products have expiration dates  
**Solution:**
- MVP: Manual inventory updates in PayloadCMS
- Growth: Automated stock alerts
- Future: Expiration date tracking

### Challenge 4: Conversion Rate Volatility
**Issue:** ELURC/EUR rate may fluctuate  
**Solution:**
- Display both ELURC and EUR prices
- Lock rate at cart creation
- Update rate daily via admin panel
- Future: Real-time rate API

---

## Testing Strategy

### Unit Tests
- Utility functions (price conversion, validation)
- React hooks (useCart, useWallet)
- Component logic

### Integration Tests
- API routes (products, cart, orders, payments)
- Database operations
- Email sending
- Blockchain interactions

### E2E Tests (Playwright)
- Complete purchase flow
- Wallet connection
- Payment monitoring
- Admin order fulfillment
- Refund processing

### Accessibility Tests
- Automated (axe, Lighthouse)
- Manual keyboard navigation
- Screen reader testing (NVDA, VoiceOver)

---

## Deployment Checklist

### Pre-Launch
- [ ] All MVP features implemented
- [ ] Database migrations applied
- [ ] Environment variables configured
- [ ] PayloadCMS admin accessible
- [ ] Email notifications working
- [ ] Payment monitoring tested
- [ ] Accessibility audit passed
- [ ] Performance targets met
- [ ] Security review completed
- [ ] Error handling tested
- [ ] Mobile responsiveness verified

### Launch
- [ ] Deploy to Vercel
- [ ] Configure custom domain
- [ ] Set up monitoring (Sentry, LogRocket)
- [ ] Enable analytics
- [ ] Test production payment flow
- [ ] Announce to ELURC community

### Post-Launch
- [ ] Monitor transaction success rate
- [ ] Track cart completion rate
- [ ] Gather user feedback
- [ ] Fix critical bugs
- [ ] Plan growth features

---

## Support & Resources

### Documentation
- Next.js: https://nextjs.org/docs
- Solana Web3.js: https://solana-labs.github.io/solana-web3.js/
- PayloadCMS: https://payloadcms.com/docs
- shadcn/ui: https://ui.shadcn.com/
- TailwindCSS: https://tailwindcss.com/docs

### Community
- ELURC DAO: [Telegram/Discord]
- Bretaigne community: [Contact info]

### Technical Support
- Solana RPC: Helius support
- Email: Resend support
- Hosting: Vercel support

---

## Next Immediate Actions

1. **Configure Tailwind** with design tokens from design-system.md
2. **Initialize shadcn/ui** and add base components
3. **Set up Prisma** with database schema from architecture.md
4. **Create base layout** (Header, Footer, Navigation)
5. **Build homepage** using wireframes as reference

**Recommended Command:**
```bash
cd elurc-market
npx shadcn@latest init
```

Then start implementing components following the design system specifications.

---

**Handoff Complete. Ready for Development. 🚀**

All planning, architecture, and design artifacts are complete and documented. The project is initialized and ready for implementation. Follow the MVP roadmap and reference the design documents as you build.

Good luck building elurc-market! 🥬💰
