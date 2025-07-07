"use client"

import { ProductCard } from '@/app/components/product-card'
import { CategoryFilter } from '@/app/components/filters/category-filter'
import { BrandFilter } from '@/app/components/filters/brand-filter'
import { Database } from '@/lib/supabase/types'

type Product = Database['public']['Tables']['products']['Row'] & {
  product_brands: (Database['public']['Tables']['product_brands']['Row'] & {
    brands: Database['public']['Tables']['brands']['Row']
  })[]
}

interface SearchResultsProps {
  products: Product[]
  query?: string
}

export function SearchResults({ products, query }: SearchResultsProps) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            {query ? `Search results for "${query}"` : 'All Products'}
          </h1>
          <p className="text-gray-600">
            {products.length} {products.length === 1 ? 'product' : 'products'} found
          </p>
        </div>
        <div className="flex items-center gap-4">
          <CategoryFilter />
          <BrandFilter />
        </div>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2">No products found</h2>
          <p className="text-gray-600">
            Try adjusting your search or filters to find what you're looking for.
          </p>
        </div>
      )}
    </div>
  )
} 