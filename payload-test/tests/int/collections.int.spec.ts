import { describe, it, expect, beforeAll } from 'vitest'
import { getPayload } from 'payload'
import config from '../../src/payload.config'

describe('PayloadCMS Collections', () => {
  let payload: any

  beforeAll(async () => {
    payload = await getPayload({ config })
  })

  describe('Products Collection', () => {
    it('should have correct slug', () => {
      const collection = payload.collections['cms_products']
      expect(collection).toBeDefined()
      expect(collection.config.slug).toBe('cms_products')
    })

    it('should have admin configuration', () => {
      const collection = payload.collections['cms_products']
      expect(collection.config.admin.useAsTitle).toBe('name')
      expect(collection.config.admin.defaultColumns).toEqual([
        'name',
        'category',
        'price_elurc',
        'stock',
        'in_stock',
      ])
      expect(collection.config.admin.group).toBe('Catalog')
    })

    it('should have correct access control', () => {
      const collection = payload.collections['cms_products']
      expect(collection.config.access.read).toBeDefined()
      expect(collection.config.access.create).toBeDefined()
      expect(collection.config.access.update).toBeDefined()
      expect(collection.config.access.delete).toBeDefined()
    })

    it('should have all required fields', () => {
      const collection = payload.collections['cms_products']
      const fieldNames = collection.config.fields.map((f: any) => f.name)
      
      expect(fieldNames).toContain('name')
      expect(fieldNames).toContain('slug')
      expect(fieldNames).toContain('description')
      expect(fieldNames).toContain('price_elurc')
      expect(fieldNames).toContain('price_eur')
      expect(fieldNames).toContain('category')
      expect(fieldNames).toContain('stock')
      expect(fieldNames).toContain('in_stock')
      expect(fieldNames).toContain('images')
    })

    it('should have slug auto-generation hook', () => {
      const collection = payload.collections['cms_products']
      const slugField = collection.config.fields.find((f: any) => f.name === 'slug')
      
      expect(slugField).toBeDefined()
      expect(slugField.hooks).toBeDefined()
      expect(slugField.hooks.beforeValidate).toBeDefined()
      expect(Array.isArray(slugField.hooks.beforeValidate)).toBe(true)
      expect(slugField.hooks.beforeValidate.length).toBeGreaterThan(0)
    })

    it('should generate slug from name', () => {
      const collection = payload.collections['cms_products']
      const slugField = collection.config.fields.find((f: any) => f.name === 'slug')
      const hook = slugField.hooks.beforeValidate[0]
      
      const result = hook({ value: undefined, data: { name: 'Organic Carrots' } })
      expect(result).toBe('organic-carrots')
      
      const result2 = hook({ value: undefined, data: { name: 'Fresh Tomatoes 100g' } })
      expect(result2).toBe('fresh-tomatoes-100g')
      
      const result3 = hook({ value: 'custom-slug', data: { name: 'Test' } })
      expect(result3).toBe('custom-slug')
    })

    it('should have required fields configured', () => {
      const collection = payload.collections['cms_products']
      const nameField = collection.config.fields.find((f: any) => f.name === 'name')
      const slugField = collection.config.fields.find((f: any) => f.name === 'slug')
      const priceElField = collection.config.fields.find((f: any) => f.name === 'price_elurc')
      const priceEurField = collection.config.fields.find((f: any) => f.name === 'price_eur')
      const categoryField = collection.config.fields.find((f: any) => f.name === 'category')
      const stockField = collection.config.fields.find((f: any) => f.name === 'stock')
      
      expect(nameField.required).toBe(true)
      expect(slugField.required).toBe(true)
      expect(slugField.unique).toBe(true)
      expect(priceElField.required).toBe(true)
      expect(priceEurField.required).toBe(true)
      expect(categoryField.required).toBe(true)
      expect(stockField.required).toBe(true)
    })

    it('should have price validation', () => {
      const collection = payload.collections['cms_products']
      const priceElField = collection.config.fields.find((f: any) => f.name === 'price_elurc')
      const priceEurField = collection.config.fields.find((f: any) => f.name === 'price_eur')
      
      expect(priceElField.min).toBe(0)
      expect(priceEurField.min).toBe(0)
    })

    it('should have stock validation', () => {
      const collection = payload.collections['cms_products']
      const stockField = collection.config.fields.find((f: any) => f.name === 'stock')
      
      expect(stockField.min).toBe(0)
      expect(stockField.defaultValue).toBe(0)
    })

    it('should have category relationship', () => {
      const collection = payload.collections['cms_products']
      const categoryField = collection.config.fields.find((f: any) => f.name === 'category')
      
      expect(categoryField.type).toBe('relationship')
      expect(categoryField.relationTo).toBe('cms_categories')
      expect(categoryField.hasMany).toBe(false)
    })

    it('should have images array with upload', () => {
      const collection = payload.collections['cms_products']
      const imagesField = collection.config.fields.find((f: any) => f.name === 'images')
      
      expect(imagesField.type).toBe('array')
      expect(imagesField.fields).toBeDefined()
      expect(imagesField.fields.length).toBeGreaterThan(0)
      
      const imageField = imagesField.fields.find((f: any) => f.name === 'image')
      expect(imageField.type).toBe('upload')
      expect(imageField.relationTo).toBe('media')
    })

    it('should have timestamps enabled', () => {
      const collection = payload.collections['cms_products']
      expect(collection.config.timestamps).toBe(true)
    })
  })

  describe('Categories Collection', () => {
    it('should have correct slug', () => {
      const collection = payload.collections['cms_categories']
      expect(collection).toBeDefined()
      expect(collection.config.slug).toBe('cms_categories')
    })

    it('should have admin configuration', () => {
      const collection = payload.collections['cms_categories']
      expect(collection.config.admin.useAsTitle).toBe('name')
      expect(collection.config.admin.group).toBe('Catalog')
    })

    it('should have correct access control', () => {
      const collection = payload.collections['cms_categories']
      expect(collection.config.access.read).toBeDefined()
      expect(collection.config.access.create).toBeDefined()
      expect(collection.config.access.update).toBeDefined()
      expect(collection.config.access.delete).toBeDefined()
    })

    it('should have required fields', () => {
      const collection = payload.collections['cms_categories']
      const fieldNames = collection.config.fields.map((f: any) => f.name)
      
      expect(fieldNames).toContain('name')
      expect(fieldNames).toContain('slug')
    })

    it('should have slug auto-generation hook', () => {
      const collection = payload.collections['cms_categories']
      const slugField = collection.config.fields.find((f: any) => f.name === 'slug')
      
      expect(slugField).toBeDefined()
      expect(slugField.hooks).toBeDefined()
      expect(slugField.hooks.beforeValidate).toBeDefined()
      expect(Array.isArray(slugField.hooks.beforeValidate)).toBe(true)
    })

    it('should generate slug from name', () => {
      const collection = payload.collections['cms_categories']
      const slugField = collection.config.fields.find((f: any) => f.name === 'slug')
      const hook = slugField.hooks.beforeValidate[0]
      
      const result = hook({ value: undefined, data: { name: 'Fresh Products' } })
      expect(result).toBe('fresh-products')
      
      const result2 = hook({ value: undefined, data: { name: 'Dry Products' } })
      expect(result2).toBe('dry-products')
    })

    it('should have timestamps enabled', () => {
      const collection = payload.collections['cms_categories']
      expect(collection.config.timestamps).toBe(true)
    })
  })

  describe('Media Collection', () => {
    it('should have correct slug', () => {
      const collection = payload.collections['media']
      expect(collection).toBeDefined()
      expect(collection.config.slug).toBe('media')
    })

    it('should have admin configuration', () => {
      const collection = payload.collections['media']
      expect(collection.config.admin.group).toBe('Assets')
    })

    it('should have correct access control', () => {
      const collection = payload.collections['media']
      expect(collection.config.access.read).toBeDefined()
      expect(collection.config.access.create).toBeDefined()
      expect(collection.config.access.update).toBeDefined()
      expect(collection.config.access.delete).toBeDefined()
    })

    it('should have upload configuration', () => {
      const collection = payload.collections['media']
      expect(collection.config.upload).toBeDefined()
      expect(collection.config.upload.staticDir).toBe('public/media')
    })

    it('should have image sizes configured', () => {
      const collection = payload.collections['media']
      expect(collection.config.upload.imageSizes).toBeDefined()
      expect(Array.isArray(collection.config.upload.imageSizes)).toBe(true)
      expect(collection.config.upload.imageSizes.length).toBe(3)
      
      const sizeNames = collection.config.upload.imageSizes.map((s: any) => s.name)
      expect(sizeNames).toContain('thumbnail')
      expect(sizeNames).toContain('card')
      expect(sizeNames).toContain('large')
      
      const thumbnail = collection.config.upload.imageSizes.find((s: any) => s.name === 'thumbnail')
      expect(thumbnail.width).toBe(300)
      expect(thumbnail.height).toBe(300)
      
      const card = collection.config.upload.imageSizes.find((s: any) => s.name === 'card')
      expect(card.width).toBe(600)
      expect(card.height).toBe(600)
      
      const large = collection.config.upload.imageSizes.find((s: any) => s.name === 'large')
      expect(large.width).toBe(1200)
      expect(large.height).toBe(1200)
    })

    it('should have correct MIME types', () => {
      const collection = payload.collections['media']
      expect(collection.config.upload.mimeTypes).toEqual([
        'image/jpeg',
        'image/png',
        'image/webp',
      ])
    })

    it('should have alt text field', () => {
      const collection = payload.collections['media']
      const altField = collection.config.fields.find((f: any) => f.name === 'alt')
      
      expect(altField).toBeDefined()
      expect(altField.type).toBe('text')
      expect(altField.required).toBe(true)
    })
  })

  describe('Collection Relationships', () => {
    it('should have Products referencing Categories', () => {
      const products = payload.collections['cms_products']
      const categoryField = products.config.fields.find((f: any) => f.name === 'category')
      
      expect(categoryField.relationTo).toBe('cms_categories')
    })

    it('should have Products referencing Media', () => {
      const products = payload.collections['cms_products']
      const imagesField = products.config.fields.find((f: any) => f.name === 'images')
      const imageField = imagesField.fields.find((f: any) => f.name === 'image')
      
      expect(imageField.relationTo).toBe('media')
    })
  })

  describe('Access Control', () => {
    it('should allow public read access for Products', () => {
      const products = payload.collections['cms_products']
      const readAccess = products.config.access.read
      
      expect(readAccess()).toBe(true)
    })

    it('should require authentication for Products write operations', () => {
      const products = payload.collections['cms_products']
      
      expect(products.config.access.create({ req: { user: null } })).toBe(false)
      expect(products.config.access.create({ req: { user: { id: '1', role: 'customer' } } })).toBe(false)
      expect(products.config.access.create({ req: { user: { id: '1', role: 'admin' } } })).toBe(true)
      
      expect(products.config.access.update({ req: { user: null } })).toBe(false)
      expect(products.config.access.update({ req: { user: { id: '1', role: 'customer' } } })).toBe(false)
      expect(products.config.access.update({ req: { user: { id: '1', role: 'admin' } } })).toBe(true)
      
      expect(products.config.access.delete({ req: { user: null } })).toBe(false)
      expect(products.config.access.delete({ req: { user: { id: '1', role: 'customer' } } })).toBe(false)
      expect(products.config.access.delete({ req: { user: { id: '1', role: 'admin' } } })).toBe(true)
    })

    it('should allow public read access for Categories', () => {
      const categories = payload.collections['cms_categories']
      const readAccess = categories.config.access.read
      
      expect(readAccess()).toBe(true)
    })

    it('should require authentication for Categories write operations', () => {
      const categories = payload.collections['cms_categories']
      
      expect(categories.config.access.create({ req: { user: null } })).toBe(false)
      expect(categories.config.access.create({ req: { user: { id: '1', role: 'customer' } } })).toBe(false)
      expect(categories.config.access.create({ req: { user: { id: '1', role: 'admin' } } })).toBe(true)
      
      expect(categories.config.access.update({ req: { user: null } })).toBe(false)
      expect(categories.config.access.update({ req: { user: { id: '1', role: 'customer' } } })).toBe(false)
      expect(categories.config.access.update({ req: { user: { id: '1', role: 'admin' } } })).toBe(true)
      
      expect(categories.config.access.delete({ req: { user: null } })).toBe(false)
      expect(categories.config.access.delete({ req: { user: { id: '1', role: 'customer' } } })).toBe(false)
      expect(categories.config.access.delete({ req: { user: { id: '1', role: 'admin' } } })).toBe(true)
    })

    it('should allow public read access for Media', () => {
      const media = payload.collections['media']
      const readAccess = media.config.access.read
      
      expect(readAccess()).toBe(true)
    })

    it('should require authentication for Media write operations', () => {
      const media = payload.collections['media']
      
      expect(media.config.access.create({ req: { user: null } })).toBe(false)
      expect(media.config.access.create({ req: { user: { id: '1' } } })).toBe(true)
    })
  })
})
