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