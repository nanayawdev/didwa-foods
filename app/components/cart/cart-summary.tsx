'use client'

import { Button } from '@/app/components/ui/button'

interface CartSummaryProps {
  subtotal: number
}

export function CartSummary({ subtotal }: CartSummaryProps) {
  const deliveryFee = 10 // Fixed delivery fee
  const total = subtotal + deliveryFee

  const handleCheckout = () => {
    // TODO: Implement checkout flow
    console.log('Proceeding to checkout...')
  }

  return (
    <div className="bg-white rounded-lg border p-6">
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
      
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>₵{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Delivery Fee</span>
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
        onClick={handleCheckout}
        className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700"
      >
        Proceed to Checkout
      </Button>
    </div>
  )
} 