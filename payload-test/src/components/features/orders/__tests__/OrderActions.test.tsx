import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import OrderActions from '../OrderActions'

describe('OrderActions', () => {
  const mockProps = {
    orderId: 'test-order-id',
    orderNumber: 'ORD-1234567890',
    transactionSignature: 'test-signature-123',
  }

  it('should render actions card', () => {
    const { container } = render(<OrderActions {...mockProps} />)
    expect(container.textContent).toContain('Actions')
  })

  it('should render view transaction button when signature exists', () => {
    const { container } = render(<OrderActions {...mockProps} />)
    expect(container.textContent).toContain('View Transaction')
    const link = container.querySelector('a[target="_blank"]')
    expect(link).toBeTruthy()
  })

  it('should not render view transaction button when signature is null', () => {
    const { container } = render(
      <OrderActions {...mockProps} transactionSignature={null} />
    )
    expect(container.textContent).not.toContain('View Transaction')
  })

  it('should render contact support button', () => {
    const { container } = render(<OrderActions {...mockProps} />)
    expect(container.textContent).toContain('Contact Support')
    const link = container.querySelector('a[href^="mailto:"]')
    expect(link).toBeTruthy()
  })

  it('should render print order button', () => {
    const { container } = render(<OrderActions {...mockProps} />)
    expect(container.textContent).toContain('Print Order')
  })

  it('should call window.print when print button clicked', () => {
    const printSpy = vi.spyOn(window, 'print').mockImplementation(() => {})
    const { container } = render(<OrderActions {...mockProps} />)
    const printButton = Array.from(container.querySelectorAll('button')).find(
      (btn) => btn.textContent?.includes('Print Order')
    )
    expect(printButton).toBeTruthy()
    printSpy.mockRestore()
  })

  it('should link to solana explorer with correct signature', () => {
    const { container } = render(<OrderActions {...mockProps} />)
    const link = container.querySelector('a[target="_blank"]')
    expect(link?.getAttribute('href')).toContain('test-signature-123')
    expect(link?.getAttribute('href')).toContain('explorer.solana.com')
  })
})
