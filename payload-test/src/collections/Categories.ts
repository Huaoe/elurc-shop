import { CollectionConfig } from 'payload'

type UserWithRole = {
  role?: string
}

export const Categories: CollectionConfig = {
  slug: 'cms_categories',
  admin: {
    useAsTitle: 'name',
    group: 'Catalog',
  },
  dbName: 'cms_categories',
  access: {
    read: () => true,
    create: ({ req: { user } }) => {
      if (!user) return false
      return (user as UserWithRole).role === 'admin'
    },
    update: ({ req: { user } }) => {
      if (!user) return false
      return (user as UserWithRole).role === 'admin'
    },
    delete: ({ req: { user } }) => {
      if (!user) return false
      return (user as UserWithRole).role === 'admin'
    },
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Category Name',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'URL Slug',
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
      admin: {
        description: 'Optional category description',
      },
    },
  ],
  timestamps: true,
}
