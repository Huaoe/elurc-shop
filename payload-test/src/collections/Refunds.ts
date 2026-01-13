import { CollectionConfig } from 'payload'
import type { User } from '../payload-types'

export const Refunds: CollectionConfig = {
  slug: 'refunds',
  admin: {
    useAsTitle: 'refundNumber',
    defaultColumns: ['refundNumber', 'status', 'amount', 'order', 'createdAt'],
    group: 'Commerce',
    listSearchableFields: ['refundNumber', 'transactionSignature', 'walletAddress'],
    pagination: {
      defaultLimit: 20,
    },
  },
  access: {
    read: ({ req: { user } }) => {
      if (!user) return false
      return (user as User).role === 'admin'
    },
    create: ({ req: { user } }) => {
      if (!user) return false
      return (user as User).role === 'admin'
    },
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
      name: 'refundNumber',
      type: 'text',
      required: true,
      unique: true,
      label: 'Refund Number',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'order',
      type: 'relationship',
      relationTo: 'orders',
      required: true,
      label: 'Order',
      admin: {
        description: 'The order this refund is associated with',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Processing', value: 'processing' },
        { label: 'Completed', value: 'completed' },
        { label: 'Failed', value: 'failed' },
      ],
      label: 'Refund Status',
    },
    {
      name: 'amount',
      type: 'number',
      required: true,
      min: 0,
      label: 'Refund Amount (ELURC)',
      admin: {
        description: 'Amount to refund in ELURC tokens (lamports)',
      },
    },
    {
      name: 'walletAddress',
      type: 'text',
      required: true,
      label: 'Refund Wallet Address',
      admin: {
        description: 'Solana wallet address to send refund to',
      },
    },
    {
      name: 'reason',
      type: 'textarea',
      label: 'Refund Reason',
      admin: {
        description: 'Reason for the refund',
      },
    },
    {
      name: 'transactionSignature',
      type: 'text',
      label: 'Transaction Signature',
      admin: {
        description: 'Solana transaction signature for the refund',
        readOnly: true,
      },
    },
    {
      name: 'processedAt',
      type: 'date',
      label: 'Processed At',
      admin: {
        description: 'Timestamp when refund was processed',
        readOnly: true,
      },
    },
    {
      name: 'completedAt',
      type: 'date',
      label: 'Completed At',
      admin: {
        description: 'Timestamp when refund was completed',
        readOnly: true,
      },
    },
    {
      name: 'failedAt',
      type: 'date',
      label: 'Failed At',
      admin: {
        description: 'Timestamp when refund failed',
        readOnly: true,
      },
    },
    {
      name: 'errorMessage',
      type: 'textarea',
      label: 'Error Message',
      admin: {
        description: 'Error message if refund failed',
        readOnly: true,
      },
    },
    {
      name: 'processedBy',
      type: 'relationship',
      relationTo: 'users',
      label: 'Processed By',
      admin: {
        description: 'Admin user who processed the refund',
        readOnly: true,
      },
    },
    {
      name: 'adminNotes',
      type: 'textarea',
      label: 'Admin Notes',
      admin: {
        description: 'Internal notes about the refund',
      },
    },
    {
      name: 'ipAddress',
      type: 'text',
      label: 'IP Address',
      admin: {
        description: 'IP address of the admin who initiated the refund',
        readOnly: true,
      },
    },
  ],
  timestamps: true,
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        if (operation === 'create' && !data.refundNumber) {
          data.refundNumber = `REF-${Date.now()}-${Math.random().toString(36).substring(2, 9).toUpperCase()}`
        }

        if (data.status === 'completed' && !data.completedAt) {
          data.completedAt = new Date().toISOString()
        }

        if (data.status === 'failed' && !data.failedAt) {
          data.failedAt = new Date().toISOString()
        }

        if (data.status === 'processing' && !data.processedAt) {
          data.processedAt = new Date().toISOString()
        }

        return data
      },
    ],
  },
}
