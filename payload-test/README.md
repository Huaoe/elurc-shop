# elurc-market

An organic grocery e-commerce platform from Bretaigne, France, accepting ELURC cryptocurrency payments on the Solana blockchain.

## 🎯 Project Overview

**elurc-market** is a Next.js 15 application with PayloadCMS for content management, enabling customers to browse organic products, pay with ELURC tokens via Phantom wallet, and receive real-time payment confirmation.

### Tech Stack

- **Frontend:** Next.js 15 (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS v4, Shadcn UI, Radix UI
- **CMS:** PayloadCMS 3.70 with PostgreSQL
- **Database:** Prisma ORM with PostgreSQL
- **Blockchain:** Solana (ELURC token payments)
- **Wallet:** Phantom Wallet integration
- **Deployment:** Vercel (planned)

## 📅 Project Timeline

### Phase 1: Foundation & Design System ✅ (Completed)
**Status:** Complete - Jan 13, 2026

- ✅ **Story 1-1:** Tailwind CSS v4 design tokens configured
- ✅ **Story 1-2:** Shadcn UI component library setup
- ✅ **Story 1-3:** Base layout with Header, Footer, Navigation
- ✅ **Story 1-4:** Design system components showcase
- ✅ **Story 1-5:** Prisma database schema and client
- ✅ **Story 1-6:** PayloadCMS configuration with PostgreSQL

### Phase 2: Product Catalog ✅ (Completed)
**Status:** Complete - Jan 20, 2026

- ✅ **Story 2-1:** PayloadCMS Product Schema
- ✅ **Story 2-2:** Product listing page
- ✅ **Story 2-3:** Product detail page
- ✅ **Story 2-4:** Product card component
- ✅ **Story 2-5:** Category navigation (Fresh/Dry)
- ✅ **Story 2-6:** Stock status indicators

### Phase 3: Shopping Cart & Wallet ✅ (Completed)
**Status:** Complete - Jan 20, 2026

- ✅ **Story 3-1:** Cart state management (Zustand)
- ✅ **Story 3-2:** Shopping cart page with item management
- ✅ **Story 3-3:** Add to cart functionality
- ✅ **Story 3-4:** Quantity controls with validation
- ✅ **Story 3-5:** Phantom wallet integration
- ✅ **Story 3-6:** Wallet connection UI

### Phase 4: Checkout & Payment ✅ (Completed)
**Status:** Complete - Jan 20, 2026

- ✅ **Story 4-1:** Checkout flow with validation
- ✅ **Story 4-2:** Shipping address form
- ✅ **Story 4-3:** QR code generation for payments
- ✅ **Story 4-4:** Payment monitoring service
- ✅ **Story 4-5:** Solana transaction validation
- ✅ **Story 4-6:** Order confirmation page
- ✅ **Story 4-7:** Email notifications (React Email)

### Phase 5: Admin Panel ✅ (Completed)
**Status:** Complete - Jan 20, 2026

- ✅ **Story 5-1:** Admin authentication via PayloadCMS
- ✅ **Story 5-2:** Product management CRUD
- ✅ **Story 5-3:** Order management dashboard
- ✅ **Story 5-4:** Order details view with full tracking
- ✅ **Story 5-5:** Fulfillment actions and status updates
- ✅ **Story 5-6:** Transaction history and refund tracking

### Phase 6: Edge Cases & Polish ✅ (Completed)
**Status:** Complete - Jan 20, 2026

- ✅ **Story 6-1:** Overpayment/underpayment detection & handling
- ✅ **Story 6-2:** Refund interface and processing
- ✅ **Story 6-3:** Payment timeout handling
- ✅ **Story 6-4:** Error states and messages
- ✅ **Story 6-5:** Loading states with skeletons
- ✅ **Story 6-6:** Order history by wallet address

## 🚀 Quick Start

### Prerequisites

- Node.js 18.20.2+ or 20.9.0+
- Yarn v4.5
- PostgreSQL database (or use Prisma.io cloud)

### Installation

1. **Clone and install dependencies:**
   ```bash
   cd payload-test
   yarn install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your values:
   ```env
   DATABASE_URL="postgresql://..."
   PAYLOAD_SECRET="your-secret-key"
   NEXT_PUBLIC_SERVER_URL="http://localhost:3000"
   ```

3. **Generate Prisma client:**
   ```bash
   yarn prisma generate
   ```

4. **Push database schema:**
   ```bash
   yarn prisma db push
   ```

5. **Generate Payload types:**
   ```bash
   yarn generate:types
   yarn generate:importmap
   ```

6. **Start development server:**
   ```bash
   yarn dev
   ```

7. **Create first admin user:**
   - Navigate to `http://localhost:3000/admin/create-first-user`
   - Create your admin account

### Access Points

- **Frontend:** `http://localhost:3000`
- **Admin Panel:** `http://localhost:3000/admin`
- **API:** `http://localhost:3000/api`
- **GraphQL:** `http://localhost:3000/api/graphql`

### Key Pages

- **Home:** `/` - Hero, featured categories, value propositions
- **Products:** `/products` - All products listing
- **Category Pages:** `/products/fresh`, `/products/dry`
- **Product Detail:** `/products/[slug]`
- **Cart:** `/cart` - Shopping cart management
- **Checkout:** `/checkout` - Payment flow with QR code
- **Order Confirmation:** `/order-confirmation`
- **Order History:** `/orders` - View past orders by wallet
- **Order Details:** `/orders/[orderId]` - Track order status
- **Design System:** `/design-system` - Component showcase

## 📁 Project Structure

```
payload-test/
├── prisma/
│   └── schema.prisma              # Database schema
├── src/
│   ├── app/
│   │   ├── (frontend)/            # Public-facing pages
│   │   │   ├── layout.tsx         # Root layout with wallet provider
│   │   │   ├── page.tsx           # Home page
│   │   │   ├── products/          # Product listing & detail pages
│   │   │   ├── cart/              # Shopping cart page
│   │   │   ├── checkout/          # Checkout flow
│   │   │   ├── orders/            # Order history & details
│   │   │   ├── order-confirmation/ # Order confirmation page
│   │   │   └── globals.css        # Tailwind v4 config
│   │   ├── (payload)/             # Payload admin routes
│   │   └── api/                   # API routes
│   │       ├── orders/            # Order management APIs
│   │       ├── payment/           # Payment processing
│   │       └── email/             # Email notifications
│   ├── collections/               # Payload collections
│   │   ├── Users.ts               # Admin users
│   │   ├── Media.ts               # Image uploads
│   │   ├── Products.ts            # Product catalog
│   │   ├── Categories.ts          # Product categories
│   │   ├── Orders.ts              # Order management
│   │   └── Refunds.ts             # Refund processing
│   ├── components/
│   │   ├── ui/                    # Shadcn UI components
│   │   ├── layout/                # Layout components (Header, Footer)
│   │   ├── product/               # Product components
│   │   ├── features/              # Feature components (cart, checkout, etc.)
│   │   ├── providers/             # Context providers (Wallet, Theme)
│   │   ├── ComponentShowcase.tsx  # Design system demo
│   │   └── DesignTokenTest.tsx    # Token visualization
│   ├── lib/
│   │   ├── utils.ts               # Utility functions
│   │   ├── prisma.ts              # Prisma client
│   │   └── store/                 # Zustand stores (cart)
│   └── payload.config.ts          # Payload configuration
├── components.json                # Shadcn UI config
├── postcss.config.mjs             # PostCSS config
└── package.json                   # Dependencies
```

## 🎨 Design System

### Colors
- **Primary:** Blue (#2563EB)
- **Success:** Green (#10B981)
- **Warning:** Amber (#F59E0B)
- **Error:** Red (#EF4444)

### Typography
- **UI Font:** Inter (Google Fonts)
- **Monospace:** JetBrains Mono (wallet addresses, transaction IDs)

### Spacing
- Base unit: 4px
- Scale: xs (4px), sm (8px), md (16px), lg (24px), xl (32px), 2xl (48px), 3xl (64px)

### Accessibility
- WCAG 2.1 AA compliant
- Minimum touch targets: 44x44px
- Keyboard navigation support
- Screen reader compatible

## 🗄️ Database Schema

### Collections

- **Users:** Admin authentication with role-based access control
- **Media:** Image uploads with automatic resizing via Sharp
- **Categories:** Product categorization (Fresh, Dry) with slugs
- **Products:** Full product catalog with pricing, inventory, images, and relationships
- **Orders:** Complete order management with status tracking, payment info, and fulfillment
- **Refunds:** Refund processing with transaction tracking and admin notes

### Key Fields

**Products:**
- `price_elurc` (Int) - Price in lamports
- `price_eur` (Int) - Price in cents
- `stock` (Int) - Inventory quantity
- `in_stock` (Boolean) - Availability status
- `images` (Array) - Product images
- `category` (Relationship) - Product category

**Orders:**
- `orderNumber` (String) - Unique order identifier
- `status` (Select) - Order status (pending, paid, fulfilled, etc.)
- `items` (Array) - Order items with product relationships
- `shippingAddress` (Group) - Customer shipping details
- `transactionSignature` (String) - Solana transaction hash
- `paymentDiscrepancy` (Group) - Overpayment/underpayment handling
- `statusHistory` (Array) - Complete audit trail

**Refunds:**
- `refundNumber` (String) - Unique refund identifier
- `order` (Relationship) - Associated order
- `amount` (Number) - Refund amount in ELURC
- `status` (Select) - Refund status
- `transactionSignature` (String) - Refund transaction hash

## 📝 Available Scripts

```bash
# Development
yarn dev              # Start dev server
yarn devsafe          # Clean .next and start dev

# Build & Production
yarn build            # Build for production
yarn start            # Start production server

# Database
yarn prisma generate  # Generate Prisma client
yarn prisma db push   # Push schema to database
yarn prisma studio    # Open Prisma Studio

# Payload CMS
yarn generate:types       # Generate TypeScript types
yarn generate:importmap   # Generate import map
yarn payload              # Payload CLI

# Testing
yarn test             # Run all tests
yarn test:int         # Run integration tests
yarn test:e2e         # Run E2E tests (Playwright)

# Code Quality
yarn lint             # Run ESLint
```

## 🔧 Configuration Files

- **Tailwind CSS v4:** Configured via `@import` in `globals.css`
- **Shadcn UI:** `components.json`
- **Prisma:** `prisma/schema.prisma`
- **PayloadCMS:** `src/payload.config.ts`
- **TypeScript:** `tsconfig.json`
- **ESLint:** `eslint.config.mjs`

## 📚 Documentation

- **Setup Guide:** `SETUP-STATUS.md`
- **Migration Notes:** `MIGRATION-VERIFICATION.md`
- **Payload Rules:** `AGENTS.md`
- **Story Details:** `_bmad-output/implementation-artifacts/`

## � API Routes

### Public APIs
- `GET /api/orders/history?wallet={address}` - Fetch order history by wallet
- `GET /api/orders/[id]` - Get order details
- `POST /api/orders/create` - Create new order
- `POST /api/payment/verify` - Verify Solana transaction
- `POST /api/email/order-confirmation` - Send order confirmation email

### Admin APIs (Protected)
- Order management via PayloadCMS admin panel
- Refund processing via PayloadCMS admin panel
- Product/Category CRUD via PayloadCMS admin panel

## 🤝 Contributing

This is a solo development project following the BMAD (Business Model-Agile Development) methodology with AI-assisted development.

## 📄 License

MIT

## 🔗 Resources

- [PayloadCMS Docs](https://payloadcms.com/docs)
- [Next.js 15 Docs](https://nextjs.org/docs)
- [Tailwind CSS v4](https://tailwindcss.com)
- [Prisma Docs](https://www.prisma.io/docs)
- [Solana Docs](https://docs.solana.com)

---

**Last Updated:** January 20, 2026  
**Current Status:** All core features complete  
**Next Steps:** Testing, deployment preparation, and production optimization
