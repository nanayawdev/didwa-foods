import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin Dashboard - Didwa Foods",
  description: "Manage products, orders, and shopping lists",
}

export default function AdminDashboardPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Admin dashboard cards will be added here */}
      </div>
    </main>
  )
} 