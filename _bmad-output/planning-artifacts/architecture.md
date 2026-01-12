---
stepsCompleted: ['step-01-init', 'step-02-context', 'step-03-starter', 'step-04-decisions', 'step-05-patterns']
inputDocuments: ['_bmad-output/planning-artifacts/prd.md', '_bmad-output/design-artifacts/ux-design-overview.md', '_bmad-output/design-artifacts/information-architecture.md', '_bmad-output/design-artifacts/user-flows.md']
workflowType: 'architecture'
project_name: 'elurc-market'
user_name: 'Thomas'
date: '2026-01-12'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**
The platform requires 50 functional capabilities spanning the complete e-commerce journey with crypto payment integration. Core capabilities include:

- **Product Discovery (FR1-FR5):** Category-based browsing, product details, ELURC pricing with euro conversion, stock visibility
- **Shopping Cart (FR6-FR10):** Add/remove/adjust items, real-time total calculation
- **Checkout & Payment (FR11-FR18):** Phantom wallet connection, shipping address capture, QR code payment, blockchain transaction monitoring and validation, sub-60-second confirmation
- **Order Management (FR19-FR23):** Admin order viewing, status tracking, fulfillment workflow, transaction details
- **Product & Inventory (FR24-FR29):** PayloadCMS-based catalog management, inventory tracking, ELURC pricing
- **Payment Operations (FR30-FR37):** Transaction history, blockchain verification, refund processing, overpayment/underpayment detection and handling
- **UX & Accessibility (FR38-FR42):** Mobile/tablet/desktop responsive design, keyboard navigation, screen reader support, WCAG 2.1 AA compliance
- **SEO (FR43-FR46):** SSR pages, dynamic meta tags, structured data, XML sitemap
- **Security (FR47-FR50):** HTTPS connections, error handling, audit logging, duplicate payment prevention

**Non-Functional Requirements:**
Critical NFRs that will drive architectural decisions:

- **Payment Reliability (NFR-R1-R3):** 100% transaction detection reliability, 99.9% validation accuracy, zero false confirmations
- **Performance (NFR-P1-P10):** Page load < 3s on 4G, TTI < 4s, payment confirmation < 60s, blockchain polling every 5-10s, Core Web Vitals compliance (LCP < 2.5s, FID < 100ms, CLS < 0.1)
- **Security (NFR-S1-S11):** HTTPS/TLS 1.3, secure Phantom SDK integration, transaction audit logging, wallet key protection, admin authentication, access control
- **Scalability (NFR-SC1-SC7):** 10 concurrent users (3-month), 50 concurrent users (12-month), 100 transactions/day capacity, 10x growth headroom
- **Accessibility (NFR-A1-A9):** WCAG 2.1 AA compliance, keyboard navigation, 4.5:1 contrast ratios, screen reader compatibility, 44x44px touch targets
- **Integration (NFR-I1-I12):** Solana RPC 99.9% uptime, Phantom wallet SDK latest stable, PayloadCMS API < 200ms, email delivery 99% success rate
- **Reliability (NFR-R4-R12):** 99% uptime, graceful blockchain downtime handling, immediate order persistence, immutable transaction logs
- **Maintainability (NFR-M1-M6):** Next.js/React best practices, modular components, unit test coverage, documented APIs and deployment

**Scale & Complexity:**

- **Primary domain:** Full-stack web application (Next.js/React + API routes + Solana blockchain integration)
- **Complexity level:** Medium-High
- **Estimated architectural components:** 8-10 major components
  - Frontend: Customer-facing web app (Next.js/React)
  - Frontend: Admin panel (embedded or separate)
  - Backend: API layer (Next.js API routes or separate)
  - Integration: PayloadCMS (headless CMS)
  - Integration: Solana blockchain monitoring service
  - Integration: Phantom wallet SDK
  - Integration: Email service
  - Data: Product catalog database
  - Data: Order/transaction database
  - Infrastructure: Hosting, CDN, monitoring

### Technical Constraints & Dependencies

**Required Integrations:**
- **PayloadCMS:** Headless CMS for product catalog, inventory, and content management
- **Solana Blockchain:** ELURC token transactions on Solana mainnet
- **Phantom Wallet:** Primary wallet for customer authentication and payments (desktop + mobile)
- **Email Service:** Transactional emails for order confirmations, refunds, support

**Technology Preferences (from user rules):**
- **Frontend:** React, Next.js, TypeScript, TailwindCSS, Shadcn/UI, Radix
- **Package Manager:** Yarn v4.5
- **Blockchain:** Solidity, Wagmi, Viem, Hardhat, Infura, OpenZeppelin libraries
- **Code Style:** DRY principle, early returns, descriptive naming, accessibility-first

