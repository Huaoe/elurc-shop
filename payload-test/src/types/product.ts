export interface Product {
  id: string
  name: string
  slug: string
  description?: string
  price_elurc: number
  price_eur: number
  category: {
    id: string
    name: string
    slug: string
  }
  stock: number
  in_stock: boolean
  images: Array<{
    id?: string
    image?: {
      id: string
      url: string
      alt?: string
      filename?: string
    }
    url?: string
    alt?: string
  }>
  created_at: string
  updated_at: string
}
