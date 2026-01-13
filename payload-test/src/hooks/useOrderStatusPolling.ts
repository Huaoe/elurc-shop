import { useEffect, useState, useRef, useCallback } from 'react'

interface OrderStatus {
  orderId: string
  status: 'pending' | 'paid' | 'processing' | 'fulfilled' | 'cancelled' | 'timeout'
  statusUpdatedAt: string
  nextExpectedStatus: string | null
  estimatedDelivery: string | null
}

interface UseOrderStatusPollingOptions {
  orderId: string
  initialStatus: string
  enabled?: boolean
  interval?: number
  onStatusChange?: (newStatus: string, oldStatus: string) => void
}

export function useOrderStatusPolling({
  orderId,
  initialStatus,
  enabled = true,
  interval = 30000,
  onStatusChange,
}: UseOrderStatusPollingOptions) {
  const [status, setStatus] = useState<OrderStatus | null>(null)
  const [isPolling, setIsPolling] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const previousStatusRef = useRef(initialStatus)

  const stopPolling = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setIsPolling(false)
  }, [])

  const checkStatus = useCallback(async () => {
    try {
      setError(null)
      const response = await fetch(`/api/orders/${orderId}/status`)

      if (!response.ok) {
        throw new Error('Failed to fetch status')
      }

      const data = await response.json()
      setStatus(data)

      if (data.status !== previousStatusRef.current) {
        onStatusChange?.(data.status, previousStatusRef.current)
        previousStatusRef.current = data.status
      }

      if (isTerminalStatus(data.status)) {
        stopPolling()
      }
    } catch (err) {
      console.error('Status polling error:', err)
      setError(err instanceof Error ? err.message : 'Unknown error')
    }
  }, [orderId, onStatusChange, stopPolling])

  const startPolling = useCallback(() => {
    if (intervalRef.current) return

    setIsPolling(true)
    checkStatus()

    intervalRef.current = setInterval(() => {
      checkStatus()
    }, interval)
  }, [checkStatus, interval])

  useEffect(() => {
    if (enabled && !isTerminalStatus(initialStatus)) {
      startPolling()
    }

    return () => {
      stopPolling()
    }
  }, [enabled, initialStatus, startPolling, stopPolling])

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopPolling()
      } else if (enabled && !isTerminalStatus(previousStatusRef.current)) {
        startPolling()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [enabled, startPolling, stopPolling])

  return {
    status,
    isPolling,
    error,
    startPolling,
    stopPolling,
    refetch: checkStatus,
  }
}

function isTerminalStatus(status: string): boolean {
  return ['fulfilled', 'cancelled', 'timeout'].includes(status)
}
