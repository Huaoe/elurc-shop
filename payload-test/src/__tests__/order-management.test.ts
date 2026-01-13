import { describe, it, expect, beforeAll } from 'vitest'

describe('Order Management Dashboard', () => {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
  let adminToken: string
  let testOrderId: string

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

  describe('Order Access Control', () => {
    it('should allow admin to read orders', async () => {
      const response = await fetch(`${baseUrl}/api/orders`, {
        headers: {
          Authorization: `JWT ${adminToken}`,
        },
      })

      expect(response.ok).toBe(true)
      const data = await response.json()
      expect(data.docs).toBeDefined()
      expect(Array.isArray(data.docs)).toBe(true)
    })

    it('should prevent non-admin from reading orders', async () => {
      const response = await fetch(`${baseUrl}/api/orders`)

      expect(response.ok).toBe(false)
    })

    it('should allow admin to update order status', async () => {
      const listResponse = await fetch(`${baseUrl}/api/orders?limit=1`, {
        headers: {
          Authorization: `JWT ${adminToken}`,
        },
      })

      const listData = await listResponse.json()
      if (listData.docs.length === 0) {
        return
      }

      const orderId = listData.docs[0].id
      testOrderId = orderId

      const updateResponse = await fetch(`${baseUrl}/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${adminToken}`,
        },
        body: JSON.stringify({
          status: 'processing',
        }),
      })

      expect(updateResponse.ok).toBe(true)
      const updateData = await updateResponse.json()
      expect(updateData.doc.status).toBe('processing')
    })

    it('should prevent non-admin from updating orders', async () => {
      if (!testOrderId) {
        return
      }

      const response = await fetch(`${baseUrl}/api/orders/${testOrderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: 'fulfilled',
        }),
      })

      expect(response.ok).toBe(false)
    })
  })

  describe('Order Filtering', () => {
    it('should filter orders by status', async () => {
      const response = await fetch(`${baseUrl}/api/orders?where[status][equals]=paid`, {
        headers: {
          Authorization: `JWT ${adminToken}`,
        },
      })

      expect(response.ok).toBe(true)
      const data = await response.json()
      expect(data.docs).toBeDefined()
      data.docs.forEach((order: any) => {
        expect(order.status).toBe('paid')
      })
    })

    it('should filter orders by multiple statuses', async () => {
      const response = await fetch(
        `${baseUrl}/api/orders?where[status][in][0]=paid&where[status][in][1]=fulfilled`,
        {
          headers: {
            Authorization: `JWT ${adminToken}`,
          },
        }
      )

      expect(response.ok).toBe(true)
      const data = await response.json()
      expect(data.docs).toBeDefined()
      data.docs.forEach((order: any) => {
        expect(['paid', 'fulfilled']).toContain(order.status)
      })
    })

    it('should filter orders by date range', async () => {
      const today = new Date()
      const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)

      const response = await fetch(
        `${baseUrl}/api/orders?where[createdAt][greater_than_equal]=${thirtyDaysAgo.toISOString()}`,
        {
          headers: {
            Authorization: `JWT ${adminToken}`,
          },
        }
      )

      expect(response.ok).toBe(true)
      const data = await response.json()
      expect(data.docs).toBeDefined()
    })
  })

  describe('Order Search', () => {
    it('should search orders by order number', async () => {
      const listResponse = await fetch(`${baseUrl}/api/orders?limit=1`, {
        headers: {
          Authorization: `JWT ${adminToken}`,
        },
      })

      const listData = await listResponse.json()
      if (listData.docs.length === 0) {
        return
      }

      const orderNumber = listData.docs[0].orderNumber

      const searchResponse = await fetch(
        `${baseUrl}/api/orders?where[orderNumber][equals]=${orderNumber}`,
        {
          headers: {
            Authorization: `JWT ${adminToken}`,
          },
        }
      )

      expect(searchResponse.ok).toBe(true)
      const searchData = await searchResponse.json()
      expect(searchData.docs.length).toBeGreaterThan(0)
      expect(searchData.docs[0].orderNumber).toBe(orderNumber)
    })

    it('should search orders by customer email', async () => {
      const listResponse = await fetch(`${baseUrl}/api/orders?limit=1`, {
        headers: {
          Authorization: `JWT ${adminToken}`,
        },
      })

      const listData = await listResponse.json()
      if (listData.docs.length === 0) {
        return
      }

      const customerEmail = listData.docs[0].customerEmail

      const searchResponse = await fetch(
        `${baseUrl}/api/orders?where[customerEmail][equals]=${customerEmail}`,
        {
          headers: {
            Authorization: `JWT ${adminToken}`,
          },
        }
      )

      expect(searchResponse.ok).toBe(true)
      const searchData = await searchResponse.json()
      expect(searchData.docs.length).toBeGreaterThan(0)
    })
  })

  describe('Order Sorting', () => {
    it('should sort orders by creation date descending', async () => {
      const response = await fetch(`${baseUrl}/api/orders?sort=-createdAt&limit=10`, {
        headers: {
          Authorization: `JWT ${adminToken}`,
        },
      })

      expect(response.ok).toBe(true)
      const data = await response.json()
      expect(data.docs).toBeDefined()

      if (data.docs.length > 1) {
        for (let i = 0; i < data.docs.length - 1; i++) {
          const current = new Date(data.docs[i].createdAt).getTime()
          const next = new Date(data.docs[i + 1].createdAt).getTime()
          expect(current).toBeGreaterThanOrEqual(next)
        }
      }
    })

    it('should sort orders by amount', async () => {
      const response = await fetch(`${baseUrl}/api/orders?sort=-amountElurc&limit=10`, {
        headers: {
          Authorization: `JWT ${adminToken}`,
        },
      })

      expect(response.ok).toBe(true)
      const data = await response.json()
      expect(data.docs).toBeDefined()

      if (data.docs.length > 1) {
        for (let i = 0; i < data.docs.length - 1; i++) {
          expect(data.docs[i].amountElurc).toBeGreaterThanOrEqual(data.docs[i + 1].amountElurc)
        }
      }
    })
  })

  describe('Order Pagination', () => {
    it('should paginate orders with default limit', async () => {
      const response = await fetch(`${baseUrl}/api/orders?page=1`, {
        headers: {
          Authorization: `JWT ${adminToken}`,
        },
      })

      expect(response.ok).toBe(true)
      const data = await response.json()
      expect(data.docs).toBeDefined()
      expect(data.totalDocs).toBeDefined()
      expect(data.limit).toBe(20)
      expect(data.page).toBe(1)
      expect(data.totalPages).toBeDefined()
      expect(data.hasNextPage).toBeDefined()
      expect(data.hasPrevPage).toBeDefined()
    })

    it('should support custom page limits', async () => {
      const response = await fetch(`${baseUrl}/api/orders?limit=5&page=1`, {
        headers: {
          Authorization: `JWT ${adminToken}`,
        },
      })

      expect(response.ok).toBe(true)
      const data = await response.json()
      expect(data.limit).toBe(5)
      expect(data.docs.length).toBeLessThanOrEqual(5)
    })
  })

  describe('Order Status Management', () => {
    it('should update order status to fulfilled', async () => {
      if (!testOrderId) {
        return
      }

      const response = await fetch(`${baseUrl}/api/orders/${testOrderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${adminToken}`,
        },
        body: JSON.stringify({
          status: 'fulfilled',
        }),
      })

      expect(response.ok).toBe(true)
      const data = await response.json()
      expect(data.doc.status).toBe('fulfilled')
      expect(data.doc.fulfilledAt).toBeDefined()
    })

    it('should add tracking number to order', async () => {
      if (!testOrderId) {
        return
      }

      const trackingNumber = `TRACK-${Date.now()}`

      const response = await fetch(`${baseUrl}/api/orders/${testOrderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${adminToken}`,
        },
        body: JSON.stringify({
          trackingNumber,
        }),
      })

      expect(response.ok).toBe(true)
      const data = await response.json()
      expect(data.doc.trackingNumber).toBe(trackingNumber)
    })

    it('should add admin notes to order', async () => {
      if (!testOrderId) {
        return
      }

      const adminNotes = 'Test admin note for order management'

      const response = await fetch(`${baseUrl}/api/orders/${testOrderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${adminToken}`,
        },
        body: JSON.stringify({
          adminNotes,
        }),
      })

      expect(response.ok).toBe(true)
      const data = await response.json()
      expect(data.doc.adminNotes).toBe(adminNotes)
    })
  })

  describe('Order Details', () => {
    it('should retrieve complete order details', async () => {
      if (!testOrderId) {
        return
      }

      const response = await fetch(`${baseUrl}/api/orders/${testOrderId}`, {
        headers: {
          Authorization: `JWT ${adminToken}`,
        },
      })

      expect(response.ok).toBe(true)
      const data = await response.json()
      expect(data.orderNumber).toBeDefined()
      expect(data.status).toBeDefined()
      expect(data.customerEmail).toBeDefined()
      expect(data.customerWallet).toBeDefined()
      expect(data.amountElurc).toBeDefined()
      expect(data.amountEur).toBeDefined()
      expect(data.items).toBeDefined()
      expect(Array.isArray(data.items)).toBe(true)
      expect(data.shippingAddress).toBeDefined()
    })

    it('should include order items with product details', async () => {
      if (!testOrderId) {
        return
      }

      const response = await fetch(`${baseUrl}/api/orders/${testOrderId}?depth=1`, {
        headers: {
          Authorization: `JWT ${adminToken}`,
        },
      })

      expect(response.ok).toBe(true)
      const data = await response.json()
      expect(data.items).toBeDefined()
      if (data.items.length > 0) {
        expect(data.items[0].product).toBeDefined()
        expect(data.items[0].quantity).toBeDefined()
        expect(data.items[0].priceSnapshot).toBeDefined()
      }
    })
  })
})
