import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'

export function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="mb-8 text-gray-400">
        <ShoppingCart size={96} strokeWidth={1.5} />
      </div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">
        Your cart is empty
      </h2>
      <p className="text-gray-500 text-center mb-8 max-w-md">
        Looks like you haven't added any items to your cart yet. Start shopping to fill it with fresh produce!
      </p>
      <Link
        href="/products"
        className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
      >
        Browse Products
      </Link>
    </div>
  )
} 