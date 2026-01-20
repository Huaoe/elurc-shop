import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { PaymentLoading } from '../payment-loading'

describe('PaymentLoading', () => {
  it('renders generating stage correctly', () => {
    render(<PaymentLoading stage="generating" />)
    expect(screen.getByText('Generating payment QR code...')).toBeDefined()
    expect(screen.getByRole('status')).toBeDefined()
  })

  it('renders polling stage correctly', () => {
    render(<PaymentLoading stage="polling" />)
    expect(screen.getByText('Waiting for payment...')).toBeDefined()
  })

  it('renders confirming stage correctly', () => {
    render(<PaymentLoading stage="confirming" />)
    expect(screen.getByText('Confirming transaction...')).toBeDefined()
  })

  it('renders complete stage correctly', () => {
    render(<PaymentLoading stage="complete" />)
    expect(screen.getByText('Payment confirmed!')).toBeDefined()
  })

  it('displays custom message when provided', () => {
    render(<PaymentLoading stage="polling" message="Custom message" />)
    expect(screen.getByText('Custom message')).toBeDefined()
  })

  it('displays estimated time when provided', () => {
    render(<PaymentLoading stage="polling" estimatedTime={30} />)
    expect(screen.getByText('Estimated time: 30s')).toBeDefined()
  })

  it('does not display estimated time when stage is complete', () => {
    render(<PaymentLoading stage="complete" estimatedTime={30} />)
    expect(screen.queryByText(/Estimated time/)).toBeNull()
  })

  it('shows spinner for non-complete stages', () => {
    const { container } = render(<PaymentLoading stage="generating" />)
    const spinner = container.querySelector('[role="status"]')
    expect(spinner).toBeDefined()
  })

  it('applies custom className', () => {
    const { container } = render(<PaymentLoading stage="polling" className="custom-class" />)
    const element = container.querySelector('.custom-class')
    expect(element).toBeDefined()
  })

  it('has proper accessibility attributes', () => {
    render(<PaymentLoading stage="polling" />)
    const element = screen.getByRole('status')
    expect(element.getAttribute('aria-live')).toBe('polite')
  })
})
