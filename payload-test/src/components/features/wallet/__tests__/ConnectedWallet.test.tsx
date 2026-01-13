import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render } from '@testing-library/react'
import ConnectedWallet from '../ConnectedWallet'

vi.mock('@solana/wallet-adapter-react', () => ({
  useWallet: vi.fn(() => ({
    publicKey: {
      toBase58: () => 'ABC123XYZ789ABC123XYZ789ABC123XYZ789',
    },
    disconnect: vi.fn(),
  })),
}))

vi.mock('@/lib/wallet/balance', () => ({
  getElurBalance: vi.fn(() => Promise.resolve(100.5)),
}))

vi.mock('@/lib/wallet/config', () => ({
  connection: {},
}))

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}))

describe('ConnectedWallet', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render truncated wallet address', () => {
    const { container } = render(<ConnectedWallet />)
    expect(container.textContent).toContain('ABC1...789')
  })

  it('should render green connection indicator', () => {
    const { container } = render(<ConnectedWallet />)
    const indicator = container.querySelector('.bg-green-500')
    expect(indicator).toBeTruthy()
  })

  it('should render dropdown menu trigger', () => {
    const { container } = render(<ConnectedWallet />)
    const button = container.querySelector('button')
    expect(button).toBeTruthy()
  })
})
