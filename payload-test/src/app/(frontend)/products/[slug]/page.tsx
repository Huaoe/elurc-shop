import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getProductBySlug } from '@/lib/api/products'
import ProductImageGallery from '@/components/features/products/ProductImageGallery'
import ProductInfo from '@/components/features/products/ProductInfo'
import AddToCartBar from '@/components/features/products/AddToCartBar'
import { Button } from '@/components/ui/button'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  
  if (!product) {
    return {
      title: 'Product Not Found | elurc-market',
    }
  }

  return {
    title: `${product.name} | elurc-market`,
    description: product.description?.substring(0, 160) || `Buy ${product.name} with ELURC cryptocurrency`,
    openGraph: {
      title: product.name,
      description: product.description || '',
      images: product.images?.[0]?.image?.url ? [product.images[0].image.url] : [],
      type: 'website',
    },
  }
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description || '',
    image: product.images?.[0]?.image?.url || '',
    offers: {
      '@type': 'Offer',
      price: (product.price_eur / 100).toFixed(2),
      priceCurrency: 'EUR',
      availability: product.in_stock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link href="/products">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Products
            </Link>
          </Button>

          <div className="max-w-6xl mx-auto">
            <ProductImageGallery images={product.images} productName={product.name} />
            <ProductInfo product={product} />
          </div>
        </div>
        <AddToCartBar product={product} />
      </div>
    </>
  )
}
