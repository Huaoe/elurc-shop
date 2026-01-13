import { describe, it, expect } from 'vitest'
import { generatePaymentURI, validateSolanaAddress } from '../solana-pay'

describe('Solana Pay Utils', () => {
  describe('generatePaymentURI', () => {
    it('should generate basic payment URI', () => {
      const uri = generatePaymentURI({
        recipient: 'ABC123',
        amount: 10.5,
        splToken: 'TOKEN123',
      })
      
      expect(uri).toContain('solana:ABC123')
      expect(uri).toContain('amount=10500000')
      expect(uri).toContain('spl-token=TOKEN123')
    })

    it('should convert ELURC to lamports correctly', () => {
      const uri = generatePaymentURI({
        recipient: 'ABC123',
        amount: 1.0,
        splToken: 'TOKEN123',
      })
      
      expect(uri).toContain('amount=1000000')
    })

    it('should include optional reference', () => {
      const uri = generatePaymentURI({
        recipient: 'ABC123',
        amount: 10,
        splToken: 'TOKEN123',
        reference: 'ORDER-123',
      })
      
      expect(uri).toContain('reference=ORDER-123')
    })

    it('should include encoded label', () => {
      const uri = generatePaymentURI({
        recipient: 'ABC123',
        amount: 10,
        splToken: 'TOKEN123',
        label: 'Test Shop',
      })
      
      expect(uri).toContain('label=Test%20Shop')
    })

    it('should include encoded message', () => {
      const uri = generatePaymentURI({
        recipient: 'ABC123',
        amount: 10,
        splToken: 'TOKEN123',
        message: 'Order #123',
      })
      
      expect(uri).toContain('message=Order%20%23123')
    })

    it('should use default label and message', () => {
      const uri = generatePaymentURI({
        recipient: 'ABC123',
        amount: 10,
        splToken: 'TOKEN123',
      })
      
      expect(uri).toContain('label=elurc-market')
      expect(uri).toContain('message=Order%20payment')
    })
  })

  describe('validateSolanaAddress', () => {
    it('should validate correct Solana address', () => {
      const validAddress = '11111111111111111111111111111111'
      expect(validateSolanaAddress(validAddress)).toBe(true)
    })

    it('should reject invalid address', () => {
      expect(validateSolanaAddress('invalid')).toBe(false)
    })

    it('should reject empty string', () => {
      expect(validateSolanaAddress('')).toBe(false)
    })
  })
})
