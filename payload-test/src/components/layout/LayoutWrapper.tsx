"use client"

import { useState, useEffect } from "react"
import { Header } from "./Header"
import { Navigation } from "./Navigation"
import { Footer } from "./Footer"
import { useCart } from "@/hooks/useCart"

interface LayoutWrapperProps {
  children: React.ReactNode
}

export const LayoutWrapper = ({ children }: LayoutWrapperProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { itemCount } = useCart()

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <>
      <Header
        cartItemCount={mounted ? itemCount : 0}
        onMenuClick={() => setMobileMenuOpen(true)}
      />
      <Navigation
        cartItemCount={mounted ? itemCount : 0}
        open={mobileMenuOpen}
        onOpenChange={setMobileMenuOpen}
      />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  )
}