**Performance Constraints:**
- Mobile-first design with 4G network optimization
- Real-time payment monitoring without blocking UI
- Sub-60-second payment confirmation requirement
- Core Web Vitals compliance for SEO

**Security Constraints:**
- Wallet private keys never exposed client-side
- HTTPS/TLS 1.3 minimum
- Transaction audit logging required
- Admin panel authentication required

### Cross-Cutting Concerns Identified

**1. Real-Time Payment Monitoring:**
- Affects: Checkout flow, order management, transaction history
- Requirement: Poll Solana blockchain every 5-10 seconds, detect transactions within 60 seconds
- Challenge: Reliable detection without missing transactions, handling network issues

**2. Payment Edge Case Handling:**
- Affects: Checkout, order management, support operations, customer communication
- Scenarios: Overpayment, underpayment, timeout, cancellation, refunds
- Requirement: Transparent handling with customer notifications and admin tools

**3. Mobile-First Responsive Design:**
- Affects: All customer-facing pages, checkout flow, product catalog
- Requirement: Touch-friendly (44x44px targets), optimized for mobile performance, progressive enhancement

**4. Accessibility Compliance:**
- Affects: All UI components, navigation, forms, interactive elements
- Requirement: WCAG 2.1 AA compliance, keyboard navigation, screen reader support, color contrast

**5. ELURC-EUR Conversion Display:**
- Affects: Product catalog, cart, checkout, order confirmation, admin panel
- Requirement: Real-time or cached conversion rates, consistent display format

**6. Email Notifications:**
- Affects: Order confirmation, payment issues, refunds, shipping updates
- Requirement: 99% delivery rate, sent within 1 minute, multi-client compatibility

**7. Transaction Audit & Transparency:**
- Affects: Payment processing, refunds, order management, support operations
- Requirement: Immutable transaction logs, Solana blockchain verification, Telegram transparency feed

**8. Admin Authentication & Authorization:**
- Affects: Admin panel, product management, order fulfillment, refund processing
- Requirement: Secure authentication, role-based access control, protected endpoints

## Starter Template Evaluation

### Primary Technology Domain

Full-stack web application based on project requirements: Next.js/React frontend with API routes for backend logic, integrated with Solana blockchain for ELURC payment processing.

### Starter Options Considered

**Option 1: create-next-app (Official Next.js CLI)**
- Official Next.js starter with TypeScript, Tailwind CSS, App Router
- Minimal, clean foundation with maximum flexibility
- Latest Next.js features and optimizations

**Option 2: create-t3-app (T3 Stack)**
- Full-stack starter with tRPC, Prisma/Drizzle, NextAuth.js
- Type-safe API patterns and authentication built-in
- More opinionated architecture

### Selected Starter: create-next-app

**Rationale for Selection:**

The official create-next-app starter is the optimal choice for elurc-market because:

1. **PayloadCMS Compatibility:** PayloadCMS manages its own database and content structure. Starting with a minimal setup avoids conflicts with opinionated ORMs like Prisma or Drizzle that come with T3 stack.

2. **Blockchain-First Architecture:** The core technical complexity is Solana blockchain integration (Wagmi, Viem, Phantom wallet SDK, real-time transaction monitoring). Neither starter provides blockchain tooling, so custom implementation is required regardless. A minimal foundation provides maximum flexibility for this unique architecture.

3. **Wallet-Based Authentication:** The application uses Phantom wallet connection as the primary authentication mechanism, not traditional session-based auth. This doesn't align with NextAuth.js patterns that come with T3 stack.

4. **Custom Requirements:** Real-time payment monitoring, blockchain polling, edge case handling (overpayment/underpayment), and ELURC-EUR conversion are all custom features that benefit from architectural freedom rather than framework constraints.

5. **Technology Alignment:** The project already has clear technology preferences (React, Next.js, TypeScript, TailwindCSS, Shadcn/UI, Radix). The minimal starter provides exactly these without additional opinions.

**Initialization Command:**

```bash
npx create-next-app@latest elurc-market --typescript --tailwind --app --src-dir --import-alias "@/*"
```

**Command Options Explained:**
- `--typescript`: Enable TypeScript
- `--tailwind`: Include Tailwind CSS
- `--app`: Use App Router (recommended for new projects)
- `--src-dir`: Use src/ directory for better organization
- `--import-alias "@/*"`: Configure path aliases for clean imports

**Architectural Decisions Provided by Starter:**

**Language & Runtime:**
- TypeScript with strict mode enabled
- Node.js runtime with Next.js 15+ (latest)
- React 19+ with Server Components support
- Modern ES modules

**Styling Solution:**
- Tailwind CSS v4 pre-configured
- PostCSS for CSS processing
- CSS Modules support built-in
- Ready for Shadcn/UI and Radix component integration

