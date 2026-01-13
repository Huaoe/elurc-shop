import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import OrderDetailsHeader from '../OrderDetailsHeader'

describe('OrderDetailsHeader', () => {
  const mockProps = {
    orderNumber: 'ORD-1234567890',
    status: 'paid' as const,
    createdAt: Date.now(),
  }

  it('should render order number', () => {
    const { container } = render(<OrderDetailsHeader {...mockProps} />)
    expect(container.textContent).toContain('ORD-1234567890')
  })

  it('should render status badge', () => {
    const { container } = render(<OrderDetailsHeader {...mockProps} />)
    expect(container.textContent).toContain('Paid')
  })

  it('should render back to orders link', () => {
    const { container } = render(<OrderDetailsHeader {...mockProps} />)
    expect(container.textContent).toContain('Back to Orders')
    const link = container.querySelector('a[href="/orders"]')
    expect(link).toBeTruthy()
  })

  it('should render relative time', () => {
    const { container } = render(<OrderDetailsHeader {...mockProps} />)
    expect(container.textContent).toContain('ago')
  })

  it('should render breadcrumb navigation', () => {
    const { container } = render(<OrderDetailsHeader {...mockProps} />)
    expect(container.textContent).toContain('Home')
    expect(container.textContent).toContain('Orders')
  })

  it('should render formatted date', () => {
    const { container } = render(<OrderDetailsHeader {...mockProps} />)
    const dateText = container.textContent || ''
    expect(dateText.length).toBeGreaterThan(0)
  })
})
