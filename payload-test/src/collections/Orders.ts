import { CollectionConfig } from 'payload'

export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: 'orderNumber',
    defaultColumns: ['orderNumber', 'status', 'customerWallet', 'amountElurc', 'createdAt'],
    group: 'Commerce',
  },
  access: {
    read: ({ req: { user } }) => !!user,
    create: () => true,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
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
  ],
  timestamps: true,
}
