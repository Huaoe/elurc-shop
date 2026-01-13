import { describe, it, expect, beforeAll } from 'vitest'

describe('Fulfillment Actions', () => {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
  let adminToken: string
  let testOrderId: string
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

    const ordersResponse = await fetch(`${baseUrl}/api/orders?where[status][equals]=paid&limit=1`, {
      headers: {
        Authorization: `JWT ${adminToken}`,
      },
    })

    if (ordersResponse.ok) {
      const ordersData = await ordersResponse.json()
      if (ordersData.docs.length > 0) {
        testOrderId = ordersData.docs[0].id
      }
    }
  })

  describe('Fulfill Order', () => {
    it('should fulfill a paid order successfully', async () => {
      if (!testOrderId) {
        console.log('No paid order available for testing')
        return
      }

      const response = await fetch(`${baseUrl}/api/orders/${testOrderId}/fulfill`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${adminToken}`,
        },
        body: JSON.stringify({
          trackingNumber: `TEST-${Date.now()}`,
          notes: 'Test fulfillment',
        }),
      })

      expect(response.ok).toBe(true)
      const data = await response.json()
      expect(data.success).toBe(true)
      expect(data.order.status).toBe('fulfilled')
      expect(data.message).toBeDefined()
    })

    it('should prevent fulfilling an unpaid order', async () => {
      const pendingOrderResponse = await fetch(
        `${baseUrl}/api/orders?where[status][equals]=pending&limit=1`,
        {
          headers: {
            Authorization: `JWT ${adminToken}`,
          },
        }
      )

      if (pendingOrderResponse.ok) {
        const pendingData = await pendingOrderResponse.json()
        if (pendingData.docs.length > 0) {
          const pendingOrderId = pendingData.docs[0].id

          const response = await fetch(`${baseUrl}/api/orders/${pendingOrderId}/fulfill`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `JWT ${adminToken}`,
            },
            body: JSON.stringify({
              trackingNumber: 'TEST-123',
            }),
          })

          expect(response.ok).toBe(false)
          const data = await response.json()
          expect(data.error).toContain('paid')
        }
      }
    })

    it('should prevent fulfilling an already fulfilled order', async () => {
      const fulfilledOrderResponse = await fetch(
        `${baseUrl}/api/orders?where[status][equals]=fulfilled&limit=1`,
        {
          headers: {
            Authorization: `JWT ${adminToken}`,
          },
        }
      )

      if (fulfilledOrderResponse.ok) {
        const fulfilledData = await fulfilledOrderResponse.json()
        if (fulfilledData.docs.length > 0) {
          const fulfilledOrderId = fulfilledData.docs[0].id

          const response = await fetch(`${baseUrl}/api/orders/${fulfilledOrderId}/fulfill`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `JWT ${adminToken}`,
            },
            body: JSON.stringify({
              trackingNumber: 'TEST-123',
            }),
          })

          expect(response.ok).toBe(false)
          const data = await response.json()
          expect(data.error).toContain('already fulfilled')
        }
      }
    })

    it('should check inventory before fulfillment', async () => {
      if (!testOrderId) {
        console.log('No test order available')
        return
      }

      const orderResponse = await fetch(`${baseUrl}/api/orders/${testOrderId}?depth=1`, {
        headers: {
          Authorization: `JWT ${adminToken}`,
        },
      })

      if (orderResponse.ok) {
        const order = await orderResponse.json()
        if (order.items && order.items.length > 0) {
          const productId = typeof order.items[0].product === 'string' 
            ? order.items[0].product 
            : order.items[0].product.id

          await fetch(`${baseUrl}/api/cms_products/${productId}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `JWT ${adminToken}`,
            },
            body: JSON.stringify({
              stock: 0,
            }),
          })

          const fulfillResponse = await fetch(`${baseUrl}/api/orders/${testOrderId}/fulfill`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `JWT ${adminToken}`,
            },
            body: JSON.stringify({
              trackingNumber: 'TEST-123',
            }),
          })

          expect(fulfillResponse.ok).toBe(false)
          const data = await fulfillResponse.json()
          expect(data.error).toContain('Insufficient inventory')
        }
      }
    })

    it('should decrement inventory on fulfillment', async () => {
      const paidOrderResponse = await fetch(
        `${baseUrl}/api/orders?where[status][equals]=paid&limit=1`,
        {
          headers: {
            Authorization: `JWT ${adminToken}`,
          },
        }
      )

      if (paidOrderResponse.ok) {
        const paidData = await paidOrderResponse.json()
        if (paidData.docs.length > 0) {
          const orderId = paidData.docs[0].id
          const orderDetailResponse = await fetch(`${baseUrl}/api/orders/${orderId}?depth=1`, {
            headers: {
              Authorization: `JWT ${adminToken}`,
            },
          })

          if (orderDetailResponse.ok) {
            const order = await orderDetailResponse.json()
            if (order.items && order.items.length > 0) {
              const productId = typeof order.items[0].product === 'string'
                ? order.items[0].product
                : order.items[0].product.id
              const quantity = order.items[0].quantity

              const productBeforeResponse = await fetch(
                `${baseUrl}/api/cms_products/${productId}`,
                {
                  headers: {
                    Authorization: `JWT ${adminToken}`,
                  },
                }
              )

              const productBefore = await productBeforeResponse.json()
              const stockBefore = productBefore.stock

              const fulfillResponse = await fetch(`${baseUrl}/api/orders/${orderId}/fulfill`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `JWT ${adminToken}`,
                },
                body: JSON.stringify({
                  trackingNumber: `TEST-${Date.now()}`,
                }),
              })

              if (fulfillResponse.ok) {
                const productAfterResponse = await fetch(
                  `${baseUrl}/api/cms_products/${productId}`,
                  {
                    headers: {
                      Authorization: `JWT ${adminToken}`,
                    },
                  }
                )

                const productAfter = await productAfterResponse.json()
                expect(productAfter.stock).toBe(stockBefore - quantity)
              }
            }
          }
        }
      }
    })
  })

  describe('Cancel Order', () => {
    it('should cancel an order successfully', async () => {
      const pendingOrderResponse = await fetch(
        `${baseUrl}/api/orders?where[status][equals]=pending&limit=1`,
        {
          headers: {
            Authorization: `JWT ${adminToken}`,
          },
        }
      )

      if (pendingOrderResponse.ok) {
        const pendingData = await pendingOrderResponse.json()
        if (pendingData.docs.length > 0) {
          const orderId = pendingData.docs[0].id

          const response = await fetch(`${baseUrl}/api/orders/${orderId}/cancel`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `JWT ${adminToken}`,
            },
            body: JSON.stringify({
              reason: 'Customer requested cancellation',
              restoreInventory: false,
            }),
          })

          expect(response.ok).toBe(true)
          const data = await response.json()
          expect(data.success).toBe(true)
          expect(data.order.status).toBe('cancelled')
        }
      }
    })

    it('should require cancellation reason', async () => {
      if (!testOrderId) {
        console.log('No test order available')
        return
      }

      const response = await fetch(`${baseUrl}/api/orders/${testOrderId}/cancel`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${adminToken}`,
        },
        body: JSON.stringify({}),
      })

      expect(response.ok).toBe(false)
      const data = await response.json()
      expect(data.error).toContain('reason')
    })

    it('should prevent cancelling a fulfilled order', async () => {
      const fulfilledOrderResponse = await fetch(
        `${baseUrl}/api/orders?where[status][equals]=fulfilled&limit=1`,
        {
          headers: {
            Authorization: `JWT ${adminToken}`,
          },
        }
      )

      if (fulfilledOrderResponse.ok) {
        const fulfilledData = await fulfilledOrderResponse.json()
        if (fulfilledData.docs.length > 0) {
          const fulfilledOrderId = fulfilledData.docs[0].id

          const response = await fetch(`${baseUrl}/api/orders/${fulfilledOrderId}/cancel`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `JWT ${adminToken}`,
            },
            body: JSON.stringify({
              reason: 'Test cancellation',
            }),
          })

          expect(response.ok).toBe(false)
          const data = await response.json()
          expect(data.error).toContain('Cannot cancel a fulfilled order')
        }
      }
    })

    it('should restore inventory when cancelling a processing order', async () => {
      const processingOrderResponse = await fetch(
        `${baseUrl}/api/orders?where[status][equals]=processing&limit=1`,
        {
          headers: {
            Authorization: `JWT ${adminToken}`,
          },
        }
      )

      if (processingOrderResponse.ok) {
        const processingData = await processingOrderResponse.json()
        if (processingData.docs.length > 0) {
          const orderId = processingData.docs[0].id
          const orderDetailResponse = await fetch(`${baseUrl}/api/orders/${orderId}?depth=1`, {
            headers: {
              Authorization: `JWT ${adminToken}`,
            },
          })

          if (orderDetailResponse.ok) {
            const order = await orderDetailResponse.json()
            if (order.items && order.items.length > 0) {
              const productId = typeof order.items[0].product === 'string'
                ? order.items[0].product
                : order.items[0].product.id
              const quantity = order.items[0].quantity

              const productBeforeResponse = await fetch(
                `${baseUrl}/api/cms_products/${productId}`,
                {
                  headers: {
                    Authorization: `JWT ${adminToken}`,
                  },
                }
              )

              const productBefore = await productBeforeResponse.json()
              const stockBefore = productBefore.stock

              const cancelResponse = await fetch(`${baseUrl}/api/orders/${orderId}/cancel`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `JWT ${adminToken}`,
                },
                body: JSON.stringify({
                  reason: 'Test inventory restoration',
                  restoreInventory: true,
                }),
              })

              if (cancelResponse.ok) {
                const data = await cancelResponse.json()
                expect(data.inventoryRestored).toBe(true)

                const productAfterResponse = await fetch(
                  `${baseUrl}/api/cms_products/${productId}`,
                  {
                    headers: {
                      Authorization: `JWT ${adminToken}`,
                    },
                  }
                )

                const productAfter = await productAfterResponse.json()
                expect(productAfter.stock).toBe(stockBefore + quantity)
              }
            }
          }
        }
      }
    })
  })

  describe('Email Notifications', () => {
    it('should send shipping confirmation email on fulfillment', async () => {
      const response = await fetch(`${baseUrl}/api/email/shipping-confirmation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderNumber: 'TEST-ORDER-123',
          customerEmail: process.env.TEST_EMAIL || 'test@example.com',
          trackingNumber: 'TRACK-123',
          customerName: 'Test Customer',
        }),
      })

      expect(response.ok).toBe(true)
      const data = await response.json()
      expect(data.success).toBe(true)
    })

    it('should send cancellation email', async () => {
      const response = await fetch(`${baseUrl}/api/email/order-cancelled`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderNumber: 'TEST-ORDER-123',
          customerEmail: process.env.TEST_EMAIL || 'test@example.com',
          reason: 'Customer requested cancellation',
        }),
      })

      expect(response.ok).toBe(true)
      const data = await response.json()
      expect(data.success).toBe(true)
    })
  })
})
