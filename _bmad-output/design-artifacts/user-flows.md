# User Flows - elurc-market

## Flow 1: Customer Purchase Journey (Happy Path)

### Flow Overview
**Persona:** Gwen (Environmental Activist)
**Goal:** Purchase organic groceries with ELURC
**Success:** Order confirmed, payment received, shipping scheduled

### Detailed Flow

```
START: User lands on homepage
│
├─> [Homepage]
│   ├─ View hero section with ELURC value proposition
│   ├─ See featured products
│   └─ Click "Browse Products" or category link
│
├─> [Product Catalog]
│   ├─ View product grid (mobile-optimized)
│   ├─ Filter by category (Fresh/Dry)
│   ├─ See ELURC prices + EUR conversion
│   ├─ Click product card for details
│   │
│   └─> [Product Detail]
│       ├─ View product images
│       ├─ Read description
│       ├─ Check stock status
│       ├─ See price (ELURC + EUR)
│       └─ Click "Add to Cart"
│           │
│           ├─ Cart icon updates (badge shows count)
│           └─ Toast notification: "Added to cart"
│
├─> [Continue Shopping or Go to Cart]
│   ├─ Option A: Continue browsing (repeat product selection)
│   └─ Option B: Click cart icon
│
├─> [Shopping Cart]
│   ├─ View cart items list
│   ├─ Adjust quantities (+/- buttons)
│   ├─ Remove items (trash icon)
│   ├─ See cart total (ELURC + EUR)
│   ├─ Review order
│   └─ Click "Proceed to Checkout"
│
├─> [Checkout - Step 1: Wallet Connection]
│   ├─ See checkout progress indicator (Step 1 of 3)
│   ├─ View "Connect Wallet" button
│   ├─ Click "Connect Wallet"
│   │
│   ├─> [Phantom Wallet Popup]
│   │   ├─ Approve connection
│   │   └─ Return to checkout
│   │
│   ├─ Wallet connected (show wallet address)
│   └─ Auto-advance to Step 2
│
├─> [Checkout - Step 2: Shipping Address]
│   ├─ See checkout progress indicator (Step 2 of 3)
│   ├─ Enter shipping information:
│   │   ├─ Full Name
│   │   ├─ Street Address
│   │   ├─ City
│   │   ├─ Postal Code
│   │   └─ Phone Number
│   ├─ Validate form fields
│   └─ Click "Continue to Payment"
│
├─> [Checkout - Step 3: Payment]
│   ├─ See checkout progress indicator (Step 3 of 3)
│   ├─ View order summary
│   ├─ See total amount: XX ELURC (€XX.XX)
│   ├─ View payment instructions:
│   │   ├─ QR code (for mobile wallet)
│   │   ├─ Shop wallet address (for manual copy)
│   │   └─ Exact amount to send
│   ├─ See payment status: "Waiting for payment..."
│   │
│   └─> [User sends ELURC via Phantom]
│       │
│       ├─> [System monitors shop wallet]
│       │   ├─ Poll Solana blockchain every 5-10 seconds
│       │   ├─ Detect incoming transaction
│       │   ├─ Validate transaction amount
│       │   ├─ Verify sender wallet matches
│       │   └─ Confirm on blockchain
│       │
│       └─> [Payment Confirmed - within 60 seconds]
│
├─> [Order Confirmation]
│   ├─ Show success message: "Payment Received!"
│   ├─ Display order number
│   ├─ Show transaction details:
│   │   ├─ Transaction ID (link to Solscan)
│   │   ├─ Amount paid (ELURC)
│   │   ├─ Timestamp
│   │   └─ Shipping address
│   ├─ Email confirmation sent
│   └─ Show "Continue Shopping" button
│
END: Order successfully placed
```

### Key Interactions

**Add to Cart:**
- Click: Add product to cart
- Visual feedback: Cart badge updates, toast notification
- State: Cart count increments

**Wallet Connection:**
- Click: "Connect Wallet" button
- Action: Phantom wallet popup appears
- Success: Wallet address displayed, proceed enabled
- Error: Show error message, retry option

**Payment Monitoring:**
- Auto-refresh: Poll every 5-10 seconds
- Visual: Loading spinner, "Waiting for payment..." text
- Success: Green checkmark, "Payment confirmed!" message
- Timeout: After 10 minutes, show "Payment timeout" with retry option

---

## Flow 2: Payment Edge Cases

### Flow 2A: Overpayment Scenario

