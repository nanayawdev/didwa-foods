'use client'

import { useEffect, useState } from 'react'
import { CartItem } from './cart-item'
import { CartSummary } from './cart-summary'
import { EmptyCart } from '../ui/empty-cart'
import { useToast } from '../ui/use-toast'
import { Button } from '../ui/button'
import { Trash2 } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/components/ui/alert-dialog"

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

    // Add event listener for storage change
    const handleStorageChange = () => {
      loadCartItems()
    }

    loadCartItems()
    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  const handleUpdateQuantity = (id: string, quantity: number) => {
    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity } : item
    )
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    setCartItems(updatedCart)
    window.dispatchEvent(new Event('storage'))
  }

  const handleRemoveItem = (id: string) => {
    const updatedCart = cartItems.filter(item => item.id !== id)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    setCartItems(updatedCart)
    window.dispatchEvent(new Event('storage'))
    
    toast({
      title: "Item removed",
      description: "Item has been removed from your cart",
    })
  }

  const handleClearCart = () => {
    localStorage.setItem('cart', '[]')
    setCartItems([])
    window.dispatchEvent(new Event('storage'))
    
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart",
    })
  }

  if (cartItems.length === 0) {
    return <EmptyCart />
  }

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="flex-1">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Cart Items</h2>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm" className="flex items-center gap-2">
                <Trash2 size={16} />
                Clear Cart
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Clear Cart</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to clear your cart? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleClearCart} className="bg-destructive hover:bg-destructive/90">
                  Clear Cart
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <div className="space-y-4">
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              {...item}
              onUpdateQuantity={handleUpdateQuantity}
              onRemove={handleRemoveItem}
            />
          ))}
        </div>
      </div>
      <div className="lg:w-80">
        <CartSummary subtotal={subtotal} />
      </div>
    </div>
  )
} 