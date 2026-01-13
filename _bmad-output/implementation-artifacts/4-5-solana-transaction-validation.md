# Story 4.5: Solana Transaction Validation

Status: review

## Story

As a **system administrator**,
I want the **system to validate ELURC transactions on the Solana blockchain before confirming orders**,
so that **only legitimate, confirmed transactions result in order fulfillment and no fraudulent payments are accepted**.

## Acceptance Criteria

1. **AC1: Transaction Signature Verification**
   - Verify transaction signature is valid
   - Check transaction exists on blockchain
   - Confirm transaction is not simulated
   - Validate transaction structure
   - Ensure transaction is finalized
   - Return verification result

2. **AC2: Confirmation Level Check**
   - Verify minimum confirmations (1+ confirmations)
   - Check transaction finality status
   - Distinguish between pending and confirmed
   - Handle "processed" vs "confirmed" vs "finalized"
   - Reject pending transactions
   - Wait for confirmation if needed

3. **AC3: Token Transfer Validation**
   - Verify SPL token transfer instruction
   - Check token mint matches ELURC
   - Validate transfer amount
   - Confirm destination is shop wallet
   - Verify source wallet
   - Parse token program instructions

4. **AC4: Amount Verification**
   - Extract exact transfer amount
   - Compare to expected order amount
   - Allow small tolerance (rounding errors)
   - Reject significant mismatches
   - Handle lamports conversion
   - Validate decimal places

5. **AC5: Wallet Address Verification**
   - Confirm sender wallet matches customer
   - Verify recipient is shop wallet
   - Validate wallet address format
   - Check for address spoofing
   - Ensure proper authority
   - Validate token accounts

6. **AC6: Duplicate Transaction Prevention**
   - Check if transaction already processed
   - Store processed transaction signatures
   - Prevent double-spending
   - Handle retry scenarios
   - Database uniqueness constraint
   - Return clear error for duplicates

7. **AC7: Timestamp Validation**
   - Verify transaction timestamp
   - Check transaction within time window
   - Reject expired transactions
   - Validate block time
   - Handle clock drift
   - Ensure temporal consistency

8. **AC8: Error Handling**
   - Handle invalid signatures
   - Handle failed transactions
   - Handle network errors
   - Handle malformed data
   - Log validation failures
   - Return descriptive error messages

## Tasks / Subtasks

