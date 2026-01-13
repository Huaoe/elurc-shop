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
  const isCheckingRef = useRef(false)
  const onStatusChangeRef = useRef(onStatusChange)

  // Keep callback ref up to date
  useEffect(() => {
    onStatusChangeRef.current = onStatusChange
  }, [onStatusChange])

  const stopPolling = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setIsPolling(false)
  }, [])

  const checkStatus = useCallback(async () => {
    if (isCheckingRef.current) {
      console.log('Skipping status check - already in progress')
      return
    }

    isCheckingRef.current = true
    try {
      setError(null)
      const response = await fetch(`/api/orders/${orderId}/status`)

      if (!response.ok) {
        throw new Error('Failed to fetch status')
      }

      const data = await response.json()
      setStatus(data)

      if (data.status !== previousStatusRef.current) {
        onStatusChangeRef.current?.(data.status, previousStatusRef.current)
        previousStatusRef.current = data.status
      }

      // Stop polling if status is no longer 'pending'
      if (data.status !== 'pending') {
        console.log(`Status changed to ${data.status}, stopping polling`)
        stopPolling()
      }
    } catch (err) {
      console.error('Status polling error:', err)
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      isCheckingRef.current = false
    }
  }, [orderId, stopPolling])

  const startPolling = useCallback(() => {
    if (intervalRef.current) {
      console.log('Polling already active, skipping start')
      return
    }

    console.log(`Starting polling with interval: ${interval}ms`)
    setIsPolling(true)
    checkStatus()

    intervalRef.current = setInterval(() => {
      checkStatus()
    }, interval)
  }, [checkStatus, interval])

  useEffect(() => {
    console.log('Polling effect triggered - enabled:', enabled, 'initialStatus:', initialStatus)
    
    // Only poll if enabled and status is 'pending'
    if (!enabled || initialStatus !== 'pending') {
      console.log('Polling disabled or status is not pending, skipping')
      return
    }

    // Only start if not already polling
    if (intervalRef.current) {
      console.log('Already polling, skipping initialization')
      return
    }

    console.log(`Initializing polling with ${interval}ms interval`)
    setIsPolling(true)
    checkStatus()

    intervalRef.current = setInterval(() => {
      checkStatus()
    }, interval)

    return () => {
      console.log('Cleaning up polling on unmount')
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      setIsPolling(false)
    }
    // Only re-run if enabled or initialStatus changes, NOT on callback changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, initialStatus, interval])

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopPolling()
      } else if (enabled && previousStatusRef.current === 'pending') {
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

