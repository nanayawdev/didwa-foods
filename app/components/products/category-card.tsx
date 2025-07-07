import Image from "next/image"
import Link from "next/link"

interface CategoryCardProps {
  name: string
  image: string
  productCount: number
}

export function CategoryCard({ name, image, productCount }: CategoryCardProps) {
  return (
    <Link 
      href={`/products/${name.toLowerCase()}`}
      className="group block bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="relative h-48 w-full">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold capitalize">{name}</h3>
        <p className="text-gray-600 mt-1">
          {productCount} {productCount === 1 ? 'product' : 'products'}
        </p>
      </div>
    </Link>
  )
} 