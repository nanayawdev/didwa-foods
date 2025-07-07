import Image from "next/image"
import { Button } from "../ui/button"

interface CartItemProps {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  onUpdateQuantity: (id: string, quantity: number) => void
  onRemove: (id: string) => void
}

export function CartItem({
  id,
  name,
  price,
  quantity,
  image,
  onUpdateQuantity,
  onRemove,
}: CartItemProps) {
  return (
    <div className="flex items-center gap-4 py-4 border-b">
      <div className="relative h-24 w-24 flex-shrink-0">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover rounded-md"
        />
      </div>
      <div className="flex-grow">
        <h3 className="font-medium">{name}</h3>
        <p className="text-gray-600">₵{price.toFixed(2)}</p>
        <div className="mt-2 flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onUpdateQuantity(id, quantity - 1)}
            disabled={quantity <= 1}
          >
            -
          </Button>
          <span className="w-8 text-center">{quantity}</span>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onUpdateQuantity(id, quantity + 1)}
          >
            +
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end gap-2">
        <p className="font-medium">₵{(price * quantity).toFixed(2)}</p>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onRemove(id)}
          className="text-red-600 hover:text-red-700"
        >
          Remove
        </Button>
      </div>
    </div>
  )
} 