---
stepsCompleted: ['step-01-validate-prerequisites']
inputDocuments: 
  - '_bmad-output/planning-artifacts/prd.md'
  - '_bmad-output/planning-artifacts/architecture.md'
  - '_bmad-output/design-artifacts/ux-design-overview.md'
  - '_bmad-output/implementation-artifacts/development-handoff.md'
---

# elurc-market - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for elurc-market, decomposing the requirements from the PRD, UX Design, Architecture, and Development Handoff documents into implementable stories.

## Requirements Inventory

### Functional Requirements

- **FR1**: Shoppers can browse the product catalog organized by categories (Fresh, Dry)
- **FR2**: Shoppers can view detailed product information including name, description, price in ELURC, and euro conversion
- **FR3**: Shoppers can filter products by category
- **FR4**: Shoppers can view product images
- **FR5**: Shoppers can see product availability status (in stock, out of stock)
- **FR6**: Shoppers can add products to their shopping cart
- **FR7**: Shoppers can remove products from their shopping cart
- **FR8**: Shoppers can adjust product quantities in their shopping cart
- **FR9**: Shoppers can view their cart total in ELURC with euro conversion
- **FR10**: Shoppers can proceed to checkout from their cart
- **FR11**: Shoppers can connect their Phantom wallet for authentication
- **FR12**: Shoppers can enter their shipping address during checkout
- **FR13**: Shoppers can view a QR code for ELURC payment
- **FR14**: Shoppers can see their wallet address displayed for manual payment
- **FR15**: The system can monitor the shop wallet for incoming ELURC transactions
- **FR16**: The system can validate ELURC transactions on the Solana blockchain
- **FR17**: Shoppers can receive real-time payment confirmation within 1 minute
- **FR18**: Shoppers can receive order confirmation via email
- **FR19**: Shop managers can view all incoming orders with customer details
- **FR20**: Shop managers can view order status (pending payment, paid, fulfilled, cancelled)
- **FR21**: Shop managers can mark orders as fulfilled
- **FR22**: Shop managers can view transaction details for each order (wallet address, ELURC amount, timestamp)
- **FR23**: Shop managers can send order status emails to customers
- **FR24**: Shop managers can create new products with name, description, price, category, and images
- **FR25**: Shop managers can edit existing product information
- **FR26**: Shop managers can remove products from the catalog
- **FR27**: Shop managers can set and update inventory levels for products
- **FR28**: Shop managers can categorize products (Fresh, Dry, etc.)
- **FR29**: Shop managers can set ELURC prices with automatic euro conversion display
- **FR30**: Support operators can view complete transaction history with wallet addresses and amounts
- **FR31**: Support operators can verify transactions on Solana blockchain explorer
- **FR32**: Support operators can initiate ELURC refunds to customer wallets
- **FR33**: Support operators can process partial refunds for overpayments
- **FR34**: Support operators can manually confirm orders for underpayment scenarios
- **FR35**: Support operators can cancel orders and issue full refunds
- **FR36**: Support operators can contact customers via email
- **FR37**: The system can detect overpayment and underpayment scenarios
- **FR38**: The platform can display responsively across mobile, tablet, and desktop devices
- **FR39**: The platform can provide keyboard navigation for all interactive elements
- **FR40**: The platform can provide screen reader support for all content
- **FR41**: The platform can maintain minimum color contrast ratios (WCAG 2.1 AA)
- **FR42**: The platform can provide alternative text for all images
- **FR43**: The platform can generate server-side rendered pages for product listings
- **FR44**: The platform can generate dynamic meta tags for products and categories
- **FR45**: The platform can generate structured data markup for products
- **FR46**: The platform can generate an XML sitemap for all products and categories
- **FR47**: The platform can establish secure HTTPS connections for all transactions
- **FR48**: The platform can handle errors gracefully with user-friendly messages
- **FR49**: The platform can log all payment transactions for audit purposes
- **FR50**: The platform can prevent duplicate payment processing for the same transaction

### Non-Functional Requirements

