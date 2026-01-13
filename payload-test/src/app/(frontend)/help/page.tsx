import { Metadata } from "next"
import Link from "next/link"
import { HelpCircle, ShoppingCart, Wallet, Package, CreditCard, Shield } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Help Center | elurc market",
  description: "Find answers to common questions and get help with using elurc market.",
}

export default function HelpPage() {
  const helpTopics = [
    {
      icon: Wallet,
      title: "Wallet Setup",
      description: "Learn how to connect your Solana wallet to start shopping",
      topics: [
        "Supported wallet providers (Phantom, Solflare, etc.)",
        "How to connect your wallet",
        "Wallet security best practices",
        "Troubleshooting connection issues",
      ],
    },
    {
      icon: ShoppingCart,
      title: "Shopping & Orders",
      description: "Everything you need to know about browsing and purchasing",
      topics: [
        "How to browse products",
        "Adding items to your cart",
        "Viewing order history",
        "Tracking your orders",
      ],
    },
    {
      icon: CreditCard,
      title: "Payments",
      description: "Understanding blockchain payments and transactions",
      topics: [
        "How cryptocurrency payments work",
        "Transaction fees explained",
        "Payment confirmation times",
        "What to do if a transaction fails",
      ],
    },
    {
      icon: Package,
      title: "Products & Delivery",
      description: "Information about our products and shipping",
      topics: [
        "Fresh vs. Dry products",
        "Product quality guarantees",
        "Delivery timeframes",
        "Returns and refunds",
      ],
    },
    {
      icon: Shield,
      title: "Security & Privacy",
      description: "Keeping your account and transactions secure",
      topics: [
        "How we protect your data",
        "Blockchain security benefits",
        "Reporting suspicious activity",
        "Privacy settings",
      ],
    },
    {
      icon: HelpCircle,
      title: "Account & Support",
      description: "Managing your account and getting assistance",
      topics: [
        "Creating and managing your account",
        "Updating your preferences",
        "Contacting customer support",
        "Providing feedback",
      ],
    },
  ]

  return (
    <div className="container mx-auto max-w-6xl px-4 py-12 md:py-16">
      <div className="space-y-8">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Help Center
          </h1>
          <p className="text-xl text-muted-foreground">
            Find answers and get support for your elurc market experience
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {helpTopics.map((topic) => {
            const Icon = topic.icon
            return (
              <Card key={topic.title} className="hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <Icon className="size-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{topic.title}</CardTitle>
                  </div>
                  <CardDescription>{topic.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {topic.topics.map((item) => (
                      <li key={item} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="mt-12 rounded-lg border bg-muted/50 p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">Still Need Help?</h2>
          <p className="text-muted-foreground mb-6">
            Can&apos;t find what you&apos;re looking for? Our support team is here to assist you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Contact Support
            </Link>
            <Link
              href="/faq"
              className="inline-flex items-center justify-center rounded-md border bg-background px-6 py-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              View FAQ
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
