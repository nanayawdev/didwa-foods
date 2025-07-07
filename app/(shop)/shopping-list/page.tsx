import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Custom Shopping List - Didwa Foods",
  description: "Create a custom shopping list for items not on our website",
}

export default function ShoppingListPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Custom Shopping List</h1>
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          {/* Shopping list form will be added here */}
        </div>
      </div>
    </main>
  )
} 