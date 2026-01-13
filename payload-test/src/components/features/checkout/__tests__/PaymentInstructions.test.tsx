import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import PaymentInstructions from '../PaymentInstructions'

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}))

describe('PaymentInstructions', () => {
  const mockProps = {
    shopWalletAddress: 'ABC123XYZ789',
    amount: 10.5,
    eurAmount: 315,
  }

  it('should render scan to pay heading', () => {
    const { container } = render(<PaymentInstructions {...mockProps} />)
    expect(container.textContent).toContain('Scan to Pay')
  })

  it('should display ELURC amount', () => {
    const { container } = render(<PaymentInstructions {...mockProps} />)
    expect(container.textContent).toContain('10.50 ELURC')
  })

  it('should display EUR equivalent', () => {
    const { container } = render(<PaymentInstructions {...mockProps} />)
    expect(container.textContent).toContain('€3.15')
  })

  it('should display wallet address', () => {
    const { container } = render(<PaymentInstructions {...mockProps} />)
    expect(container.textContent).toContain('ABC123XYZ789')
  })

  it('should render copy button', () => {
    const { container } = render(<PaymentInstructions {...mockProps} />)
    const button = container.querySelector('button[aria-label="Copy wallet address"]')
    expect(button).toBeTruthy()
  })

  it('should render explorer link', () => {
    const { container } = render(<PaymentInstructions {...mockProps} />)
    expect(container.textContent).toContain('Verify on Solana Explorer')
    
    const link = container.querySelector('a[href*="explorer.solana.com"]')
    expect(link).toBeTruthy()
  })

  it('should show payment timeout warning', () => {
    const { container } = render(<PaymentInstructions {...mockProps} />)
    expect(container.textContent).toContain('Payment timeout')
    expect(container.textContent).toContain('10 minutes')
  })
})
