'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select"

const PRICE_RANGES = [
  { label: 'All Prices', value: 'all' },
  { label: 'Under ₵5', min: 0, max: 5 },
  { label: '₵5 to ₵10', min: 5, max: 10 },
  { label: '₵10 to ₵20', min: 10, max: 20 },
  { label: '₵20 to ₵30', min: 20, max: 30 },
  { label: 'Over ₵30', min: 30, max: 999999 },
]

export function PriceRangeFilter() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  // Get current price range from URL
  const currentMinPrice = searchParams.get('minPrice')
  const currentMaxPrice = searchParams.get('maxPrice')
  
  // Find the current range value
  const getCurrentValue = () => {
    if (!currentMinPrice && !currentMaxPrice) return 'all'
    
    const range = PRICE_RANGES.find(
      range => range.min === Number(currentMinPrice) && range.max === Number(currentMaxPrice)
    )
    return range ? `${range.min}-${range.max}` : 'all'
  }

  const handlePriceRangeChange = (value: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()))
    
    if (value === 'all') {
      current.delete('minPrice')
      current.delete('maxPrice')
    } else {
      const [min, max] = value.split('-').map(Number)
      current.set('minPrice', min.toString())
      current.set('maxPrice', max.toString())
    }
    
    // Keep existing search query and other params
    const search = current.toString()
    const query = search ? `?${search}` : ''
    
    router.push(`${pathname}${query}`)
  }

  return (
    <div className="space-y-2">
      <h3 className="font-medium text-sm">Price Range</h3>
      <Select
        value={getCurrentValue()}
        onValueChange={handlePriceRangeChange}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select price range" />
        </SelectTrigger>
        <SelectContent>
          {PRICE_RANGES.map((range) => (
            <SelectItem 
              key={range.value === 'all' ? 'all' : `${range.min}-${range.max}`}
              value={range.value === 'all' ? 'all' : `${range.min}-${range.max}`}
            >
              {range.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
} 