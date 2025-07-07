import { Suspense } from 'react'
import Image from 'next/image'
import { searchProducts } from '@/lib/supabase/helpers'
import { LoadingSpinner } from '@/app/components/ui/loading-spinner'
import { PriceRangeFilter } from '@/app/components/filters/price-range'

interface SearchPageProps {
  searchParams: { 
    q?: string;
    minPrice?: string;
    maxPrice?: string;
    category?: string;
  }
}

async function SearchResults({ 
  query,
  minPrice,
  maxPrice,
  category
}: { 
  query: string;
  minPrice?: number;
  maxPrice?: number;
  category?: string;
}) {
  const products = await searchProducts(query, {
    minPrice,
    maxPrice,
    category
  })

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">
          {query 
            ? `No products found matching "${query}"` 
            : "No products found matching your filters"
          }
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {products.map((product) => (
        <div key={product.id} className="group">
          <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
            />
          </div>
          <div className="mt-2">
            <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
            <p className="text-sm text-gray-500">{product.category}</p>
            <p className="text-sm font-medium text-gray-900">₵{product.price_per_unit.toFixed(2)}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || ''
  const minPrice = searchParams.minPrice ? Number(searchParams.minPrice) : undefined
  const maxPrice = searchParams.maxPrice ? Number(searchParams.maxPrice) : undefined
  const category = searchParams.category

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header with search results text and price filter */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">
          {query ? `Search results for "${query}"` : 'All Products'}
        </h1>
        <div className="w-48">
          <PriceRangeFilter />
        </div>
      </div>

      {/* Main content */}
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <LoadingSpinner size="md" className="text-emerald-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading products...</p>
          </div>
        </div>
      }>
        <SearchResults 
          query={query} 
          minPrice={minPrice}
          maxPrice={maxPrice}
          category={category}
        />
      </Suspense>
    </div>
  )
} 