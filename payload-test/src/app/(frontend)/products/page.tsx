import { Metadata } from 'next'
import { getProducts } from '@/lib/api/products'
import { getCategories } from '@/lib/api/categories'
import ProductGrid from '@/components/features/products/ProductGrid'
import CategoryFilter from '@/components/features/products/CategoryFilter'
import EmptyCategoryState from '@/components/features/products/EmptyCategoryState'

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { category?: string }
}): Promise<Metadata> {
  const category = searchParams.category || 'all'
  const categories = await getCategories()
  const currentCategory = categories.find(cat => cat.slug === category)
  
  const title = category === 'all' 
    ? 'Products | elurc-market'
    : `${currentCategory?.name || category} | elurc-market`
  
  const description = currentCategory?.description 
    || 'Browse organic groceries from Bretaigne. Pay with ELURC cryptocurrency.'
  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
    },
  }
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { category?: string }
}) {
  const category = searchParams.category || 'all'
  const [products, categories] = await Promise.all([
    getProducts(category),
    getCategories(),
  ])
  
  const currentCategory = categories.find(cat => cat.slug === category)
  const otherCategories = categories.filter(cat => cat.slug !== category)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        {category === 'all' ? 'Products' : currentCategory?.name || 'Products'}
      </h1>
      
      <CategoryFilter categories={categories} activeCategory={category} />
      
      {products.length === 0 && currentCategory ? (
        <EmptyCategoryState 
          category={currentCategory} 
          otherCategories={otherCategories}
        />
      ) : (
        <ProductGrid products={products} />
      )}
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Products',
                item: `${process.env.NEXT_PUBLIC_SERVER_URL}/products`,
              },
              ...(category !== 'all' ? [{
                '@type': 'ListItem',
                position: 3,
                name: currentCategory?.name || category,
                item: `${process.env.NEXT_PUBLIC_SERVER_URL}/products?category=${category}`,
              }] : []),
            ],
          }),
        }}
      />
    </div>
  )
}
