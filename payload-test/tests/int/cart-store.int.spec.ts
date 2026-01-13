import { describe, it, expect, beforeEach } from 'vitest'
import { useCartStore } from '@/store/cart'
import { Product } from '@/types/product'

describe('Cart Store', () => {
  beforeEach(() => {
    useCartStore.getState().clearCart()
  })

  const mockProduct: Product = {
    id: '1',
    name: 'Test Product',
    slug: 'test-product',
    description: 'Test description',
    price_elurc: 1000000,
    price_eur: 300,
    stock: 10,
    in_stock: true,
    category: { id: 'cat1', name: 'Test Category', slug: 'test-category' },
    images: [],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }

  const mockProduct2: Product = {
    ...mockProduct,
    id: '2',
    name: 'Test Product 2',
    slug: 'test-product-2',
    price_elurc: 2000000,
    price_eur: 600,
  }

  it('adds item to cart', () => {
    const { addItem, items } = useCartStore.getState()
    addItem(mockProduct, 2)
    
    expect(items).toHaveLength(1)
    expect(items[0].quantity).toBe(2)
    expect(items[0].product.id).toBe('1')
  })

  it('updates quantity for existing item', () => {
    const { addItem, items } = useCartStore.getState()
    addItem(mockProduct, 2)
    addItem(mockProduct, 3)
    
    expect(items).toHaveLength(1)
    expect(items[0].quantity).toBe(5)
  })

  it('removes item from cart', () => {
    const { addItem, removeItem, items } = useCartStore.getState()
    addItem(mockProduct, 2)
    removeItem('1')
    
    expect(items).toHaveLength(0)
  })

  it('updates item quantity', () => {
    const { addItem, updateQuantity, items } = useCartStore.getState()
    addItem(mockProduct, 2)
    updateQuantity('1', 5)
    
    expect(items[0].quantity).toBe(5)
  })

  it('enforces maximum quantity based on stock', () => {
    const { addItem, updateQuantity, items } = useCartStore.getState()
    addItem(mockProduct, 2)
    updateQuantity('1', 20)
    
    expect(items[0].quantity).toBe(10)
  })

  it('prevents quantity below 1', () => {
    const { addItem, updateQuantity, items } = useCartStore.getState()
    addItem(mockProduct, 2)
    updateQuantity('1', 0)
    
    expect(items[0].quantity).toBe(2)
  })

  it('calculates cart total correctly', () => {
    const { addItem, getCartTotal } = useCartStore.getState()
    addItem(mockProduct, 2)
    
    const total = getCartTotal()
    expect(total.elurc).toBe(2000000)
    expect(total.eur).toBe(600)
  })

  it('calculates cart total with multiple items', () => {
    const { addItem, getCartTotal } = useCartStore.getState()
    addItem(mockProduct, 2)
    addItem(mockProduct2, 1)
    
    const total = getCartTotal()
    expect(total.elurc).toBe(4000000)
    expect(total.eur).toBe(1200)
  })

  it('calculates item count correctly', () => {
    const { addItem, getItemCount } = useCartStore.getState()
    addItem(mockProduct, 2)
    addItem(mockProduct2, 3)
    
    expect(getItemCount()).toBe(5)
  })

  it('clears cart', () => {
    const { addItem, clearCart, items } = useCartStore.getState()
    addItem(mockProduct, 2)
    addItem(mockProduct2, 3)
    clearCart()
    
    expect(items).toHaveLength(0)
  })

  it('stores price snapshot', () => {
    const { addItem, items } = useCartStore.getState()
    addItem(mockProduct, 1)
    
    expect(items[0].priceSnapshot.elurc).toBe(1000000)
    expect(items[0].priceSnapshot.eur).toBe(300)
  })

  it('stores addedAt timestamp', () => {
    const { addItem, items } = useCartStore.getState()
    const before = Date.now()
    addItem(mockProduct, 1)
    const after = Date.now()
    
    expect(items[0].addedAt).toBeGreaterThanOrEqual(before)
    expect(items[0].addedAt).toBeLessThanOrEqual(after)
  })

  it('updates lastUpdated on cart changes', () => {
    const { addItem, lastUpdated } = useCartStore.getState()
    const before = Date.now()
    addItem(mockProduct, 1)
    const state = useCartStore.getState()
    
    expect(state.lastUpdated).toBeGreaterThanOrEqual(before)
  })
})
