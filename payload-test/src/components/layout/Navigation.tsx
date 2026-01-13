"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Package, ShoppingCart, User } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface NavigationProps {
  cartItemCount?: number
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

const navigationLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/products", label: "Products", icon: Package },
  { href: "/cart", label: "Cart", icon: ShoppingCart },
  { href: "/account", label: "Account", icon: User },
]

export const Navigation = ({
  cartItemCount = 0,
  open = false,
  onOpenChange,
}: NavigationProps) => {
  const pathname = usePathname()

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-[280px] sm:w-[320px]">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-2 mt-6" aria-label="Mobile navigation">
          {navigationLinks.map((link) => {
            const Icon = link.icon
            const isActive = pathname === link.href
            const isCart = link.href === "/cart"

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => onOpenChange?.(false)}
                className={cn(
                  "flex items-center gap-3 rounded-md px-4 py-3 text-sm font-medium transition-colors",
                  "hover:bg-accent hover:text-accent-foreground",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  isActive && "bg-accent text-accent-foreground"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon className="size-5" />
                <span className="flex-1">{link.label}</span>
                {isCart && cartItemCount > 0 && (
                  <Badge variant="secondary" className="ml-auto">
                    {cartItemCount}
                  </Badge>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Product Categories Submenu */}
        <div className="mt-6 pt-6 border-t">
          <h3 className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Categories
          </h3>
          <div className="flex flex-col gap-1">
            <Link
              href="/products/fresh"
              onClick={() => onOpenChange?.(false)}
              className="flex items-center gap-3 rounded-md px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Fresh Products
            </Link>
            <Link
              href="/products/dry"
              onClick={() => onOpenChange?.(false)}
              className="flex items-center gap-3 rounded-md px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Dry Products
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
