# Story 6.2: Refund Interface

Status: ready-for-dev

## Story

As a **shop manager**,
I want to **process ELURC refunds to customers through an admin interface**,
so that **I can handle overpayments, cancellations, and customer service issues**.

## Acceptance Criteria

1. **AC1: Refund Form Interface**
   - Admin refund form page
   - Order lookup by order number
   - Display order details
   - Show original payment amount
   - Enter refund amount
   - Validate refund amount
   - Add refund reason/notes
   - Confirm customer wallet address

2. **AC2: Refund Amount Validation**
   - Cannot exceed original payment
   - Minimum refund amount (e.g., 1000 ELURC)
   - Validate against available balance
   - Check for previous refunds
   - Calculate remaining refundable amount
   - Show validation errors

3. **AC3: Wallet Address Verification**
   - Display customer wallet from order
   - Allow manual wallet override
   - Validate Solana wallet format
   - Confirm wallet address
   - Show warning for address changes
   - Require double confirmation

4. **AC4: Refund Execution**
   - Execute Solana SPL token transfer
   - Send ELURC from shop wallet
   - Use shop wallet private key securely
   - Wait for transaction confirmation
   - Handle transaction failures
   - Retry mechanism

5. **AC5: Refund Status Tracking**
   - Create refund record in database
   - Track refund status (pending, processing, completed, failed)
   - Store transaction signature
   - Store refund timestamp
   - Update order status
   - Link refund to order

6. **AC6: Admin Confirmation Flow**
   - Review refund details
   - Confirm refund amount
   - Confirm wallet address
   - Confirm reason
   - Two-step confirmation
   - Cancel option

7. **AC7: Refund History**
   - List all refunds for order
   - Show refund amounts
   - Show refund dates
   - Show transaction signatures
   - Show refund status
   - Show who processed refund

8. **AC8: Email Notifications**
   - Send customer refund notification
   - Include refund amount
   - Include transaction signature
   - Include reason (if appropriate)
   - Estimated arrival time
   - Support contact

9. **AC9: Security & Authorization**
   - Admin authentication required
   - Role-based access control
   - Shop wallet key protection
   - Audit logging
   - IP tracking
   - Action confirmation

10. **AC10: Error Handling**
    - Handle insufficient balance
    - Handle network failures
    - Handle invalid addresses
    - Handle transaction timeouts
    - Show clear error messages
    - Provide retry options

## Tasks / Subtasks

- [ ] **Task 1: Create Refund API Route** (AC: #4, #5)
  - [ ] Create `/api/admin/refunds/process`
  - [ ] Validate admin authentication
  - [ ] Validate refund parameters
  - [ ] Execute Solana transaction
  - [ ] Create refund record
  - [ ] Return transaction signature

- [ ] **Task 2: Create Refund Form Page** (AC: #1, #2, #3)
  - [ ] Create admin refund page
  - [ ] Order lookup component
  - [ ] Refund amount input
  - [ ] Wallet address display
  - [ ] Reason textarea
  - [ ] Validation logic

- [ ] **Task 3: Implement Solana Refund** (AC: #4)
  - [ ] Create refund utility function
  - [ ] Load shop wallet keypair
  - [ ] Build SPL token transfer
  - [ ] Sign and send transaction
  - [ ] Wait for confirmation
  - [ ] Handle errors

- [ ] **Task 4: Create Refund Database Schema** (AC: #5, #7)
  - [ ] Add refunds collection
  - [ ] Define refund fields
  - [ ] Link to orders
  - [ ] Track status
  - [ ] Store transaction data

- [ ] **Task 5: Build Confirmation Dialog** (AC: #6)
  - [ ] Create confirmation modal
  - [ ] Display refund summary
  - [ ] Two-step confirmation
  - [ ] Cancel button
  - [ ] Loading state

- [ ] **Task 6: Create Refund History View** (AC: #7)
  - [ ] List refunds for order
  - [ ] Display refund details
  - [ ] Show transaction links
  - [ ] Filter by status
  - [ ] Sort by date

- [ ] **Task 7: Add Email Notification** (AC: #8)
  - [ ] Create refund email template
  - [ ] Send on refund completion
  - [ ] Include transaction details
  - [ ] Customer-friendly messaging

- [ ] **Task 8: Implement Security** (AC: #9)
  - [ ] Admin route protection
  - [ ] Role verification
  - [ ] Audit logging
  - [ ] Secure key storage
  - [ ] Action tracking

- [ ] **Task 9: Testing** (AC: All)
  - [ ] Test refund execution
  - [ ] Test validation
  - [ ] Test error scenarios
  - [ ] Test security
  - [ ] Test notifications

## Dev Notes

### Functional Requirements Coverage

This story implements:
- **FR32**: Initiate ELURC refunds
- **FR33**: Process partial refunds
- **FR35**: Cancel orders and issue full refunds

### References

- [PRD](../planning-artifacts/prd.md) - FR32, FR33, FR35
- [Architecture](../planning-artifacts/architecture.md) - Refund processing
- [Story 6.1](./6-1-overpayment-underpayment-handling.md) - Overpayment detection

## Dev Agent Record

### Agent Model Used

Cascade AI (Claude 3.5 Sonnet)

### File List

**Files to Create:**
- Admin refund page and components
- Refund API route
- Solana refund utility
- Refund email template
- Refunds database schema