**Build Tooling:**
- Turbopack for fast development (experimental)
- Webpack for production builds
- Automatic code splitting and optimization
- Image optimization built-in
- Font optimization with next/font

**Testing Framework:**
- No testing framework included (to be added based on preferences)
- Ready for Jest, Vitest, or Playwright integration

**Code Organization:**
- src/ directory structure:
  - `src/app/` - App Router pages and layouts
  - `src/components/` - React components (to be created)
  - `src/lib/` - Utility functions and shared logic (to be created)
  - `src/styles/` - Global styles and Tailwind config
- Import alias `@/*` configured for clean imports

**Development Experience:**
- Hot Module Replacement (HMR) with Fast Refresh
- TypeScript language server integration
- ESLint with Next.js-specific rules
- Automatic TypeScript error checking
- Development server with Turbopack

**Additional Setup Required:**
- Shadcn/UI component library installation
- Solana blockchain integration (Wagmi, Viem)
- Phantom wallet SDK integration
- PayloadCMS setup and configuration
- Email service integration
- Database setup for orders/transactions
- Environment variable configuration

**Note:** Project initialization using this command should be the first implementation story.

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**
- Database and ORM selection
- Payment monitoring architecture
- State management approach
- Admin authentication method
- Hosting and deployment platform
- Email service integration

**Important Decisions (Shape Architecture):**
- Blockchain library choices (Wagmi, Viem)
- Component library (Shadcn/UI, Radix)
- ELURC-EUR conversion caching strategy
- Error handling patterns

**Deferred Decisions (Post-MVP):**
- Advanced caching strategies
- CDN configuration
- Monitoring and observability tools
- Testing framework selection
- CI/CD pipeline details

### Data Architecture

**Database: Supabase PostgreSQL**
- **Version:** Latest stable (PostgreSQL 15+)
- **Rationale:** Free tier sufficient for POC (500 MB database, 2 GB bandwidth/month), scales to production, includes bonus features (auth, storage, real-time) for future use
- **Use Cases:**
  - PayloadCMS data storage (products, categories, inventory)
  - Order and transaction records
  - Customer shipping information
  - Admin user accounts
- **Hosting:** Supabase cloud (managed PostgreSQL)
- **Connection:** Pooled connections via Supabase connection string

**ORM: Prisma**
- **Version:** 7.2.0 (latest stable)
- **Rationale:** Type-safe database queries, auto-generated TypeScript types, excellent Next.js integration, migration management, PayloadCMS compatibility
- **Features Used:**
  - Schema-first development
  - Type-safe client generation
  - Migration system for version control
  - Relation management
  - Query optimization
- **Integration:** Works seamlessly with Supabase PostgreSQL and PayloadCMS

**Data Validation:**
- **Schema Level:** Prisma schema with strict types
- **Application Level:** Zod for runtime validation (API routes, form inputs)
- **Database Level:** PostgreSQL constraints and triggers

**Caching Strategy:**
- **ELURC-EUR Conversion:** Cache exchange rate for 5 minutes (API route with in-memory cache or Vercel KV)
- **Product Catalog:** PayloadCMS handles caching, leverage Next.js ISR for product pages
- **Static Assets:** Vercel CDN automatic caching

**Migration Approach:**
- Prisma migrations tracked in Git
- Development: `prisma migrate dev`
- Production: `prisma migrate deploy` in CI/CD
- PayloadCMS migrations handled separately

### Authentication & Security

**Customer Authentication:**
- **Method:** Wallet-based (Phantom wallet connection)
- **Implementation:** Wallet address as user identifier, no traditional login
- **Session:** Client-side wallet connection state (Zustand + localStorage)
- **Rationale:** Aligns with crypto-native UX, no password management, wallet = identity

**Admin Authentication:**
- **Method:** PayloadCMS built-in authentication
- **Implementation:** Email/password with PayloadCMS auth system
- **Features:** Role-based access control, session management, secure password hashing
- **Rationale:** Proven, secure, no need to build custom admin auth

**API Security:**
- **API Routes:** Protected with middleware checking wallet signatures (customer) or PayloadCMS session (admin)
- **CORS:** Configured for production domain only
- **Rate Limiting:** Vercel Edge Config for basic rate limiting on payment endpoints
- **Environment Variables:** Sensitive keys (Supabase, Solana RPC, shop wallet private key) stored in Vercel environment variables

**Data Encryption:**
- **In Transit:** HTTPS/TLS 1.3 enforced by Vercel
- **At Rest:** Supabase handles database encryption
- **Sensitive Data:** Shop wallet private key never exposed to client, stored in Vercel environment variables

### Payment Monitoring Architecture