**Performance:**
- **NFR-P1**: Initial page load must complete in < 3 seconds on 4G mobile connections
- **NFR-P2**: Time to Interactive must be < 4 seconds on 4G mobile connections
- **NFR-P3**: Product catalog must load in < 2 seconds
- **NFR-P4**: Cart operations (add, remove, update) must respond in < 500ms
- **NFR-P5**: Payment confirmation must complete in < 1 minute from ELURC transaction
- **NFR-P6**: Largest Contentful Paint (LCP) must be < 2.5 seconds
- **NFR-P7**: First Input Delay (FID) must be < 100 milliseconds
- **NFR-P8**: Cumulative Layout Shift (CLS) must be < 0.1
- **NFR-P9**: Payment monitoring must poll Solana blockchain every 5-10 seconds
- **NFR-P10**: WebSocket connections (if used) must maintain < 100ms latency

**Security:**
- **NFR-S1**: All connections must use HTTPS/TLS 1.3 or higher
- **NFR-S2**: Wallet connections must use secure Phantom SDK protocols
- **NFR-S3**: All payment transactions must be logged for audit purposes
- **NFR-S4**: Customer email addresses must be stored securely and not exposed publicly
- **NFR-S5**: Payment detection must prevent duplicate transaction processing
- **NFR-S6**: Transaction validation must verify authenticity on Solana blockchain
- **NFR-S7**: Refund operations must require explicit authorization
- **NFR-S8**: Shop wallet private keys must never be exposed in client-side code
- **NFR-S9**: Admin panel must be protected with authentication
- **NFR-S10**: Order management functions must be restricted to shop managers
- **NFR-S11**: Transaction history must be accessible only to authorized support operators

**Scalability:**
- **NFR-SC1**: System must support 10 concurrent users without performance degradation (3-month target)
- **NFR-SC2**: System must support 50 concurrent users with < 10% performance degradation (12-month target)
- **NFR-SC3**: Database queries must remain performant with up to 1000 products
- **NFR-SC4**: Payment monitoring system must handle up to 100 transactions per day
- **NFR-SC5**: System must support 10x transaction growth without architectural changes
- **NFR-SC6**: CDN must handle static asset delivery for global access
- **NFR-SC7**: Database must support horizontal scaling for future growth

**Accessibility:**
- **NFR-A1**: All interactive elements must be keyboard navigable
- **NFR-A2**: Color contrast ratios must meet 4.5:1 for normal text, 3:1 for large text
- **NFR-A3**: All images must have descriptive alternative text
- **NFR-A4**: Screen readers must be able to access all content and functionality
- **NFR-A5**: Focus indicators must be visible on all interactive elements
- **NFR-A6**: Form inputs must have clear, associated labels
- **NFR-A7**: Touch targets must be minimum 44x44 pixels
- **NFR-A8**: Text must be resizable up to 200% without loss of functionality
- **NFR-A9**: Content must be accessible in both portrait and landscape orientations

**Integration:**
- **NFR-I1**: Solana blockchain integration must use reliable RPC providers with 99.9% uptime
- **NFR-I2**: Transaction validation must handle Solana network congestion gracefully
- **NFR-I3**: Blockchain polling must implement exponential backoff on rate limit errors
- **NFR-I4**: Phantom wallet SDK integration must support latest stable version
- **NFR-I5**: Wallet connection must provide clear error messages for connection failures
- **NFR-I6**: QR code generation must be compatible with Phantom mobile app
- **NFR-I7**: PayloadCMS API calls must complete in < 200ms for product queries
- **NFR-I8**: Inventory updates must sync with PayloadCMS within 5 seconds
- **NFR-I9**: Product catalog must support real-time updates from PayloadCMS
- **NFR-I10**: Order confirmation emails must be sent within 1 minute of payment confirmation
- **NFR-I11**: Email delivery must have 99% success rate
- **NFR-I12**: Email templates must render correctly across major email clients

