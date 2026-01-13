import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render } from '@testing-library/react'
import PaymentTimer from '../PaymentTimer'

describe('PaymentTimer', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.useRealTimers()
  })

  it('should display countdown timer starting at 10 minutes', () => {
    const mockOnTimeout = vi.fn()
    const mockOnWarning = vi.fn()
    const startTime = Date.now()

    const { container } = render(
      <PaymentTimer
        startTime={startTime}
        onTimeout={mockOnTimeout}
        onWarning={mockOnWarning}
      />
    )

    expect(container.textContent).toContain('10:00')
  })

  it('should trigger warning at 2 minutes remaining', () => {
    const mockOnTimeout = vi.fn()
    const mockOnWarning = vi.fn()
    const startTime = Date.now() - (8 * 60 * 1000)

    const { container } = render(
      <PaymentTimer
        startTime={startTime}
        onTimeout={mockOnTimeout}
        onWarning={mockOnWarning}
      />
    )

    expect(container.textContent).toContain('2:00')
    expect(mockOnWarning).not.toHaveBeenCalled()

    vi.advanceTimersByTime(1000)
    expect(mockOnWarning).toHaveBeenCalledTimes(1)
  })

  it('should trigger timeout when timer reaches zero', () => {
    const mockOnTimeout = vi.fn()
    const mockOnWarning = vi.fn()
    const startTime = Date.now() - (10 * 60 * 1000 - 2000)

    const { container } = render(
      <PaymentTimer
        startTime={startTime}
        onTimeout={mockOnTimeout}
        onWarning={mockOnWarning}
      />
    )

    expect(container.textContent).toContain('0:02')

    vi.advanceTimersByTime(2000)
    expect(mockOnTimeout).toHaveBeenCalledTimes(1)
  })

  it('should display warning styling when under 2 minutes', () => {
    const mockOnTimeout = vi.fn()
    const mockOnWarning = vi.fn()
    const startTime = Date.now() - (8 * 60 * 1000)

    const { container } = render(
      <PaymentTimer
        startTime={startTime}
        onTimeout={mockOnTimeout}
        onWarning={mockOnWarning}
      />
    )

    const timerElement = container.querySelector('[data-warning="true"]')
    expect(timerElement).toBeTruthy()
  })

  it('should handle already expired timer on mount', () => {
    const mockOnTimeout = vi.fn()
    const mockOnWarning = vi.fn()
    const startTime = Date.now() - (11 * 60 * 1000)

    const { container } = render(
      <PaymentTimer
        startTime={startTime}
        onTimeout={mockOnTimeout}
        onWarning={mockOnWarning}
      />
    )

    expect(mockOnTimeout).toHaveBeenCalledTimes(1)
    expect(container.textContent).toContain('0:00')
  })

  it('should format minutes and seconds correctly', () => {
    const mockOnTimeout = vi.fn()
    const mockOnWarning = vi.fn()
    const startTime = Date.now() - (9 * 60 * 1000 + 5 * 1000)

    const { container } = render(
      <PaymentTimer
        startTime={startTime}
        onTimeout={mockOnTimeout}
        onWarning={mockOnWarning}
      />
    )

    expect(container.textContent).toContain('0:55')
  })
})
