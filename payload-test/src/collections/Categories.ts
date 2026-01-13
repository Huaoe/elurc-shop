import { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'cms_categories',
  admin: {
    useAsTitle: 'name',
  },
  dbName: 'cms_categories',
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
  ],
}
