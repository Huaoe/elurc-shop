import { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'cms_products',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'price_elurc', 'stock', 'in_stock'],
    group: 'Catalog',
    description: 'Manage your product catalog with e-commerce features',
    components: {
      beforeList: ['@/components/admin/ProductsStats'],
    },
  },
  dbName: 'cms_products',
  access: {
    read: () => true,
    create: ({ req: { user } }) => {
      if (!user) return false
      return (user as any).role === 'admin'
    },
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
      name: 'name',
      type: 'text',
      required: true,
      label: 'Product Name',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'URL Slug',
      admin: {
        description: 'Auto-generated from product name',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (!value && data?.name) {
              return data.name
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-|-$/g, '')
            }
            return value
          },
        ],
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      name: 'price_elurc',
      type: 'number',
      required: true,
      min: 0,
      label: 'Price (ELURC)',
      admin: {
        description: 'Price in ELURC tokens (stored in lamports)',
      },
    },
    {
      name: 'price_eur',
      type: 'number',
      required: true,
      min: 0,
      label: 'Price (EUR)',
      admin: {
        description: 'Price in euros (stored in cents)',
      },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'cms_categories',
      required: true,
      label: 'Category',
      hasMany: false,
    },
    {
      name: 'stock',
      type: 'number',
      required: true,
      defaultValue: 0,
      min: 0,
      label: 'Stock Quantity',
      hooks: {
        beforeChange: [
          ({ value, siblingData }) => {
            if (value !== undefined) {
              siblingData.in_stock = value > 0
            }
            return value
          },
        ],
      },
    },
    {
      name: 'low_stock_threshold',
      type: 'number',
      defaultValue: 5,
      min: 0,
      label: 'Low Stock Threshold',
      admin: {
        description: 'Alert when stock falls below this number',
      },
    },
    {
      name: 'in_stock',
      type: 'checkbox',
      defaultValue: true,
      label: 'In Stock',
      admin: {
        description: 'Automatically updated based on stock quantity',
        readOnly: true,
      },
    },
    {
      name: 'images',
      type: 'array',
      label: 'Product Images',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
  timestamps: true,
}
