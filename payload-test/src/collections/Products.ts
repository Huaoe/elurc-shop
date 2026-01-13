import { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'cms_products',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'price_elurc', 'stock', 'in_stock'],
    group: 'Catalog',
  },
  dbName: 'cms_products',
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
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
    },
    {
      name: 'in_stock',
      type: 'checkbox',
      defaultValue: true,
      label: 'In Stock',
      admin: {
        description: 'Uncheck to mark product as out of stock',
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
