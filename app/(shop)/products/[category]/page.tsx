import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Products - Didwa Foods",
  description: "Browse our fresh produce by category",
}

interface CategoryPageProps {
  params: {
    category: string
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 capitalize">{params.category}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Product cards will be added here */}
      </div>
    </main>
  )
} 