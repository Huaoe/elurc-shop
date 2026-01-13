import { Product } from '@/types/product'

const PAYLOAD_API_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

export async function getProducts(category?: string): Promise<Product[]> {
  try {
    let url = `${PAYLOAD_API_URL}/api/cms_products?limit=100&depth=1`
    
    if (category && category !== 'all') {
      url += `&where[category.slug][equals]=${category}`
    }
    
    const response = await fetch(url, {
      next: { revalidate: 60 },
      cache: 'no-store',
    })
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('Failed to fetch products:', response.status, errorText)
      return []
    }
    
    const data = await response.json()
    console.log('PayloadCMS products response:', JSON.stringify(data.docs, null, 2))
    return data.docs || []
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  return getProducts(categorySlug)
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const url = `${PAYLOAD_API_URL}/api/cms_products?where[slug][equals]=${slug}&depth=1&limit=1`
    
    const response = await fetch(url, {
      next: { revalidate: 60 },
      cache: 'no-store',
    })
    
    if (!response.ok) {
      console.error('Failed to fetch product:', response.status)
      return null
    }
    
    const data = await response.json()
    return data.docs?.[0] || null
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}
