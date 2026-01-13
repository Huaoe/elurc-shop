import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { ShippingFormData } from '@/lib/validation/checkout'

interface CheckoutStore {
  currentStep: number
  shippingData: ShippingFormData | null
  orderId: string | null
  setCurrentStep: (step: number) => void
  setShippingData: (data: ShippingFormData) => void
  setOrderId: (id: string) => void
  nextStep: () => void
  previousStep: () => void
  resetCheckout: () => void
}

export const useCheckoutStore = create<CheckoutStore>()(
  persist(
    (set, get) => ({
      currentStep: 1,
      shippingData: null,
      orderId: null,

      setCurrentStep: (step: number) => {
        set({ currentStep: step })
      },

      setShippingData: (data: ShippingFormData) => {
        set({ shippingData: data })
      },

      setOrderId: (id: string) => {
        set({ orderId: id })
      },

      nextStep: () => {
        const { currentStep } = get()
        if (currentStep < 3) {
          set({ currentStep: currentStep + 1 })
        }
      },

      previousStep: () => {
        const { currentStep } = get()
        if (currentStep > 1) {
          set({ currentStep: currentStep - 1 })
        }
      },

      resetCheckout: () => {
        set({
          currentStep: 1,
          shippingData: null,
          orderId: null,
        })
      },
    }),
    {
      name: 'elurc-checkout-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        shippingData: state.shippingData,
      }),
    }
  )
)
