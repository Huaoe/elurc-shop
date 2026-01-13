import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import WalletButton from '../WalletButton'

vi.mock('@solana/wallet-adapter-react', () => ({
  useWallet: vi.fn(() => ({
    connecting: false,
  })),
}))

vi.mock('@solana/wallet-adapter-react-ui', () => ({
  useWalletModal: vi.fn(() => ({
    setVisible: vi.fn(),
  })),
}))

describe('WalletButton', () => {
  it('should render connect wallet button', () => {
    const { container } = render(<WalletButton />)
    expect(container.textContent).toContain('Connect Wallet')
  })

  it('should show connecting state', () => {
    const { useWallet } = require('@solana/wallet-adapter-react')
    useWallet.mockReturnValue({ connecting: true })
    
    const { container } = render(<WalletButton />)
    expect(container.textContent).toContain('Connecting...')
  })

  it('should render wallet icon', () => {
    const { container } = render(<WalletButton />)
    const svg = container.querySelector('svg')
    expect(svg).toBeTruthy()
  })
})
