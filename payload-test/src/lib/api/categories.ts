import { Category } from '@/types/category'

const PAYLOAD_API_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

/**
 * Fetches all categories from PayloadCMS with product counts
 * @returns Array of categories with product counts, filtered to show only non-empty categories
 */
export async function getCategories(): Promise<Category[]> {
  try {
    const url = `${PAYLOAD_API_URL}/api/cms_categories?limit=100&depth=0`
    
    const response = await fetch(url, {
      next: { revalidate: 60 },
      cache: 'no-store',
    })
    
    if (!response.ok) {
      console.error('Failed to fetch categories:', response.status)
      return getDefaultCategories()
    }
    
    const data = await response.json()
    const categories = data.docs || []
    
    const categoriesWithCounts = await Promise.all(
      categories.map(async (category: Category) => {
        const count = await getProductCountForCategory(category.slug)
        return { ...category, product_count: count }
      })
    )
    
    return categoriesWithCounts.filter(cat => (cat.product_count || 0) > 0)
  } catch (error) {
    console.error('Error fetching categories:', error)
    return getDefaultCategories()
  }
}

/**
 * Gets the count of in-stock products for a specific category
 * @param categorySlug - The category slug to count products for
 * @returns Number of in-stock products in the category
 */
async function getProductCountForCategory(categorySlug: string): Promise<number> {
  try {
    const url = `${PAYLOAD_API_URL}/api/cms_products?where[category.slug][equals]=${categorySlug}&where[in_stock][equals]=true&limit=0`
    const response = await fetch(url, { 
      next: { revalidate: 60 },
      cache: 'no-store',
    })
    
    if (!response.ok) {
      return 0
    }
    
    const data = await response.json()
    return data.totalDocs || 0
  } catch {
    return 0
  }
}

/**
 * Returns default fallback categories when API fails
 * @returns Array of default categories
 */
function getDefaultCategories(): Category[] {
  return [
    { 
      id: 'fresh', 
      name: 'Fresh Products', 
      slug: 'fresh', 
      product_count: 0, 
      created_at: new Date().toISOString(), 
      updated_at: new Date().toISOString() 
    },
    { 
      id: 'dry', 
      name: 'Dry Products', 
      slug: 'dry', 
      product_count: 0, 
      created_at: new Date().toISOString(), 
      updated_at: new Date().toISOString() 
    },
  ]
}
