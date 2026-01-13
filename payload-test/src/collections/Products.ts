import { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'cms_products',
  admin: {
    useAsTitle: 'name',
  },
  dbName: 'cms_products',
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'price_elurc',
      type: 'number',
      required: true,
      min: 0,
      admin: {
        description: 'Price in lamports (smallest ELURC unit)',
      },
    },
    {
      name: 'price_eur',
      type: 'number',
      required: true,
      min: 0,
      admin: {
        description: 'Price in cents (smallest EUR unit)',
      },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'cms_categories',
      required: true,
    },
    {
      name: 'stock',
      type: 'number',
      required: true,
      defaultValue: 0,
      min: 0,
    },
    {
      name: 'in_stock',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'images',
      type: 'array',
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
}
