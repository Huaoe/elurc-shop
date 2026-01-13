import { PublicKey } from '@solana/web3.js'

export function isValidSolanaAddress(address: string): boolean {
  try {
    new PublicKey(address)
    return true
  } catch {
    return false
  }
}

export function shortenAddress(address: string, chars = 4): string {
  if (!address) return ''
  return `${address.slice(0, chars)}...${address.slice(-chars)}`
}

export function getWalletErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    if (error.message.includes('User rejected')) {
      return 'Connection request was rejected. Please try again.'
    }
    if (error.message.includes('not installed')) {
      return 'Phantom wallet is not installed. Please install it from phantom.app'
    }
    if (error.message.includes('network')) {
      return 'Network error. Please check your connection and try again.'
    }
    return error.message
  }
  return 'An unknown error occurred'
}

export function isPhantomInstalled(): boolean {
  if (typeof window === 'undefined') return false
  return 'phantom' in window && (window as any).phantom?.solana?.isPhantom
}