**Approach: Client-Side Polling**
- **Implementation:** Frontend polls Next.js API route every 5-10 seconds during checkout
- **API Route:** `/api/payment/check` - queries Solana blockchain for transactions to shop wallet
- **Blockchain Library:** @solana/web3.js with Wagmi/Viem for wallet interactions
- **RPC Provider:** Infura or Alchemy for Solana RPC access
- **Rationale:** Simple implementation, real-time user feedback, no background job infrastructure needed for MVP

**Payment Detection Flow:**
1. User initiates checkout, creates pending order in database (Prisma)
2. Frontend displays QR code and shop wallet address
3. User sends ELURC from Phantom wallet
4. Frontend polls `/api/payment/check?orderId=xxx` every 5 seconds
5. API route queries Solana blockchain for transactions to shop wallet
6. When transaction detected and validated:
   - Verify amount matches order total
   - Verify sender wallet matches order
   - Confirm transaction on blockchain
   - Update order status to "paid" in database
   - Return success to frontend
7. Frontend shows payment confirmation, stops polling

**Edge Case Handling:**
- **Overpayment:** Detect difference, flag for manual refund by admin
- **Underpayment:** Mark order as "insufficient payment", notify customer
- **Timeout:** Stop polling after 10 minutes, preserve cart, allow retry
- **Duplicate Detection:** Check transaction hash to prevent double-processing

**Transaction Validation:**
- Verify transaction exists on Solana blockchain
- Confirm transaction is finalized (not pending)
- Validate recipient address matches shop wallet
- Validate amount in ELURC matches order total
- Log transaction hash for audit trail

### API & Communication Patterns

**API Design: REST with Next.js API Routes**
- **Pattern:** RESTful endpoints using Next.js App Router route handlers
- **Location:** `src/app/api/` directory
- **Response Format:** JSON with consistent structure `{ success, data, error }`
- **Rationale:** Simple, built-in to Next.js, no additional framework needed

**Key API Endpoints:**
- `POST /api/cart` - Create/update cart
- `POST /api/checkout` - Initiate checkout, create pending order
- `GET /api/payment/check` - Poll for payment confirmation
- `POST /api/payment/refund` - Admin refund processing
- `GET /api/products` - Product catalog (proxied from PayloadCMS)
- `GET /api/conversion/elurc-eur` - Get cached ELURC-EUR exchange rate

**Error Handling:**
- Consistent error response format
- HTTP status codes: 200 (success), 400 (validation), 401 (auth), 404 (not found), 500 (server error)
- User-friendly error messages
- Detailed error logging (Vercel logs)

**Rate Limiting:**
- Payment check endpoint: Max 120 requests/minute per IP (one every 0.5 seconds)
- Checkout endpoint: Max 10 requests/minute per wallet address
- Implemented via Vercel Edge Config or simple in-memory store

### Frontend Architecture

**State Management: Zustand**
- **Version:** 5.0.10 (latest stable)
- **Rationale:** Lightweight (< 1KB), TypeScript-first, simple API, perfect for cart/wallet/payment state
- **Stores:**
  - `useCartStore` - Shopping cart items, quantities, totals
  - `useWalletStore` - Wallet connection status, address, balance
  - `useCheckoutStore` - Checkout flow state, payment status, order details
- **Persistence:** localStorage for cart (survive page refresh)
- **Integration:** Works seamlessly with React Server Components and Client Components

**Component Architecture:**
- **Pattern:** Atomic design with Shadcn/UI components
- **Structure:**
  - `src/components/ui/` - Shadcn/UI primitives (Button, Card, Input, etc.)
  - `src/components/features/` - Feature-specific components (ProductCard, CartItem, WalletConnect, etc.)
  - `src/components/layout/` - Layout components (Header, Footer, Navigation)
- **Server vs Client:** Maximize Server Components, use Client Components only for interactivity (cart, wallet, forms)

**Routing:**
- Next.js App Router (file-based routing)
- Server-side rendering for SEO (product pages, catalog)
- Client-side navigation for cart and checkout

**Performance Optimization:**
- Next.js automatic code splitting
- Image optimization with `next/image`
- Font optimization with `next/font`
- Lazy loading for non-critical components
- ISR (Incremental Static Regeneration) for product pages

**Bundle Optimization:**
- Tree-shaking enabled by default
- Dynamic imports for heavy libraries (Solana SDK, wallet adapters)
- Minimize client-side JavaScript

### Infrastructure & Deployment

**Hosting: Vercel Pro**
- **Platform:** Vercel (Next.js optimized)
- **Plan:** Pro plan (already available)
- **Features:** Automatic deployments, preview deployments, edge functions, analytics
- **Regions:** Auto-selected based on user location

**Database: Supabase**
- **Hosting:** Supabase cloud (managed PostgreSQL)
- **Plan:** Free tier for POC, scale to Pro when needed
- **Backup:** Automatic daily backups via Supabase

