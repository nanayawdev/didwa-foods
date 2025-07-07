export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      variations: {
        Row: {
          id: string
          name: string
          type: string
          unit: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          name: string
          type: string
          unit?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          type?: string
          unit?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      brands: {
        Row: {
          id: string
          name: string
          location: string
          description: string | null
          logo_url: string | null
          is_active: boolean
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          name: string
          location: string
          description?: string | null
          logo_url?: string | null
          is_active?: boolean
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          location?: string
          description?: string | null
          logo_url?: string | null
          is_active?: boolean
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      product_brands: {
        Row: {
          id: string
          product_id: string
          brand_id: string
          variation_id: string | null
          price_per_unit: number
          stock: number
          is_default: boolean
          created_at: string | null
        }
        Insert: {
          id?: string
          product_id: string
          brand_id: string
          variation_id?: string | null
          price_per_unit: number
          stock?: number
          is_default?: boolean
          created_at?: string | null
        }
        Update: {
          id?: string
          product_id?: string
          brand_id?: string
          variation_id?: string | null
          price_per_unit?: number
          stock?: number
          is_default?: boolean
          created_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_brands_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_brands_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brands"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_brands_variation_id_fkey"
            columns: ["variation_id"]
            isOneToOne: false
            referencedRelation: "variations"
            referencedColumns: ["id"]
          }
        ]
      }
      orders: {
        Row: {
          address: string
          cart_items: Json
          created_at: string | null
          delivery_code: string | null
          delivery_status: string
          delivery_type: string
          id: string
          name: string
          payment_status: string
          phone: string
          total_amount: number
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          address: string
          cart_items: Json
          created_at?: string | null
          delivery_code?: string | null
          delivery_status?: string
          delivery_type: string
          id?: string
          name: string
          payment_status?: string
          phone: string
          total_amount: number
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          address?: string
          cart_items?: Json
          created_at?: string | null
          delivery_code?: string | null
          delivery_status?: string
          delivery_type?: string
          id?: string
          name?: string
          payment_status?: string
          phone?: string
          total_amount?: number
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      products: {
        Row: {
          category: string
          created_at: string | null
          description: string | null
          id: string
          image_url: string
          is_active: boolean
          name: string
          price_per_unit: number
          stock: number
          updated_at: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          description?: string | null
          id?: string
          image_url: string
          is_active?: boolean
          name: string
          price_per_unit: number
          stock?: number
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string
          is_active?: boolean
          name?: string
          price_per_unit?: number
          stock?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      shopping_requests: {
        Row: {
          amount: number | null
          created_at: string | null
          delivery_area: string
          delivery_code: string | null
          delivery_status: string
          delivery_type: string
          id: string
          image_url: string | null
          list_text: string
          name: string
          payment_status: string
          phone: string
          updated_at: string | null
        }
        Insert: {
          amount?: number | null
          created_at?: string | null
          delivery_area: string
          delivery_code?: string | null
          delivery_status?: string
          delivery_type?: string
          id?: string
          image_url?: string | null
          list_text: string
          name: string
          payment_status?: string
          phone: string
          updated_at?: string | null
        }
        Update: {
          amount?: number | null
          created_at?: string | null
          delivery_area?: string
          delivery_code?: string | null
          delivery_status?: string
          delivery_type?: string
          id?: string
          image_url?: string | null
          list_text?: string
          name?: string
          payment_status?: string
          phone?: string
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
} 