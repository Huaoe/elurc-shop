import { PublicKey } from '@solana/web3.js'

interface PaymentURIParams {
  recipient: string
  amount: number
  splToken: string
  reference?: string
  label?: string
  message?: string
}

export function generatePaymentURI({
  recipient,
  amount,
  splToken,
  reference,
  label = 'elurc-market',
  message = 'Order payment',
}: PaymentURIParams): string {
  const lamports = Math.floor(amount * 1_000_000)
  
  let uri = `solana:${recipient}?amount=${lamports}&spl-token=${splToken}`
  
  if (reference) {
    uri += `&reference=${reference}`
  }
  
  if (label) {
    uri += `&label=${encodeURIComponent(label)}`
  }
  
  if (message) {
    uri += `&message=${encodeURIComponent(message)}`
  }
  
  return uri
}

export function validateSolanaAddress(address: string): boolean {
  try {
    new PublicKey(address)
    return true
  } catch {
    return false
  }
}