**Environment Configuration:**
- **Development:** `.env.local` (not committed to Git)
- **Production:** Vercel environment variables
- **Required Variables:**
  - `DATABASE_URL` - Supabase connection string
  - `SOLANA_RPC_URL` - Infura/Alchemy Solana RPC endpoint
  - `SHOP_WALLET_ADDRESS` - Public address for receiving ELURC
  - `SHOP_WALLET_PRIVATE_KEY` - Private key for refunds (server-side only)
  - `RESEND_API_KEY` - Resend email API key
  - `PAYLOAD_SECRET` - PayloadCMS secret key
  - `NEXT_PUBLIC_SOLANA_NETWORK` - mainnet-beta or devnet

**CI/CD Pipeline:**
- **Trigger:** Git push to main branch
- **Platform:** Vercel automatic deployments
- **Steps:**
  1. Install dependencies (yarn)
  2. Run Prisma migrations
  3. Build Next.js app
  4. Deploy to Vercel edge network
- **Preview Deployments:** Automatic for pull requests

**Monitoring & Logging:**
- **Application Logs:** Vercel logs (automatic)
- **Error Tracking:** Vercel Analytics (included in Pro plan)
- **Performance:** Vercel Speed Insights
- **Database:** Supabase dashboard metrics

**Scaling Strategy:**
- **MVP (10 users):** Free/Pro tiers sufficient
- **Growth (50 users):** Monitor Supabase usage, upgrade if needed
- **Future:** Vercel auto-scales, Supabase connection pooling handles load

### Email Service Integration

**Service: Resend**
- **Version:** Latest API (v1)
- **Rationale:** Modern, developer-friendly, React email templates, generous free tier (100 emails/day), excellent Next.js integration
- **Free Tier:** 3,000 emails/month, sufficient for POC
- **Features:** Transactional emails, email templates, delivery tracking, webhooks

**Email Templates:**
- Order confirmation (payment received)
- Shipping notification
- Refund confirmation
- Underpayment/overpayment notifications
- Admin alerts (low stock, failed transactions)

**Implementation:**
- React Email for template design
- Send via Resend API from Next.js API routes
- Email sent within 1 minute of order confirmation (NFR requirement)

**Template Structure:**
```tsx
// src/emails/OrderConfirmation.tsx
import { Html, Head, Body, Container, Text } from '@react-email/components'
```

### Decision Impact Analysis

**Implementation Sequence:**
1. **Foundation:** Initialize Next.js project with create-next-app
2. **Database:** Set up Supabase, configure Prisma, run initial migrations
3. **CMS:** Install and configure PayloadCMS with Prisma adapter
4. **Blockchain:** Integrate Solana SDK, Phantom wallet connection
5. **State:** Set up Zustand stores for cart and wallet
6. **UI:** Install Shadcn/UI, build core components
7. **Payment:** Implement payment monitoring API route and client-side polling
8. **Email:** Configure Resend, create email templates
9. **Admin:** Set up PayloadCMS admin panel authentication
10. **Deployment:** Configure Vercel, set environment variables, deploy

**Cross-Component Dependencies:**

**Database → All Components:**
- Prisma schema defines data models for entire application
- PayloadCMS, orders, transactions all depend on database

**Wallet Connection → Payment Flow:**
- Wallet state (Zustand) required for checkout
- Wallet address used as customer identifier
- Payment monitoring depends on wallet signature verification

**Payment Monitoring → Order Management:**
- Order status updates trigger email notifications
- Admin panel displays payment status from monitoring system
- Refund operations depend on transaction history

**State Management → UI Components:**
- Cart state drives product list, totals, checkout button
- Wallet state controls navigation and checkout access
- Payment status state updates UI in real-time

**Email Service → Multiple Flows:**
- Order confirmation depends on payment detection
- Refund notifications depend on admin actions
- All customer communications routed through Resend

## Implementation Patterns & Consistency Rules

### Pattern Categories Defined

**Critical Conflict Points Identified:** 8 major areas where AI agents could make different implementation choices that would cause conflicts.

These patterns ensure that multiple AI agents working on different parts of the codebase produce compatible, consistent code.

### Naming Patterns

**Database Naming Conventions (Prisma):**

- **Tables:** `snake_case` plural
  - ✅ `products`, `order_items`, `transactions`
  - ❌ `Product`, `OrderItem`, `transaction`
- **Columns:** `snake_case`
  - ✅ `user_id`, `created_at`, `wallet_address`
  - ❌ `userId`, `createdAt`, `walletAddress`
- **Relations:** Follow Prisma conventions
  - ✅ `@relation("OrderToItems")`
- **Indexes:** `idx_table_column` format
  - ✅ `idx_products_category`, `idx_orders_wallet_address`
- **Foreign Keys:** `table_id` format
  - ✅ `product_id`, `order_id`, `user_id`

**API Naming Conventions:**

