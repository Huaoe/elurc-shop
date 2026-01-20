"use client"

import { useState, useCallback } from "react"

interface UseApiRequestOptions<T> {
  onSuccess?: (data: T) => void
  onError?: (error: Error) => void
  retryCount?: number
  retryDelay?: number
}

interface ApiRequestState<T> {
  data: T | null
  isLoading: boolean
  error: Error | null
  isSuccess: boolean
  retry: () => Promise<void>
  reset: () => void
}

export const useApiRequest = <T = unknown>(
  options: UseApiRequestOptions<T> = {}
): ApiRequestState<T> & { execute: (requestFn: () => Promise<T>) => Promise<void> } => {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)
  const [lastRequest, setLastRequest] = useState<(() => Promise<T>) | null>(null)
  const [attemptCount, setAttemptCount] = useState(0)

  const { retryCount = 3, retryDelay = 1000 } = options

  const executeRequest = useCallback(
    async (requestFn: () => Promise<T>, isRetry = false) => {
      if (!isRetry) {
        setLastRequest(() => requestFn)
        setAttemptCount(0)
      }

      setIsLoading(true)
      setError(null)
      setIsSuccess(false)

      try {
        const result = await requestFn()
        setData(result)
        setIsSuccess(true)
        options.onSuccess?.(result)
        setAttemptCount(0)
      } catch (err) {
        const error = err instanceof Error ? err : new Error('An error occurred')
        const currentAttempt = attemptCount + 1

        if (currentAttempt < retryCount) {
          setAttemptCount(currentAttempt)
          await new Promise(resolve => setTimeout(resolve, retryDelay))
          return executeRequest(requestFn, true)
        }

        setError(error)
        options.onError?.(error)
      } finally {
        setIsLoading(false)
      }
    },
    [attemptCount, retryCount, retryDelay, options]
  )

  const retry = useCallback(async () => {
    if (lastRequest) {
      setAttemptCount(0)
      await executeRequest(lastRequest, false)
    }
  }, [lastRequest, executeRequest])

  const reset = useCallback(() => {
    setData(null)
    setIsLoading(false)
    setError(null)
    setIsSuccess(false)
    setLastRequest(null)
    setAttemptCount(0)
  }, [])

  return {
    data,
    isLoading,
    error,
    isSuccess,
    execute: executeRequest,
    retry,
    reset,
  }
}
