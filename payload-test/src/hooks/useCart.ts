import { useCartStore } from '@/store/cart'

/**
 * Custom hook for accessing cart state and actions
 * Provides a convenient API for components to interact with the cart
 */
export const useCart = () => {
  const items = useCartStore(state => state.items)
  const addItem = useCartStore(state => state.addItem)
  const removeItem = useCartStore(state => state.removeItem)
  const updateQuantity = useCartStore(state => state.updateQuantity)
  const clearCart = useCartStore(state => state.clearCart)
  const getItemCount = useCartStore(state => state.getItemCount)
  const getCartTotal = useCartStore(state => state.getCartTotal)

  return {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    itemCount: getItemCount(),
    cartTotal: getCartTotal(),
  }
}