**Reliability:**
- **NFR-R1**: Payment detection must achieve 100% reliability (no missed transactions)
- **NFR-R2**: Transaction validation must have 99.9% accuracy
- **NFR-R3**: Payment confirmation must never falsely confirm invalid transactions
- **NFR-R4**: Platform must maintain 99% uptime during business hours
- **NFR-R5**: Planned maintenance must be scheduled during low-traffic periods
- **NFR-R6**: System must gracefully handle Solana blockchain downtime
- **NFR-R7**: Order data must be persisted immediately upon payment confirmation
- **NFR-R8**: Inventory levels must remain consistent across all operations
- **NFR-R9**: Transaction logs must be immutable and auditable
- **NFR-R10**: All errors must be logged with sufficient context for debugging
- **NFR-R11**: User-facing errors must provide clear, actionable messages
- **NFR-R12**: Critical failures must trigger alerts to shop manager

**Maintainability:**
- **NFR-M1**: Code must follow established Next.js and React best practices
- **NFR-M2**: Components must be modular and reusable
- **NFR-M3**: Critical functions must have unit test coverage
- **NFR-M4**: API integrations must be documented with examples
- **NFR-M5**: Deployment process must be documented step-by-step
- **NFR-M6**: Environment configuration must be clearly documented

### Additional Requirements

**From Architecture Document:**

