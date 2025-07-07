import { Metadata } from "next"
import { CartContent } from "@/app/components/cart/cart-content"

export const metadata: Metadata = {
  title: "Shopping Cart - Didwa Foods",
  description: "Review and checkout your shopping cart",
}

export default function CartPage() {
  return (
    <main className="container mx-auto px-4 py-8 mt-16">
      <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>
      <CartContent />
    </main>
  )
} 