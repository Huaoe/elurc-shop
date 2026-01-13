"use client"

import Link from "next/link"
import { ShoppingCart, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useWallet } from "@solana/wallet-adapter-react"
import WalletButton from "@/components/features/wallet/WalletButton"
import ConnectedWallet from "@/components/features/wallet/ConnectedWallet"

interface HeaderProps {
  cartItemCount?: number
  onMenuClick?: () => void
}

export const Header = ({
  cartItemCount = 0,
  onMenuClick,
}: HeaderProps) => {
  const { connected } = useWallet()
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-max-width items-center justify-between px-4 md:h-18">
        {/* Mobile Menu Button */}
        <Button
          variant="outline"
          size="icon"
          className="md:hidden"
          onClick={onMenuClick}
          aria-label="Open menu"
        >
          <Menu className="size-5" />
        </Button>

        {/* Logo/Brand */}
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-lg md:text-xl hover:opacity-80 transition-opacity"
        >
          <span className="text-primary">elurc</span>
          <span className="text-foreground">market</span>
        </Link>

        {/* Desktop Navigation - Hidden on mobile */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
          <Link
            href="/products"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Products
          </Link>
          <Link
            href="/cart"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Cart
          </Link>
          {connected && (
            <Link
              href="/orders"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Orders
            </Link>
          )}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Cart Icon with Badge */}
          <Link href="/cart" className="relative" aria-label={`Shopping cart with ${cartItemCount} items`}>
            <Button variant="outline" size="icon" className="relative">
              <ShoppingCart className="size-5" />
              {cartItemCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 size-5 flex items-center justify-center p-0 text-xs"
                >
                  {cartItemCount > 99 ? "99+" : cartItemCount}
                </Badge>
              )}
            </Button>
          </Link>

          {/* Wallet Connection */}
          {connected ? <ConnectedWallet /> : <WalletButton />}
        </div>
      </div>
    </header>
  )
}
