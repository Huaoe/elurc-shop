/**
 * Category type definition for product categorization
 * Represents a product category from PayloadCMS
 */
export interface Category {
  /** Unique identifier */
  id: string
  /** Category display name */
  name: string
  /** URL-friendly slug */
  slug: string
  /** Optional category description */
  description?: string
  /** Number of in-stock products in this category */
  product_count?: number
  /** Creation timestamp */
  created_at: string
  /** Last update timestamp */
  updated_at: string
}
