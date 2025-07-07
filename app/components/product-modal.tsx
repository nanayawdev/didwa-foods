'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Minus, Plus, X } from 'lucide-react'
import { 
  Dialog, 
  DialogContent, 
  DialogOverlay,
  DialogHeader,
  DialogTitle 
} from '@/app/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select"
import { Button } from '@/app/components/ui/button'
import { useToast } from '@/app/components/ui/use-toast'
import { Database } from '@/lib/supabase/types'

type Product = Database['public']['Tables']['products']['Row'] & {
  product_brands: (ProductBrand & {
    brands: Brand
    variations: Variation
  })[]
}

type Brand = Database['public']['Tables']['brands']['Row']
type ProductBrand = Database['public']['Tables']['product_brands']['Row']
type Variation = Database['public']['Tables']['variations']['Row']

interface ProductModalProps {
  product: Product
  isOpen: boolean
  onClose: () => void
}

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1)
  const [selectedBrandId, setSelectedBrandId] = useState('')
  const [selectedVariationId, setSelectedVariationId] = useState('')
  const { toast } = useToast()

  // Set initial brand and variation when modal opens
  useEffect(() => {
    if (isOpen && product.product_brands?.length > 0) {
      const defaultBrand = product.product_brands[0]
      setSelectedBrandId(defaultBrand.brands.id)
      if (defaultBrand.variations) {
        setSelectedVariationId(defaultBrand.variations.id)
      }
      setQuantity(1)
    }
  }, [isOpen, product])

  const selectedProductBrand = product.product_brands?.find(
    pb => pb.brands.id === selectedBrandId && 
    (!pb.variations || pb.variations.id === selectedVariationId)
  )

  const handleAddToCart = () => {
    if (!selectedProductBrand) return

    const cartItem = {
      id: `${product.id}-${selectedBrandId}-${selectedVariationId}`,
      productId: product.id,
      name: product.name,
      brandId: selectedProductBrand.brands.id,
      brandName: selectedProductBrand.brands.name,
      variationId: selectedProductBrand.variations?.id,
      variationName: selectedProductBrand.variations?.name,
      price: selectedProductBrand.price_per_unit,
      quantity,
      image: product.image_url,
    }

    // Get existing cart
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]')
    
    // Check if item already exists
    const existingItemIndex = existingCart.findIndex(
      (item: any) => 
        item.productId === cartItem.productId && 
        item.brandId === cartItem.brandId &&
        item.variationId === cartItem.variationId
    )

    if (existingItemIndex > -1) {
      existingCart[existingItemIndex].quantity += quantity
    } else {
      existingCart.push(cartItem)
    }

    localStorage.setItem('cart', JSON.stringify(existingCart))
    
    // Dispatch storage event for other components to update
    window.dispatchEvent(new Event('storage'))

    toast({
      title: "Added to cart",
      description: `${quantity}x ${product.name} (${selectedProductBrand.brands.name}${selectedProductBrand.variations ? `, ${selectedProductBrand.variations.name}` : ''})`,
    })

    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="bg-background/0 backdrop-blur-[2px]" />
      <DialogContent className="sm:max-w-md p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle>{product.name}</DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        
        <div className="p-6 space-y-6">
          {/* Product Image */}
          <div className="aspect-square relative">
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className="object-cover rounded-lg"
            />
          </div>

          {/* Brand Selection */}
          {product.product_brands && product.product_brands.length > 0 && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Select Brand
              </label>
              <Select
                value={selectedBrandId}
                onValueChange={(value) => {
                  setSelectedBrandId(value)
                  // Reset variation when brand changes
                  const newBrand = product.product_brands.find(pb => pb.brands.id === value)
                  if (newBrand?.variations) {
                    setSelectedVariationId(newBrand.variations.id)
                  } else {
                    setSelectedVariationId('')
                  }
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a brand" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from(new Set(product.product_brands.map(pb => pb.brands.id))).map(brandId => {
                    const brand = product.product_brands.find(pb => pb.brands.id === brandId)?.brands
                    if (!brand) return null
                    return (
                      <SelectItem key={brand.id} value={brand.id}>
                        {brand.name}
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Variation Selection */}
          {selectedBrandId && product.product_brands.some(pb => pb.brands.id === selectedBrandId && pb.variations) && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Select Size/Weight
              </label>
              <Select
                value={selectedVariationId}
                onValueChange={setSelectedVariationId}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a size/weight" />
                </SelectTrigger>
                <SelectContent>
                  {product.product_brands
                    .filter(pb => pb.brands.id === selectedBrandId && pb.variations)
                    .map(pb => (
                      <SelectItem key={pb.variations.id} value={pb.variations.id}>
                        {pb.variations.name} - ₵{pb.price_per_unit.toFixed(2)}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Quantity Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Quantity
            </label>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="h-8 w-8"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
                className="h-8 w-8"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Price and Add to Cart */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Price:</span>
              <span className="text-lg font-semibold">
                ₵{((selectedProductBrand?.price_per_unit || 0) * quantity).toFixed(2)}
              </span>
            </div>
            
            <Button 
              className="w-full" 
              onClick={handleAddToCart}
              disabled={!selectedProductBrand}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 