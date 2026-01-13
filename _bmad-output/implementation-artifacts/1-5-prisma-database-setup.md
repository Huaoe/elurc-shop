# Story 1.5: Prisma Database Setup

Status: review

## Story

As a **developer**,
I want to **set up Prisma ORM with PostgreSQL database and define the initial schema**,
so that **the elurc-market application has a robust, type-safe data layer for products, orders, and transactions**.

## Acceptance Criteria

1. **AC1: Prisma Installation and Configuration**
   - Prisma and Prisma Client installed as dependencies
   - Prisma initialized with PostgreSQL provider
   - Database connection configured via environment variables
   - Prisma Client singleton created in `src/lib/prisma.ts`

2. **AC2: Database Schema Definition**
   - Products table with name, description, price (ELURC/EUR), category, stock, images
   - Categories table with name and slug
   - Orders table with wallet address, status, totals, shipping info
   - Order Items table linking orders to products with quantities
   - Transactions table for ELURC payment tracking
   - Customers table for wallet-based customer data
   - All tables use snake_case naming convention
   - Proper indexes on frequently queried fields

3. **AC3: Database Migrations**
   - Initial migration created and applied
   - Migration files tracked in Git
   - Database schema synchronized with Prisma schema
   - Migration naming follows convention: `YYYYMMDDHHMMSS_description`

4. **AC4: TypeScript Type Generation**
   - Prisma Client types auto-generated
   - Types available for import in application code
   - Type safety verified with sample queries
   - No `any` types in database interactions

5. **AC5: Environment Configuration**
   - `.env.example` file created with template
   - `DATABASE_URL` configured for local development
   - Environment variables documented
   - `.env.local` added to `.gitignore`

6. **AC6: Database Client Utilities**
   - Prisma Client singleton pattern implemented
   - Connection pooling configured
   - Error handling for database connections
   - Development vs production configuration

## Tasks / Subtasks

