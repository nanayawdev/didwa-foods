import Image from "next/image"
import { Button } from "../ui/button"

interface ProductCardProps {
  id: string
  name: string
  price: number
  image: string
  description: string
  category: string
  stock: number
  onAddToCart: () => void
}

export function ProductCard({
  name,
  price,
  image,
  description,
  stock,
  onAddToCart,
}: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="relative h-48 w-full">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-gray-600 text-sm mt-1 line-clamp-2">{description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-bold">₵{price.toFixed(2)}</span>
          <span className={`text-sm ${stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {stock > 0 ? `${stock} in stock` : 'Out of stock'}
          </span>
        </div>
        <Button
          onClick={onAddToCart}
          disabled={stock === 0}
          className="w-full mt-4"
        >
          Add to Cart
        </Button>
      </div>
    </div>
  )
} 