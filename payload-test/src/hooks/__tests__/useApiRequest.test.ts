import { describe, it, expect, vi } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'
import { useApiRequest } from '../useApiRequest'

describe('useApiRequest', () => {
  it('initializes with default values', () => {
    const { result } = renderHook(() => useApiRequest())
    
    expect(result.current.data).toBe(null)
    expect(result.current.isLoading).toBe(false)
    expect(result.current.error).toBe(null)
    expect(result.current.isSuccess).toBe(false)
  })

  it('sets loading state during request', async () => {
    const { result } = renderHook(() => useApiRequest())
    
    const requestFn = vi.fn(() => new Promise(resolve => setTimeout(() => resolve('data'), 100)))
    
    act(() => {
      result.current.execute(requestFn)
    })
    
    expect(result.current.isLoading).toBe(true)
    
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })
  })

  it('sets data and success state on successful request', async () => {
    const onSuccess = vi.fn()
    const { result } = renderHook(() => useApiRequest({ onSuccess }))
    
    const testData = { id: 1, name: 'Test' }
    const requestFn = vi.fn(() => Promise.resolve(testData))
    
    await act(async () => {
      await result.current.execute(requestFn)
    })
    
    expect(result.current.data).toEqual(testData)
    expect(result.current.isSuccess).toBe(true)
    expect(result.current.error).toBe(null)
    expect(onSuccess).toHaveBeenCalledWith(testData)
  })

  it('sets error state on failed request', async () => {
    const onError = vi.fn()
    const { result } = renderHook(() => useApiRequest({ onError, retryCount: 1 }))
    
    const testError = new Error('Request failed')
    const requestFn = vi.fn(() => Promise.reject(testError))
    
    await act(async () => {
      await result.current.execute(requestFn)
    })
    
    expect(result.current.error).toEqual(testError)
    expect(result.current.isSuccess).toBe(false)
    expect(onError).toHaveBeenCalledWith(testError)
  })

  it('retries failed requests up to retryCount', async () => {
    const { result } = renderHook(() => useApiRequest({ retryCount: 3, retryDelay: 10 }))
    
    const requestFn = vi.fn(() => Promise.reject(new Error('Failed')))
    
    await act(async () => {
      await result.current.execute(requestFn)
    })
    
    expect(requestFn).toHaveBeenCalledTimes(3)
  })

  it('succeeds on retry if request eventually succeeds', async () => {
    const { result } = renderHook(() => useApiRequest({ retryCount: 3, retryDelay: 10 }))
    
    let callCount = 0
    const requestFn = vi.fn(() => {
      callCount++
      if (callCount < 2) {
        return Promise.reject(new Error('Failed'))
      }
      return Promise.resolve('success')
    })
    
    await act(async () => {
      await result.current.execute(requestFn)
    })
    
    expect(result.current.data).toBe('success')
    expect(result.current.isSuccess).toBe(true)
  })

  it('allows manual retry', async () => {
    const { result } = renderHook(() => useApiRequest({ retryCount: 1 }))
    
    const requestFn = vi.fn(() => Promise.reject(new Error('Failed')))
    
    await act(async () => {
      await result.current.execute(requestFn)
    })
    
    expect(result.current.error).toBeDefined()
    
    const successFn = vi.fn(() => Promise.resolve('success'))
    requestFn.mockImplementation(successFn)
    
    await act(async () => {
      await result.current.retry()
    })
    
    expect(result.current.data).toBe('success')
    expect(result.current.isSuccess).toBe(true)
  })

  it('resets state when reset is called', async () => {
    const { result } = renderHook(() => useApiRequest())
    
    const requestFn = vi.fn(() => Promise.resolve('data'))
    
    await act(async () => {
      await result.current.execute(requestFn)
    })
    
    expect(result.current.data).toBe('data')
    
    act(() => {
      result.current.reset()
    })
    
    expect(result.current.data).toBe(null)
    expect(result.current.isLoading).toBe(false)
    expect(result.current.error).toBe(null)
    expect(result.current.isSuccess).toBe(false)
  })
})
