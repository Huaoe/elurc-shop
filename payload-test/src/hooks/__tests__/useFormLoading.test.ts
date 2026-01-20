import { describe, it, expect, vi } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'
import { useFormLoading } from '../useFormLoading'

describe('useFormLoading', () => {
  it('initializes with default values', () => {
    const { result } = renderHook(() => useFormLoading())
    
    expect(result.current.isLoading).toBe(false)
    expect(result.current.error).toBe(null)
    expect(result.current.isSuccess).toBe(false)
  })

  it('sets loading state during submission', async () => {
    const { result } = renderHook(() => useFormLoading())
    
    const submitFn = vi.fn(() => new Promise(resolve => setTimeout(resolve, 100)))
    
    act(() => {
      result.current.handleSubmit(submitFn)
    })
    
    expect(result.current.isLoading).toBe(true)
    
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })
  })

  it('sets success state on successful submission', async () => {
    const onSuccess = vi.fn()
    const { result } = renderHook(() => useFormLoading({ onSuccess }))
    
    const submitFn = vi.fn(() => Promise.resolve())
    
    await act(async () => {
      await result.current.handleSubmit(submitFn)
    })
    
    expect(result.current.isSuccess).toBe(true)
    expect(result.current.error).toBe(null)
    expect(onSuccess).toHaveBeenCalledTimes(1)
  })

  it('sets error state on failed submission', async () => {
    const onError = vi.fn()
    const { result } = renderHook(() => useFormLoading({ onError }))
    
    const testError = new Error('Submission failed')
    const submitFn = vi.fn(() => Promise.reject(testError))
    
    await act(async () => {
      await result.current.handleSubmit(submitFn)
    })
    
    expect(result.current.error).toEqual(testError)
    expect(result.current.isSuccess).toBe(false)
    expect(onError).toHaveBeenCalledWith(testError)
  })

  it('resets state when reset is called', async () => {
    const { result } = renderHook(() => useFormLoading())
    
    const submitFn = vi.fn(() => Promise.resolve())
    
    await act(async () => {
      await result.current.handleSubmit(submitFn)
    })
    
    expect(result.current.isSuccess).toBe(true)
    
    act(() => {
      result.current.reset()
    })
    
    expect(result.current.isLoading).toBe(false)
    expect(result.current.error).toBe(null)
    expect(result.current.isSuccess).toBe(false)
  })

  it('clears previous error on new submission', async () => {
    const { result } = renderHook(() => useFormLoading())
    
    const errorFn = vi.fn(() => Promise.reject(new Error('First error')))
    
    await act(async () => {
      await result.current.handleSubmit(errorFn)
    })
    
    expect(result.current.error).toBeDefined()
    
    const successFn = vi.fn(() => Promise.resolve())
    
    await act(async () => {
      await result.current.handleSubmit(successFn)
    })
    
    expect(result.current.error).toBe(null)
    expect(result.current.isSuccess).toBe(true)
  })
})
