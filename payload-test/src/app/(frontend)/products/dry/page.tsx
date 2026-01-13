import { Metadata } from "next"
import Link from "next/link"
import { Package, Shield, Calendar, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Dry Products | elurc market",
  description: "Shop our extensive collection of dry goods, pantry staples, and non-perishable items.",
}

export default function DryProductsPage() {
  const features = [
    {
      icon: Calendar,
      title: "Long Shelf Life",
      description: "Stock up on essentials with products that last months or even years.",
    },
    {
      icon: Package,
      title: "Bulk Options",
      description: "Save more with bulk purchasing options for your favorite items.",
    },
    {
      icon: Shield,
      title: "Quality Sealed",
      description: "All products are properly sealed and stored to maintain freshness.",
    },
    {
      icon: Zap,
      title: "Quick Delivery",
      description: "Standard shipping with reliable delivery times for your convenience.",
    },
  ]

  const categories = [
    {
      name: "Grains & Rice",
      description: "Premium rice, quinoa, oats, and more",
      image: "🌾",
    },
    {
      name: "Pasta & Noodles",
      description: "Italian pasta, Asian noodles, and varieties",
      image: "🍝",
    },
    {
      name: "Canned Goods",
      description: "Vegetables, fruits, soups, and more",
      image: "🥫",
    },
    {
      name: "Snacks & Treats",
      description: "Chips, crackers, nuts, and sweets",
      image: "🍿",
    },
    {
      name: "Spices & Seasonings",
      description: "Herbs, spices, and flavor enhancers",
      image: "🧂",
    },
    {
      name: "Baking Essentials",
      description: "Flour, sugar, baking powder, and more",
      image: "🧁",
    },
    {
      name: "Oils & Condiments",
      description: "Cooking oils, sauces, and dressings",
      image: "🫗",
    },
    {
      name: "Beverages",
      description: "Coffee, tea, and shelf-stable drinks",
      image: "☕",
    },
    {
      name: "Breakfast Foods",
      description: "Cereals, granola, and breakfast bars",
      image: "🥣",
    },
  ]

  return (
    <div className="container mx-auto max-w-6xl px-4 py-12 md:py-16">
      <div className="space-y-12">
        <div className="space-y-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 dark:bg-amber-950 px-4 py-2 text-sm font-medium text-amber-700 dark:text-amber-300">
            <Package className="size-4" />
            Dry Products
          </div>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Stock Your Pantry with Essentials
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Browse our comprehensive selection of dry goods and pantry staples. 
            Quality products with long shelf life, perfect for stocking up.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Card key={feature.title} className="text-center">
                <CardHeader>
                  <div className="mx-auto rounded-full bg-amber-100 dark:bg-amber-950 p-3 w-fit">
                    <Icon className="size-6 text-amber-600 dark:text-amber-400" />
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
              Find everything you need for your pantry
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Card key={category.name} className="hover:border-amber-500 transition-colors cursor-pointer">
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

        <div className="rounded-lg border bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold">Why Buy Dry Goods from elurc market?</h2>
            <div className="grid gap-4 md:grid-cols-2 text-left">
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <span className="text-amber-600 dark:text-amber-400">✓</span>
                  Premium Brands
                </h3>
                <p className="text-sm text-muted-foreground">
                  Curated selection of trusted and quality brands
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <span className="text-amber-600 dark:text-amber-400">✓</span>
                  Competitive Pricing
                </h3>
                <p className="text-sm text-muted-foreground">
                  Great prices with bulk discounts available
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <span className="text-amber-600 dark:text-amber-400">✓</span>
                  Secure Storage
                </h3>
                <p className="text-sm text-muted-foreground">
                  Properly stored in climate-controlled facilities
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <span className="text-amber-600 dark:text-amber-400">✓</span>
                  Easy Reordering
                </h3>
                <p className="text-sm text-muted-foreground">
                  Save your favorites for quick future purchases
                </p>
              </div>
            </div>
            <Button size="lg" className="mt-4" asChild>
              <Link href="/products">Shop Dry Goods Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
