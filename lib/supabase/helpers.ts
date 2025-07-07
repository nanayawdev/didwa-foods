import { Database } from './types'
import { createClient } from './client'

type Product = Database['public']['Tables']['products']['Row']
type Brand = Database['public']['Tables']['brands']['Row']
type ProductBrand = Database['public']['Tables']['product_brands']['Row']
type Order = Database['public']['Tables']['orders']['Row']
type ShoppingRequest = Database['public']['Tables']['shopping_requests']['Row']

// Storage helpers
export async function uploadProductImage(file: File) {
  const supabase = createClient()
  const fileExt = file.name.split('.').pop()
  const fileName = `${Math.random()}.${fileExt}`
  const filePath = `${fileName}`

  const { data, error } = await supabase.storage
    .from('product-images')
    .upload(filePath, file)

  if (error) throw error

  const { data: { publicUrl } } = supabase.storage
    .from('product-images')
    .getPublicUrl(filePath)

  return publicUrl
}

export async function uploadBrandLogo(file: File) {
  const supabase = createClient()
  const fileExt = file.name.split('.').pop()
  const fileName = `${Math.random()}.${fileExt}`
  const filePath = `${fileName}`

  const { data, error } = await supabase.storage
    .from('brand-logos')
    .upload(filePath, file)

  if (error) throw error

  const { data: { publicUrl } } = supabase.storage
    .from('brand-logos')
    .getPublicUrl(filePath)

  return publicUrl
}

// Brand helpers
export async function getBrands() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('brands')
    .select('*')
    .eq('is_active', true)
    .order('name')

  if (error) throw error
  return data
}

export async function getBrand(id: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('brands')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

// Product helpers
export async function getProducts(category?: string) {
  const supabase = createClient()
  const query = supabase
    .from('products')
    .select(`
      *,
      product_brands!left (
        id,
        price_per_unit,
        is_default,
        brands (
          id,
          name,
          location,
          logo_url
        )
      )
    `)
    .eq('is_active', true)

  if (category) {
    query.eq('category', category)
  }

  const { data, error } = await query
  if (error) throw error
  return data as (Product & {
    product_brands: (ProductBrand & {
      brands: Brand
    })[]
  })[]
}

export async function getProduct(id: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      product_brands (
        id,
        price_per_unit,
        is_default,
        brands (
          id,
          name,
          location,
          logo_url
        )
      )
    `)
    .eq('id', id)
    .single()

  if (error) throw error
  return data as (Product & {
    product_brands: (ProductBrand & {
      brands: Brand
    })[]
  })
}

export async function searchProducts(query: string, filters?: { 
  minPrice?: number;
  maxPrice?: number;
  category?: string;
  brandId?: string;
}) {
  const supabase = createClient()
  let queryBuilder = supabase
    .from('products')
    .select(`
      *,
      product_brands!left (
        id,
        price_per_unit,
        is_default,
        brands (
          id,
          name,
          location,
          logo_url
        )
      )
    `)
    .eq('is_active', true)

  // Apply search query if provided
  if (query) {
    queryBuilder = queryBuilder.or(`name.ilike.%${query}%, description.ilike.%${query}%`)
  }

  // Apply price range filters if provided
  if (filters?.minPrice !== undefined) {
    queryBuilder = queryBuilder.gte('price_per_unit::numeric', filters.minPrice)
  }
  if (filters?.maxPrice !== undefined) {
    queryBuilder = queryBuilder.lte('price_per_unit::numeric', filters.maxPrice)
  }

  // Apply category filter if provided
  if (filters?.category) {
    queryBuilder = queryBuilder.eq('category', filters.category)
  }

  // Apply brand filter if provided
  if (filters?.brandId) {
    queryBuilder = queryBuilder.contains('product_brands', [{ brand_id: filters.brandId }])
  }

  const { data, error } = await queryBuilder.order('price_per_unit')

  if (error) throw error
  return data as (Product & {
    product_brands: (ProductBrand & {
      brands: Brand
    })[]
  })[]
}

// Order helpers
export async function createOrder(order: Database['public']['Tables']['orders']['Insert']) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('orders')
    .insert(order)
    .select()
    .single()

  if (error) throw error
  return data as Order
}

export async function getOrder(id: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data as Order
}

export async function updateOrderStatus(
  id: string,
  status: Order['delivery_status']
) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('orders')
    .update({ delivery_status: status })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as Order
}

// Shopping request helpers
export async function createShoppingRequest(
  request: Database['public']['Tables']['shopping_requests']['Insert']
) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('shopping_requests')
    .insert(request)
    .select()
    .single()

  if (error) throw error
  return data as ShoppingRequest
}

export async function getShoppingRequest(id: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('shopping_requests')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data as ShoppingRequest
}

export async function updateShoppingRequestStatus(
  id: string,
  status: ShoppingRequest['delivery_status']
) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('shopping_requests')
    .update({ delivery_status: status })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as ShoppingRequest
}

// Delivery code verification
export async function verifyDeliveryCode(
  identifier: string,
  code: string
): Promise<Order | ShoppingRequest | null> {
  const supabase = createClient()

  // Check orders first
  const { data: order } = await supabase
    .from('orders')
    .select('*')
    .or(`phone.eq.${identifier},id.eq.${identifier}`)
    .eq('delivery_code', code)
    .single()

  if (order) return order as Order

  // Check shopping requests
  const { data: request } = await supabase
    .from('shopping_requests')
    .select('*')
    .or(`phone.eq.${identifier},id.eq.${identifier}`)
    .eq('delivery_code', code)
    .single()

  if (request) return request as ShoppingRequest

  return null
} 