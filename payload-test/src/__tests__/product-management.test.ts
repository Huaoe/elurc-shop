import { describe, it, expect, beforeAll } from 'vitest'

describe('Product Management CRUD', () => {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
  let adminToken: string
  let testCategoryId: string
  let testProductId: string

  beforeAll(async () => {
    const response = await fetch(`${baseUrl}/api/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'admin@elurc-market.com',
        password: 'admin123',
      }),
    })

    if (response.ok) {
      const data = await response.json()
      adminToken = data.token
    }
  })

  describe('Category Management', () => {
    it('should allow admin to create a category', async () => {
      const response = await fetch(`${baseUrl}/api/cms_categories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${adminToken}`,
        },
        body: JSON.stringify({
          name: `Test Category ${Date.now()}`,
          description: 'Test category description',
        }),
      })

      expect(response.ok).toBe(true)
      const data = await response.json()
      expect(data.doc).toBeDefined()
      expect(data.doc.name).toContain('Test Category')
      expect(data.doc.slug).toBeDefined()
      testCategoryId = data.doc.id
    })

    it('should auto-generate slug from category name', async () => {
      const response = await fetch(`${baseUrl}/api/cms_categories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${adminToken}`,
        },
        body: JSON.stringify({
          name: 'Test Category With Spaces',
        }),
      })

      expect(response.ok).toBe(true)
      const data = await response.json()
      expect(data.doc.slug).toBe('test-category-with-spaces')
    })

    it('should allow admin to update a category', async () => {
      if (!testCategoryId) {
        expect.fail('Test category not created')
        return
      }

      const response = await fetch(`${baseUrl}/api/cms_categories/${testCategoryId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${adminToken}`,
        },
        body: JSON.stringify({
          description: 'Updated description',
        }),
      })

      expect(response.ok).toBe(true)
      const data = await response.json()
      expect(data.doc.description).toBe('Updated description')
    })

    it('should prevent non-admin from creating categories', async () => {
      const response = await fetch(`${baseUrl}/api/cms_categories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Unauthorized Category',
        }),
      })

      expect(response.ok).toBe(false)
    })
  })

  describe('Product CRUD Operations', () => {
    it('should allow admin to create a product', async () => {
      if (!testCategoryId) {
        expect.fail('Test category not available')
        return
      }

      const response = await fetch(`${baseUrl}/api/cms_products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${adminToken}`,
        },
        body: JSON.stringify({
          name: `Test Product ${Date.now()}`,
          description: 'Test product description',
          price_elurc: 100,
          price_eur: 1000,
          category: testCategoryId,
          stock: 50,
        }),
      })

      expect(response.ok).toBe(true)
      const data = await response.json()
      expect(data.doc).toBeDefined()
      expect(data.doc.name).toContain('Test Product')
      expect(data.doc.slug).toBeDefined()
      expect(data.doc.in_stock).toBe(true)
      testProductId = data.doc.id
    })

    it('should auto-generate slug from product name', async () => {
      if (!testCategoryId) {
        expect.fail('Test category not available')
        return
      }

      const response = await fetch(`${baseUrl}/api/cms_products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${adminToken}`,
        },
        body: JSON.stringify({
          name: 'Test Product With Special Ch@rs!',
          price_elurc: 100,
          price_eur: 1000,
          category: testCategoryId,
          stock: 10,
        }),
      })

      expect(response.ok).toBe(true)
      const data = await response.json()
      expect(data.doc.slug).toBe('test-product-with-special-ch-rs')
    })

    it('should allow admin to update a product', async () => {
      if (!testProductId) {
        expect.fail('Test product not created')
        return
      }

      const response = await fetch(`${baseUrl}/api/cms_products/${testProductId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${adminToken}`,
        },
        body: JSON.stringify({
          price_elurc: 200,
          stock: 25,
        }),
      })

      expect(response.ok).toBe(true)
      const data = await response.json()
      expect(data.doc.price_elurc).toBe(200)
      expect(data.doc.stock).toBe(25)
    })

    it('should allow admin to delete a product', async () => {
      if (!testProductId) {
        expect.fail('Test product not created')
        return
      }

      const response = await fetch(`${baseUrl}/api/cms_products/${testProductId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `JWT ${adminToken}`,
        },
      })

      expect(response.ok).toBe(true)
    })

    it('should prevent non-admin from creating products', async () => {
      const response = await fetch(`${baseUrl}/api/cms_products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Unauthorized Product',
          price_elurc: 100,
          price_eur: 1000,
          category: testCategoryId,
          stock: 10,
        }),
      })

      expect(response.ok).toBe(false)
    })
  })

  describe('Inventory Management', () => {
    it('should automatically set in_stock to false when stock is 0', async () => {
      if (!testCategoryId) {
        expect.fail('Test category not available')
        return
      }

      const response = await fetch(`${baseUrl}/api/cms_products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${adminToken}`,
        },
        body: JSON.stringify({
          name: `Out of Stock Product ${Date.now()}`,
          price_elurc: 100,
          price_eur: 1000,
          category: testCategoryId,
          stock: 0,
        }),
      })

      expect(response.ok).toBe(true)
      const data = await response.json()
      expect(data.doc.in_stock).toBe(false)
    })

    it('should automatically set in_stock to true when stock > 0', async () => {
      if (!testCategoryId) {
        expect.fail('Test category not available')
        return
      }

      const createResponse = await fetch(`${baseUrl}/api/cms_products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${adminToken}`,
        },
        body: JSON.stringify({
          name: `Stock Update Test ${Date.now()}`,
          price_elurc: 100,
          price_eur: 1000,
          category: testCategoryId,
          stock: 0,
        }),
      })

      const createData = await createResponse.json()
      expect(createData.doc.in_stock).toBe(false)

      const updateResponse = await fetch(`${baseUrl}/api/cms_products/${createData.doc.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${adminToken}`,
        },
        body: JSON.stringify({
          stock: 10,
        }),
      })

      const updateData = await updateResponse.json()
      expect(updateData.doc.in_stock).toBe(true)
    })

    it('should set default low stock threshold', async () => {
      if (!testCategoryId) {
        expect.fail('Test category not available')
        return
      }

      const response = await fetch(`${baseUrl}/api/cms_products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${adminToken}`,
        },
        body: JSON.stringify({
          name: `Threshold Test ${Date.now()}`,
          price_elurc: 100,
          price_eur: 1000,
          category: testCategoryId,
          stock: 10,
        }),
      })

      expect(response.ok).toBe(true)
      const data = await response.json()
      expect(data.doc.low_stock_threshold).toBe(5)
    })
  })

  describe('Product Listing and Filtering', () => {
    it('should list all products', async () => {
      const response = await fetch(`${baseUrl}/api/cms_products`)

      expect(response.ok).toBe(true)
      const data = await response.json()
      expect(data.docs).toBeDefined()
      expect(Array.isArray(data.docs)).toBe(true)
    })

    it('should filter products by category', async () => {
      if (!testCategoryId) {
        expect.fail('Test category not available')
        return
      }

      const response = await fetch(`${baseUrl}/api/cms_products?where[category][equals]=${testCategoryId}`)

      expect(response.ok).toBe(true)
      const data = await response.json()
      expect(data.docs).toBeDefined()
      data.docs.forEach((product: any) => {
        expect(product.category).toBe(testCategoryId)
      })
    })

    it('should support pagination', async () => {
      const response = await fetch(`${baseUrl}/api/cms_products?limit=5&page=1`)

      expect(response.ok).toBe(true)
      const data = await response.json()
      expect(data.docs).toBeDefined()
      expect(data.totalDocs).toBeDefined()
      expect(data.limit).toBe(5)
      expect(data.page).toBe(1)
    })
  })
})
