import { CartItem } from '@/types/cart'

/**
 * Format ELURC price from lamports to display format
 * @param lamports - Price in lamports (1 ELURC = 1,000,000 lamports)
 * @returns Formatted ELURC price string
 */
export function formatElurPrice(lamports: number): string {
  return (lamports / 1000000).toFixed(2)
}

/**
 * Format EUR price from cents to display format
 * @param cents - Price in cents (1 EUR = 100 cents)
 * @returns Formatted EUR price string with € symbol
 */
export function formatEurPrice(cents: number): string {
  return `€${(cents / 100).toFixed(2)}`
}

/**
 * Calculate cart subtotal in ELURC and EUR
 * @param items - Array of cart items
 * @returns Object with elurc and eur totals
 */
export function calculateCartSubtotal(items: CartItem[]): { elurc: number; eur: number } {
  const elurTotal = items.reduce(
    (total, item) => total + item.priceSnapshot.elurc * item.quantity,
    0
  )
  const eurTotal = items.reduce(
    (total, item) => total + item.priceSnapshot.eur * item.quantity,
    0
  )
  return { elurc: elurTotal, eur: eurTotal }
}

/**
 * Validate cart item for stock and quantity constraints
 * @param item - Cart item to validate
 * @returns true if item is valid, false otherwise
 */
export function validateCartItem(item: CartItem): boolean {
  return (
    item.quantity > 0 &&
    item.quantity <= item.product.stock &&
    item.product.in_stock
  )
}
