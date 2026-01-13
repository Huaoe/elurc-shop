import { Product } from './product'

/**
 * Cart item with product details and quantity
 */
export interface CartItem {
  /** Product information */
  product: Product
  /** Quantity of this product in cart */
  quantity: number
  /** Timestamp when item was added to cart */
  addedAt: number
  /** Price snapshot at time of adding to cart */
  priceSnapshot: {
    /** Price in ELURC lamports */
    elurc: number
    /** Price in EUR cents */
    eur: number
  }
}

/**
 * Cart state structure
 */
export interface CartState {
  /** Array of items in the cart */
  items: CartItem[]
  /** Timestamp of last cart update */
  lastUpdated: number
}

/**
 * Cart store actions
 */
export interface CartActions {
  /** Add item to cart or update quantity if already exists */
  addItem: (product: Product, quantity: number) => void
  /** Remove item from cart by product ID */
  removeItem: (productId: string) => void
  /** Update quantity of existing cart item */
  updateQuantity: (productId: string, quantity: number) => void
  /** Clear all items from cart */
  clearCart: () => void
  /** Get total number of items in cart */
  getItemCount: () => number
  /** Get cart total in ELURC and EUR */
  getCartTotal: () => { elurc: number; eur: number }
}

/**
 * Complete cart store type
 */
export type CartStore = CartState & CartActions
