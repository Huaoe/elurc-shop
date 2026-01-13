import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render } from '@testing-library/react'
import { WalletProviders } from '../WalletProviders'

vi.mock('@solana/wallet-adapter-react', () => ({
  ConnectionProvider: ({ children }: { children: React.ReactNode }) => <div data-testid="connection-provider">{children}</div>,
  WalletProvider: ({ children }: { children: React.ReactNode }) => <div data-testid="wallet-provider">{children}</div>,
}))

vi.mock('@solana/wallet-adapter-react-ui', () => ({
  WalletModalProvider: ({ children }: { children: React.ReactNode }) => <div data-testid="wallet-modal-provider">{children}</div>,
}))

vi.mock('@solana/wallet-adapter-wallets', () => ({
  PhantomWalletAdapter: vi.fn(),
}))

vi.mock('@solana/web3.js', () => ({
  clusterApiUrl: vi.fn(() => 'https://api.devnet.solana.com'),
}))

describe('WalletProviders', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render children wrapped in providers', () => {
    const { container } = render(
      <WalletProviders>
        <div data-testid="test-child">Test Content</div>
      </WalletProviders>
    )

    expect(container.querySelector('[data-testid="connection-provider"]')).toBeTruthy()
    expect(container.querySelector('[data-testid="wallet-provider"]')).toBeTruthy()
    expect(container.querySelector('[data-testid="wallet-modal-provider"]')).toBeTruthy()
    expect(container.querySelector('[data-testid="test-child"]')).toBeTruthy()
  })

  it('should render with correct provider hierarchy', () => {
    const { container } = render(
      <WalletProviders>
        <div>Test</div>
      </WalletProviders>
    )

    const connectionProvider = container.querySelector('[data-testid="connection-provider"]')
    const walletProvider = connectionProvider?.querySelector('[data-testid="wallet-provider"]')
    const modalProvider = walletProvider?.querySelector('[data-testid="wallet-modal-provider"]')

    expect(connectionProvider).toBeTruthy()
    expect(walletProvider).toBeTruthy()
    expect(modalProvider).toBeTruthy()
  })
})
