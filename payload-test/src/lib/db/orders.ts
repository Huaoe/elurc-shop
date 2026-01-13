import { getPayload } from 'payload'
import config from '@payload-config'

interface CreateOrderParams {
  items: Array<{
    product: string
    quantity: number
    priceSnapshot: {
      elurc: number
      eur: number
    }
  }>
  total: {
    elurc: number
    eur: number
  }
  customerWallet: string
  shippingAddress: {
    fullName: string
    streetAddress: string
    city: string
    postalCode: string
    phoneNumber: string
  }
}

export async function createOrder(params: CreateOrderParams) {
  const payload = await getPayload({ config })

  const order = await payload.create({
    collection: 'orders',
    data: {
      orderNumber: `ORD-${Date.now()}`,
      status: 'pending',
      amountElurc: params.total.elurc,
      amountEur: params.total.eur,
      customerWallet: params.customerWallet,
      shippingAddress: params.shippingAddress,
      items: params.items,
      createdAt: new Date().toISOString(),
    },
  })

  return {
    id: order.id,
    orderNumber: order.orderNumber,
    status: order.status,
    amount: params.total.elurc,
    createdAt: new Date(order.createdAt).getTime(),
  }
}

export async function getOrder(orderId: string) {
  const payload = await getPayload({ config })

  try {
    const order = await payload.findByID({
      collection: 'orders',
      id: orderId,
    })

    if (!order) return null

    return {
      id: order.id,
      orderNumber: order.orderNumber,
      status: order.status,
      amount: order.amountElurc,
      customerWallet: order.customerWallet,
      shippingAddress: order.shippingAddress,
      transactionSignature: order.transactionSignature,
      paidAt: order.paidAt ? new Date(order.paidAt).getTime() : null,
      createdAt: new Date(order.createdAt).getTime(),
    }
  } catch (error) {
    console.error('Error fetching order:', error)
    return null
  }
}

export async function updateOrderStatus(
  orderId: string,
  status: 'pending' | 'paid' | 'processing' | 'fulfilled' | 'cancelled' | 'timeout',
  data?: {
    transactionSignature?: string
    paidAt?: number
  }
) {
  const payload = await getPayload({ config })

  await payload.update({
    collection: 'orders',
    id: orderId,
    data: {
      status,
      ...(data?.transactionSignature && { transactionSignature: data.transactionSignature }),
      ...(data?.paidAt && { paidAt: new Date(data.paidAt).toISOString() }),
    },
  })
}
