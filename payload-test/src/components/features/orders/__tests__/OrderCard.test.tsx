import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import OrderCard from '../OrderCard'

describe('OrderCard', () => {
  const mockOrder = {
    id: 'test-order-id',
    orderNumber: 'ORD-1234567890',
    status: 'paid' as const,
    amountElurc: 10000000,
    amountEur: 1000,
    itemCount: 3,
    createdAt: new Date().toISOString(),
    paidAt: new Date().toISOString(),
  }

  it('should render order number', () => {
    const { container } = render(<OrderCard order={mockOrder} />)
    expect(container.textContent).toContain('ORD-1234567890')
  })

  it('should render order status badge', () => {
    const { container } = render(<OrderCard order={mockOrder} />)
    expect(container.textContent).toContain('Paid')
  })

  it('should render item count with singular form', () => {
    const singleItemOrder = { ...mockOrder, itemCount: 1 }
    const { container } = render(<OrderCard order={singleItemOrder} />)
    expect(container.textContent).toContain('1 item')
  })

  it('should render item count with plural form', () => {
    const { container } = render(<OrderCard order={mockOrder} />)
    expect(container.textContent).toContain('3 items')
  })

  it('should render ELURC amount correctly', () => {
    const { container } = render(<OrderCard order={mockOrder} />)
    expect(container.textContent).toContain('10.00 ELURC')
  })

  it('should render EUR amount correctly', () => {
    const { container } = render(<OrderCard order={mockOrder} />)
    expect(container.textContent).toContain('€10.00')
  })

  it('should link to order detail page', () => {
    const { container } = render(<OrderCard order={mockOrder} />)
    const link = container.querySelector('a[href="/orders/test-order-id"]')
    expect(link).toBeTruthy()
  })

  it('should render chevron icon', () => {
    const { container } = render(<OrderCard order={mockOrder} />)
    const chevron = container.querySelector('svg')
    expect(chevron).toBeTruthy()
  })

  it('should display relative time', () => {
    const { container } = render(<OrderCard order={mockOrder} />)
    expect(container.textContent).toContain('ago')
  })
})
