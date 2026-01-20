"use client"

import { useState, useCallback } from "react"

interface UseFormLoadingOptions {
  onSuccess?: () => void
  onError?: (error: Error) => void
}

export const useFormLoading = (options: UseFormLoadingOptions = {}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = useCallback(
    async (submitFn: () => Promise<void>) => {
      setIsLoading(true)
      setError(null)
      setIsSuccess(false)

      try {
        await submitFn()
        setIsSuccess(true)
        options.onSuccess?.()
      } catch (err) {
        const error = err instanceof Error ? err : new Error('An error occurred')
        setError(error)
        options.onError?.(error)
      } finally {
        setIsLoading(false)
      }
    },
    [options]
  )

  const reset = useCallback(() => {
    setIsLoading(false)
    setError(null)
    setIsSuccess(false)
  }, [])

  return {
    isLoading,
    error,
    isSuccess,
    handleSubmit,
    reset,
  }
}
