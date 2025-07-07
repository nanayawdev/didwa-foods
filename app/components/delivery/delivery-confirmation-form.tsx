import { useState } from "react"
import { Button } from "../ui/button"

interface DeliveryConfirmationFormProps {
  onConfirm: (data: { identifier: string; code: string }) => void
}

export function DeliveryConfirmationForm({ onConfirm }: DeliveryConfirmationFormProps) {
  const [formData, setFormData] = useState({
    identifier: "",
    code: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onConfirm(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="identifier" className="block text-sm font-medium text-gray-700">
          Phone Number or Order ID
        </label>
        <input
          type="text"
          id="identifier"
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          value={formData.identifier}
          onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
          placeholder="Enter phone number or order ID"
        />
      </div>

      <div>
        <label htmlFor="code" className="block text-sm font-medium text-gray-700">
          Delivery Code
        </label>
        <input
          type="text"
          id="code"
          required
          maxLength={6}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          value={formData.code}
          onChange={(e) => setFormData({ ...formData, code: e.target.value })}
          placeholder="Enter 6-digit delivery code"
        />
      </div>

      <Button type="submit" className="w-full">
        Confirm Delivery
      </Button>
    </form>
  )
} 