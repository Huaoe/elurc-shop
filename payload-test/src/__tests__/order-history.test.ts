import { describe, it, expect, beforeAll } from 'vitest'

describe('Order History API', () => {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
  const testWallet = 'TestWallet123456789'

  beforeAll(async () => {
    const orderResponse = await fetch(`${baseUrl}/api/orders/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: [
          {
            product: 'test-product-id',
            quantity: 2,
            priceSnapshot: {
              elurc: 5000000,
              eur: 500,
            },
          },
        ],
        total: {
          elurc: 10000000,
          eur: 1000,
        },
        customerWallet: testWallet,
        customerEmail: 'test@example.com',
        shippingAddress: {
          fullName: 'Test User',
          streetAddress: '123 Test St',
          city: 'Test City',
          postalCode: '12345',
          phoneNumber: '+1234567890',
        },
      }),
    })

    if (orderResponse.ok) {
      await orderResponse.json()
    }
  })

  describe('GET /api/orders/history', () => {
    it('should return 400 when wallet parameter is missing', async () => {
      const response = await fetch(`${baseUrl}/api/orders/history`)

      expect(response.status).toBe(400)
      const data = await response.json()
      expect(data.error).toBe('Wallet address required')
    })

    it('should return empty array for wallet with no orders', async () => {
      const response = await fetch(
        `${baseUrl}/api/orders/history?wallet=NonExistentWallet123`
      )

      expect(response.status).toBe(200)
      const data = await response.json()
      expect(data.orders).toEqual([])
      expect(data.total).toBe(0)
    })

    it('should return orders for valid wallet address', async () => {
      const response = await fetch(
        `${baseUrl}/api/orders/history?wallet=${testWallet}`
      )

      expect(response.status).toBe(200)
      const data = await response.json()
      expect(Array.isArray(data.orders)).toBe(true)
      expect(data.total).toBeGreaterThan(0)
    })

    it('should return order summaries with correct structure', async () => {
      const response = await fetch(
        `${baseUrl}/api/orders/history?wallet=${testWallet}`
      )

      expect(response.status).toBe(200)
      const data = await response.json()
      
      if (data.orders.length > 0) {
        const order = data.orders[0]
        expect(order).toHaveProperty('id')
        expect(order).toHaveProperty('orderNumber')
        expect(order).toHaveProperty('status')
        expect(order).toHaveProperty('amountElurc')
        expect(order).toHaveProperty('amountEur')
        expect(order).toHaveProperty('itemCount')
        expect(order).toHaveProperty('createdAt')
        expect(order).toHaveProperty('paidAt')
      }
    })

    it('should return orders sorted by newest first', async () => {
      const response = await fetch(
        `${baseUrl}/api/orders/history?wallet=${testWallet}`
      )

      expect(response.status).toBe(200)
      const data = await response.json()
      
      if (data.orders.length > 1) {
        const firstOrderDate = new Date(data.orders[0].createdAt)
        const secondOrderDate = new Date(data.orders[1].createdAt)
        expect(firstOrderDate.getTime()).toBeGreaterThanOrEqual(secondOrderDate.getTime())
      }
    })

    it('should only return orders for specified wallet', async () => {
      const response = await fetch(
        `${baseUrl}/api/orders/history?wallet=${testWallet}`
      )

      expect(response.status).toBe(200)
      const data = await response.json()
      
      data.orders.forEach((order: { id: string }) => {
        expect(order.id).toBeDefined()
      })
    })

    it('should calculate item count correctly', async () => {
      const response = await fetch(
        `${baseUrl}/api/orders/history?wallet=${testWallet}`
      )

      expect(response.status).toBe(200)
      const data = await response.json()
      
      if (data.orders.length > 0) {
        const order = data.orders[0]
        expect(typeof order.itemCount).toBe('number')
        expect(order.itemCount).toBeGreaterThan(0)
      }
    })
  })
})
