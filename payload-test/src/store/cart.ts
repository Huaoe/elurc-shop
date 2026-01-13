import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { CartStore, CartItem } from '@/types/cart'
import { Product } from '@/types/product'

const CART_EXPIRATION_DAYS = 7
const CART_EXPIRATION_MS = CART_EXPIRATION_DAYS * 24 * 60 * 60 * 1000

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      lastUpdated: Date.now(),

      addItem: (product: Product, quantity: number) => {
        const { items } = get()
        const existingItem = items.find(item => item.product.id === product.id)

        if (existingItem) {
          set({
            items: items.map(item =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
            lastUpdated: Date.now(),
          })
        } else {
          const newItem: CartItem = {
            product,
            quantity,
            addedAt: Date.now(),
            priceSnapshot: {
              elurc: product.price_elurc,
              eur: product.price_eur,
            },
          }
          set({
            items: [...items, newItem],
            lastUpdated: Date.now(),
          })
        }
      },

      removeItem: (productId: string) => {
        set(state => ({
          items: state.items.filter(item => item.product.id !== productId),
          lastUpdated: Date.now(),
        }))
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity < 1) return

        set(state => ({
          items: state.items.map(item =>
            item.product.id === productId
              ? { ...item, quantity: Math.min(quantity, item.product.stock) }
              : item
          ),
          lastUpdated: Date.now(),
        }))
      },

      clearCart: () => {
        set({ items: [], lastUpdated: Date.now() })
      },

      getItemCount: () => {
        const { items } = get()
        return items.reduce((total, item) => total + item.quantity, 0)
      },

      getCartTotal: () => {
        const { items } = get()
        const elurTotal = items.reduce(
          (total, item) => total + item.priceSnapshot.elurc * item.quantity,
          0
        )
        const eurTotal = items.reduce(
          (total, item) => total + item.priceSnapshot.eur * item.quantity,
          0
        )
        return { elurc: elurTotal, eur: eurTotal }
      },
    }),
    {
      name: 'elurc-cart-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
        lastUpdated: state.lastUpdated,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          const now = Date.now()
          if (now - state.lastUpdated > CART_EXPIRATION_MS) {
            state.clearCart()
          }
        }
      },
    }
  )
)