- [x] **Task 1: Install Prisma dependencies** (AC: #1)
  - [x] Install `@prisma/client` as dependency
  - [x] Install `prisma` as dev dependency
  - [x] Verify installation in `package.json`

- [x] **Task 2: Initialize Prisma** (AC: #1, #5)
  - [x] Run `npx prisma init`
  - [x] Configure PostgreSQL provider in `prisma/schema.prisma`
  - [x] Create `.env.example` with `DATABASE_URL` template
  - [x] Add `.env.local` to `.gitignore`
  - [x] Document environment variables

- [x] **Task 3: Define database schema** (AC: #2)
  - [x] Create `Product` model with all fields
  - [x] Create `Category` model
  - [x] Create `Order` model with wallet address and status
  - [x] Create `OrderItem` model with relations
  - [x] Create `Transaction` model for ELURC payments
  - [x] Create `Customer` model for wallet-based users
  - [x] Add indexes for performance
  - [x] Use snake_case table and column names

- [x] **Task 4: Create and apply migrations** (AC: #3)
  - [x] Run `npx prisma migrate dev --name init`
  - [x] Verify migration files created
  - [x] Check database schema created successfully
  - [x] Test migration rollback (optional)

- [x] **Task 5: Generate Prisma Client** (AC: #4)
  - [x] Run `npx prisma generate`
  - [x] Verify types generated in `node_modules/.prisma/client`
  - [x] Test type imports in TypeScript

- [x] **Task 6: Create Prisma Client singleton** (AC: #6)
  - [x] Create `src/lib/prisma.ts`
  - [x] Implement singleton pattern
  - [x] Configure connection pooling
  - [x] Add error handling
  - [x] Test database connection

- [x] **Task 7: Test database operations** (AC: #4)
  - [x] Write sample query to verify connection
  - [x] Test CRUD operations
  - [x] Verify TypeScript type safety
  - [x] Document usage patterns

## Dev Notes

### Technical Requirements

**Database Schema Overview:**
```prisma
// Products
model Product {
  id            String   @id @default(cuid())
  name          String
  slug          String   @unique
  description   String?
  price_elurc   Int      // Stored in lamports
  price_eur     Int      // Stored in cents
  category_id   String
  stock         Int      @default(0)
  in_stock      Boolean  @default(true)
  images        String[] // Array of image URLs
  created_at    DateTime @default(now())
  updated_at    DateTime @updatedAt
  
  category      Category @relation(fields: [category_id], references: [id])
  order_items   OrderItem[]
  
  @@index([category_id])
  @@index([slug])
  @@map("products")
}

// Categories
model Category {
  id         String    @id @default(cuid())
  name       String
  slug       String    @unique
  created_at DateTime  @default(now())
  
  products   Product[]
  
  @@map("categories")
}

// Orders
model Order {
  id                String      @id @default(cuid())
  wallet_address    String
  status            OrderStatus @default(PENDING)
  total_elurc       Int
  total_eur         Int
  shipping_street   String
  shipping_city     String
  shipping_postal   String
  shipping_country  String      @default("France")
  created_at        DateTime    @default(now())
  updated_at        DateTime    @updatedAt
  
  customer          Customer?   @relation(fields: [wallet_address], references: [wallet_address])
  order_items       OrderItem[]
  transactions      Transaction[]
  
  @@index([wallet_address])
  @@index([status])
  @@map("orders")
}

// Order Items
model OrderItem {
  id          String   @id @default(cuid())
  order_id    String
  product_id  String
  quantity    Int
  price_elurc Int
  price_eur   Int
  
  order       Order    @relation(fields: [order_id], references: [id], onDelete: Cascade)
  product     Product  @relation(fields: [product_id], references: [id])
  
  @@index([order_id])
  @@index([product_id])
  @@map("order_items")
}

// Transactions
model Transaction {
  id                String            @id @default(cuid())
  order_id          String
  transaction_hash  String            @unique
  sender_address    String
  amount_lamports   BigInt
  status            TransactionStatus @default(PENDING)
  confirmed_at      DateTime?
  created_at        DateTime          @default(now())
  
  order             Order             @relation(fields: [order_id], references: [id])
  
  @@index([order_id])
  @@index([transaction_hash])
  @@map("transactions")
}

// Customers
model Customer {
  wallet_address String   @id
  email          String?
  created_at     DateTime @default(now())
  updated_at     DateTime @updatedAt
  
  orders         Order[]
  
  @@map("customers")
}

// Enums
enum OrderStatus {
  PENDING
  PAID
  FULFILLED
  CANCELLED
}

enum TransactionStatus {
  PENDING
  CONFIRMED
  FAILED
}
```

**Prisma Client Singleton Pattern:**
```typescript
// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

### Architecture Compliance

**From Architecture Document:**
- Database: PostgreSQL with Prisma ORM
- Naming: snake_case for tables and columns
- IDs: Use `cuid()` for unique identifiers
- Timestamps: `created_at` and `updated_at` on all models
- Currency: Store as smallest unit (lamports for ELURC, cents for EUR)
- Relations: Explicit naming with `@relation`
- Indexes: On foreign keys and frequently queried fields

**Design Patterns:**
- Singleton pattern for Prisma Client (prevents connection exhaustion)
- Connection pooling for production
- Type-safe queries with auto-generated types
- Migration-based schema management

### Library & Framework Requirements

**Dependencies to Install:**
```bash
yarn add @prisma/client
yarn add -D prisma
```

**Prisma CLI Commands:**
```bash
npx prisma init                    # Initialize Prisma
npx prisma migrate dev --name init # Create and apply migration
npx prisma generate                # Generate Prisma Client types
npx prisma studio                  # Open database GUI (optional)
```

### File Structure Requirements

**Files to Create:**
1. `prisma/schema.prisma` - Database schema definition
2. `prisma/migrations/` - Migration files (auto-generated)
3. `src/lib/prisma.ts` - Prisma Client singleton
4. `.env.example` - Environment variable template

**Files to Modify:**
1. `.gitignore` - Add `.env.local`
2. `package.json` - Add Prisma dependencies

### Environment Variables

**Required Variables:**
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/elurc_market?schema=public"
```

**For Production (Vercel):**
```env
DATABASE_URL="postgresql://[user]:[password]@[host]/[database]?sslmode=require"
```

### Testing Requirements

**Manual Testing:**
- Database connection successful
- Migrations apply without errors
- Prisma Client generates types
- Sample queries execute successfully
- Type safety verified in IDE

**Sample Test Queries:**
```typescript
// Test connection
const categories = await prisma.category.findMany()

// Test create
const product = await prisma.product.create({
  data: {
    name: "Test Product",
    slug: "test-product",
    price_elurc: 1000,
    price_eur: 300,
    category_id: "category-id",
    stock: 10,
  }
})

// Test relations
const order = await prisma.order.create({
  data: {
    wallet_address: "0x123...",
    total_elurc: 1000,
    total_eur: 300,
    shipping_street: "123 Main St",
    shipping_city: "Paris",
    shipping_postal: "75001",
    order_items: {
      create: [
        {
          product_id: product.id,
          quantity: 1,
          price_elurc: 1000,
          price_eur: 300,
        }
      ]
    }
  },
  include: {
    order_items: true
  }
})
```

### Previous Story Intelligence

**From Story 1.1 (Tailwind Design Tokens):**
- Design system established
- No database dependencies

**From Story 1.2 (shadcn/ui Setup):**
- Component library ready
- No database dependencies

**From Story 1.3 (Base Layout):**
- Layout components created
- No database dependencies

**From Story 1.4 (Design System Components):**
- Product components ready (ProductCard, PriceDisplay, StockStatusBadge)
- Components expect product data structure matching Prisma schema
- Price display expects `price_elurc` and `price_eur` fields

**Key Learnings:**
- Product components already designed around expected data structure
- Database schema should match component prop interfaces
- Use consistent naming: `price_elurc`, `price_eur`, `in_stock`, `stock`

### Implementation Guidance

**Step-by-Step Approach:**

1. **Install Dependencies:**
   ```bash
   cd elurc-market
   yarn add @prisma/client
   yarn add -D prisma
   ```

2. **Initialize Prisma:**
   ```bash
   npx prisma init
   ```
   - Creates `prisma/schema.prisma`
   - Creates `.env` file with `DATABASE_URL`

3. **Configure Database:**
   - Update `prisma/schema.prisma` with PostgreSQL provider
   - Set up local PostgreSQL database or use cloud provider
   - Update `DATABASE_URL` in `.env.local`

4. **Define Schema:**
   - Add all models (Product, Category, Order, OrderItem, Transaction, Customer)
   - Add enums (OrderStatus, TransactionStatus)
   - Add indexes for performance
   - Use snake_case naming

5. **Create Migration:**
   ```bash
   npx prisma migrate dev --name init
   ```
   - Generates migration files
   - Applies migration to database
   - Generates Prisma Client

6. **Create Prisma Client Singleton:**
   - Create `src/lib/prisma.ts`
   - Implement singleton pattern
   - Export `prisma` instance

7. **Test Database:**
   - Write sample queries
   - Verify type safety
   - Test CRUD operations

**Critical Success Factors:**
- Database connection successful
- Schema matches architecture requirements
- Migrations apply cleanly
- TypeScript types generated correctly
- Singleton pattern prevents connection issues
- All tables use snake_case naming

**Potential Issues & Solutions:**

**Issue 1: Database Connection Errors**
- **Solution:** Verify `DATABASE_URL` format, check PostgreSQL running, test connection with `npx prisma db push`

**Issue 2: Migration Conflicts**
- **Solution:** Use `npx prisma migrate reset` for development, careful migration management for production

**Issue 3: Type Generation Issues**
- **Solution:** Run `npx prisma generate` after schema changes, restart TypeScript server

**Issue 4: Connection Pooling**
- **Solution:** Use singleton pattern, configure connection limits in production

### References

**Source Documents:**
- [Architecture](../_bmad-output/planning-artifacts/architecture.md) - Database schema, naming conventions
- [Development Handoff](../_bmad-output/implementation-artifacts/development-handoff.md) - Database setup instructions
- [Story 1.4](../_bmad-output/implementation-artifacts/1-4-design-system-components.md) - Product component data requirements

**External Documentation:**
- [Prisma Documentation](https://www.prisma.io/docs)
- [Prisma Schema Reference](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference)
- [Prisma Client API](https://www.prisma.io/docs/reference/api-reference/prisma-client-reference)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

## Dev Agent Record

### Agent Model Used

Claude 3.5 Sonnet (Cascade)

### Debug Log References

- Prisma 7.2.0 configuration challenges resolved
- Migration: `20260112134325_init` applied successfully
- Database: Prisma Cloud PostgreSQL at db.prisma.io

### Completion Notes List

**Prisma 7 Configuration:**
- Prisma 7.2.0 requires `prisma.config.ts` in project root (not in schema)
- `datasource.url` must be removed from `schema.prisma`
- Configuration uses `defineConfig` from `prisma/config`
- Environment variables loaded via `dotenv` in `prisma.config.ts`

**Database Schema:**
- All 6 models created: Product, Category, Order, OrderItem, Transaction, Customer
- snake_case naming convention applied throughout
- Proper indexes on foreign keys and frequently queried fields
- Currency stored as Int (lamports/cents) per architecture
- Wallet addresses used as customer identifiers

**Prisma Client:**
- Singleton pattern implemented with PG adapter
- Connection pooling configured via `@prisma/adapter-pg`
- Development logging enabled (query, error, warn)
- Type-safe database access ready

**Migration:**
- Initial migration `20260112134325_init` created and applied
- Database schema synchronized with Prisma schema
- All tables created successfully in PostgreSQL

### File List

**Created Files:**
- `prisma/schema.prisma` - Complete database schema with 6 models and enums
- `prisma/prisma.config.ts` - Prisma 7 configuration (moved to root)
- `prisma.config.ts` - Prisma 7 configuration in project root
- `src/lib/prisma.ts` - Prisma Client singleton with PG adapter
- `.env.example` - Environment variable template
- `.env.local` - Local environment configuration (DATABASE_URL)
- `prisma/migrations/20260112134325_init/migration.sql` - Initial database migration

**Modified Files:**
- `package.json` - Added @prisma/client, @prisma/adapter-pg, pg, prisma, dotenv

**Dependencies Added:**
- `@prisma/client` - Prisma Client for database access
- `@prisma/adapter-pg` - PostgreSQL adapter for Prisma 7
- `pg` - PostgreSQL driver
- `prisma` (dev) - Prisma CLI
- `dotenv` - Environment variable management