```
START: User at payment step
│
├─> [User sends 50 ELURC for 45 ELURC cart]
│
├─> [System detects overpayment]
│   ├─ Transaction detected: 50 ELURC
│   ├─ Expected amount: 45 ELURC
│   ├─ Difference: +5 ELURC
│   └─ Flag for support review
│
├─> [Order Confirmation with Note]
│   ├─ Show: "Payment received: 50 ELURC"
│   ├─ Show: "Order total: 45 ELURC"
│   ├─ Show: "Overpayment: 5 ELURC"
│   ├─ Message: "Our support team will refund the difference within 24 hours"
│   └─ Email sent with refund notice
│
├─> [Support Operator (Thomas) Reviews]
│   ├─ See overpayment alert in admin panel
│   ├─ Verify transaction on Solscan
│   ├─ Initiate refund: 5 ELURC to customer wallet
│   └─ Update order status: "Overpayment refunded"
│
├─> [Customer receives refund]
│   ├─ Email notification: "Refund processed"
│   ├─ Transaction link to Solscan
│   └─ Updated order details
│
END: Order fulfilled, overpayment refunded
```

### Flow 2B: Underpayment Scenario

```
START: User at payment step
│
├─> [User sends 40 ELURC for 45 ELURC cart]
│
├─> [System detects underpayment]
│   ├─ Transaction detected: 40 ELURC
│   ├─ Expected amount: 45 ELURC
│   ├─ Difference: -5 ELURC
│   └─ Order status: "Pending - Insufficient payment"
│
├─> [Customer sees pending status]
│   ├─ Message: "Payment received: 40 ELURC"
│   ├─ Message: "Order total: 45 ELURC"
│   ├─ Message: "Remaining balance: 5 ELURC"
│   ├─ Options:
│   │   ├─ "Send additional 5 ELURC"
│   │   └─ "Cancel order (full refund)"
│   └─ Email sent with instructions
│
├─> [Customer Decision]
│   │
│   ├─> Option A: Send additional payment
│   │   ├─ Send 5 ELURC to shop wallet
│   │   ├─ System detects second transaction
│   │   ├─ Validate total: 40 + 5 = 45 ELURC
│   │   └─ Order confirmed
│   │
│   └─> Option B: Request cancellation
│       ├─ Click "Cancel Order"
│       ├─ Support operator reviews
│       ├─ Initiate full refund: 40 ELURC
│       └─ Order cancelled
│
END: Order completed or cancelled
```

### Flow 2C: Payment Timeout

```
START: User at payment step
│
├─> [10 minutes pass without payment]
│
├─> [System timeout]
│   ├─ Stop monitoring for this cart
│   ├─ Show timeout message
│   └─ Cart remains active (not finalized)
│
├─> [Customer sees timeout screen]
│   ├─ Message: "Payment window expired"
│   ├─ Options:
│   │   ├─ "Try again" (generate new QR code)
│   │   └─ "Return to cart"
│   └─ Cart items preserved
│
├─> [Customer chooses action]
│   ├─> Retry: Return to payment step with new QR
│   └─> Return: Go back to cart to review
│
END: Customer can retry or modify order
```

---

## Flow 3: Admin Order Management

### Flow Overview
**Persona:** Thomas (Shop Manager)
**Goal:** Fulfill orders and manage inventory
**Success:** Orders shipped, inventory updated

### Detailed Flow

```
START: Thomas logs into admin panel
│
├─> [Admin Dashboard]
│   ├─ View recent orders (last 24 hours)
│   ├─ See transaction summary
│   ├─ Check low stock alerts
│   └─ Click "Orders" in sidebar
│
├─> [Orders List]
│   ├─ View all orders with status:
│   │   ├─ Pending Payment (yellow)
│   │   ├─ Paid (green)
│   │   ├─ Fulfilled (blue)
│   │   └─ Cancelled (red)
│   ├─ Filter by status
│   ├─ Search by order number or wallet
│   └─ Click order to view details
│
├─> [Order Details]
│   ├─ View customer information:
│   │   ├─ Wallet address
│   │   ├─ Shipping address
│   │   └─ Email
│   ├─ View order items:
│   │   ├─ Product names
│   │   ├─ Quantities
│   │   └─ Prices
│   ├─ View transaction details:
│   │   ├─ Transaction ID (link to Solscan)
│   │   ├─ Amount paid (ELURC)
│   │   ├─ Timestamp
│   │   └─ Blockchain confirmation
│   ├─ View order status
│   └─ Available actions:
│       ├─ "Mark as Fulfilled"
│       ├─ "Send Email to Customer"
│       ├─ "View Transaction on Solscan"
│       └─ "Initiate Refund" (if needed)
│
├─> [Fulfillment Process]
│   ├─ Prepare order items
│   ├─ Update inventory in PayloadCMS:
│   │   ├─ Tomatoes: 50 → 47
│   │   ├─ Bread: 30 → 29
│   │   └─ Cheese: 20 → 19
│   ├─ Generate shipping label
│   ├─ Click "Mark as Fulfilled"
│   └─ Send confirmation email
│
├─> [Order Status Updated]
│   ├─ Status changes to "Fulfilled"
│   ├─ Customer receives email notification
│   ├─ Order moves to fulfilled list
│   └─ Inventory automatically updated
│
END: Order fulfilled, customer notified
```

---

