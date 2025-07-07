import { Button } from "../ui/button"

interface CartSummaryProps {
  subtotal: number
  deliveryFee: number
  onCheckout: () => void
}

export function CartSummary({
  subtotal,
  deliveryFee,
  onCheckout,
}: CartSummaryProps) {
  const total = subtotal + deliveryFee

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span>₵{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Delivery Fee</span>
          <span>₵{deliveryFee.toFixed(2)}</span>
        </div>
        <div className="border-t pt-3">
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>₵{total.toFixed(2)}</span>
          </div>
        </div>
      </div>
      <Button
        onClick={onCheckout}
        className="w-full mt-6"
        disabled={subtotal === 0}
      >
        Proceed to Checkout
      </Button>
    </div>
  )
} 