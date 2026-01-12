import Link from "next/link"
import { Separator } from "@/components/ui/separator"

export const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full border-t bg-background">
      <div className="container mx-auto max-w-max-width px-4 py-8 md:py-12">
        {/* Footer Links */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Company */}
          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-sm">Company</h3>
            <nav className="flex flex-col gap-2" aria-label="Company links">
              <Link
                href="/about"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-sm">Legal</h3>
            <nav className="flex flex-col gap-2" aria-label="Legal links">
              <Link
                href="/terms"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms
              </Link>
              <Link
                href="/privacy"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy
              </Link>
            </nav>
          </div>

          {/* Support */}
          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-sm">Support</h3>
            <nav className="flex flex-col gap-2" aria-label="Support links">
              <Link
                href="/help"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Help
              </Link>
              <Link
                href="/faq"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                FAQ
              </Link>
            </nav>
          </div>

          {/* Products */}
          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-sm">Products</h3>
            <nav className="flex flex-col gap-2" aria-label="Product links">
              <Link
                href="/products/fresh"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Fresh
              </Link>
              <Link
                href="/products/dry"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Dry
              </Link>
            </nav>
          </div>
        </div>

        <Separator className="my-6 md:my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Branding */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold">
              <span className="text-primary">elurc</span>
              <span className="text-foreground">market</span>
            </span>
            <span className="text-xs text-muted-foreground">
              Powered by ELURC
            </span>
          </div>

          {/* Copyright */}
          <p className="text-xs text-muted-foreground">
            © {currentYear} elurc-market. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
