'use client'

import { useWallet } from '@solana/wallet-adapter-react'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Copy, ExternalLink, LogOut } from 'lucide-react'
import { toast } from 'sonner'
import { truncateAddress, copyToClipboard, getExplorerUrl } from '@/lib/utils/wallet'
import { getElurBalance } from '@/lib/wallet/balance'
import { connection } from '@/lib/wallet/config'
import { PublicKey } from '@solana/web3.js'

export default function ConnectedWallet() {
  const { publicKey, disconnect } = useWallet()
  const [balance, setBalance] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)

  const address = publicKey?.toBase58() || ''
  const truncated = truncateAddress(address)

  useEffect(() => {
    const fetchBalance = async () => {
      if (!publicKey) return
      
      const tokenMintAddress = process.env.NEXT_PUBLIC_ELURC_TOKEN_ADDRESS
      if (!tokenMintAddress) {
        console.warn('ELURC token address not configured')
        return
      }

      setLoading(true)
      try {
        const bal = await getElurBalance(
          connection,
          publicKey,
          new PublicKey(tokenMintAddress)
        )
        setBalance(bal)
      } catch (error) {
        console.error('Failed to fetch balance:', error)
        setBalance(0)
      } finally {
        setLoading(false)
      }
    }

    fetchBalance()
  }, [publicKey])

  const handleCopy = async () => {
    try {
      await copyToClipboard(address)
      toast.success('Address copied to clipboard')
    } catch (_error) {
      toast.error('Failed to copy address')
    }
  }

  const handleDisconnect = () => {
    disconnect()
    toast.success('Wallet disconnected')
  }

  const network = process.env.NEXT_PUBLIC_SOLANA_NETWORK || 'devnet'

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2 min-h-[44px]">
          <div className="h-2 w-2 rounded-full bg-green-500" />
          <span className="font-mono text-sm">{truncated}</span>
          {balance !== null && !loading && (
            <span className="hidden md:inline text-muted-foreground text-sm">
              {balance.toFixed(2)} ELURC
            </span>
          )}
          {loading && (
            <span className="hidden md:inline text-muted-foreground text-sm">
              Loading...
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={handleCopy}>
          <Copy className="h-4 w-4 mr-2" />
          Copy Address
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a 
            href={getExplorerUrl(address, network)} 
            target="_blank" 
            rel="noopener noreferrer"
            className="cursor-pointer"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            View on Explorer
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDisconnect} className="text-destructive">
          <LogOut className="h-4 w-4 mr-2" />
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
