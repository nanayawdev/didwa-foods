'use client'

import Link from "next/link"
import { Menu, Search, ShoppingCart, HelpCircle, X } from "lucide-react"
import { useEffect, useState, useCallback } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import debounce from 'lodash/debounce'

export function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || "")
  const cartItemCount = 0 // TODO: Replace with actual cart count from state management

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      if (query.trim()) {
        router.push(`/search?q=${encodeURIComponent(query.trim())}`)
      } else if (pathname === '/search') {
        router.push('/products')
      }
    }, 300),
    [router, pathname]
  )

  // Handle input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value
    setSearchQuery(newQuery)
    debouncedSearch(newQuery)
  }

  // Handle clear search
  const handleClearSearch = () => {
    setSearchQuery('')
    if (pathname === '/search') {
      router.push('/products')
    }
  }

  // Clean up debounce on unmount
  useEffect(() => {
    return () => {
      debouncedSearch.cancel()
    }
  }, [debouncedSearch])

  return (
    <header className="bg-white border-b fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4 flex-1">
            {/* Logo */}
            <Link href="/" className="text-xl font-bold">
              DiFoods
            </Link>

            {/* Categories Menu */}
            <button className="flex items-center gap-2 text-gray-700 hover:text-gray-900">
              <Menu size={20} />
              <span className="hidden sm:inline font-medium">Categories</span>
            </button>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-auto">
              <div className="relative">
                <Search 
                  size={18} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="I want to shop for..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full py-2 pl-10 pr-10 bg-emerald-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                {searchQuery && (
                  <button
                    onClick={handleClearSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex items-center gap-2">
              {/* Cart */}
              <Link 
                href="/cart" 
                className="relative p-2 text-gray-700 hover:text-gray-900"
              >
                <ShoppingCart size={22} />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-blue-600 text-white text-xs rounded-full">
                    {cartItemCount}
                  </span>
                )}
              </Link>

              {/* Help Button */}
              <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
                <HelpCircle size={18} />
                <span className="hidden sm:inline">Help</span>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
} 