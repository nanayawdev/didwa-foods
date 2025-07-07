import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Didwa Foods - Fresh Produce Delivery",
  description: "Order fresh produce online from Didwa Foods - Ghana's premier fresh produce delivery service",
}

export default function HomePage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Fresh Produce Categories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Category cards will be added here */}
      </div>
    </main>
  )
} 