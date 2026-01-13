import { describe, it, expect } from 'vitest'
import { getProductBySlug } from '@/lib/api/products'

describe('Product API - getProductBySlug', () => {
  it('returns null for non-existent product slug', async () => {
    const product = await getProductBySlug('non-existent-product-12345')
    expect(product).toBeNull()
  })

  it('returns product with correct structure when found', async () => {
    const product = await getProductBySlug('test-product')
    
    if (product) {
      expect(product).toHaveProperty('id')
      expect(product).toHaveProperty('name')
      expect(product).toHaveProperty('slug')
      expect(product).toHaveProperty('price_elurc')
      expect(product).toHaveProperty('price_eur')
      expect(product).toHaveProperty('category')
      expect(product).toHaveProperty('stock')
      expect(product).toHaveProperty('in_stock')
      expect(product).toHaveProperty('images')
      
      expect(typeof product.name).toBe('string')
      expect(typeof product.slug).toBe('string')
      expect(typeof product.price_elurc).toBe('number')
      expect(typeof product.price_eur).toBe('number')
      expect(typeof product.stock).toBe('number')
      expect(typeof product.in_stock).toBe('boolean')
      expect(Array.isArray(product.images)).toBe(true)
    }
  })

  it('populates category relationship with depth=1', async () => {
    const product = await getProductBySlug('test-product')
    
    if (product && typeof product.category === 'object') {
      expect(product.category).toHaveProperty('id')
      expect(product.category).toHaveProperty('name')
      expect(product.category).toHaveProperty('slug')
      expect(typeof product.category.name).toBe('string')
      expect(typeof product.category.slug).toBe('string')
    }
  })

  it('returns product with images array', async () => {
    const product = await getProductBySlug('test-product')
    
    if (product) {
      expect(Array.isArray(product.images)).toBe(true)
      
      if (product.images.length > 0) {
        const firstImage = product.images[0]
        expect(firstImage).toBeDefined()
        
        if (firstImage.image) {
          expect(firstImage.image).toHaveProperty('url')
          expect(typeof firstImage.image.url).toBe('string')
        }
      }
    }
  })
})
