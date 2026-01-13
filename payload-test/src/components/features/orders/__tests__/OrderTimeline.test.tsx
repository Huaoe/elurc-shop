import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import OrderTimeline from '../OrderTimeline'

describe('OrderTimeline', () => {
  const baseProps = {
    createdAt: Date.now(),
    paidAt: null,
  }

  it('should render timeline for pending order', () => {
    const { container } = render(
      <OrderTimeline {...baseProps} status="pending" />
    )
    expect(container.textContent).toContain('Order Placed')
    expect(container.textContent).toContain('Payment Confirmed')
  })

  it('should render timeline for paid order', () => {
    const { container } = render(
      <OrderTimeline {...baseProps} status="paid" paidAt={Date.now()} />
    )
    expect(container.textContent).toContain('Order Placed')
    expect(container.textContent).toContain('Payment Confirmed')
  })

  it('should render timeline for processing order', () => {
    const { container } = render(
      <OrderTimeline {...baseProps} status="processing" paidAt={Date.now()} />
    )
    expect(container.textContent).toContain('Processing')
    expect(container.textContent).toContain('In progress')
  })

  it('should render timeline for fulfilled order', () => {
    const { container } = render(
      <OrderTimeline {...baseProps} status="fulfilled" paidAt={Date.now()} />
    )
    expect(container.textContent).toContain('Shipped')
    expect(container.textContent).toContain('Delivered')
  })

  it('should render cancelled state', () => {
    const { container } = render(
      <OrderTimeline {...baseProps} status="cancelled" />
    )
    expect(container.textContent).toContain('Order Cancelled')
    expect(container.textContent).toContain('This order has been cancelled')
  })

  it('should render timeout state', () => {
    const { container } = render(
      <OrderTimeline {...baseProps} status="timeout" />
    )
    expect(container.textContent).toContain('Payment Timeout')
    expect(container.textContent).toContain('Payment was not received within the time limit')
  })

  it('should display timestamps for completed steps', () => {
    const now = Date.now()
    const { container } = render(
      <OrderTimeline createdAt={now} paidAt={now} status="paid" />
    )
    const timestamps = container.querySelectorAll('.text-muted-foreground')
    expect(timestamps.length).toBeGreaterThan(0)
  })

  it('should render all timeline steps', () => {
    const { container } = render(
      <OrderTimeline {...baseProps} status="pending" />
    )
    expect(container.textContent).toContain('Order Placed')
    expect(container.textContent).toContain('Payment Confirmed')
    expect(container.textContent).toContain('Processing')
    expect(container.textContent).toContain('Shipped')
    expect(container.textContent).toContain('Delivered')
  })
})
