# Information Architecture - elurc-market

## Site Structure

```
elurc-market/
│
├── Home (/)
│   ├── Hero Section
│   ├── Featured Products
│   ├── Category Quick Links
│   └── ELURC Value Proposition
│
├── Product Catalog (/products)
│   ├── Category Filter (Fresh, Dry, All)
│   ├── Product Grid
│   └── Product Cards
│       ├── Image
│       ├── Name
│       ├── Price (ELURC + EUR)
│       └── Stock Status
│
├── Product Detail (/products/[slug])
│   ├── Product Images
│   ├── Product Information
│   ├── Price (ELURC + EUR conversion)
│   ├── Stock Status
│   ├── Add to Cart Button
│   └── Product Description
│
├── Shopping Cart (/cart)
│   ├── Cart Items List
│   ├── Quantity Controls
│   ├── Remove Item
│   ├── Cart Total (ELURC + EUR)
│   └── Checkout Button
│
├── Checkout (/checkout)
│   ├── Step 1: Wallet Connection
│   ├── Step 2: Shipping Address
│   ├── Step 3: Payment
│   │   ├── QR Code Display
│   │   ├── Wallet Address
│   │   ├── Amount in ELURC
│   │   └── Payment Instructions
│   └── Step 4: Confirmation
│       ├── Payment Status
│       ├── Order Number
│       └── Shipping Details
│
├── Order Confirmation (/order/[id])
│   ├── Order Summary
│   ├── Transaction Details
│   ├── Shipping Information
│   └── Solana Transaction Link
│
└── Admin Panel (/admin)
    ├── Dashboard
    │   ├── Recent Orders
    │   ├── Transaction Summary
    │   └── Low Stock Alerts
    │
    ├── Products (/admin/products)
    │   ├── Product List
    │   ├── Add New Product
    │   ├── Edit Product
    │   └── Inventory Management
    │
    ├── Orders (/admin/orders)
    │   ├── Order List
    │   ├── Order Details
    │   ├── Fulfillment Actions
    │   └── Status Updates
    │
    └── Transactions (/admin/transactions)
        ├── Transaction History
        ├── Payment Verification
        ├── Refund Interface
        └── Edge Case Management
```

## Navigation Structure

### Customer Navigation (Primary)

**Top Navigation:**
- Logo (links to home)
- Product Categories Dropdown
- Cart Icon (with item count badge)
- Wallet Connection Button

**Mobile Navigation:**
- Hamburger menu
- Categories
- Cart
- Wallet status

### Admin Navigation

**Sidebar Navigation:**
- Dashboard
- Products
- Orders
- Transactions
- Settings

## Content Hierarchy

### Homepage Priority
1. **Primary CTA:** Browse Products / Connect Wallet
2. **Value Proposition:** Pay with ELURC for organic groceries
3. **Featured Products:** Highlight fresh, seasonal items
4. **Category Navigation:** Quick access to Fresh/Dry products
5. **Trust Signals:** Transaction transparency, local producers

### Product Catalog Priority
1. **Category Filter:** Immediate product filtering
2. **Product Grid:** Visual product discovery
3. **Price Transparency:** ELURC + EUR conversion visible
4. **Stock Status:** Clear availability indicators

### Checkout Priority
1. **Progress Indicator:** Show current step
2. **Cart Summary:** Always visible total
3. **Wallet Connection:** Clear, simple connection flow
4. **Payment Instructions:** Step-by-step guidance
5. **Real-time Feedback:** Payment confirmation status

## URL Structure

### Customer-Facing URLs
- `/` - Homepage
- `/products` - All products
- `/products?category=fresh` - Fresh products
- `/products?category=dry` - Dry products
- `/products/[slug]` - Product detail
- `/cart` - Shopping cart
- `/checkout` - Checkout flow
- `/order/[orderId]` - Order confirmation

### Admin URLs
- `/admin` - Dashboard
- `/admin/products` - Product management
- `/admin/products/new` - Add product
- `/admin/products/[id]` - Edit product
- `/admin/orders` - Order management
- `/admin/orders/[id]` - Order details
- `/admin/transactions` - Transaction history

## Search & Filtering

### Product Filters (MVP)
- Category (Fresh, Dry)
- Stock Status (In Stock, Out of Stock)

### Product Filters (Growth)
- Price Range (ELURC)
- Producer/Farm
- Organic Certification
- Delivery Zone

### Search (Growth Phase)
- Product name search
- Category search
- Producer search

## Metadata & SEO Structure

### Page Titles
- Homepage: "elurc-market | Organic Groceries with ELURC"
- Products: "[Product Name] | elurc-market"
- Category: "[Category Name] Products | elurc-market"

### Meta Descriptions
- Homepage: "Buy organic groceries from Bretaigne producers using ELURC cryptocurrency. Fresh vegetables, local dairy, artisan bread delivered to your door."
- Product: "[Product description] - [Price] ELURC. Order now with ELURC payment."

## State Management

### User State
- Wallet connection status
- Wallet address
- Cart contents
- Checkout progress

### Admin State
- Authentication status
- Active filters
- Selected orders
- Transaction view mode

## Error States & Edge Cases

### Customer Errors
- Wallet connection failed
- Payment timeout
- Insufficient ELURC balance
- Product out of stock
- Invalid shipping address

### Admin Errors
- Failed to load products
- Transaction verification failed
- Refund processing error
- Inventory update failed
