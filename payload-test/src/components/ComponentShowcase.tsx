"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Toaster, toast } from "sonner";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductCardSkeleton } from "@/components/product/ProductCardSkeleton";
import { PriceDisplay } from "@/components/product/PriceDisplay";
import { StockStatusBadge } from "@/components/product/StockStatusBadge";
import { Spinner } from "@/components/ui/spinner";
import { EmptyState } from "@/components/ui/EmptyState";
import { ShoppingBag, Package } from "lucide-react";

export default function ComponentShowcase() {
  return (
    <div className="min-h-screen p-8 space-y-12">
      <Toaster />
      
      <header>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">shadcn/ui Component Showcase</h1>
        <p className="text-gray-600">Testing all installed components with elurc-market design system</p>
      </header>

      {/* Buttons Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">Buttons</h2>
        <div className="flex flex-wrap gap-4">
          <Button variant="default">Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="destructive">Destructive Button</Button>
          <Button variant="outline">Outline Button</Button>
          <Button variant="ghost">Ghost Button</Button>
          <Button variant="link">Link Button</Button>
        </div>
        <div className="flex flex-wrap gap-4">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon">🛒</Button>
        </div>
        <div className="flex flex-wrap gap-4">
          <Button disabled>Disabled Button</Button>
          <Button onClick={() => toast.success("Button clicked!")}>
            Click for Toast
          </Button>
        </div>
      </section>

      {/* Cards Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Product Card</CardTitle>
              <CardDescription>Organic Carrots</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">12.50 ELURC</p>
              <p className="text-sm text-gray-500">€3.75</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Add to Cart</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Info Card</CardTitle>
              <CardDescription>With badge</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Badge>In Stock</Badge>
                <Badge variant="secondary">Fresh</Badge>
                <Badge variant="destructive">Out of Stock</Badge>
                <Badge variant="outline">Organic</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Simple Card</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Cards use 12px border radius from design system
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Form Elements Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">Form Elements</h2>
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Sample Form</CardTitle>
            <CardDescription>Input and Label components</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="your@email.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wallet">Wallet Address</Label>
              <Input 
                id="wallet" 
                type="text" 
                placeholder="0x..." 
                className="font-mono text-sm"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (ELURC)</Label>
              <Input id="amount" type="number" placeholder="0.00" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="disabled">Disabled Input</Label>
              <Input id="disabled" disabled placeholder="Disabled" />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Submit</Button>
          </CardFooter>
        </Card>
      </section>

      {/* Badges Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">Badges</h2>
        <div className="flex flex-wrap gap-3">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
        <div className="flex flex-wrap gap-3">
          <Badge className="bg-success text-white">In Stock</Badge>
          <Badge className="bg-warning text-white">Low Stock</Badge>
          <Badge className="bg-error text-white">Out of Stock</Badge>
          <Badge className="bg-info text-white">Info</Badge>
        </div>
      </section>

      {/* Toast Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">Toast Notifications</h2>
        <div className="flex flex-wrap gap-4">
          <Button onClick={() => toast.success("Success! Payment confirmed")}>
            Success Toast
          </Button>
          <Button onClick={() => toast.error("Error! Payment failed")}>
            Error Toast
          </Button>
          <Button onClick={() => toast.info("Info: Transaction pending")}>
            Info Toast
          </Button>
          <Button onClick={() => toast.warning("Warning: Low stock")}>
            Warning Toast
          </Button>
          <Button onClick={() => toast("Default notification")}>
            Default Toast
          </Button>
        </div>
      </section>

      {/* Accessibility Notes */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">Accessibility Features</h2>
        <Card>
          <CardHeader>
            <CardTitle>WCAG 2.1 AA Compliance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>✅ Keyboard navigation (Tab, Enter, Space, Escape)</li>
              <li>✅ Focus indicators visible on all interactive elements</li>
              <li>✅ ARIA labels and roles from Radix UI primitives</li>
              <li>✅ Color contrast ratios meet WCAG AA (inherited from design tokens)</li>
              <li>✅ Touch targets meet 44x44px minimum (buttons, inputs)</li>
              <li>✅ Screen reader compatible</li>
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* Product Components Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">Product Components</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ProductCard
            product={{
              id: "1",
              name: "Organic Carrots",
              description: "Fresh organic carrots from local farms",
              price_elurc: 12.50,
              price_eur: 3.75,
              image: undefined,
              stock: 25,
              in_stock: true,
            }}
            onAddToCart={(id) => {
              toast.success("Added to cart!");
              console.log("Added product:", id);
            }}
          />
          <ProductCard
            product={{
              id: "2",
              name: "Organic Tomatoes",
              description: "Vine-ripened organic tomatoes",
              price_elurc: 8.00,
              price_eur: 2.40,
              image: undefined,
              stock: 3,
              in_stock: true,
            }}
            onAddToCart={(id) => toast.success("Added to cart!")}
          />
          <ProductCard
            product={{
              id: "3",
              name: "Organic Lettuce",
              description: "Crisp organic lettuce",
              price_elurc: 5.50,
              price_eur: 1.65,
              image: undefined,
              stock: 0,
              in_stock: false,
            }}
          />
        </div>
      </section>

      {/* Price Display Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">Price Display</h2>
        <div className="flex flex-wrap gap-8">
          <div>
            <p className="text-sm text-gray-500 mb-2">Small</p>
            <PriceDisplay elurc={12.50} eur={3.75} size="sm" />
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-2">Medium (Default)</p>
            <PriceDisplay elurc={12.50} eur={3.75} size="md" />
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-2">Large</p>
            <PriceDisplay elurc={12.50} eur={3.75} size="lg" />
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-2">Without Currency Label</p>
            <PriceDisplay elurc={12.50} eur={3.75} size="md" showCurrency={false} />
          </div>
        </div>
      </section>

      {/* Stock Status Badges Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">Stock Status Badges</h2>
        <div className="flex flex-wrap gap-4">
          <div>
            <p className="text-sm text-gray-500 mb-2">In Stock</p>
            <StockStatusBadge inStock={true} stock={25} />
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-2">Low Stock</p>
            <StockStatusBadge inStock={true} stock={3} lowStockThreshold={5} />
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-2">Out of Stock</p>
            <StockStatusBadge inStock={false} stock={0} />
          </div>
        </div>
      </section>

      {/* Loading States Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">Loading States</h2>
        <div className="space-y-6">
          <div>
            <p className="text-sm text-gray-500 mb-4">Product Card Skeleton</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-4">Spinners</p>
            <div className="flex gap-8 items-center">
              <div>
                <p className="text-xs text-gray-400 mb-2">Small</p>
                <Spinner size="sm" />
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-2">Medium</p>
                <Spinner size="md" />
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-2">Large</p>
                <Spinner size="lg" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Empty States Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">Empty States</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <EmptyState
              icon={ShoppingBag}
              title="Your cart is empty"
              description="Add some products to your cart to get started"
              action={{
                label: "Browse Products",
                onClick: () => toast.info("Navigate to products"),
              }}
            />
          </Card>
          <Card>
            <EmptyState
              icon={Package}
              title="No products found"
              description="Try adjusting your search or filter criteria"
            />
          </Card>
        </div>
      </section>

      {/* Design System Integration */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">Design System Integration</h2>
        <Card>
          <CardHeader>
            <CardTitle>elurc-market Design Tokens</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>✅ Colors: Primary (#2563EB), Success (#10B981), Warning (#F59E0B), Error (#EF4444)</li>
              <li>✅ Typography: Inter font family (UI), JetBrains Mono (monospace)</li>
              <li>✅ Spacing: 4px base unit system</li>
              <li>✅ Border radius: 8px (buttons/inputs), 12px (cards)</li>
              <li>✅ Focus rings: 2px solid primary with 2px offset</li>
              <li>✅ Responsive breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)</li>
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
