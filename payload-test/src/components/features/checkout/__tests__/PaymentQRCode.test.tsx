import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import PaymentQRCode from '../PaymentQRCode'

describe('PaymentQRCode', () => {
  it('should render QR code with valid URI', () => {
    const validURI = 'solana:ABC123?amount=1000000&spl-token=TOKEN123'
    const { container } = render(<PaymentQRCode paymentURI={validURI} />)
    
    const svg = container.querySelector('svg')
    expect(svg).toBeTruthy()
  })

  it('should show error message for invalid URI', () => {
    const invalidURI = 'invalid-uri'
    const { container } = render(<PaymentQRCode paymentURI={invalidURI} />)
    
    expect(container.textContent).toContain('QR code unavailable')
    expect(container.textContent).toContain('Please use the wallet address below')
  })

  it('should show error message for empty URI', () => {
    const { container } = render(<PaymentQRCode paymentURI="" />)
    
    expect(container.textContent).toContain('QR code unavailable')
  })

  it('should apply custom size', () => {
    const validURI = 'solana:ABC123?amount=1000000&spl-token=TOKEN123'
    const { container } = render(<PaymentQRCode paymentURI={validURI} size={300} />)
    
    const svg = container.querySelector('svg')
    expect(svg).toBeTruthy()
    expect(svg?.getAttribute('width')).toBe('300')
  })
})
