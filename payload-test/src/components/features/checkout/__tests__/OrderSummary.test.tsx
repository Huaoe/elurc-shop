import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import OrderSummary from '../OrderSummary'
import { CartItem } from '@/types/cart'

describe('OrderSummary', () => {
  const mockItems: CartItem[] = [
    {
      product: {
        id: '1',
        name: 'Test Product',
        slug: 'test-product',
        description: 'Test',
        price_elurc: 1000000,
        price_eur: 300,
        stock: 10,
        in_stock: true,
        category: { id: 'cat1', name: 'Test', slug: 'test' },
        images: [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      quantity: 2,
      addedAt: Date.now(),
      priceSnapshot: {
        elurc: 1000000,
        eur: 300,
      },
    },
  ]

  const mockTotal = { elurc: 2000000, eur: 600 }

  it('should render order summary title', () => {
    const { container } = render(<OrderSummary items={mockItems} total={mockTotal} />)
    expect(container.textContent).toContain('Order Summary')
  })

  it('should display cart items', () => {
    const { container } = render(<OrderSummary items={mockItems} total={mockTotal} />)
    expect(container.textContent).toContain('Test Product')
    expect(container.textContent).toContain('Qty: 2')
  })

  it('should display total in ELURC', () => {
    const { container } = render(<OrderSummary items={mockItems} total={mockTotal} />)
    expect(container.textContent).toContain('2.00 ELURC')
  })

  it('should display total in EUR', () => {
    const { container } = render(<OrderSummary items={mockItems} total={mockTotal} />)
    expect(container.textContent).toContain('€6.00')
  })
})
