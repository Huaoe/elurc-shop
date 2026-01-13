import { CollectionConfig } from 'payload'

export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: 'orderNumber',
    defaultColumns: ['orderNumber', 'status', 'customerEmail', 'amountElurc', 'createdAt'],
    group: 'Commerce',
    listSearchableFields: ['orderNumber', 'customerEmail', 'customerWallet', 'transactionSignature'],
    pagination: {
      defaultLimit: 20,
    },
  },
  access: {
    read: ({ req: { user } }) => {
      if (!user) return false
      return (user as any).role === 'admin'
    },
    create: () => true,
    update: ({ req: { user } }) => {
      if (!user) return false
      return (user as any).role === 'admin'
    },
    delete: ({ req: { user } }) => {
      if (!user) return false
      return (user as any).role === 'admin'
    },
  },
  fields: [
    {
      name: 'orderNumber',
      type: 'text',
      required: true,
      unique: true,
      label: 'Order Number',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Paid', value: 'paid' },
        { label: 'Processing', value: 'processing' },
        { label: 'Fulfilled', value: 'fulfilled' },
        { label: 'Cancelled', value: 'cancelled' },
        { label: 'Timeout', value: 'timeout' },
      ],
      label: 'Order Status',
    },
    {
      name: 'amountElurc',
      type: 'number',
      required: true,
      min: 0,
      label: 'Amount (ELURC)',
      admin: {
        description: 'Total amount in ELURC tokens (lamports)',
      },
    },
    {
      name: 'amountEur',
      type: 'number',
      required: true,
      min: 0,
      label: 'Amount (EUR)',
      admin: {
        description: 'Total amount in euros (cents)',
      },
    },
    {
      name: 'customerWallet',
      type: 'text',
      required: true,
      label: 'Customer Wallet Address',
      admin: {
        description: 'Solana wallet public key',
      },
    },
    {
      name: 'customerEmail',
      type: 'email',
      required: true,
      label: 'Customer Email',
      admin: {
        description: 'Email address for order confirmation',
      },
    },
    {
      name: 'shippingAddress',
      type: 'group',
      label: 'Shipping Address',
      fields: [
        {
          name: 'fullName',
          type: 'text',
          required: true,
          label: 'Full Name',
        },
        {
          name: 'streetAddress',
          type: 'text',
          required: true,
          label: 'Street Address',
        },
        {
          name: 'city',
          type: 'text',
          required: true,
          label: 'City',
        },
        {
          name: 'postalCode',
          type: 'text',
          required: true,
          label: 'Postal Code',
        },
        {
          name: 'phoneNumber',
          type: 'text',
          required: true,
          label: 'Phone Number',
        },
      ],
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      label: 'Order Items',
      fields: [
        {
          name: 'product',
          type: 'relationship',
          relationTo: 'cms_products',
          required: true,
          label: 'Product',
        },
        {
          name: 'quantity',
          type: 'number',
          required: true,
          min: 1,
          label: 'Quantity',
        },
        {
          name: 'priceSnapshot',
          type: 'group',
          label: 'Price Snapshot',
          fields: [
            {
              name: 'elurc',
              type: 'number',
              required: true,
              label: 'Price (ELURC)',
            },
            {
              name: 'eur',
              type: 'number',
              required: true,
              label: 'Price (EUR)',
            },
          ],
        },
      ],
    },
    {
      name: 'transactionSignature',
      type: 'text',
      label: 'Transaction Signature',
      admin: {
        description: 'Solana transaction signature',
        readOnly: true,
      },
    },
    {
      name: 'paidAt',
      type: 'date',
      label: 'Paid At',
      admin: {
        description: 'Timestamp when payment was confirmed',
        readOnly: true,
      },
    },
    {
      name: 'fulfilledAt',
      type: 'date',
      label: 'Fulfilled At',
      admin: {
        description: 'Timestamp when order was marked as fulfilled',
      },
    },
    {
      name: 'trackingNumber',
      type: 'text',
      label: 'Tracking Number',
      admin: {
        description: 'Shipping tracking number',
      },
    },
    {
      name: 'statusHistory',
      type: 'array',
      label: 'Status History',
      admin: {
        description: 'Timeline of all status changes',
        readOnly: true,
      },
      fields: [
        {
          name: 'status',
          type: 'text',
          required: true,
          label: 'Status',
        },
        {
          name: 'timestamp',
          type: 'date',
          required: true,
          label: 'Timestamp',
        },
        {
          name: 'changedBy',
          type: 'select',
          options: [
            { label: 'System', value: 'system' },
            { label: 'Admin', value: 'admin' },
          ],
          label: 'Changed By',
        },
        {
          name: 'reason',
          type: 'text',
          label: 'Reason',
        },
      ],
    },
    {
      name: 'adminNotes',
      type: 'textarea',
      label: 'Admin Notes',
      admin: {
        description: 'Internal notes for order management',
      },
      access: {
        read: ({ req: { user } }) => (user as any)?.role === 'admin',
        update: ({ req: { user } }) => (user as any)?.role === 'admin',
      },
    },
  ],
  timestamps: true,
  hooks: {
    beforeChange: [
      ({ data, operation, originalDoc, req }) => {
        if (operation === 'create') {
          data.statusHistory = [
            {
              status: data.status || 'pending',
              timestamp: new Date().toISOString(),
              changedBy: 'system',
            },
          ]
        }

        if (operation === 'update' && originalDoc && data.status !== originalDoc.status) {
          const statusHistory = data.statusHistory || originalDoc.statusHistory || []
          statusHistory.push({
            status: data.status,
            timestamp: new Date().toISOString(),
            changedBy: req.user ? 'admin' : 'system',
          })
          data.statusHistory = statusHistory
        }

        if (operation === 'update' && data.status === 'fulfilled' && !data.fulfilledAt) {
          data.fulfilledAt = new Date().toISOString()
        }

        return data
      },
    ],
  },
}
