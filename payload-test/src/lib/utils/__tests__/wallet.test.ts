import { describe, it, expect, beforeEach, vi } from 'vitest'
import { truncateAddress, copyToClipboard, getExplorerUrl, formatBalance } from '../wallet'

describe('Wallet Utils', () => {
  describe('truncateAddress', () => {
    it('should truncate address with default chars', () => {
      const address = 'AbcdefghijklmnopqrstuvwxyzABCDEF'
      const truncated = truncateAddress(address)
      expect(truncated).toBe('Abcd...CDEF')
    })

    it('should truncate address with custom chars', () => {
      const address = 'AbcdefghijklmnopqrstuvwxyzABCDEF'
      const truncated = truncateAddress(address, 6)
      expect(truncated).toBe('Abcdef...ABCDEF')
    })

    it('should return empty string for empty input', () => {
      expect(truncateAddress('')).toBe('')
    })

    it('should handle short addresses', () => {
      const address = 'Short'
      const truncated = truncateAddress(address)
      expect(truncated).toBe('Shor...hort')
    })
  })

  describe('copyToClipboard', () => {
    beforeEach(() => {
      Object.assign(navigator, {
        clipboard: {
          writeText: vi.fn(() => Promise.resolve()),
        },
      })
    })

    it('should copy text to clipboard', async () => {
      const text = 'test-wallet-address'
      await copyToClipboard(text)
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(text)
    })

    it('should throw error if clipboard API fails', async () => {
      const error = new Error('Clipboard API failed')
      vi.spyOn(navigator.clipboard, 'writeText').mockRejectedValueOnce(error)
      
      await expect(copyToClipboard('test')).rejects.toThrow()
    })
  })

  describe('getExplorerUrl', () => {
    it('should generate devnet explorer URL', () => {
      const address = 'ABC123'
      const url = getExplorerUrl(address, 'devnet')
      expect(url).toBe('https://explorer.solana.com/address/ABC123?cluster=devnet')
    })

    it('should generate mainnet explorer URL', () => {
      const address = 'ABC123'
      const url = getExplorerUrl(address, 'mainnet-beta')
      expect(url).toBe('https://explorer.solana.com/address/ABC123')
    })

    it('should default to devnet', () => {
      const address = 'ABC123'
      const url = getExplorerUrl(address)
      expect(url).toBe('https://explorer.solana.com/address/ABC123?cluster=devnet')
    })
  })

  describe('formatBalance', () => {
    it('should format balance with default decimals', () => {
      expect(formatBalance(1000000)).toBe('1.00')
    })

    it('should format balance with custom decimals', () => {
      expect(formatBalance(1000, 3)).toBe('1.00')
    })

    it('should format zero balance', () => {
      expect(formatBalance(0)).toBe('0.00')
    })

    it('should format large balance', () => {
      expect(formatBalance(1234567890)).toBe('1234.57')
    })

    it('should round to 2 decimal places', () => {
      expect(formatBalance(1234567)).toBe('1.23')
    })
  })
})
