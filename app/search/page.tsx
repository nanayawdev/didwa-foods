import { Suspense } from 'react'
import { getProducts, searchProducts } from '@/lib/supabase/helpers'
import { SearchResults } from './search-results'

interface SearchPageProps {
  searchParams: { 
    query?: string
    category?: string
    minPrice?: string
    maxPrice?: string
    brandId?: string
  }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { query, category, minPrice, maxPrice, brandId } = searchParams
  
  const products = query 
    ? await searchProducts(query, {
        category,
        minPrice: minPrice ? parseFloat(minPrice) : undefined,
        maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
        brandId
      })
    : await getProducts(category)

  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 mt-16">
      <Suspense fallback={<div>Loading...</div>}>
        <SearchResults products={products} query={query} />
      </Suspense>
    </div>
  )
} 