"use client"

import { useState } from "react"
import { Header } from "./Header"
import { Navigation } from "./Navigation"
import { Footer } from "./Footer"

interface LayoutWrapperProps {
  children: React.ReactNode
}

export const LayoutWrapper = ({ children }: LayoutWrapperProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      <Header
        cartItemCount={0}
        walletConnected={false}
        onMenuClick={() => setMobileMenuOpen(true)}
      />
      <Navigation
        cartItemCount={0}
        open={mobileMenuOpen}
        onOpenChange={setMobileMenuOpen}
      />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  )
}
