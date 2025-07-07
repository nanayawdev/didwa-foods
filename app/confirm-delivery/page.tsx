import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Confirm Delivery - Didwa Foods",
  description: "Confirm delivery with order ID and delivery code",
}

export default function ConfirmDeliveryPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Confirm Delivery</h1>
      <div className="max-w-md mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          {/* Delivery confirmation form will be added here */}
        </div>
      </div>
    </main>
  )
} 