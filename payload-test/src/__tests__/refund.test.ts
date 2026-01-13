import { describe, it, expect, vi, beforeEach } from 'vitest'
import { executeRefund, validateRefundAmount, loadShopWalletKeypair, checkShopWalletBalance } from '@/lib/solana/refund'
import { Keypair } from '@solana/web3.js'

vi.mock('@/lib/solana/connection', () => ({
  getConnection: vi.fn(() => ({
    getLatestBlockhash: vi.fn().mockResolvedValue({ blockhash: 'mock-blockhash' }),
    getTokenAccountBalance: vi.fn().mockResolvedValue({
      value: { amount: '1000000000' }
    }),
  })),
}))

vi.mock('@solana/web3.js', async () => {
  const actual = await vi.importActual('@solana/web3.js')
  return {
    ...actual,
    sendAndConfirmTransaction: vi.fn().mockResolvedValue('mock-signature'),
  }
})

vi.mock('@solana/spl-token', () => ({
  getAssociatedTokenAddress: vi.fn().mockResolvedValue('mock-token-account'),
  createTransferInstruction: vi.fn().mockReturnValue({}),
}))

describe('Refund Utility Functions', () => {
  describe('validateRefundAmount', () => {
    it('should validate correct refund amount', async () => {
      const result = await validateRefundAmount(10000000, 5000000, 0)
      expect(result.valid).toBe(true)
      expect(result.error).toBeUndefined()
    })

    it('should reject refund amount below minimum', async () => {
      const result = await validateRefundAmount(10000000, 500, 0)
      expect(result.valid).toBe(false)
      expect(result.error).toContain('at least 1000 ELURC')
    })

    it('should reject refund amount exceeding order amount', async () => {
      const result = await validateRefundAmount(10000000, 15000000, 0)
      expect(result.valid).toBe(false)
      expect(result.error).toContain('exceeds order amount')
    })

    it('should account for previous refunds', async () => {
      const result = await validateRefundAmount(10000000, 6000000, 5000000)
      expect(result.valid).toBe(false)
      expect(result.error).toContain('exceeds order amount')
    })

    it('should allow partial refunds', async () => {
      const result = await validateRefundAmount(10000000, 3000000, 2000000)
      expect(result.valid).toBe(true)
    })
  })

  describe('loadShopWalletKeypair', () => {
    beforeEach(() => {
      delete process.env.SHOP_WALLET_PRIVATE_KEY
    })

    it('should throw error if private key not set', () => {
      expect(() => loadShopWalletKeypair()).toThrow('SHOP_WALLET_PRIVATE_KEY environment variable is not set')
    })

    it('should throw error for invalid private key format', () => {
      process.env.SHOP_WALLET_PRIVATE_KEY = 'invalid-key'
      expect(() => loadShopWalletKeypair()).toThrow('Invalid SHOP_WALLET_PRIVATE_KEY format')
    })

    it('should load valid keypair', () => {
      const mockKeypair = Keypair.generate()
      const secretKeyArray = Array.from(mockKeypair.secretKey)
      process.env.SHOP_WALLET_PRIVATE_KEY = JSON.stringify(secretKeyArray)
      
      const keypair = loadShopWalletKeypair()
      expect(keypair).toBeInstanceOf(Keypair)
    })
  })

  describe('executeRefund', () => {
    it('should execute refund successfully', async () => {
      const mockKeypair = Keypair.generate()
      const secretKeyArray = Array.from(mockKeypair.secretKey)
      process.env.SHOP_WALLET_PRIVATE_KEY = JSON.stringify(secretKeyArray)

      const result = await executeRefund({
        recipientWallet: 'mock-wallet-address',
        amount: 5000000,
        shopWalletKeypair: mockKeypair,
        tokenMintAddress: 'mock-token-mint',
      })

      expect(result.success).toBe(true)
      expect(result.signature).toBeDefined()
    })

    it('should handle refund execution errors', async () => {
      const mockKeypair = Keypair.generate()
      
      vi.mocked(await import('@solana/web3.js')).sendAndConfirmTransaction = vi.fn().mockRejectedValue(new Error('Transaction failed'))

      const result = await executeRefund({
        recipientWallet: 'invalid-wallet',
        amount: 5000000,
        shopWalletKeypair: mockKeypair,
        tokenMintAddress: 'mock-token-mint',
      })

      expect(result.success).toBe(false)
      expect(result.error).toBeDefined()
    })
  })

  describe('checkShopWalletBalance', () => {
    it('should return wallet balance', async () => {
      const mockKeypair = Keypair.generate()
      const secretKeyArray = Array.from(mockKeypair.secretKey)
      process.env.SHOP_WALLET_PRIVATE_KEY = JSON.stringify(secretKeyArray)

      const result = await checkShopWalletBalance('mock-token-mint')
      
      expect(result.balance).toBe(1000000000)
      expect(result.error).toBeUndefined()
    })
  })
})

describe('Refund API Integration', () => {
  it('should validate required fields', async () => {
    const response = await fetch('/api/admin/refunds/process', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    })

    expect(response.status).toBe(400)
  })

  it('should validate wallet address format', async () => {
    const response = await fetch('/api/admin/refunds/process', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderId: 'test-order',
        refundAmount: 5000000,
        walletAddress: 'invalid-address',
        reason: 'Test refund',
      }),
    })

    expect(response.status).toBe(400)
  })
})
