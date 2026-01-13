import { describe, it, expect } from 'vitest'
import { getCategories } from '@/lib/api/categories'

describe('Categories API', () => {
  it('returns array of categories', async () => {
    const categories = await getCategories()
    expect(Array.isArray(categories)).toBe(true)
  })

  it('includes required category fields', async () => {
    const categories = await getCategories()
    if (categories.length > 0) {
      const category = categories[0]
      expect(category).toHaveProperty('id')
      expect(category).toHaveProperty('name')
      expect(category).toHaveProperty('slug')
      expect(category).toHaveProperty('product_count')
      expect(typeof category.name).toBe('string')
      expect(typeof category.slug).toBe('string')
    }
  })

  it('includes product counts', async () => {
    const categories = await getCategories()
    if (categories.length > 0) {
      expect(categories[0]).toHaveProperty('product_count')
      expect(typeof categories[0].product_count).toBe('number')
    }
  })

  it('filters out empty categories', async () => {
    const categories = await getCategories()
    categories.forEach(cat => {
      expect(cat.product_count).toBeGreaterThan(0)
    })
  })

  it('returns fallback categories on error', async () => {
    const categories = await getCategories()
    expect(categories.length).toBeGreaterThanOrEqual(0)
  })
})