## Flow 4: Admin Refund Processing

### Flow Overview
**Persona:** Thomas (Support Operator)
**Goal:** Process refund for cancelled order
**Success:** Customer receives ELURC refund

### Detailed Flow

```
START: Customer requests refund via email/Telegram
│
├─> [Thomas opens Transactions panel]
│   ├─ View transaction history
│   ├─ Search by wallet address or order number
│   └─ Find relevant transaction
│
├─> [Transaction Details]
│   ├─ View transaction information:
│   │   ├─ Order number
│   │   ├─ Customer wallet
│   │   ├─ Amount: 67 ELURC
│   │   ├─ Timestamp
│   │   └─ Solscan link
│   ├─ Verify order hasn't shipped
│   └─ Click "Initiate Refund"
│
├─> [Refund Interface]
│   ├─ Pre-filled information:
│   │   ├─ Recipient wallet: [customer wallet]
│   │   ├─ Refund amount: 67 ELURC
│   │   └─ Reason: [dropdown selection]
│   ├─ Options:
│   │   ├─ Full refund (default)
│   │   └─ Partial refund (manual entry)
│   ├─ Confirmation required
│   └─ Click "Process Refund"
│
├─> [Refund Confirmation Dialog]
│   ├─ Show refund summary
│   ├─ Warning: "This action cannot be undone"
│   ├─ Require password/2FA
│   └─ Click "Confirm Refund"
│
├─> [System processes refund]
│   ├─ Send 67 ELURC from shop wallet to customer wallet
│   ├─ Wait for blockchain confirmation
│   ├─ Update order status: "Cancelled - Refunded"
│   ├─ Log transaction in system
│   └─ Generate refund receipt
│
├─> [Notifications sent]
│   ├─ Email to customer with:
│   │   ├─ Refund confirmation
│   │   ├─ Transaction ID
│   │   ├─ Solscan link
│   │   └─ Refund amount
│   ├─ Telegram post (transparency):
│   │   └─ "Refund processed for order #034"
│   └─ Admin notification: "Refund successful"
│
END: Refund completed, customer notified
```

---

## Flow 5: Product Discovery (Mobile)

### Flow Overview
**Persona:** Gwen (Mobile user)
**Goal:** Find fresh organic vegetables
**Success:** Products added to cart

### Detailed Flow

```
START: User opens elurc-market on mobile
│
├─> [Mobile Homepage]
│   ├─ Swipe through hero carousel
│   ├─ See featured products (horizontal scroll)
│   ├─ View category cards:
│   │   ├─ Fresh Products (image)
│   │   └─ Dry Products (image)
│   └─ Tap "Fresh Products"
│
├─> [Product Catalog - Fresh Category]
│   ├─ See category header: "Fresh Products"
│   ├─ View product grid (2 columns on mobile)
│   ├─ Each product card shows:
│   │   ├─ Product image (square)
│   │   ├─ Product name
│   │   ├─ Price: "8 ELURC (€2.40)"
│   │   └─ Stock badge: "In Stock" (green)
│   ├─ Scroll vertically through products
│   └─ Tap product card
│
├─> [Product Detail - Mobile]
│   ├─ View full-width product image
│   ├─ Swipe image gallery (if multiple)
│   ├─ See product information:
│   │   ├─ Product name (large)
│   │   ├─ Price: "8 ELURC" (prominent)
│   │   ├─ EUR conversion: "€2.40" (smaller)
│   │   ├─ Stock status: "In Stock"
│   │   └─ Description
│   ├─ Sticky bottom bar:
│   │   ├─ Quantity selector (- / 1 / +)
│   │   └─ "Add to Cart" button (full width)
│   └─ Tap "Add to Cart"
│
├─> [Cart Updated]
│   ├─ Toast notification slides up
│   ├─ Cart icon badge updates: "3"
│   ├─ Option to:
│   │   ├─ Continue shopping (dismiss toast)
│   │   └─ View cart (tap toast)
│   └─ User continues browsing
│
END: Products added, ready for checkout
```

---

## Interaction Patterns Summary

### Touch Targets (Mobile)
- Minimum size: 44x44px
- Spacing between targets: 8px minimum
- Primary actions: Full-width buttons
- Secondary actions: Outlined buttons

### Loading States
- Payment monitoring: Animated spinner + "Waiting for payment..."
- Product loading: Skeleton screens
- Cart updates: Optimistic UI (instant feedback)

### Error Handling
- Inline validation: Real-time form feedback
- Error messages: Clear, actionable, friendly tone
- Retry options: Always provide way to recover

### Success Feedback
- Toast notifications: 3-second auto-dismiss
- Confirmation screens: Clear success icons
- Email confirmations: Sent within 1 minute

### Navigation
- Back button: Always available (browser back works)
- Breadcrumbs: Desktop only
- Progress indicators: Checkout flow
- Tab bar: Mobile navigation (Home, Products, Cart)
