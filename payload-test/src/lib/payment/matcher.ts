import { Connection, ParsedTransactionWithMeta, PublicKey } from '@solana/web3.js'

interface Order {
  id: string
  amountElurc: number
  customerWallet: string
  createdAt: number
}

interface TransactionMatch {
  signature: string
  amount: number
  timestamp: number
}

export async function findMatchingTransaction(
  connection: Connection,
  signatures: Array<{ signature: string; blockTime: number | null }>,
  order: Order
): Promise<TransactionMatch | null> {
  const elurTokenMint = new PublicKey(process.env.NEXT_PUBLIC_ELURC_TOKEN_ADDRESS!)
  const customerWallet = new PublicKey(order.customerWallet)
  const shopWallet = new PublicKey(process.env.NEXT_PUBLIC_SHOP_WALLET_ADDRESS!)

  console.log('[Matcher] Looking for transaction with:')
  console.log('  - Token mint:', elurTokenMint.toBase58())
  console.log('  - Customer wallet:', customerWallet.toBase58())
  console.log('  - Shop wallet:', shopWallet.toBase58())
  console.log('  - Expected amount:', order.amountElurc)
  console.log('  - Order created at:', new Date(order.createdAt).toISOString())

  const relevantSignatures = signatures.filter(sig => {
    if (!sig.blockTime) return false
    return sig.blockTime * 1000 >= order.createdAt
  })

  console.log('[Matcher] Filtered to', relevantSignatures.length, 'relevant signatures')

  for (const sig of relevantSignatures) {
    try {
      console.log('[Matcher] Checking transaction:', sig.signature)
      const tx = await connection.getParsedTransaction(
        sig.signature,
        { maxSupportedTransactionVersion: 0 }
      )

      if (!tx || !tx.meta) {
        console.log('  ❌ No transaction data')
        continue
      }
      if (tx.meta.err) {
        console.log('  ❌ Transaction failed:', tx.meta.err)
        console.log('  ℹ️  Checking failed transaction anyway for debugging...')
        // Don't skip - check it anyway for debugging
      }

      const tokenTransfer = parseTokenTransfer(tx, elurTokenMint, shopWallet)
      
      if (!tokenTransfer) {
        console.log('  ❌ No token transfer found')
        continue
      }

      console.log('  ✓ Token transfer found:', tokenTransfer)
      
      if (tokenTransfer.source !== customerWallet.toBase58()) {
        console.log('  ❌ Wrong sender:', tokenTransfer.source, 'vs', customerWallet.toBase58())
        continue
      }

      const amountDiff = Math.abs(tokenTransfer.amount - order.amountElurc)
      const tolerance = 9000
      
      console.log('  ✓ Sender matches!')
      console.log('  Amount check:', tokenTransfer.amount, 'vs', order.amountElurc, '(diff:', amountDiff, ')')
      
      if (amountDiff <= tolerance) {
        console.log('  ✅ MATCH FOUND!')
        return {
          signature: sig.signature,
          amount: tokenTransfer.amount,
          timestamp: sig.blockTime! * 1000,
        }
      } else {
        console.log('  ❌ Amount mismatch (tolerance:', tolerance, ')')
      }
    } catch (error) {
      console.error(`  ❌ Error parsing transaction ${sig.signature}:`, error)
      continue
    }
  }

  console.log('[Matcher] No matching transaction found')
  return null
}

function parseTokenTransfer(
  tx: ParsedTransactionWithMeta,
  tokenMint: PublicKey,
  shopWallet: PublicKey
): { source: string; amount: number } | null {
  const instructions = tx.transaction.message.instructions

  console.log('    [Parser] Checking', instructions.length, 'instructions')

  for (const ix of instructions) {
    if ('parsed' in ix && ix.program === 'spl-token') {
      const parsed = ix.parsed
      console.log('    [Parser] Found spl-token instruction:', parsed.type)
      
      if (parsed.type === 'transfer' || parsed.type === 'transferChecked') {
        const info = parsed.info
        console.log('    [Parser] Transfer info:', {
          mint: info.mint,
          destination: info.destination,
          amount: info.amount || info.tokenAmount?.amount,
          authority: info.authority,
          source: info.source,
        })
        
        if (info.mint && info.mint !== tokenMint.toBase58()) {
          console.log('    [Parser] Wrong token mint')
          continue
        }

        // Check if destination token account is owned by shop wallet
        const destinationTokenAccount = tx.meta?.postTokenBalances?.find(
          balance => balance.accountIndex === tx.transaction.message.accountKeys.findIndex(
            key => key.pubkey.toString() === info.destination
          )
        )

        console.log('    [Parser] Destination token account owner:', destinationTokenAccount?.owner)
        
        if (destinationTokenAccount?.owner !== shopWallet.toBase58()) {
          console.log('    [Parser] Wrong destination owner (expected:', shopWallet.toBase58(), ')')
          continue
        }
        
        return {
          source: info.authority || info.multisigAuthority || info.source,
          amount: parseInt(info.amount || info.tokenAmount?.amount || '0'),
        }
      }
    }
  }

  return null
}
