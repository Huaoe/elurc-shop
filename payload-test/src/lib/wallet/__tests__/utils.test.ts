import { describe, it, expect, vi, beforeEach } from 'vitest'
import { isValidSolanaAddress, shortenAddress, getWalletErrorMessage, isPhantomInstalled } from '../utils'

describe('Wallet Utils', () => {
  describe('isValidSolanaAddress', () => {
    it('should return true for valid Solana address', () => {
      const validAddress = '11111111111111111111111111111111'
      expect(isValidSolanaAddress(validAddress)).toBe(true)
    })

    it('should return false for invalid Solana address', () => {
      const invalidAddress = 'invalid-address'
      expect(isValidSolanaAddress(invalidAddress)).toBe(false)
    })

    it('should return false for empty string', () => {
      expect(isValidSolanaAddress('')).toBe(false)
    })
  })

  describe('shortenAddress', () => {
    it('should shorten address with default chars', () => {
      const address = '11111111111111111111111111111111'
      const shortened = shortenAddress(address)
      expect(shortened).toBe('1111...1111')
    })

    it('should shorten address with custom chars', () => {
      const address = '11111111111111111111111111111111'
      const shortened = shortenAddress(address, 6)
      expect(shortened).toBe('111111...111111')
    })

    it('should return empty string for empty input', () => {
      expect(shortenAddress('')).toBe('')
    })
  })

  describe('getWalletErrorMessage', () => {
    it('should return user rejection message', () => {
      const error = new Error('User rejected the request')
      const message = getWalletErrorMessage(error)
      expect(message).toBe('Connection request was rejected. Please try again.')
    })

    it('should return not installed message', () => {
      const error = new Error('Wallet not installed')
      const message = getWalletErrorMessage(error)
      expect(message).toBe('Phantom wallet is not installed. Please install it from phantom.app')
    })

    it('should return network error message', () => {
      const error = new Error('network connection failed')
      const message = getWalletErrorMessage(error)
      expect(message).toBe('Network error. Please check your connection and try again.')
    })

    it('should return original error message for unknown errors', () => {
      const error = new Error('Some other error')
      const message = getWalletErrorMessage(error)
      expect(message).toBe('Some other error')
    })

    it('should handle non-Error objects', () => {
      const message = getWalletErrorMessage('string error')
      expect(message).toBe('An unknown error occurred')
    })
  })

  describe('isPhantomInstalled', () => {
    beforeEach(() => {
      vi.stubGlobal('window', {})
    })

    it('should return false when window is undefined', () => {
      vi.stubGlobal('window', undefined)
      expect(isPhantomInstalled()).toBe(false)
    })

    it('should return false when phantom is not in window', () => {
      expect(isPhantomInstalled()).toBe(false)
    })

    it('should return true when phantom is installed', () => {
      vi.stubGlobal('window', {
        phantom: {
          solana: {
            isPhantom: true
          }
        }
      })
      expect(isPhantomInstalled()).toBe(true)
    })

    it('should return false when phantom.solana.isPhantom is false', () => {
      vi.stubGlobal('window', {
        phantom: {
          solana: {
            isPhantom: false
          }
        }
      })
      expect(isPhantomInstalled()).toBe(false)
    })
  })
})
