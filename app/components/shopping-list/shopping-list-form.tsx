import { useState } from "react"
import { Button } from "../ui/button"

interface ShoppingListFormProps {
  onSubmit: (data: {
    name: string
    phone: string
    deliveryArea: string
    listText: string
    image?: File
  }) => void
}

export function ShoppingListForm({ onSubmit }: ShoppingListFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    deliveryArea: "",
    listText: "",
  })
  const [image, setImage] = useState<File | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (image && image.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5MB")
      return
    }
    onSubmit({ ...formData, image: image || undefined })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
      </div>

      <div>
        <label htmlFor="area" className="block text-sm font-medium text-gray-700">
          Delivery Area
        </label>
        <input
          type="text"
          id="area"
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          value={formData.deliveryArea}
          onChange={(e) => setFormData({ ...formData, deliveryArea: e.target.value })}
        />
      </div>

      <div>
        <label htmlFor="list" className="block text-sm font-medium text-gray-700">
          Shopping List
        </label>
        <textarea
          id="list"
          required
          rows={4}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          value={formData.listText}
          onChange={(e) => setFormData({ ...formData, listText: e.target.value })}
          placeholder="Please list all items you want to purchase..."
        />
      </div>

      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
          Upload Image (optional, max 5MB)
        </label>
        <input
          type="file"
          id="image"
          accept="image/*"
          className="mt-1 block w-full"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
        />
      </div>

      <Button type="submit" className="w-full">
        Submit List
      </Button>
    </form>
  )
} 