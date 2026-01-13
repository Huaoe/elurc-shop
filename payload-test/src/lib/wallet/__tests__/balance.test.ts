import { describe, it, expect } from 'vitest'
import { formatBalance } from '../balance'

describe('Balance Utils', () => {
  describe('formatBalance', () => {
    it('should format balance with 2 decimal places minimum', () => {
      expect(formatBalance(100)).toBe('100.00')
    })

    it('should format balance with up to 6 decimal places', () => {
      expect(formatBalance(100.123456)).toBe('100.123456')
    })

    it('should format zero balance', () => {
      expect(formatBalance(0)).toBe('0.00')
    })

    it('should format small balance', () => {
      expect(formatBalance(0.000001)).toBe('0.000001')
    })

    it('should format large balance with commas', () => {
      expect(formatBalance(1000000)).toBe('1,000,000.00')
    })

    it('should round to 6 decimal places', () => {
      expect(formatBalance(0.1234567)).toBe('0.123457')
    })
  })
})
