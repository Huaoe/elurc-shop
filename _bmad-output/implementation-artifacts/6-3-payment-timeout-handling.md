# Story 6.3: Payment Timeout Handling

Status: ready-for-dev

## Story

As a **shopper**,
I want the **system to handle payment timeouts gracefully**,
so that **I can retry payment or recover my cart if payment takes too long**.

## Acceptance Criteria

1. **AC1: Timeout Detection**
   - 10-minute timeout from payment step start
   - Clear countdown timer display
   - Warning at 2 minutes remaining
   - Automatic timeout trigger
   - Stop payment polling
   - Update order status to "timeout"

2. **AC2: Timeout UI**
   - Timeout message display
   - Explanation of what happened
   - Cart preservation notice
   - Retry payment option
   - Return to cart option
   - Support contact information

3. **AC3: Cart Preservation**
   - Save cart items on timeout
   - Preserve shipping address
   - Keep order record as "timeout"
   - Allow order resumption
   - Restore cart state
   - No data loss

4. **AC4: Retry Mechanism**
   - "Retry Payment" button
   - Resume from same order
   - Generate new QR code
   - Restart payment polling
   - Reset timeout timer
   - Track retry attempts

5. **AC5: Order Cleanup**
   - Mark timed-out orders
   - Prevent duplicate processing
   - Clean up old timeout orders
   - Archive after 24 hours
   - Maintain audit trail
   - Free up resources

## Tasks / Subtasks

- [ ] **Task 1: Implement Timeout Timer** (AC: #1)
  - [ ] Add countdown timer component
  - [ ] 10-minute timeout logic
  - [ ] Warning notifications
  - [ ] Auto-trigger timeout

- [ ] **Task 2: Create Timeout UI** (AC: #2)
  - [ ] Timeout message component
  - [ ] Retry/return buttons
  - [ ] Clear messaging

- [ ] **Task 3: Preserve Cart State** (AC: #3)
  - [ ] Save cart on timeout
  - [ ] Update order status
  - [ ] Enable resumption

- [ ] **Task 4: Build Retry Flow** (AC: #4)
  - [ ] Retry payment button
  - [ ] Resume order logic
  - [ ] Reset timer

- [ ] **Task 5: Order Cleanup** (AC: #5)
  - [ ] Cleanup job for old timeouts
  - [ ] Archive logic
  - [ ] Audit trail

## Dev Notes

### Functional Requirements Coverage

This story implements timeout handling for payment flow reliability.

### References

- [Architecture](../planning-artifacts/architecture.md) - Timeout handling
- [Story 4.4](./4-4-payment-monitoring-service.md) - Payment polling

## Dev Agent Record

### Agent Model Used

Cascade AI (Claude 3.5 Sonnet)

### File List

**Files to Modify:**
- Payment monitoring components
- Checkout flow pages
- Order status logic