- **Starter Template**: Next.js project initialized with `create-next-app` using TypeScript, TailwindCSS, App Router, src/ directory, and @/* import alias (ALREADY COMPLETED - see elurc-market/ directory)
- **Database**: Supabase PostgreSQL with Prisma ORM for data persistence
- **CMS Integration**: PayloadCMS with Prisma adapter for product catalog and inventory management
- **Blockchain Integration**: Solana Web3.js SDK for ELURC transaction monitoring and validation
- **Wallet Integration**: Phantom Wallet SDK (@solana/wallet-adapter-react) for customer authentication
- **State Management**: Zustand for client state (cart, wallet), React Query for server state
- **Email Service**: Resend API with React Email templates for transactional emails
- **UI Components**: Shadcn/UI + Radix primitives for accessible component library
- **Icons**: Lucide React for consistent iconography
- **Forms**: React Hook Form + Zod for form validation
- **Deployment**: Vercel hosting with CDN for static assets
- **Monitoring**: Transaction audit logging, error tracking, admin alerts

**From UX Design Document:**

- **Design System**: Implement color palette (Primary Blue #2563EB, Success Green #10B981, Warning Amber #F59E0B, Error Red #EF4444)
- **Typography**: Inter font family for UI, JetBrains Mono for wallet addresses/transaction IDs
- **Spacing System**: 4px base unit with consistent scale (xs: 4px, sm: 8px, md: 16px, lg: 24px, xl: 32px, 2xl: 48px, 3xl: 64px)
- **Component Specifications**: Button heights (48px mobile, 44px desktop), Card styling (12px border radius, subtle shadows), Touch targets (minimum 44x44px)
- **Responsive Breakpoints**: Mobile-first design with tablet (768px) and desktop (1024px) breakpoints
- **Accessibility**: WCAG 2.1 AA compliance, keyboard navigation, screen reader support, focus indicators

**From Development Handoff Document:**

- **Implementation Phases**: 6-week MVP roadmap (Foundation → Product Catalog → Cart & Wallet → Checkout & Payment → Admin Panel → Edge Cases & Polish)
- **Critical Success Factors**: 100% payment detection, < 1 minute confirmation, mobile-first UX, WCAG 2.1 AA compliance, edge case handling, admin refund capability
- **Environment Configuration**: Solana RPC URL, Shop wallet address, ELURC token address, PayloadCMS secret, Resend API key, ELURC-EUR conversion rate
- **Testing Strategy**: Unit tests (utilities, hooks), Integration tests (API routes, database), E2E tests (checkout flow, payment), Accessibility tests (axe, Lighthouse)

### FR Coverage Map

{{requirements_coverage_map}}

## Epic List

### Epic 7: Deployment to Render.com

**User Value:** Enable the elurc-market POC to be accessible online for testing and validation with real users and stakeholders.

**Business Impact:** Validates the complete end-to-end flow in a production environment, enabling feedback collection and demonstrating technical feasibility of ELURC payment integration.

**Technical Scope:** Deploy Next.js application, PayloadCMS, and Supabase database to render.com infrastructure with full environment configuration, monitoring, and operational documentation.

**Dependencies:**
- Epic 1-6 must be substantially complete
- All core features functional in development
- Environment variables and secrets documented

**Acceptance Criteria:**
- Application accessible via public URL with HTTPS
- All payment flows working end-to-end
- Admin panel accessible and functional
- Monitoring and logging operational
- Deployment documentation complete

---

#### Story 7-1: Environment Configuration Setup

**As a** DevOps engineer  
**I want to** configure all environment variables for render.com deployment  
**So that** the application can connect to all required services securely

**Acceptance Criteria:**
- [ ] All environment variables documented in deployment guide
- [ ] Solana RPC URL configured (mainnet-beta or devnet)
- [ ] Shop wallet address set correctly
- [ ] ELURC token address configured
- [ ] PayloadCMS secret key generated and set
- [ ] Resend API key configured for email delivery
- [ ] Supabase database connection string configured
- [ ] ELURC-EUR conversion rate set
- [ ] Next.js environment variables properly prefixed (NEXT_PUBLIC_ where needed)
- [ ] Secrets stored securely in render.com environment

**Technical Notes:**
- Use render.com environment variable management
- Separate public vs private environment variables
- Document which variables are required vs optional

**Estimated Effort:** 2 hours

---

#### Story 7-2: Database Migration & Setup

**As a** developer  
**I want to** deploy and configure the Supabase PostgreSQL database  
**So that** the application has persistent data storage in production

**Acceptance Criteria:**
- [ ] Supabase project created for production
- [ ] Database connection string added to render.com environment
- [ ] Prisma migrations executed successfully
- [ ] Database schema matches development environment
- [ ] Initial product data seeded (if applicable)
- [ ] Database connectivity verified from render.com
- [ ] Connection pooling configured appropriately
- [ ] Database backups enabled

**Technical Notes:**
- Run `npx prisma migrate deploy` for production migrations
- Test connection with `npx prisma db pull` to verify schema
- Consider using Supabase connection pooler for serverless

**Estimated Effort:** 3 hours

---

#### Story 7-3: Render.com Service Configuration

**As a** DevOps engineer  
**I want to** create and configure the render.com web service  
**So that** the Next.js application is deployed and accessible

**Acceptance Criteria:**
- [ ] Render.com web service created
- [ ] Git repository connected to render.com
- [ ] Build command configured: `yarn install && yarn build`
- [ ] Start command configured: `yarn start`
- [ ] Node version specified (18.x or 20.x)
- [ ] Health check endpoint configured (`/api/health`)
- [ ] Auto-deploy enabled from main/production branch
- [ ] Build logs accessible and monitored
- [ ] Service successfully builds and starts

**Technical Notes:**
- Use render.com native Node.js environment
- Configure health check to verify app is responding
- Set appropriate instance size based on traffic expectations

**Estimated Effort:** 2 hours

---

#### Story 7-4: PayloadCMS Deployment

**As a** content manager  
**I want to** deploy PayloadCMS for product management  
**So that** I can manage products and inventory in production

**Acceptance Criteria:**
- [ ] PayloadCMS deployed (integrated with Next.js or separate service)
- [ ] Admin panel accessible at `/admin` route
- [ ] Admin authentication working
- [ ] Product collection accessible via API
- [ ] Prisma adapter connected to production database
- [ ] Media uploads configured (local or cloud storage)
- [ ] API endpoints responding correctly
- [ ] Admin user created for production access

**Technical Notes:**
- PayloadCMS runs within Next.js app (no separate deployment needed)
- Ensure `/admin` route is accessible
- Configure media storage strategy (local disk or S3-compatible)

**Estimated Effort:** 3 hours

---

#### Story 7-5: SSL/HTTPS & Domain Setup

**As a** user  
**I want to** access the application over secure HTTPS  
**So that** my payment and personal data is protected

**Acceptance Criteria:**
- [ ] HTTPS enabled on render.com service
- [ ] SSL/TLS certificate automatically provisioned
- [ ] Custom domain configured (if applicable)
- [ ] DNS records updated and propagated
- [ ] HTTP to HTTPS redirect enabled
- [ ] All API calls use HTTPS
- [ ] Mixed content warnings resolved
- [ ] Certificate auto-renewal verified

**Technical Notes:**
- Render.com provides automatic SSL certificates
- If using custom domain, configure CNAME or A record
- Verify NFR-S1 compliance (TLS 1.3 or higher)

**Estimated Effort:** 1 hour

---

#### Story 7-6: Monitoring & Logging Setup

**As a** site administrator  
**I want to** monitor application health and transaction logs  
**So that** I can detect and respond to issues quickly

**Acceptance Criteria:**
- [ ] Error tracking configured (render.com logs or external service)
- [ ] Transaction audit logging operational
- [ ] Payment detection logs visible and searchable
- [ ] Admin alerts configured for critical failures
- [ ] Solana blockchain polling monitored
- [ ] Database query performance logged
- [ ] Email delivery success/failure tracked
- [ ] Log retention policy configured

**Technical Notes:**
- Use render.com native logging initially
- Consider integrating Sentry or similar for error tracking
- Ensure transaction logs meet NFR-S3 (audit logging)

**Estimated Effort:** 3 hours

---

#### Story 7-7: Deployment Validation & Smoke Tests

**As a** QA engineer  
**I want to** validate all critical functionality in production  
**So that** I can confirm the deployment is successful

**Acceptance Criteria:**
- [ ] Homepage loads successfully
- [ ] Product catalog displays correctly
- [ ] Cart functionality works (add, remove, update)
- [ ] Phantom wallet connection successful
- [ ] Complete checkout flow tested end-to-end
- [ ] Test ELURC payment detected and confirmed
- [ ] Order confirmation email received
- [ ] Admin panel accessible and functional
- [ ] Product CRUD operations work
- [ ] Order management tested
- [ ] Performance metrics meet NFR targets (< 3s page load)
- [ ] Core Web Vitals validated (LCP, FID, CLS)
- [ ] Mobile responsiveness verified
- [ ] Accessibility audit passed (WCAG 2.1 AA)

**Technical Notes:**
- Use small test transaction amounts
- Test on multiple devices and browsers
- Run Lighthouse audit for performance and accessibility
- Verify payment detection within 1 minute (NFR-P5)

**Estimated Effort:** 4 hours

---

#### Story 7-8: Deployment Documentation

**As a** developer  
**I want to** comprehensive deployment documentation  
**So that** future deployments and troubleshooting are streamlined

**Acceptance Criteria:**
- [ ] Step-by-step deployment guide created
- [ ] Environment variables documented with descriptions
- [ ] Rollback procedures documented
- [ ] Common troubleshooting scenarios documented
- [ ] Database migration process documented
- [ ] Monitoring and alerting guide created
- [ ] Operational runbook created
- [ ] Emergency contact information documented
- [ ] Deployment checklist created

**Technical Notes:**
- Store documentation in `/docs/deployment/` directory
- Include screenshots for render.com configuration
- Document both initial deployment and update procedures

**Estimated Effort:** 3 hours

---

#### Story 7-9: POC Deployed

**As a** product owner  
**I want to** confirm the POC is fully deployed and operational  
**So that** stakeholders can access and test the live application

**Acceptance Criteria:**
- [ ] Application accessible via public URL
- [ ] All features functional and tested
- [ ] Performance meets acceptance criteria
- [ ] Security requirements validated
- [ ] Stakeholder access credentials provided
- [ ] Demo/test accounts created
- [ ] Known issues documented
- [ ] Feedback collection mechanism in place
- [ ] POC success metrics defined and tracked

**Technical Notes:**
- Share URL with stakeholders: `https://elurc-market.onrender.com` (or custom domain)
- Prepare demo script for stakeholder walkthrough
- Monitor initial user feedback closely

**Estimated Effort:** 1 hour

---

**Epic 7 Total Estimated Effort:** 22 hours (~3 days)

{{epics_list}}
