import { Metadata } from "next"
import Link from "next/link"
import { Leaf, Clock, Truck, ThermometerSnowflake } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Fresh Products | elurc market",
  description: "Browse our selection of fresh, high-quality produce and perishable goods delivered with care.",
}

export default function FreshProductsPage() {
  const features = [
    {
      icon: Leaf,
      title: "Farm Fresh Quality",
      description: "Sourced directly from trusted local farms and suppliers for maximum freshness.",
    },
    {
      icon: Clock,
      title: "Same-Day Delivery",
      description: "Order before noon for same-day delivery to ensure peak freshness.",
    },
    {
      icon: ThermometerSnowflake,
      title: "Temperature Controlled",
      description: "All fresh products are kept at optimal temperatures during storage and delivery.",
    },
    {
      icon: Truck,
      title: "Fast Shipping",
      description: "Expedited delivery ensures your fresh items arrive in perfect condition.",
    },
  ]

  const categories = [
    {
      name: "Fruits & Vegetables",
      description: "Seasonal produce picked at peak ripeness",
      image: "🥬",
    },
    {
      name: "Dairy & Eggs",
      description: "Fresh dairy products and farm-fresh eggs",
      image: "🥛",
    },
    {
      name: "Meat & Seafood",
      description: "Premium cuts and fresh-caught seafood",
      image: "🥩",
    },
    {
      name: "Bakery",
      description: "Freshly baked bread, pastries, and more",
      image: "🥖",
    },
    {
      name: "Prepared Foods",
      description: "Ready-to-eat meals and fresh salads",
      image: "🥗",
    },
    {
      name: "Beverages",
      description: "Fresh juices, smoothies, and drinks",
      image: "🧃",
    },
  ]

  return (
    <div className="container mx-auto max-w-6xl px-4 py-12 md:py-16">
      <div className="space-y-12">
        <div className="space-y-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-green-100 dark:bg-green-950 px-4 py-2 text-sm font-medium text-green-700 dark:text-green-300">
            <Leaf className="size-4" />
            Fresh Products
          </div>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Farm-Fresh Quality, Delivered Fast
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our curated selection of fresh, high-quality produce and perishable goods. 
            From farm to your table with blockchain-verified authenticity.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Card key={feature.title} className="text-center">
                <CardHeader>
                  <div className="mx-auto rounded-full bg-green-100 dark:bg-green-950 p-3 w-fit">
                    <Icon className="size-6 text-green-600 dark:text-green-400" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-2">Browse Categories</h2>
            <p className="text-muted-foreground">
              Explore our wide range of fresh product categories
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Card key={category.name} className="hover:border-green-500 transition-colors cursor-pointer">
                <CardHeader>
                  <div className="text-5xl mb-2">{category.image}</div>
                  <CardTitle>{category.name}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/products">Browse Products</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        <div className="rounded-lg border bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold">Why Choose Fresh from elurc market?</h2>
            <div className="grid gap-4 md:grid-cols-2 text-left">
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  Quality Guaranteed
                </h3>
                <p className="text-sm text-muted-foreground">
                  Every item is inspected for quality before shipping
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  Blockchain Verified
                </h3>
                <p className="text-sm text-muted-foreground">
                  Track your product&apos;s journey from source to delivery
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  Sustainable Sourcing
                </h3>
                <p className="text-sm text-muted-foreground">
                  Supporting local farms and eco-friendly practices
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  Satisfaction Promise
                </h3>
                <p className="text-sm text-muted-foreground">
                  Not satisfied? We&apos;ll make it right
                </p>
              </div>
            </div>
            <Button size="lg" className="mt-4" asChild>
              <Link href="/products">Start Shopping Fresh</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