- [ ] **Task 1: Create Validation Service** (AC: #1)
  - [ ] Create `src/lib/solana/validation.ts`
  - [ ] Implement `validateTransaction()` function
  - [ ] Add signature verification
  - [ ] Add transaction existence check
  - [ ] Add structure validation
  - [ ] Return validation result object

- [ ] **Task 2: Implement Confirmation Check** (AC: #2)
  - [ ] Create `checkConfirmationStatus()` function
  - [ ] Query transaction confirmation level
  - [ ] Check finality status
  - [ ] Handle commitment levels
  - [ ] Reject unconfirmed transactions
  - [ ] Add retry logic for pending

- [ ] **Task 3: Create Token Transfer Parser** (AC: #3)
  - [ ] Create `parseTokenTransfer()` function
  - [ ] Parse SPL token instructions
  - [ ] Extract transfer details
  - [ ] Verify token mint
  - [ ] Validate program ID
  - [ ] Handle different instruction formats

- [ ] **Task 4: Implement Amount Validator** (AC: #4)
  - [ ] Create `validateAmount()` function
  - [ ] Compare amounts with tolerance
  - [ ] Handle lamports conversion
  - [ ] Validate decimal precision
  - [ ] Return match result
  - [ ] Log discrepancies

- [ ] **Task 5: Create Wallet Validator** (AC: #5)
  - [ ] Create `validateWallets()` function
  - [ ] Verify sender wallet
  - [ ] Verify recipient wallet
  - [ ] Check token account ownership
  - [ ] Validate authority
  - [ ] Detect spoofing attempts

- [ ] **Task 6: Implement Duplicate Check** (AC: #6)
  - [ ] Create `checkDuplicateTransaction()` function
  - [ ] Query database for signature
  - [ ] Add unique constraint to schema
  - [ ] Handle duplicate errors
  - [ ] Log duplicate attempts
  - [ ] Return clear error message

- [ ] **Task 7: Add Timestamp Validation** (AC: #7)
  - [ ] Create `validateTimestamp()` function
  - [ ] Check block time
  - [ ] Validate time window
  - [ ] Handle clock drift
  - [ ] Reject expired transactions
  - [ ] Log timestamp issues

- [ ] **Task 8: Create Validation Result Type** (AC: All)
  - [ ] Define `ValidationResult` interface
  - [ ] Include success/failure status
  - [ ] Include error messages
  - [ ] Include validation details
  - [ ] Add transaction metadata
  - [ ] Type-safe error codes

- [ ] **Task 9: Integration with Payment Monitor** (AC: All)
  - [ ] Update payment monitor to use validation
  - [ ] Call validation before confirming
  - [ ] Handle validation failures
  - [ ] Log validation results
  - [ ] Update order status accordingly
  - [ ] Add validation metrics

- [ ] **Task 10: Testing** (AC: All)
  - [ ] Test valid transactions
  - [ ] Test invalid signatures
  - [ ] Test wrong amounts
  - [ ] Test wrong wallets
  - [ ] Test duplicate transactions
  - [ ] Test edge cases

## Dev Notes

### Technical Requirements

**Validation Service Structure:**
```typescript
// src/lib/solana/validation.ts
import { Connection, PublicKey, ParsedTransactionWithMeta } from '@solana/web3.js'
import { TOKEN_PROGRAM_ID } from '@solana/spl-token'

export interface ValidationResult {
  valid: boolean
  errors: string[]
  warnings: string[]
  details: {
    signature: string
    confirmed: boolean
    confirmations: number
    amount: number
    sender: string
    recipient: string
    tokenMint: string
    blockTime: number
  }
}

export interface ValidationOptions {
  expectedAmount: number // in lamports
  expectedSender: string // customer wallet
  expectedRecipient: string // shop wallet
  expectedTokenMint: string // ELURC token
  orderCreatedAt: number // timestamp
  toleranceAmount?: number // default 1000 lamports (0.001 ELURC)
  maxAgeMinutes?: number // default 15 minutes
}

export async function validateTransaction(
  connection: Connection,
  signature: string,
  options: ValidationOptions
): Promise<ValidationResult> {
  const errors: string[] = []
  const warnings: string[] = []
  
  try {
    // 1. Fetch transaction
    const tx = await connection.getParsedTransaction(
      signature,
      { maxSupportedTransactionVersion: 0 }
    )

    if (!tx) {
      errors.push('Transaction not found on blockchain')
      return { valid: false, errors, warnings, details: null as any }
    }

    // 2. Check for errors
    if (tx.meta?.err) {
      errors.push(`Transaction failed: ${JSON.stringify(tx.meta.err)}`)
      return { valid: false, errors, warnings, details: null as any }
    }

    // 3. Check confirmation status
    const confirmationResult = await checkConfirmationStatus(connection, signature)
    if (!confirmationResult.confirmed) {
      errors.push('Transaction not confirmed')
    }

    // 4. Parse token transfer
    const transfer = parseTokenTransfer(tx, new PublicKey(options.expectedTokenMint))
    if (!transfer) {
      errors.push('No valid token transfer found')
      return { valid: false, errors, warnings, details: null as any }
    }

    // 5. Validate amount
    const amountValid = validateAmount(
      transfer.amount,
      options.expectedAmount,
      options.toleranceAmount || 1000
    )
    if (!amountValid.valid) {
      errors.push(amountValid.error!)
    }

    // 6. Validate wallets
    const walletsValid = validateWallets(
      transfer.source,
      transfer.destination,
      options.expectedSender,
      options.expectedRecipient
    )
    if (!walletsValid.valid) {
      errors.push(...walletsValid.errors)
    }

    // 7. Validate timestamp
    const timestampValid = validateTimestamp(
      tx.blockTime,
      options.orderCreatedAt,
      options.maxAgeMinutes || 15
    )
    if (!timestampValid.valid) {
      errors.push(timestampValid.error!)
    }

    // 8. Build result
    const details = {
      signature,
      confirmed: confirmationResult.confirmed,
      confirmations: confirmationResult.confirmations,
      amount: transfer.amount,
      sender: transfer.source,
      recipient: transfer.destination,
      tokenMint: transfer.mint,
      blockTime: tx.blockTime || 0,
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
      details,
    }
  } catch (error) {
    console.error('Transaction validation error:', error)
    errors.push(`Validation error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    return { valid: false, errors, warnings, details: null as any }
  }
}
```

**Confirmation Status Check:**
```typescript
interface ConfirmationResult {
  confirmed: boolean
  confirmations: number
  finalized: boolean
}

async function checkConfirmationStatus(
  connection: Connection,
  signature: string
): Promise<ConfirmationResult> {
  try {
    // Get signature status
    const status = await connection.getSignatureStatus(signature, {
      searchTransactionHistory: true,
    })

    if (!status || !status.value) {
      return { confirmed: false, confirmations: 0, finalized: false }
    }

    const confirmations = status.value.confirmations || 0
    const confirmed = confirmations > 0 || status.value.confirmationStatus === 'confirmed'
    const finalized = status.value.confirmationStatus === 'finalized'

    return { confirmed, confirmations, finalized }
  } catch (error) {
    console.error('Error checking confirmation status:', error)
    return { confirmed: false, confirmations: 0, finalized: false }
  }
}
```

**Token Transfer Parser:**
```typescript
interface TokenTransfer {
  amount: number
  source: string
  destination: string
  mint: string
  authority: string
}

function parseTokenTransfer(
  tx: ParsedTransactionWithMeta,
  expectedMint: PublicKey
): TokenTransfer | null {
  const instructions = tx.transaction.message.instructions

  for (const ix of instructions) {
    // Check if it's a parsed SPL token instruction
    if ('parsed' in ix && ix.program === 'spl-token') {
      const parsed = ix.parsed
      
      // Handle both 'transfer' and 'transferChecked'
      if (parsed.type === 'transfer' || parsed.type === 'transferChecked') {
        const info = parsed.info
        
        // For transferChecked, verify mint
        if (parsed.type === 'transferChecked') {
          if (info.mint !== expectedMint.toBase58()) {
            continue // Wrong token
          }
        }
        
        // Extract transfer details
        const amount = parsed.type === 'transferChecked'
          ? parseInt(info.tokenAmount?.amount || '0')
          : parseInt(info.amount || '0')
        
        return {
          amount,
          source: info.source,
          destination: info.destination,
          mint: info.mint || expectedMint.toBase58(),
          authority: info.authority || info.source,
        }
      }
    }
  }

  return null
}
```

**Amount Validator:**
```typescript
interface AmountValidationResult {
  valid: boolean
  error?: string
  difference?: number
}

function validateAmount(
  actualAmount: number,
  expectedAmount: number,
  tolerance: number = 1000
): AmountValidationResult {
  const difference = Math.abs(actualAmount - expectedAmount)
  
  if (difference <= tolerance) {
    return { valid: true, difference }
  }
  
  return {
    valid: false,
    error: `Amount mismatch: expected ${expectedAmount}, got ${actualAmount} (diff: ${difference})`,
    difference,
  }
}
```

**Wallet Validator:**
```typescript
interface WalletValidationResult {
  valid: boolean
  errors: string[]
}

function validateWallets(
  actualSender: string,
  actualRecipient: string,
  expectedSender: string,
  expectedRecipient: string
): WalletValidationResult {
  const errors: string[] = []
  
  // Normalize addresses (case-insensitive comparison)
  const normalizeSender = actualSender.toLowerCase()
  const normalizeExpectedSender = expectedSender.toLowerCase()
  const normalizeRecipient = actualRecipient.toLowerCase()
  const normalizeExpectedRecipient = expectedRecipient.toLowerCase()
  
  if (normalizeSender !== normalizeExpectedSender) {
    errors.push(`Sender mismatch: expected ${expectedSender}, got ${actualSender}`)
  }
  
  if (normalizeRecipient !== normalizeExpectedRecipient) {
    errors.push(`Recipient mismatch: expected ${expectedRecipient}, got ${actualRecipient}`)
  }
  
  return {
    valid: errors.length === 0,
    errors,
  }
}
```

**Timestamp Validator:**
```typescript
interface TimestampValidationResult {
  valid: boolean
  error?: string
}

function validateTimestamp(
  blockTime: number | null,
  orderCreatedAt: number,
  maxAgeMinutes: number
): TimestampValidationResult {
  if (!blockTime) {
    return {
      valid: false,
      error: 'Transaction has no block time',
    }
  }
  
  const blockTimeMs = blockTime * 1000
  const now = Date.now()
  const maxAge = maxAgeMinutes * 60 * 1000
  
  // Check if transaction is too old
  if (now - blockTimeMs > maxAge) {
    return {
      valid: false,
      error: `Transaction too old: ${Math.floor((now - blockTimeMs) / 60000)} minutes`,
    }
  }
  
  // Check if transaction is before order creation
  if (blockTimeMs < orderCreatedAt) {
    return {
      valid: false,
      error: 'Transaction timestamp is before order creation',
    }
  }
  
  return { valid: true }
}
```

**Duplicate Check:**
```typescript
// src/lib/db/transactions.ts
import { prisma } from '@/lib/prisma'

export async function checkDuplicateTransaction(
  signature: string
): Promise<boolean> {
  const existing = await prisma.transaction.findUnique({
    where: { signature },
  })
  
  return !!existing
}

export async function recordTransaction(data: {
  signature: string
  orderId: string
  amount: number
  sender: string
  recipient: string
  blockTime: number
}) {
  try {
    await prisma.transaction.create({
      data: {
        signature: data.signature,
        orderId: data.orderId,
        amount: data.amount,
        senderWallet: data.sender,
        recipientWallet: data.recipient,
        blockTime: new Date(data.blockTime * 1000),
        status: 'confirmed',
      },
    })
  } catch (error) {
    // Handle unique constraint violation
    if (error.code === 'P2002') {
      throw new Error('Transaction already processed')
    }
    throw error
  }
}
```

**Integration with Payment Monitor:**
```typescript
// src/lib/payment/monitor.ts (updated)
import { validateTransaction } from '@/lib/solana/validation'
import { checkDuplicateTransaction, recordTransaction } from '@/lib/db/transactions'

export async function checkPaymentStatus(orderId: string): Promise<PaymentCheckResult> {
  try {
    const order = await getOrder(orderId)
    if (!order) {
      return { status: 'error', message: 'Order not found' }
    }

    // ... existing code to find matching transaction ...

    if (match) {
      // Check for duplicate
      const isDuplicate = await checkDuplicateTransaction(match.signature)
      if (isDuplicate) {
        return {
          status: 'error',
          message: 'Transaction already processed',
        }
      }

      // Validate transaction
      const validation = await validateTransaction(
        connection,
        match.signature,
        {
          expectedAmount: order.amount,
          expectedSender: order.customerWallet,
          expectedRecipient: process.env.NEXT_PUBLIC_SHOP_WALLET_ADDRESS!,
          expectedTokenMint: process.env.NEXT_PUBLIC_ELURC_TOKEN_ADDRESS!,
          orderCreatedAt: order.createdAt,
        }
      )

      if (!validation.valid) {
        console.error('Transaction validation failed:', validation.errors)
        return {
          status: 'error',
          message: `Invalid transaction: ${validation.errors.join(', ')}`,
        }
      }

      // Record transaction
      await recordTransaction({
        signature: match.signature,
        orderId: order.id,
        amount: validation.details.amount,
        sender: validation.details.sender,
        recipient: validation.details.recipient,
        blockTime: validation.details.blockTime,
      })

      // Update order
      await updateOrderStatus(orderId, 'paid', {
        transactionSignature: match.signature,
        paidAt: validation.details.blockTime * 1000,
      })

      return {
        status: 'confirmed',
        transactionSignature: match.signature,
        amount: validation.details.amount,
        timestamp: validation.details.blockTime * 1000,
      }
    }

    return { status: 'pending', message: 'Waiting for payment' }
  } catch (error) {
    console.error('Payment monitoring error:', error)
    return { status: 'error', message: 'Failed to check payment status' }
  }
}
```

**Prisma Schema Addition:**
```prisma
// prisma/schema.prisma
model Transaction {
  id              String   @id @default(cuid())
  signature       String   @unique // Solana transaction signature
  orderId         String
  amount          Int      // Amount in lamports
  senderWallet    String
  recipientWallet String
  blockTime       DateTime
  status          String   // confirmed, failed, refunded
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  
  order Order @relation(fields: [orderId], references: [id])
  
  @@index([orderId])
  @@index([senderWallet])
  @@index([recipientWallet])
}
```

### Architecture Compliance

**From Architecture Document:**
- **Transaction Validation**: 99.9% accuracy, verify on blockchain
- **Security**: Prevent duplicate processing, validate authenticity
- **Reliability**: No false confirmations, immutable audit trail
- **Error Handling**: Graceful handling of invalid transactions

**Design Patterns:**
- Validation service with clear result types
- Separation of concerns (validation, parsing, checking)
- Database constraints for duplicate prevention
- Comprehensive error reporting

### Library & Framework Requirements

**Existing Dependencies:**
- @solana/web3.js (transaction queries, validation)
- @solana/spl-token (token program constants)
- Prisma (database, transactions table)

**No New Dependencies Required**

### File Structure Requirements

**Files to Create:**
1. `src/lib/solana/validation.ts` - Main validation service
2. `src/lib/db/transactions.ts` - Transaction database operations

**Files to Modify:**
1. `src/lib/payment/monitor.ts` - Add validation integration
2. `prisma/schema.prisma` - Add Transaction model

**Directory Structure:**
```
src/
├── lib/
│   ├── solana/
│   │   ├── validation.ts (NEW)
│   │   ├── connection.ts (existing)
│   │   └── transactions.ts (existing)
│   ├── payment/
│   │   ├── monitor.ts (MODIFY)
│   │   └── matcher.ts (existing)
│   └── db/
│       ├── transactions.ts (NEW)
│       └── orders.ts (existing)
└── prisma/
    └── schema.prisma (MODIFY)
```

### Environment Variables

**No New Variables** - Uses existing Solana configuration

### Testing Requirements

**Manual Testing Checklist:**

1. **Valid Transaction:**
   - [ ] Correct amount validates
   - [ ] Correct wallets validate
   - [ ] Confirmed transaction passes
   - [ ] Transaction recorded in DB
   - [ ] Order status updated

2. **Invalid Signature:**
   - [ ] Non-existent signature rejected
   - [ ] Invalid format rejected
   - [ ] Error message clear

3. **Wrong Amount:**
   - [ ] Too much rejected
   - [ ] Too little rejected
   - [ ] Within tolerance accepted
   - [ ] Error shows difference

4. **Wrong Wallets:**
   - [ ] Wrong sender rejected
   - [ ] Wrong recipient rejected
   - [ ] Error shows mismatch

5. **Unconfirmed Transaction:**
   - [ ] Pending transaction rejected
   - [ ] Requires confirmation
   - [ ] Retry logic works

6. **Duplicate Transaction:**
   - [ ] Duplicate detected
   - [ ] Database constraint works
   - [ ] Error message clear
   - [ ] No double-processing

7. **Expired Transaction:**
   - [ ] Old transaction rejected
   - [ ] Time window enforced
   - [ ] Error shows age

8. **Failed Transaction:**
   - [ ] Failed tx rejected
   - [ ] Error parsed correctly
   - [ ] No order confirmation

### Previous Story Intelligence

**From Story 4.4 (Payment Monitoring):**
- Transaction detection logic
- Payment check API structure
- Transaction matching algorithm
- Order status updates

**From Story 3.5 (Phantom Wallet Integration):**
- Solana connection setup
- RPC configuration
- Wallet address handling

**Key Learnings:**
- Transaction validation is separate from detection
- Validation must be comprehensive (amount, wallets, confirmations)
- Duplicate prevention is critical
- Clear error messages essential for debugging
- Database constraints prevent race conditions

### Implementation Guidance

**Step-by-Step Approach:**

1. **Create Validation Service:**
   - Define ValidationResult interface
   - Implement main validateTransaction function
   - Add comprehensive error handling

2. **Implement Sub-Validators:**
   - Confirmation status checker
   - Token transfer parser
   - Amount validator
   - Wallet validator
   - Timestamp validator

3. **Add Database Schema:**
   - Create Transaction model
   - Add unique constraint on signature
   - Add indexes for queries
   - Run migration

4. **Create Transaction Operations:**
   - Duplicate check function
   - Record transaction function
   - Handle unique constraint errors

5. **Integrate with Payment Monitor:**
   - Add validation call
   - Handle validation failures
   - Record successful transactions
   - Update order status

6. **Test Thoroughly:**
   - Test all validation scenarios
   - Test duplicate prevention
   - Test error handling
   - Test integration

**Critical Success Factors:**
- 99.9% validation accuracy
- No false positives (invalid transactions confirmed)
- No false negatives (valid transactions rejected)
- Duplicate prevention works 100%
- Clear, actionable error messages

**Potential Issues & Solutions:**

**Issue 1: Unconfirmed Transaction**
- **Problem:** Transaction detected but not confirmed
- **Solution:** Check confirmation status, wait and retry

**Issue 2: Race Condition on Duplicate**
- **Problem:** Two requests process same transaction
- **Solution:** Database unique constraint, handle gracefully

**Issue 3: Amount Rounding Errors**
- **Problem:** Slight differences due to decimals
- **Solution:** Tolerance parameter (default 0.001 ELURC)

**Issue 4: Wrong Token Transfer**
- **Problem:** Non-ELURC token sent
- **Solution:** Verify token mint address matches

**Issue 5: Validation Too Strict**
- **Problem:** Valid transactions rejected
- **Solution:** Adjust tolerance, improve parsing logic

### Functional Requirements Coverage

This story implements the following functional requirements:

**Transaction Validation (FR16):**
- **FR16**: Validate ELURC transactions on Solana blockchain ✓

**Security (NFR-S5, NFR-S6):**
- **NFR-S5**: Prevent duplicate transaction processing ✓
- **NFR-S6**: Verify transaction authenticity on blockchain ✓

**Reliability (NFR-R2, NFR-R3):**
- **NFR-R2**: 99.9% validation accuracy ✓
- **NFR-R3**: Never falsely confirm invalid transactions ✓

**Data Integrity (NFR-R7, NFR-R9):**
- **NFR-R7**: Persist order data on confirmation ✓
- **NFR-R9**: Immutable transaction logs ✓

### References

**Source Documents:**
- [PRD](../planning-artifacts/prd.md) - Transaction validation requirements (FR16, lines 107, 400)
- [Architecture](../planning-artifacts/architecture.md) - Validation architecture
- [Story 4.4](../implementation-artifacts/4-4-payment-monitoring-service.md) - Payment monitoring integration
- [Story 3.5](../implementation-artifacts/3-5-phantom-wallet-integration.md) - Solana connection

**External Documentation:**
- [Solana Transaction Structure](https://docs.solana.com/developing/programming-model/transactions)
- [SPL Token Program](https://spl.solana.com/token)
- [Solana Commitment Levels](https://docs.solana.com/cluster/commitments)
- [Prisma Unique Constraints](https://www.prisma.io/docs/concepts/components/prisma-schema/data-model#unique-constraints)

## Dev Agent Record

### Agent Model Used

Cascade AI (Claude 3.5 Sonnet)

### Debug Log References

N/A - Story not yet implemented

### Completion Notes List

**Implementation Status:**
- Story ready for development
- All acceptance criteria defined
- Validation logic specified
- Database schema defined
- Integration points documented

**Next Steps:**
1. Create validation service with all sub-validators
2. Add Transaction model to Prisma schema
3. Create transaction database operations
4. Integrate validation into payment monitor
5. Test all validation scenarios
6. Test duplicate prevention
7. Performance testing

### File List

**Files to Create:**
- `src/lib/solana/validation.ts` - Transaction validation service
- `src/lib/db/transactions.ts` - Transaction database operations

**Files to Modify:**
- `src/lib/payment/monitor.ts` - Add validation integration
- `prisma/schema.prisma` - Add Transaction model
