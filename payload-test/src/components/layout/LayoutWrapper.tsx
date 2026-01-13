"use client"

import { useState } from "react"
import { Header } from "./Header"
import { Navigation } from "./Navigation"
import { Footer } from "./Footer"
import { useCart } from "@/hooks/useCart"

interface LayoutWrapperProps {
  children: React.ReactNode
}

export const LayoutWrapper = ({ children }: LayoutWrapperProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { itemCount } = useCart()

  return (
    <>
      <Header
        cartItemCount={itemCount}
        walletConnected={false}
        onMenuClick={() => setMobileMenuOpen(true)}
      />
      <Navigation
        cartItemCount={itemCount}
        open={mobileMenuOpen}
        onOpenChange={setMobileMenuOpen}
      />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  )
}
