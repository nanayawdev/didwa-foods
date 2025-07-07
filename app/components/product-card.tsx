"use client"

import Image from 'next/image'
import { useState } from 'react'
import { Button } from '@/app/components/ui/button'
import { Database } from '@/lib/supabase/types'
import { ProductModal } from './product-modal'

type Product = Database['public']['Tables']['products']['Row'] & {
  product_brands: (Database['public']['Tables']['product_brands']['Row'] & {
    brands: Database['public']['Tables']['brands']['Row']
  })[]
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const defaultBrand = product.product_brands?.[0]

  return (
    <>
      <div className="group relative flex flex-col overflow-hidden rounded-lg border bg-white">
        <div className="relative h-[200px] sm:h-[300px]">
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
          />
        </div>
        <div className="flex flex-1 flex-col space-y-2 p-4">
          <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
          <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
          <div className="flex flex-1 flex-col justify-end">
            <p className="text-base font-medium text-gray-900">
              ₵{(defaultBrand?.price_per_unit || product.price_per_unit).toFixed(2)}
            </p>
            <Button
              onClick={() => setIsModalOpen(true)}
              className="mt-4 bg-emerald-600 hover:bg-emerald-700"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>

      <ProductModal
        product={product}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
} 