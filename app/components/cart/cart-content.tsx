'use client'

import { useEffect, useState } from 'react'
import { CartItem } from './cart-item'
import { CartSummary } from './cart-summary'
import { EmptyCart } from '../ui/empty-cart'
import { useToast } from '../ui/use-toast'

interface CartItemType {
  id: string
  productId: string
  name: string
  brandId: string
  brandName: string
  price: number
  quantity: number
  image: string
}

export function CartContent() {
  const [cartItems, setCartItems] = useState<CartItemType[]>([])
  const { toast } = useToast()

  useEffect(() => {
    // Load cart items from localStorage
    const loadCartItems = () => {
      const savedCart = localStorage.getItem('cart')
      if (savedCart) {
        setCartItems(JSON.parse(savedCart))
      }
    }

    // Add event listener for storage changes
    window.addEventListener('storage', loadCartItems)
    
    // Initial load
    loadCartItems()

    return () => {
      window.removeEventListener('storage', loadCartItems)
    }
  }, [])

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return

    const updatedItems = cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    )
    
    setCartItems(updatedItems)
    localStorage.setItem('cart', JSON.stringify(updatedItems))
    window.dispatchEvent(new Event('storage'))

    toast({
      title: "Cart updated",
      description: "Item quantity has been updated",
    })
  }

  const removeItem = (id: string) => {
    const updatedItems = cartItems.filter(item => item.id !== id)
    setCartItems(updatedItems)
    localStorage.setItem('cart', JSON.stringify(updatedItems))
    window.dispatchEvent(new Event('storage'))

    toast({
      title: "Item removed",
      description: "Item has been removed from cart",
    })
  }

  const handleCheckout = () => {
    // TODO: Implement checkout flow
    console.log('Proceeding to checkout...')
  }

  if (cartItems.length === 0) {
    return <EmptyCart />
  }

  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  const deliveryFee = 10 // Fixed delivery fee for now

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-4">
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            {...item}
            onUpdateQuantity={updateQuantity}
            onRemove={removeItem}
          />
        ))}
      </div>
      <div className="lg:col-span-1">
        <CartSummary
          subtotal={subtotal}
          deliveryFee={deliveryFee}
          onCheckout={handleCheckout}
        />
      </div>
    </div>
  )
} 