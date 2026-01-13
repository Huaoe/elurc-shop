import { Connection, PublicKey, ParsedTransactionWithMeta } from '@solana/web3.js'

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
    blockTime: number | null
  } | null
}

export interface ValidationOptions {
  expectedAmount: number
  expectedSender: string
  expectedRecipient: string
  expectedTokenMint: string
  orderCreatedAt: number
  toleranceAmount?: number
  maxAgeMinutes?: number
}

interface TokenTransfer {
  amount: number
  source: string
  destination: string
  destinationOwner: string
  mint: string
}

export async function checkConfirmationStatus(
  connection: Connection,
  signature: string
): Promise<{ confirmed: boolean; confirmations: number }> {
  try {
    const status = await connection.getSignatureStatus(signature, {
      searchTransactionHistory: true,
    })

    if (!status || !status.value) {
      return { confirmed: false, confirmations: 0 }
    }

    const confirmations = status.value.confirmations || 0
    const confirmed = status.value.confirmationStatus === 'confirmed' || 
                     status.value.confirmationStatus === 'finalized'

    return { confirmed, confirmations }
  } catch (error) {
    console.error('Error checking confirmation status:', error)
    return { confirmed: false, confirmations: 0 }
  }
}

function parseTokenTransfer(
  tx: ParsedTransactionWithMeta,
  expectedTokenMint: PublicKey
): TokenTransfer | null {
  const instructions = tx.transaction.message.instructions

  for (const ix of instructions) {
    if ('parsed' in ix && ix.program === 'spl-token') {
      const parsed = ix.parsed
      
      if (parsed.type === 'transfer' || parsed.type === 'transferChecked') {
        const info = parsed.info

        if (info.mint && info.mint !== expectedTokenMint.toBase58()) {
          continue
        }

        const destinationAccount = tx.meta?.postTokenBalances?.find(
          balance => balance.accountIndex === tx.transaction.message.accountKeys.findIndex(
            key => key.pubkey.toString() === info.destination
          )
        )

        if (!destinationAccount?.owner) {
          continue
        }

        return {
          amount: parseInt(info.amount || info.tokenAmount?.amount || '0'),
          source: info.authority || info.multisigAuthority || info.source,
          destination: info.destination,
          destinationOwner: destinationAccount.owner,
          mint: info.mint || expectedTokenMint.toBase58(),
        }
      }
    }
  }

  return null
}

function validateAmount(
  actualAmount: number,
  expectedAmount: number,
  tolerance: number
): { valid: boolean; error?: string } {
  const diff = Math.abs(actualAmount - expectedAmount)
  
  if (diff > tolerance) {
    return {
      valid: false,
      error: `Amount mismatch: expected ${expectedAmount}, got ${actualAmount} (diff: ${diff}, tolerance: ${tolerance})`,
    }
  }

  return { valid: true }
}

function validateWallets(
  actualSender: string,
  actualRecipientOwner: string,
  expectedSender: string,
  expectedRecipient: string
): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  if (actualSender !== expectedSender) {
    errors.push(`Sender mismatch: expected ${expectedSender}, got ${actualSender}`)
  }

  if (actualRecipientOwner !== expectedRecipient) {
    errors.push(`Recipient mismatch: expected ${expectedRecipient}, got ${actualRecipientOwner}`)
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}

function validateTimestamp(
  blockTime: number | null,
  orderCreatedAt: number,
  maxAgeMinutes: number
): { valid: boolean; error?: string; warning?: string } {
  if (!blockTime) {
    return {
      valid: false,
      error: 'Transaction has no block time',
    }
  }

  const txTimestamp = blockTime * 1000
  const maxAge = maxAgeMinutes * 60 * 1000

  if (txTimestamp < orderCreatedAt) {
    return {
      valid: false,
      error: `Transaction timestamp (${new Date(txTimestamp).toISOString()}) is before order creation (${new Date(orderCreatedAt).toISOString()})`,
    }
  }

  const age = Date.now() - txTimestamp
  if (age > maxAge) {
    return {
      valid: false,
      error: `Transaction is too old: ${Math.round(age / 60000)} minutes (max: ${maxAgeMinutes} minutes)`,
    }
  }

  return { valid: true }
}

export async function validateTransaction(
  connection: Connection,
  signature: string,
  options: ValidationOptions
): Promise<ValidationResult> {
  const errors: string[] = []
  const warnings: string[] = []
  const tolerance = options.toleranceAmount || 9000
  const maxAge = options.maxAgeMinutes || 15

  console.log('[Validation] Starting transaction validation:', signature)
  console.log('[Validation] Options:', {
    expectedAmount: options.expectedAmount,
    expectedSender: options.expectedSender,
    expectedRecipient: options.expectedRecipient,
    tolerance,
    maxAge,
  })

  try {
    const tx = await connection.getParsedTransaction(
      signature,
      { maxSupportedTransactionVersion: 0 }
    )

    if (!tx) {
      errors.push('Transaction not found on blockchain')
      console.log('[Validation] ❌ Transaction not found')
      return { valid: false, errors, warnings, details: null }
    }

    if (tx.meta?.err) {
      errors.push(`Transaction failed: ${JSON.stringify(tx.meta.err)}`)
      console.log('[Validation] ❌ Transaction failed:', tx.meta.err)
      return { valid: false, errors, warnings, details: null }
    }

    const confirmationResult = await checkConfirmationStatus(connection, signature)
    console.log('[Validation] Confirmation status:', confirmationResult)
    
    if (!confirmationResult.confirmed) {
      errors.push('Transaction not confirmed')
    }

    const transfer = parseTokenTransfer(tx, new PublicKey(options.expectedTokenMint))
    console.log('[Validation] Parsed transfer:', transfer)
    
    if (!transfer) {
      errors.push('No valid token transfer found')
      return { valid: false, errors, warnings, details: null }
    }

    const amountValidation = validateAmount(
      transfer.amount,
      options.expectedAmount,
      tolerance
    )
    console.log('[Validation] Amount validation:', amountValidation)
    
    if (!amountValidation.valid) {
      errors.push(amountValidation.error!)
    }

    const walletsValidation = validateWallets(
      transfer.source,
      transfer.destinationOwner,
      options.expectedSender,
      options.expectedRecipient
    )
    console.log('[Validation] Wallets validation:', walletsValidation)
    
    if (!walletsValidation.valid) {
      errors.push(...walletsValidation.errors)
    }

    const timestampValidation = validateTimestamp(
      tx.blockTime,
      options.orderCreatedAt,
      maxAge
    )
    console.log('[Validation] Timestamp validation:', timestampValidation)
    
    if (!timestampValidation.valid) {
      errors.push(timestampValidation.error!)
    }
    if (timestampValidation.warning) {
      warnings.push(timestampValidation.warning)
    }

    const valid = errors.length === 0
    console.log(`[Validation] ${valid ? '✅' : '❌'} Validation result:`, { valid, errors, warnings })

    return {
      valid,
      errors,
      warnings,
      details: {
        signature,
        confirmed: confirmationResult.confirmed,
        confirmations: confirmationResult.confirmations,
        amount: transfer.amount,
        sender: transfer.source,
        recipient: transfer.destinationOwner,
        tokenMint: transfer.mint,
        blockTime: tx.blockTime ?? null,
      },
    }
  } catch (error) {
    console.error('[Validation] ❌ Validation error:', error)
    errors.push(`Validation error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    return { valid: false, errors, warnings, details: null }
  }
}
