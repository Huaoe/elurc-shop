'use client'

import { useState, useEffect, useCallback } from 'react'

interface PaymentStatus {
  status: 'pending' | 'confirmed' | 'timeout' | 'error'
  transactionSignature?: string
  amount?: number
  timestamp?: number
  message?: string
}

interface UsePaymentMonitoringOptions {
  orderId: string
  enabled: boolean
  onConfirmed?: (signature: string) => void
  onTimeout?: () => void
  onError?: (error: string) => void
}

export function usePaymentMonitoring({
  orderId,
  enabled,
  onConfirmed,
  onTimeout,
  onError,
}: UsePaymentMonitoringOptions) {
  const [status, setStatus] = useState<PaymentStatus>({
    status: 'pending',
  })
  const [isPolling, setIsPolling] = useState(false)

  const checkPayment = useCallback(async () => {
    if (!enabled || !orderId) return

    try {
      const response = await fetch(
        `/api/payment/check?orderId=${orderId}`
      )

      if (!response.ok) {
        throw new Error('Failed to check payment')
      }

      const data: PaymentStatus = await response.json()
      setStatus(data)

      if (data.status === 'confirmed' && data.transactionSignature) {
        setIsPolling(false)
        onConfirmed?.(data.transactionSignature)
      } else if (data.status === 'timeout') {
        setIsPolling(false)
        onTimeout?.()
      } else if (data.status === 'error') {
        setIsPolling(false)
        onError?.(data.message || 'Payment check failed')
      }
    } catch (error) {
      console.error('Payment check error:', error)
      onError?.('Failed to check payment status')
    }
  }, [orderId, enabled, onConfirmed, onTimeout, onError])

  useEffect(() => {
    if (!enabled || !orderId) {
      setIsPolling(false)
      return
    }

    setIsPolling(true)
    checkPayment()

    const interval = setInterval(checkPayment, 5000)

    return () => {
      clearInterval(interval)
      setIsPolling(false)
    }
  }, [orderId, enabled, checkPayment])

  return {
    status: status.status,
    transactionSignature: status.transactionSignature,
    amount: status.amount,
    timestamp: status.timestamp,
    message: status.message,
    isPolling,
  }
}
