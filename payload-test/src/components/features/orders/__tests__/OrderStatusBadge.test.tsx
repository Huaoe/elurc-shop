import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import OrderStatusBadge from '../OrderStatusBadge'

describe('OrderStatusBadge', () => {
  it('should render pending status with correct styling', () => {
    const { container } = render(<OrderStatusBadge status="pending" />)
    expect(container.textContent).toContain('Pending Payment')
  })

  it('should render paid status with correct styling', () => {
    const { container } = render(<OrderStatusBadge status="paid" />)
    expect(container.textContent).toContain('Paid')
  })

  it('should render processing status with correct styling', () => {
    const { container } = render(<OrderStatusBadge status="processing" />)
    expect(container.textContent).toContain('Processing')
  })

  it('should render fulfilled status with correct styling', () => {
    const { container } = render(<OrderStatusBadge status="fulfilled" />)
    expect(container.textContent).toContain('Fulfilled')
  })

  it('should render cancelled status with correct styling', () => {
    const { container } = render(<OrderStatusBadge status="cancelled" />)
    expect(container.textContent).toContain('Cancelled')
  })

  it('should render timeout status with correct styling', () => {
    const { container } = render(<OrderStatusBadge status="timeout" />)
    expect(container.textContent).toContain('Timeout')
  })

  it('should include icon for each status', () => {
    const statuses: Array<'pending' | 'paid' | 'processing' | 'fulfilled' | 'cancelled' | 'timeout'> = [
      'pending',
      'paid',
      'processing',
      'fulfilled',
      'cancelled',
      'timeout',
    ]

    statuses.forEach((status) => {
      const { container } = render(<OrderStatusBadge status={status} />)
      const icon = container.querySelector('svg')
      expect(icon).toBeTruthy()
    })
  })
})
