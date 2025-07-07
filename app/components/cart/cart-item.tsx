'use client'

import Image from "next/image"
import { Button } from "../ui/button"
import { Minus, Plus, Trash2 } from "lucide-react"

interface CartItemProps {
  id: string
  name: string
  brandName: string
  price: number
  quantity: number
  image: string
  onUpdateQuantity: (id: string, quantity: number) => void
  onRemove: (id: string) => void
}

export function CartItem({
  id,
  name,
  brandName,
  price,
  quantity,
  image,
  onUpdateQuantity,
  onRemove,
}: CartItemProps) {
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
      <div className="relative h-24 w-24 flex-shrink-0">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover rounded-md"
        />
      </div>
      <div className="flex-grow">
        <h3 className="font-medium text-lg">{name}</h3>
        <p className="text-gray-600 text-sm">{brandName}</p>
        <p className="text-emerald-600 font-medium mt-1">₵{price.toFixed(2)}</p>
      </div>
      <div className="flex flex-col items-end gap-3">
        <div className="flex items-center gap-3">
          <Button
            size="icon"
            variant="outline"
            onClick={() => onUpdateQuantity(id, quantity - 1)}
            disabled={quantity <= 1}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-8 text-center font-medium">{quantity}</span>
          <Button
            size="icon"
            variant="outline"
            onClick={() => onUpdateQuantity(id, quantity + 1)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-4">
          <p className="font-medium">₵{(price * quantity).toFixed(2)}</p>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onRemove(id)}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
} 