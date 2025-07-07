import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Shopping Cart - Didwa Foods",
  description: "Review and checkout your shopping cart",
}

export default function CartPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Cart items will be added here */}
        </div>
        <div className="lg:col-span-1">
          {/* Cart summary and checkout button will be added here */}
        </div>
      </div>
    </main>
  )
} 