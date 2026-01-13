import { describe, it, expect, vi, beforeEach } from 'vitest'
import { findMatchingTransaction } from './matcher'

vi.mock('@solana/web3.js', () => ({
  Connection: vi.fn(),
  PublicKey: vi.fn((key: string) => ({
    toBase58: () => key,
    toString: () => key,
  })),
  ParsedTransactionWithMeta: vi.fn(),
}))

describe('Payment Matcher - Overpayment & Underpayment Detection', () => {
  const mockOrder = {
    id: 'test-order-1',
    amountElurc: 10_000_000,
    customerWallet: 'CustomerWallet123',
    createdAt: Date.now() - 60000,
  }

  const mockSignatures = [
    { signature: 'sig1', blockTime: Math.floor(Date.now() / 1000) },
  ]

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockConnection: any

  beforeEach(() => {
    vi.clearAllMocks()
    mockConnection = {
      getParsedTransaction: vi.fn(),
    }
  })

  describe('Exact Payment Detection', () => {
    it('should detect exact payment within tolerance', async () => {
      const exactAmount = 10_000_000
      mockConnection.getParsedTransaction.mockResolvedValue({
        meta: { err: null, postTokenBalances: [{ owner: 'ShopWallet456', accountIndex: 1 }] },
        transaction: {
          message: {
            instructions: [
              {
                parsed: {
                  type: 'transfer',
                  info: {
                    mint: process.env.NEXT_PUBLIC_ELURC_TOKEN_ADDRESS,
                    destination: 'TokenAccount789',
                    amount: exactAmount.toString(),
                    authority: 'CustomerWallet123',
                  },
                },
                program: 'spl-token',
              },
            ],
            accountKeys: [{ pubkey: { toString: () => 'key1' } }, { pubkey: { toString: () => 'TokenAccount789' } }],
          },
        },
      })

      process.env.NEXT_PUBLIC_ELURC_TOKEN_ADDRESS = 'ElurTokenMint'
      process.env.NEXT_PUBLIC_SHOP_WALLET_ADDRESS = 'ShopWallet456'

      const result = await findMatchingTransaction(mockConnection, mockSignatures, mockOrder)

      expect(result).toBeTruthy()
      expect(result?.paymentStatus).toBe('exact')
      expect(result?.difference).toBe(0)
      expect(result?.amount).toBe(exactAmount)
    })

    it('should detect exact payment with small difference within tolerance', async () => {
      const almostExactAmount = 10_000_500
      mockConnection.getParsedTransaction.mockResolvedValue({
        meta: { err: null, postTokenBalances: [{ owner: 'ShopWallet456', accountIndex: 1 }] },
        transaction: {
          message: {
            instructions: [
              {
                parsed: {
                  type: 'transfer',
                  info: {
                    mint: process.env.NEXT_PUBLIC_ELURC_TOKEN_ADDRESS,
                    destination: 'TokenAccount789',
                    amount: almostExactAmount.toString(),
                    authority: 'CustomerWallet123',
                  },
                },
                program: 'spl-token',
              },
            ],
            accountKeys: [{ pubkey: { toString: () => 'key1' } }, { pubkey: { toString: () => 'TokenAccount789' } }],
          },
        },
      })

      const result = await findMatchingTransaction(mockConnection, mockSignatures, mockOrder)

      expect(result).toBeTruthy()
      expect(result?.paymentStatus).toBe('exact')
      expect(result?.difference).toBe(500)
    })
  })

  describe('Overpayment Detection', () => {
    it('should detect overpayment beyond tolerance', async () => {
      const overpaidAmount = 12_000_000
      mockConnection.getParsedTransaction.mockResolvedValue({
        meta: { err: null, postTokenBalances: [{ owner: 'ShopWallet456', accountIndex: 1 }] },
        transaction: {
          message: {
            instructions: [
              {
                parsed: {
                  type: 'transfer',
                  info: {
                    mint: process.env.NEXT_PUBLIC_ELURC_TOKEN_ADDRESS,
                    destination: 'TokenAccount789',
                    amount: overpaidAmount.toString(),
                    authority: 'CustomerWallet123',
                  },
                },
                program: 'spl-token',
              },
            ],
            accountKeys: [{ pubkey: { toString: () => 'key1' } }, { pubkey: { toString: () => 'TokenAccount789' } }],
          },
        },
      })

      const result = await findMatchingTransaction(mockConnection, mockSignatures, mockOrder)

      expect(result).toBeTruthy()
      expect(result?.paymentStatus).toBe('overpaid')
      expect(result?.difference).toBe(2_000_000)
      expect(result?.amount).toBe(overpaidAmount)
    })

    it('should calculate correct overpayment difference', async () => {
      const overpaidAmount = 10_005_000
      mockConnection.getParsedTransaction.mockResolvedValue({
        meta: { err: null, postTokenBalances: [{ owner: 'ShopWallet456', accountIndex: 1 }] },
        transaction: {
          message: {
            instructions: [
              {
                parsed: {
                  type: 'transfer',
                  info: {
                    mint: process.env.NEXT_PUBLIC_ELURC_TOKEN_ADDRESS,
                    destination: 'TokenAccount789',
                    amount: overpaidAmount.toString(),
                    authority: 'CustomerWallet123',
                  },
                },
                program: 'spl-token',
              },
            ],
            accountKeys: [{ pubkey: { toString: () => 'key1' } }, { pubkey: { toString: () => 'TokenAccount789' } }],
          },
        },
      })

      const result = await findMatchingTransaction(mockConnection, mockSignatures, mockOrder)

      expect(result).toBeTruthy()
      expect(result?.paymentStatus).toBe('overpaid')
      expect(result?.difference).toBe(5_000)
    })
  })

  describe('Underpayment Detection', () => {
    it('should detect underpayment beyond tolerance', async () => {
      const underpaidAmount = 8_000_000
      mockConnection.getParsedTransaction.mockResolvedValue({
        meta: { err: null, postTokenBalances: [{ owner: 'ShopWallet456', accountIndex: 1 }] },
        transaction: {
          message: {
            instructions: [
              {
                parsed: {
                  type: 'transfer',
                  info: {
                    mint: process.env.NEXT_PUBLIC_ELURC_TOKEN_ADDRESS,
                    destination: 'TokenAccount789',
                    amount: underpaidAmount.toString(),
                    authority: 'CustomerWallet123',
                  },
                },
                program: 'spl-token',
              },
            ],
            accountKeys: [{ pubkey: { toString: () => 'key1' } }, { pubkey: { toString: () => 'TokenAccount789' } }],
          },
        },
      })

      const result = await findMatchingTransaction(mockConnection, mockSignatures, mockOrder)

      expect(result).toBeTruthy()
      expect(result?.paymentStatus).toBe('underpaid')
      expect(result?.difference).toBe(-2_000_000)
      expect(result?.amount).toBe(underpaidAmount)
    })

    it('should calculate correct underpayment difference', async () => {
      const underpaidAmount = 9_995_000
      mockConnection.getParsedTransaction.mockResolvedValue({
        meta: { err: null, postTokenBalances: [{ owner: 'ShopWallet456', accountIndex: 1 }] },
        transaction: {
          message: {
            instructions: [
              {
                parsed: {
                  type: 'transfer',
                  info: {
                    mint: process.env.NEXT_PUBLIC_ELURC_TOKEN_ADDRESS,
                    destination: 'TokenAccount789',
                    amount: underpaidAmount.toString(),
                    authority: 'CustomerWallet123',
                  },
                },
                program: 'spl-token',
              },
            ],
            accountKeys: [{ pubkey: { toString: () => 'key1' } }, { pubkey: { toString: () => 'TokenAccount789' } }],
          },
        },
      })

      const result = await findMatchingTransaction(mockConnection, mockSignatures, mockOrder)

      expect(result).toBeTruthy()
      expect(result?.paymentStatus).toBe('underpaid')
      expect(result?.difference).toBe(-5_000)
    })
  })

  describe('Tolerance Threshold', () => {
    it('should use 1000 ELURC tolerance threshold', async () => {
      const withinToleranceAmount = 10_000_999
      mockConnection.getParsedTransaction.mockResolvedValue({
        meta: { err: null, postTokenBalances: [{ owner: 'ShopWallet456', accountIndex: 1 }] },
        transaction: {
          message: {
            instructions: [
              {
                parsed: {
                  type: 'transfer',
                  info: {
                    mint: process.env.NEXT_PUBLIC_ELURC_TOKEN_ADDRESS,
                    destination: 'TokenAccount789',
                    amount: withinToleranceAmount.toString(),
                    authority: 'CustomerWallet123',
                  },
                },
                program: 'spl-token',
              },
            ],
            accountKeys: [{ pubkey: { toString: () => 'key1' } }, { pubkey: { toString: () => 'TokenAccount789' } }],
          },
        },
      })

      const result = await findMatchingTransaction(mockConnection, mockSignatures, mockOrder)

      expect(result).toBeTruthy()
      expect(result?.paymentStatus).toBe('exact')
    })

    it('should flag as overpaid when exceeding tolerance', async () => {
      const beyondToleranceAmount = 10_001_001
      mockConnection.getParsedTransaction.mockResolvedValue({
        meta: { err: null, postTokenBalances: [{ owner: 'ShopWallet456', accountIndex: 1 }] },
        transaction: {
          message: {
            instructions: [
              {
                parsed: {
                  type: 'transfer',
                  info: {
                    mint: process.env.NEXT_PUBLIC_ELURC_TOKEN_ADDRESS,
                    destination: 'TokenAccount789',
                    amount: beyondToleranceAmount.toString(),
                    authority: 'CustomerWallet123',
                  },
                },
                program: 'spl-token',
              },
            ],
            accountKeys: [{ pubkey: { toString: () => 'key1' } }, { pubkey: { toString: () => 'TokenAccount789' } }],
          },
        },
      })

      const result = await findMatchingTransaction(mockConnection, mockSignatures, mockOrder)

      expect(result).toBeTruthy()
      expect(result?.paymentStatus).toBe('overpaid')
      expect(result?.difference).toBe(1_001)
    })
  })

  describe('Edge Cases', () => {
    it('should return null when no matching transaction found', async () => {
      mockConnection.getParsedTransaction.mockResolvedValue(null)

      const result = await findMatchingTransaction(mockConnection, mockSignatures, mockOrder)

      expect(result).toBeNull()
    })

    it('should return payment status for all valid transactions', async () => {
      const testAmount = 10_000_000
      mockConnection.getParsedTransaction.mockResolvedValue({
        meta: { err: null, postTokenBalances: [{ owner: 'ShopWallet456', accountIndex: 1 }] },
        transaction: {
          message: {
            instructions: [
              {
                parsed: {
                  type: 'transfer',
                  info: {
                    mint: process.env.NEXT_PUBLIC_ELURC_TOKEN_ADDRESS,
                    destination: 'TokenAccount789',
                    amount: testAmount.toString(),
                    authority: 'CustomerWallet123',
                  },
                },
                program: 'spl-token',
              },
            ],
            accountKeys: [{ pubkey: { toString: () => 'key1' } }, { pubkey: { toString: () => 'TokenAccount789' } }],
          },
        },
      })

      const result = await findMatchingTransaction(mockConnection, mockSignatures, mockOrder)

      expect(result).toBeTruthy()
      expect(result).toHaveProperty('paymentStatus')
      expect(result).toHaveProperty('difference')
      expect(['exact', 'overpaid', 'underpaid']).toContain(result?.paymentStatus)
    })
  })
})
