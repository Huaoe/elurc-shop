import { PublicKey } from '@solana/web3.js'
import { getConnection } from '@/lib/solana/connection'
import { findMatchingTransaction } from './matcher'
import { getOrder, updateOrderStatus } from '@/lib/db/orders'
import { validateTransaction } from '@/lib/solana/validation'

interface PaymentCheckResult {
  status: 'pending' | 'confirmed' | 'timeout' | 'error'
  transactionSignature?: string
  amount?: number
  timestamp?: number
  message?: string
}

export async function checkPaymentStatus(
  orderId: string
): Promise<PaymentCheckResult> {
  try {
    const order = await getOrder(orderId)
    
    if (!order) {
      return {
        status: 'error',
        message: 'Order not found',
      }
    }

    if (order.status === 'paid') {
      return {
        status: 'confirmed',
        transactionSignature: order.transactionSignature || undefined,
        amount: order.amountElurc,
        timestamp: order.paidAt ? new Date(order.paidAt).getTime() : undefined,
      }
    }

    const orderAge = Date.now() - order.createdAt
    if (orderAge > 10 * 60 * 1000) {
      await updateOrderStatus(orderId, 'timeout')
      return {
        status: 'timeout',
        message: 'Payment window expired',
      }
    }

    const connection = getConnection()
    const shopWallet = new PublicKey(process.env.NEXT_PUBLIC_SHOP_WALLET_ADDRESS!)
    const customerWallet = new PublicKey(order.customerWallet)
    
    console.log('[Payment Monitor] Checking payment for order:', orderId)
    console.log('[Payment Monitor] Order details:', {
      amountElurc: order.amountElurc,
      amountEur: order.amountEur,
      customerWallet: order.customerWallet,
      createdAt: new Date(order.createdAt).toISOString(),
    })
    console.log('[Payment Monitor] Shop wallet:', shopWallet.toBase58())
    
    // Search customer wallet for outgoing transactions
    const signatures = await connection.getSignaturesForAddress(
      customerWallet,
      { limit: 100 },
      'confirmed'
    )

    console.log('[Payment Monitor] Found', signatures.length, 'transactions from customer wallet')
    console.log('[Payment Monitor] First 5 signatures:', signatures.slice(0, 5).map(s => s.signature))

    // Map signatures to expected type, converting undefined blockTime to null
    const validSignatures = signatures.map(sig => ({
      signature: sig.signature,
      blockTime: sig.blockTime ?? null
    }))

    const match = await findMatchingTransaction(
      connection,
      validSignatures,
      {
        ...order,
        id: String(order.id)
      }
    )

    if (match) {
      console.log('[Payment Monitor] ✅ Payment matched!', match)
      
      // Validate transaction before confirming
      const validation = await validateTransaction(
        connection,
        match.signature,
        {
          expectedAmount: order.amountElurc,
          expectedSender: order.customerWallet,
          expectedRecipient: shopWallet.toBase58(),
          expectedTokenMint: process.env.NEXT_PUBLIC_ELURC_TOKEN_ADDRESS!,
          orderCreatedAt: order.createdAt,
          toleranceAmount: 9000,
          maxAgeMinutes: 15,
        }
      )

      if (!validation.valid) {
        console.log('[Payment Monitor] ❌ Validation failed:', validation.errors)
        return {
          status: 'error',
          message: `Transaction validation failed: ${validation.errors.join(', ')}`,
        }
      }

      console.log('[Payment Monitor] ✅ Transaction validated successfully')
      
      await updateOrderStatus(orderId, 'paid', {
        transactionSignature: match.signature,
        paidAt: match.timestamp,
      })

      // Send order confirmation email asynchronously (non-blocking)
      fetch(`${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/api/email/order-confirmation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId }),
      }).catch(error => {
        console.error('[Payment Monitor] Failed to trigger email:', error)
      })

      return {
        status: 'confirmed',
        transactionSignature: match.signature,
        amount: match.amount,
        timestamp: match.timestamp,
      }
    }

    console.log('[Payment Monitor] ⏳ No matching transaction found yet')
    return {
      status: 'pending',
      message: 'Waiting for payment',
    }
  } catch (error) {
    console.error('Payment monitoring error:', error)
    return {
      status: 'error',
      message: 'Failed to check payment status',
    }
  }
}