- **Endpoints:** `/api/resource` plural, kebab-case for multi-word
  - ✅ `/api/products`, `/api/order-items`, `/api/payment/check`
  - ❌ `/api/product`, `/api/orderItems`, `/api/Payment/Check`
- **Route Parameters:** camelCase in query strings
  - ✅ `?orderId=123&walletAddress=0x...`
  - ❌ `?order_id=123&wallet_address=0x...`
- **HTTP Methods:** Standard REST conventions
  - GET for retrieval, POST for creation, PUT/PATCH for updates, DELETE for removal
- **Headers:** PascalCase with hyphens
  - ✅ `X-Wallet-Signature`, `Content-Type`

**Code Naming Conventions (TypeScript):**

- **Components:** PascalCase
  - ✅ `ProductCard.tsx`, `WalletConnect.tsx`, `CheckoutFlow.tsx`
  - ❌ `productCard.tsx`, `wallet-connect.tsx`
- **Files:** Match component name exactly
  - ✅ `ProductCard.tsx` exports `ProductCard`
- **Functions:** camelCase, descriptive verb-noun
  - ✅ `getUserData`, `validateTransaction`, `formatElurPrice`
  - ❌ `get_user_data`, `ValidateTransaction`, `format_elur_price`
- **Variables:** camelCase
  - ✅ `userId`, `cartItems`, `walletAddress`, `isLoading`
  - ❌ `user_id`, `cart_items`, `WalletAddress`
- **Constants:** UPPER_SNAKE_CASE
  - ✅ `SHOP_WALLET_ADDRESS`, `MAX_RETRY_ATTEMPTS`, `POLLING_INTERVAL_MS`
  - ❌ `shopWalletAddress`, `maxRetryAttempts`
- **Types/Interfaces:** PascalCase, descriptive
  - ✅ `Product`, `OrderItem`, `WalletConnection`, `PaymentStatus`
  - ❌ `product`, `orderitem`, `IWalletConnection`
- **Enums:** PascalCase for enum, UPPER_SNAKE_CASE for values
  - ✅ `enum OrderStatus { PENDING = 'PENDING', PAID = 'PAID' }`

**Zustand Store Naming:**

- **Store Hooks:** `use[Domain]Store`
  - ✅ `useCartStore`, `useWalletStore`, `useCheckoutStore`
- **Store Actions:** camelCase verbs
  - ✅ `addToCart`, `removeFromCart`, `connectWallet`, `updatePaymentStatus`
- **Store State:** camelCase nouns
  - ✅ `items`, `total`, `isConnected`, `address`, `paymentStatus`

### Structure Patterns

**Project Organization:**

```
src/
├── app/                    # Next.js App Router
│   ├── (routes)/          # Route groups
│   ├── api/               # API routes
│   └── layout.tsx         # Root layout
├── components/
│   ├── ui/                # Shadcn/UI primitives (Button, Card, Input)
│   ├── features/          # Feature-specific components
│   │   ├── cart/         # Cart-related components
│   │   ├── checkout/     # Checkout flow components
│   │   ├── products/     # Product display components
│   │   └── wallet/       # Wallet connection components
│   └── layout/            # Layout components (Header, Footer, Nav)
├── lib/
│   ├── prisma.ts          # Prisma client singleton
│   ├── solana.ts          # Solana connection utilities
│   ├── utils.ts           # General utilities
│   └── validators.ts      # Zod schemas for validation
├── stores/                 # Zustand stores
│   ├── cart.ts
│   ├── wallet.ts
│   └── checkout.ts
├── types/                  # TypeScript type definitions
│   ├── api.ts             # API response types
│   ├── database.ts        # Database model types
│   └── wallet.ts          # Wallet-related types
├── emails/                 # React Email templates
│   ├── OrderConfirmation.tsx
│   └── RefundNotification.tsx
└── styles/
    └── globals.css         # Global Tailwind styles
```

**File Organization Rules:**

- **Tests:** Co-located with source files as `*.test.ts` or `*.test.tsx`
  - ✅ `ProductCard.tsx` and `ProductCard.test.tsx` in same directory
- **Component Files:** One component per file, file name matches component name
- **Utility Files:** Group related utilities, export named functions
- **Type Files:** Group related types, export as named types
- **API Routes:** Mirror the URL structure in file system
  - `/api/products` → `src/app/api/products/route.ts`
  - `/api/payment/check` → `src/app/api/payment/check/route.ts`

**Configuration Files:**

- Root level: `package.json`, `tsconfig.json`, `tailwind.config.ts`, `next.config.js`
- Prisma: `prisma/schema.prisma`, `prisma/migrations/`
- Environment: `.env.local` (dev), `.env.example` (template)

### Format Patterns

**API Response Formats:**

