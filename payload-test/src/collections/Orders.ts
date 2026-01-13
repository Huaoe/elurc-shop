import { CollectionConfig } from 'payload'
import type { User } from '../payload-types'

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
      return (user as User).role === 'admin'
    },
    create: () => true,
    update: ({ req: { user } }) => {
      if (!user) return false
      return (user as User).role === 'admin'
    },
    delete: ({ req: { user } }) => {
      if (!user) return false
      return (user as User).role === 'admin'
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
        { label: 'Overpaid', value: 'overpaid' },
        { label: 'Underpaid', value: 'underpaid' },
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
      name: 'paymentDiscrepancy',
      type: 'group',
      label: 'Payment Discrepancy',
      admin: {
        description: 'Details about payment amount discrepancies',
      },
      fields: [
        {
          name: 'hasDiscrepancy',
          type: 'checkbox',
          label: 'Has Discrepancy',
          defaultValue: false,
        },
        {
          name: 'type',
          type: 'select',
          options: [
            { label: 'None', value: 'none' },
            { label: 'Overpayment', value: 'overpayment' },
            { label: 'Underpayment', value: 'underpayment' },
          ],
          label: 'Discrepancy Type',
        },
        {
          name: 'differenceAmount',
          type: 'number',
          label: 'Difference Amount (ELURC)',
          admin: {
            description: 'Amount difference in ELURC (positive for overpayment, negative for underpayment)',
          },
        },
        {
          name: 'detectedAt',
          type: 'date',
          label: 'Detected At',
          admin: {
            description: 'Timestamp when discrepancy was detected',
          },
        },
        {
          name: 'resolution',
          type: 'select',
          options: [
            { label: 'Pending', value: 'pending' },
            { label: 'Refund Initiated', value: 'refund_initiated' },
            { label: 'Refund Completed', value: 'refund_completed' },
            { label: 'Manually Approved', value: 'manually_approved' },
            { label: 'Cancelled', value: 'cancelled' },
          ],
          label: 'Resolution Status',
        },
        {
          name: 'resolutionNotes',
          type: 'textarea',
          label: 'Resolution Notes',
          admin: {
            description: 'Admin notes about how the discrepancy was resolved',
          },
        },
      ],
    },
    {
      name: 'refundInfo',
      type: 'group',
      label: 'Refund Information',
      admin: {
        description: 'Details about refund processing',
      },
      fields: [
        {
          name: 'refundAmount',
          type: 'number',
          label: 'Refund Amount (ELURC)',
        },
        {
          name: 'refundWallet',
          type: 'text',
          label: 'Refund Wallet Address',
          admin: {
            description: 'Wallet address to send refund to',
          },
        },
        {
          name: 'refundTransactionSignature',
          type: 'text',
          label: 'Refund Transaction Signature',
          admin: {
            description: 'Solana transaction signature for refund',
          },
        },
        {
          name: 'refundInitiatedAt',
          type: 'date',
          label: 'Refund Initiated At',
        },
        {
          name: 'refundCompletedAt',
          type: 'date',
          label: 'Refund Completed At',
        },
        {
          name: 'refundReason',
          type: 'textarea',
          label: 'Refund Reason',
        },
      ],
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
        read: ({ req: { user } }) => (user as User | null)?.role === 'admin',
        update: ({ req: { user } }) => (user as User | null)?.role === 'admin',
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
