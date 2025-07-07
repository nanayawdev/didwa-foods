'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'
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
  product_brands: (Database['public']['Tables']['product_brands']['Row'] & {
    brands: Database['public']['Tables']['brands']['Row']
  })[]
}

interface ProductModalProps {
  product: Product
  isOpen: boolean
  onClose: () => void
}

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1)
  const [selectedBrandId, setSelectedBrandId] = useState(
    product.product_brands?.[0]?.brands.id || ''
  )
  const { toast } = useToast()

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

    // Close modal
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="bg-background/0 backdrop-blur-[2px]" />
      <DialogContent className="sm:max-w-md p-0">
        <DialogHeader className="sr-only">
          <DialogTitle>{product.name}</DialogTitle>
        </DialogHeader>
        
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute right-2 top-2 p-2 rounded-full bg-white/90 hover:bg-white z-10"
          >
            <X size={20} />
          </button>
          
          <div className="flex flex-col">
            <div className="relative h-64 w-full">
              <Image
                src={product.image_url}
                alt={product.name}
                fill
                className="object-cover rounded-t-lg"
              />
            </div>

            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-600 text-sm mb-4">{product.description}</p>

              {/* Brand Selection */}
              {product.product_brands && product.product_brands.length > 0 && (
                <div className="mb-6">
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Select Brand
                  </label>
                  <Select
                    value={selectedBrandId}
                    onValueChange={setSelectedBrandId}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a brand" />
                    </SelectTrigger>
                    <SelectContent>
                      {product.product_brands.map((pb) => (
                        <SelectItem key={pb.brands.id} value={pb.brands.id}>
                          {pb.brands.name} - ₵{pb.price_per_unit.toFixed(2)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="flex items-center justify-between mb-6">
                <span className="text-2xl font-bold">
                  ₵{(selectedBrand?.price_per_unit || product.price_per_unit).toFixed(2)}
                  <span className="text-sm text-gray-500 ml-1">per pack</span>
                </span>
                
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-50"
                  >
                    -
                  </button>
                  <span className="text-xl font-medium w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
              </div>

              <Button
                onClick={handleAddToCart}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-lg py-6"
              >
                Add {quantity} item{quantity !== 1 ? 's' : ''} to my order
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 