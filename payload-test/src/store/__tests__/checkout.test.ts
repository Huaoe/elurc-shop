import { describe, it, expect, beforeEach } from 'vitest'
import { useCheckoutStore } from '../checkout'

describe('Checkout Store', () => {
  beforeEach(() => {
    useCheckoutStore.getState().resetCheckout()
  })

  it('should initialize with step 1', () => {
    const { currentStep } = useCheckoutStore.getState()
    expect(currentStep).toBe(1)
  })

  it('should set current step', () => {
    const { setCurrentStep } = useCheckoutStore.getState()
    setCurrentStep(2)
    
    const { currentStep } = useCheckoutStore.getState()
    expect(currentStep).toBe(2)
  })

  it('should advance to next step', () => {
    const { nextStep } = useCheckoutStore.getState()
    nextStep()
    
    const { currentStep } = useCheckoutStore.getState()
    expect(currentStep).toBe(2)
  })

  it('should go to previous step', () => {
    const { setCurrentStep, previousStep } = useCheckoutStore.getState()
    setCurrentStep(3)
    previousStep()
    
    const { currentStep } = useCheckoutStore.getState()
    expect(currentStep).toBe(2)
  })

  it('should not go below step 1', () => {
    const { previousStep } = useCheckoutStore.getState()
    previousStep()
    
    const { currentStep } = useCheckoutStore.getState()
    expect(currentStep).toBe(1)
  })

  it('should not go above step 3', () => {
    const { setCurrentStep, nextStep } = useCheckoutStore.getState()
    setCurrentStep(3)
    nextStep()
    
    const { currentStep } = useCheckoutStore.getState()
    expect(currentStep).toBe(3)
  })

  it('should store shipping data', () => {
    const shippingData = {
      fullName: 'John Doe',
      streetAddress: '123 Main St',
      city: 'Paris',
      postalCode: '75001',
      phoneNumber: '+33612345678',
    }

    const { setShippingData } = useCheckoutStore.getState()
    setShippingData(shippingData)
    
    const { shippingData: stored } = useCheckoutStore.getState()
    expect(stored).toEqual(shippingData)
  })

  it('should reset checkout', () => {
    const { setCurrentStep, setShippingData, resetCheckout } = useCheckoutStore.getState()
    
    setCurrentStep(3)
    setShippingData({
      fullName: 'John Doe',
      streetAddress: '123 Main St',
      city: 'Paris',
      postalCode: '75001',
      phoneNumber: '+33612345678',
    })
    
    resetCheckout()
    
    const state = useCheckoutStore.getState()
    expect(state.currentStep).toBe(1)
    expect(state.shippingData).toBeNull()
    expect(state.orderId).toBeNull()
  })
})
