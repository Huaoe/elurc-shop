import { describe, it, expect } from 'vitest'
import { shippingSchema } from '../checkout'

describe('Checkout Validation', () => {
  describe('shippingSchema', () => {
    it('should validate correct shipping data', () => {
      const validData = {
        fullName: 'John Doe',
        streetAddress: '123 Main Street',
        city: 'Paris',
        postalCode: '75001',
        phoneNumber: '+33612345678',
      }

      const result = shippingSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('should reject short full name', () => {
      const invalidData = {
        fullName: 'J',
        streetAddress: '123 Main Street',
        city: 'Paris',
        postalCode: '75001',
        phoneNumber: '+33612345678',
      }

      const result = shippingSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('should reject short street address', () => {
      const invalidData = {
        fullName: 'John Doe',
        streetAddress: '123',
        city: 'Paris',
        postalCode: '75001',
        phoneNumber: '+33612345678',
      }

      const result = shippingSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('should reject short city', () => {
      const invalidData = {
        fullName: 'John Doe',
        streetAddress: '123 Main Street',
        city: 'P',
        postalCode: '75001',
        phoneNumber: '+33612345678',
      }

      const result = shippingSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('should reject short postal code', () => {
      const invalidData = {
        fullName: 'John Doe',
        streetAddress: '123 Main Street',
        city: 'Paris',
        postalCode: '750',
        phoneNumber: '+33612345678',
      }

      const result = shippingSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('should reject short phone number', () => {
      const invalidData = {
        fullName: 'John Doe',
        streetAddress: '123 Main Street',
        city: 'Paris',
        postalCode: '75001',
        phoneNumber: '123',
      }

      const result = shippingSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('should reject missing fields', () => {
      const invalidData = {
        fullName: 'John Doe',
      }

      const result = shippingSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })
  })
})
