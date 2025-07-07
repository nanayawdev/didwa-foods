'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select'
import { getBrands } from '@/lib/supabase/helpers'
import { Database } from '@/lib/supabase/types'

type Brand = Database['public']['Tables']['brands']['Row']

export function BrandFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentBrandId = searchParams.get('brandId') || 'all'
  const [brands, setBrands] = useState<Brand[]>([])

  useEffect(() => {
    const loadBrands = async () => {
      try {
        const brandsData = await getBrands()
        setBrands(brandsData)
      } catch (error) {
        console.error('Error loading brands:', error)
      }
    }
    loadBrands()
  }, [])

  const handleBrandChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value === 'all') {
      params.delete('brandId')
    } else {
      params.set('brandId', value)
    }
    router.push(`/search?${params.toString()}`)
  }

  return (
    <Select value={currentBrandId} onValueChange={handleBrandChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select Brand" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Brands</SelectItem>
        {brands.map((brand) => (
          <SelectItem key={brand.id} value={brand.id}>
            <div className="flex items-center gap-2">
              <span>{brand.name}</span>
              <span className="text-muted-foreground">
                ({brand.location})
              </span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
} 