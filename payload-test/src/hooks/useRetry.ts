import { useState, useCallback } from "react"

interface UseRetryOptions {
  maxAttempts?: number
  delay?: number
  onError?: (error: unknown, attempt: number) => void
}

export const useRetry = <T extends (...args: any[]) => Promise<any>>(
  fn: T,
  options: UseRetryOptions = {}
) => {
  const { maxAttempts = 3, delay = 1000, onError } = options
  const [isRetrying, setIsRetrying] = useState(false)
  const [attemptCount, setAttemptCount] = useState(0)

  const retry = useCallback(
    async (...args: Parameters<T>): Promise<ReturnType<T>> => {
      setIsRetrying(true)
      let lastError: unknown

      for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
          setAttemptCount(attempt)
          const result = await fn(...args)
          setIsRetrying(false)
          setAttemptCount(0)
          return result
        } catch (error) {
          lastError = error
          if (onError) {
            onError(error, attempt)
          }

          if (attempt < maxAttempts) {
            await new Promise((resolve) => setTimeout(resolve, delay * attempt))
          }
        }
      }

      setIsRetrying(false)
      setAttemptCount(0)
      throw lastError
    },
    [fn, maxAttempts, delay, onError]
  )

  return { retry, isRetrying, attemptCount }
}
