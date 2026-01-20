import { describe, it, expect } from 'vitest'

describe('PayloadCMS E-Commerce Plugin Integration', () => {
  it('should have ecommerce plugin configured', async () => {
    const config = await import('../payload.config')
    const payloadConfig = config.default
    
    expect(payloadConfig.plugins).toBeDefined()
    expect(payloadConfig.plugins?.length).toBeGreaterThan(0)
  })

  it('should preserve existing collections', async () => {
    const config = await import('../payload.config')
    const payloadConfig = config.default
    
    const collectionSlugs = payloadConfig.collections.map((c) => c.slug)
    
    expect(collectionSlugs).toContain('cms_products')
    expect(collectionSlugs).toContain('orders')
    expect(collectionSlugs).toContain('cms_categories')
    expect(collectionSlugs).toContain('users')
  })

  it('should preserve custom ELURC fields in Products collection', async () => {
    const { Products } = await import('../collections/Products')
    
    const fieldNames = Products.fields.map((f) => ('name' in f ? f.name : null)).filter(Boolean)
    
    expect(fieldNames).toContain('price_elurc')
    expect(fieldNames).toContain('price_eur')
    expect(fieldNames).toContain('stock')
    expect(fieldNames).toContain('in_stock')
    expect(fieldNames).toContain('low_stock_threshold')
  })

  it('should preserve custom ELURC fields in Orders collection', async () => {
    const { Orders } = await import('../collections/Orders')
    
    const fieldNames = Orders.fields.map((f) => ('name' in f ? f.name : null)).filter(Boolean)
    
    expect(fieldNames).toContain('amountElurc')
    expect(fieldNames).toContain('amountEur')
    expect(fieldNames).toContain('customerWallet')
    expect(fieldNames).toContain('transactionSignature')
    expect(fieldNames).toContain('paymentDiscrepancy')
    expect(fieldNames).toContain('refundInfo')
  })

  it('should have admin configuration for Products', async () => {
    const { Products } = await import('../collections/Products')
    
    expect(Products.admin).toBeDefined()
    expect(Products.admin?.useAsTitle).toBe('name')
    expect(Products.admin?.group).toBe('Catalog')
  })

  it('should have admin configuration for Orders', async () => {
    const { Orders } = await import('../collections/Orders')
    
    expect(Orders.admin).toBeDefined()
    expect(Orders.admin?.useAsTitle).toBe('orderNumber')
    expect(Orders.admin?.group).toBe('Commerce')
  })
})
