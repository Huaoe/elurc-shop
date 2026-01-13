import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import WalletError from '../WalletError'

describe('WalletError', () => {
  it('should render not-installed error', () => {
    const { container } = render(<WalletError type="not-installed" />)
    expect(container.textContent).toContain('Phantom Wallet Not Installed')
    expect(container.textContent).toContain('Install Phantom')
  })

  it('should render rejected error', () => {
    const onRetry = vi.fn()
    const { container } = render(<WalletError type="rejected" onRetry={onRetry} />)
    expect(container.textContent).toContain('Connection Rejected')
    expect(container.textContent).toContain('Retry Connection')
  })

  it('should render network-error', () => {
    const onRetry = vi.fn()
    const { container } = render(<WalletError type="network-error" onRetry={onRetry} />)
    expect(container.textContent).toContain('Network Error')
    expect(container.textContent).toContain('Retry')
  })

  it('should render alert icon', () => {
    const { container } = render(<WalletError type="not-installed" />)
    const svg = container.querySelector('svg')
    expect(svg).toBeTruthy()
  })
})