**Standard Success Response:**
```typescript
{
  success: true,
  data: T  // Actual response data
}
```

**Standard Error Response:**
```typescript
{
  success: false,
  error: {
    message: string,  // User-friendly message
    code: string      // Error code for programmatic handling
  }
}
```

**HTTP Status Codes:**
- `200` - Success (GET, PUT, PATCH)
- `201` - Created (POST)
- `204` - No Content (DELETE)
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (missing/invalid auth)
- `404` - Not Found
- `500` - Internal Server Error

**Example API Responses:**
```typescript
// Success
{ success: true, data: { orderId: "123", status: "PAID" } }

// Error
{ success: false, error: { message: "Insufficient payment", code: "PAYMENT_INSUFFICIENT" } }
```

**Data Exchange Formats:**

- **JSON Field Naming:** camelCase
  - ✅ `{ userId: "123", walletAddress: "0x..." }`
  - ❌ `{ user_id: "123", wallet_address: "0x..." }`
- **Dates:** ISO 8601 strings
  - ✅ `"2026-01-12T10:30:00.000Z"`
  - ❌ Unix timestamps, custom formats
- **Booleans:** `true`/`false` (not `1`/`0` or `"true"`/`"false"`)
- **Null vs Undefined:** Use `null` for missing values in JSON, `undefined` only in TypeScript
- **Arrays:** Always use arrays for lists, even if single item
  - ✅ `{ items: [product] }`
  - ❌ `{ items: product }` when single item
- **Currency:** Store as smallest unit (e.g., lamports for ELURC), display with conversion
  - Database: `amount_lamports: bigint`
  - API: `{ amountElurc: "10.5", amountEur: "3.15" }`

**Prisma Schema Patterns:**

```prisma
model Product {
  id          String   @id @default(cuid())
  name        String
  price       Int      // Store in lamports
  created_at  DateTime @default(now())
  updated_at  DateTime @updatedAt
  
  @@index([category])
  @@map("products")
}
```

- Use `@map("table_name")` for snake_case table names
- Use `created_at`/`updated_at` for timestamps
- Use `String @id @default(cuid())` for IDs
- Use `Int` or `BigInt` for currency (lamports)

### Communication Patterns

**State Management Patterns (Zustand):**

```typescript
// Store definition
interface CartStore {
  items: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: string) => void
  clearCart: () => void
}

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  addToCart: (product) => set((state) => ({
    items: [...state.items, { ...product, quantity: 1 }]
  })),
  removeFromCart: (productId) => set((state) => ({
    items: state.items.filter(item => item.id !== productId)
  })),
  clearCart: () => set({ items: [] })
}))
```

**State Update Rules:**
- **Immutable Updates:** Always return new objects/arrays, never mutate
- **Action Naming:** Verb-based (add, remove, update, set, clear)
- **State Organization:** Group related state in same store
- **Persistence:** Use `persist` middleware for cart, wallet connection state

**Event Naming (if needed):**
- Format: `domain:action` (e.g., `payment:confirmed`, `cart:updated`)
- Use lowercase with colons for separation

### Process Patterns

**Error Handling Patterns:**

**API Route Error Handling:**
```typescript
export async function POST(request: Request) {
  try {
    // Business logic
    return Response.json({ success: true, data: result })
  } catch (error) {
    console.error('API Error:', error)
    return Response.json(
      { success: false, error: { message: 'Internal server error', code: 'INTERNAL_ERROR' } },
      { status: 500 }
    )
  }
}
```

**Client-Side Error Handling:**
```typescript
try {
  const response = await fetch('/api/checkout', { method: 'POST', body: JSON.stringify(data) })
  const result = await response.json()
  
  if (!result.success) {
    // Handle error
    toast.error(result.error.message)
    return
  }
  
  // Handle success
} catch (error) {
  toast.error('Network error. Please try again.')
}
```

**Error Boundary Pattern:**
- Use Next.js error.tsx for route-level error boundaries
- Use React Error Boundary for component-level errors
- Always log errors to console in development
- Never expose sensitive error details to users

**Loading State Patterns:**

**Component Loading States:**
```typescript
const [isLoading, setIsLoading] = useState(false)

// Naming: is[Action]ing
const [isConnecting, setIsConnecting] = useState(false)
const [isProcessing, setIsProcessing] = useState(false)
const [isFetching, setIsFetching] = useState(false)
```

**Global Loading States:**
- Use Zustand store for cross-component loading states
- Use React Suspense for data fetching where appropriate
- Show skeleton loaders for content, spinners for actions

**Validation Patterns:**

