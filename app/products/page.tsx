"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/app/components/ui/button"
import { LoadingSpinner } from "@/app/components/ui/loading-spinner"
import { getProducts } from "@/lib/supabase/helpers"
import { useEffect } from "react"

const categories = [
  { id: "vegetables", name: "Vegetables", icon: "🥬" },
  { id: "fruits", name: "Fruits", icon: "🍎" },
  { id: "meat", name: "Meat", icon: "🥩" },
  { id: "fish", name: "Fish", icon: "🐟" },
  { id: "spices", name: "Spices", icon: "🌶️" }
]

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("vegetables")
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true)
        const data = await getProducts(selectedCategory)
        setProducts(data)
      } catch (error) {
        console.error("Error loading products:", error)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [selectedCategory])

  return (
    <main className="flex-1 min-h-[calc(100vh-4rem)]"> {/* Adjust 4rem based on your header height */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Categories */}
        <div className="flex overflow-x-auto gap-4 pb-6 mb-8 scrollbar-hide">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              className="min-w-fit"
              onClick={() => setSelectedCategory(category.id)}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <LoadingSpinner size="md" className="text-emerald-600 mx-auto mb-4" />
              <p className="text-gray-600">Loading products...</p>
            </div>
          </div>
        ) : products.length === 0 ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <p className="text-2xl font-semibold mb-2">No products found</p>
              <p className="text-gray-600">
                We couldn't find any products in this category.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg overflow-hidden border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative aspect-square">
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold">
                      ₵{product.price_per_unit.toFixed(2)}
                    </span>
                    <Button
                      onClick={() => {
                        // TODO: Add to cart functionality
                      }}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
} 