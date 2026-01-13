import { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us | elurc market",
  description: "Learn more about elurc market - your trusted marketplace for fresh and dry products on the blockchain.",
}

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 md:py-16">
      <div className="space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            About <span className="text-primary">elurc</span> market
          </h1>
          <p className="text-xl text-muted-foreground">
            Your trusted decentralized marketplace for quality products
          </p>
        </div>

        <div className="prose prose-gray dark:prose-invert max-w-none">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              elurc market is revolutionizing e-commerce by bringing transparency, security, and efficiency 
              to online shopping through blockchain technology. We connect buyers and sellers in a trustless 
              environment where every transaction is secure and verifiable.
            </p>
          </section>

          <section className="space-y-4 mt-8">
            <h2 className="text-2xl font-semibold">What We Offer</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Fresh Products</h3>
                <p className="text-muted-foreground text-sm">
                  High-quality fresh produce and perishable goods delivered with care and speed.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Dry Products</h3>
                <p className="text-muted-foreground text-sm">
                  Long-lasting dry goods, pantry staples, and non-perishable items for your convenience.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Blockchain Security</h3>
                <p className="text-muted-foreground text-sm">
                  Every transaction is secured on the Solana blockchain, ensuring transparency and trust.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Wallet Integration</h3>
                <p className="text-muted-foreground text-sm">
                  Seamless crypto payments with your favorite Solana wallet for fast, secure checkout.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4 mt-8">
            <h2 className="text-2xl font-semibold">Why Choose Us</h2>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">✓</span>
                <span>Decentralized and transparent transactions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">✓</span>
                <span>Fast and secure payments via Solana blockchain</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">✓</span>
                <span>Quality products from verified sellers</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">✓</span>
                <span>Customer-first approach with dedicated support</span>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}