**Use Zod for Runtime Validation:**
```typescript
import { z } from 'zod'

const CheckoutSchema = z.object({
  walletAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  shippingAddress: z.object({
    street: z.string().min(1),
    city: z.string().min(1),
    postalCode: z.string().min(1)
  })
})

// Validate in API route
const validated = CheckoutSchema.safeParse(body)
if (!validated.success) {
  return Response.json(
    { success: false, error: { message: 'Invalid input', code: 'VALIDATION_ERROR' } },
    { status: 400 }
  )
}
```

**Form Validation:**
- Validate on submit, not on every keystroke (unless specific UX requirement)
- Show field-level errors inline
- Use Zod schemas for both client and server validation

### Enforcement Guidelines

**All AI Agents MUST:**

1. **Follow Naming Conventions:** Use exact naming patterns specified above for database, API, and code
2. **Use Standard Response Format:** All API routes must return `{ success, data?, error? }` format
3. **Implement Error Handling:** Every API route and async operation must have try-catch with proper error responses
4. **Maintain Type Safety:** Use TypeScript strictly, no `any` types without explicit justification
5. **Follow Project Structure:** Place files in correct directories as specified
6. **Use Immutable State Updates:** Never mutate Zustand state directly
7. **Validate Input:** Use Zod schemas for all API input validation
8. **Handle Loading States:** Implement loading indicators for all async operations
9. **Log Errors:** Always log errors to console with context
10. **Write Tests:** Co-locate test files with source files

**Pattern Enforcement:**

- **Code Review:** Check for pattern violations during PR review
- **Linting:** ESLint rules enforce naming conventions and code style
- **Type Checking:** TypeScript compiler enforces type safety
- **Testing:** Tests verify API response formats and error handling
- **Documentation:** Update this document when patterns evolve

**Pattern Violation Process:**

1. Identify violation during development or code review
2. Fix immediately if minor (naming, formatting)
3. Discuss with team if pattern needs updating
4. Update this document if pattern changes
5. Refactor existing code to match new pattern

### Pattern Examples

**Good Examples:**

**API Route:**
```typescript
// src/app/api/products/route.ts
export async function GET() {
  try {
    const products = await prisma.product.findMany()
    return Response.json({ success: true, data: products })
  } catch (error) {
    console.error('Failed to fetch products:', error)
    return Response.json(
      { success: false, error: { message: 'Failed to load products', code: 'FETCH_ERROR' } },
      { status: 500 }
    )
  }
}
```

**Component:**
```typescript
// src/components/features/products/ProductCard.tsx
interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
}

export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const [isAdding, setIsAdding] = useState(false)
  
  const handleAddToCart = async () => {
    setIsAdding(true)
    try {
      await onAddToCart(product)
      toast.success('Added to cart')
    } catch (error) {
      toast.error('Failed to add to cart')
    } finally {
      setIsAdding(false)
    }
  }
  
  return (
    <Card>
      <CardContent>
        <h3>{product.name}</h3>
        <p>{product.priceElurc} ELURC</p>
        <Button onClick={handleAddToCart} disabled={isAdding}>
          {isAdding ? 'Adding...' : 'Add to Cart'}
        </Button>
      </CardContent>
    </Card>
  )
}
```

**Zustand Store:**
```typescript
// src/stores/cart.ts
interface CartStore {
  items: CartItem[]
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      addItem: (product) => set((state) => ({
        items: [...state.items, { ...product, quantity: 1 }]
      })),
      removeItem: (productId) => set((state) => ({
        items: state.items.filter(item => item.id !== productId)
      }))
    }),
    { name: 'cart-storage' }
  )
)
```

**Anti-Patterns (What to Avoid):**

❌ **Inconsistent Naming:**
```typescript
// BAD: Mixed naming conventions
const user_id = getUserID()  // snake_case variable, PascalCase function
const Products = []          // PascalCase for variable
```

❌ **Non-Standard API Response:**
```typescript
// BAD: Custom response format
return Response.json({ result: data, ok: true })  // Should use { success, data }
```

❌ **Mutating State:**
```typescript
// BAD: Direct mutation
const addToCart = (item) => {
  state.items.push(item)  // Mutates array directly
}

// GOOD: Immutable update
const addToCart = (item) => set((state) => ({
  items: [...state.items, item]
}))
```

❌ **Missing Error Handling:**
```typescript
// BAD: No error handling
export async function POST(request: Request) {
  const data = await request.json()
  const result = await processPayment(data)
  return Response.json(result)  // What if processPayment throws?
}
```

❌ **Using `any` Type:**
```typescript
// BAD: Loses type safety
const processData = (data: any) => { ... }

// GOOD: Proper typing
const processData = (data: Product) => { ... }
```

❌ **Hardcoded Values:**
```typescript
// BAD: Magic numbers
setTimeout(checkPayment, 5000)

// GOOD: Named constants
const PAYMENT_CHECK_INTERVAL_MS = 5000
setTimeout(checkPayment, PAYMENT_CHECK_INTERVAL_MS)
```

