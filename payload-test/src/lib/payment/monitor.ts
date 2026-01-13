import { PublicKey } from '@solana/web3.js'
import { getConnection } from '@/lib/solana/connection'
import { findMatchingTransaction } from './matcher'
import { getOrder, updateOrderStatus } from '@/lib/db/orders'

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
        transactionSignature: order.transactionSignature,
        amount: order.amount,
        timestamp: order.paidAt || undefined,
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
      amount: order.amount,
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

    const match = await findMatchingTransaction(
      connection,
      signatures,
      order
    )

    if (match) {
      console.log('[Payment Monitor] ✅ Payment matched!', match)
      await updateOrderStatus(orderId, 'paid', {
        transactionSignature: match.signature,
        paidAt: match.timestamp,
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
