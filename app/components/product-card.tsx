"use client"

import Image from 'next/image'
import { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { useToast } from '@/app/components/ui/use-toast'
import { Database } from '@/lib/supabase/types'

type Product = Database['public']['Tables']['products']['Row'] & {
  product_brands: (Database['public']['Tables']['product_brands']['Row'] & {
    brands: Database['public']['Tables']['brands']['Row']
  })[]
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { toast } = useToast()
  const [quantity, setQuantity] = useState(1)
  const [selectedBrandId, setSelectedBrandId] = useState(
    product.product_brands?.[0]?.brands.id || ''
  )

  const selectedBrand = product.product_brands?.find(
    pb => pb.brands.id === selectedBrandId
  )

  const handleAddToCart = () => {
    const cartItem = {
      id: `${product.id}-${selectedBrandId}`,
      productId: product.id,
      name: product.name,
      brandId: selectedBrandId,
      brandName: selectedBrand?.brands.name || 'Generic',
      price: selectedBrand?.price_per_unit || product.price_per_unit,
      quantity,
      image: product.image_url
    }

    // Get existing cart
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]')
    
    // Check if item already exists
    const existingItemIndex = existingCart.findIndex(
      (item: any) => item.id === cartItem.id
    )

    if (existingItemIndex > -1) {
      // Update quantity if item exists
      existingCart[existingItemIndex].quantity += quantity
    } else {
      // Add new item if it doesn't exist
      existingCart.push(cartItem)
    }

    // Save back to localStorage
    localStorage.setItem('cart', JSON.stringify(existingCart))

    // Dispatch storage event to notify header
    window.dispatchEvent(new Event('storage'))

    // Show success toast
    toast({
      title: "Added to cart",
      description: `${quantity} x ${product.name} (${selectedBrand?.brands.name || 'Generic'})`,
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="relative aspect-square mb-4">
        <Image
          src={product.image_url}
          alt={product.name}
          fill
          className="object-cover rounded-md"
        />
      </div>

      <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
      <p className="text-gray-600 text-sm mb-4">{product.description}</p>

      <div className="space-y-4">
        {product.product_brands && product.product_brands.length > 0 ? (
          <Select
            value={selectedBrandId}
            onValueChange={setSelectedBrandId}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select brand" />
            </SelectTrigger>
            <SelectContent>
              {product.product_brands.map((pb) => (
                <SelectItem key={pb.brands.id} value={pb.brands.id}>
                  {pb.brands.name} - ₵{pb.price_per_unit}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <p className="text-sm text-gray-500">Generic Product - ₵{product.price_per_unit}</p>
        )}

        <div className="flex items-center gap-2">
          <Input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            className="w-20"
          />
          <Button 
            onClick={handleAddToCart}
            className="flex-1 bg-emerald-600 hover:bg-emerald-700"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  )
} 