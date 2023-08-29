export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      BrandProducts: {
        Row: {
          brandName: string | null
          created_at: string
          delete_at: string | null
          id: number
          tenantId: string | null
          update_at: string | null
        }
        Insert: {
          brandName?: string | null
          created_at?: string
          delete_at?: string | null
          id?: number
          tenantId?: string | null
          update_at?: string | null
        }
        Update: {
          brandName?: string | null
          created_at?: string
          delete_at?: string | null
          id?: number
          tenantId?: string | null
          update_at?: string | null
        }
        Relationships: []
      }
      Discounts: {
        Row: {
          amount: number | null
          created_at: string
          delete_at: string | null
          discountName: string | null
          end_time: string | null
          id: number
          outletId: string | null
          start_time: string | null
          status: boolean | null
          statusType: boolean | null
          tenantId: string | null
          update_at: string | null
        }
        Insert: {
          amount?: number | null
          created_at?: string
          delete_at?: string | null
          discountName?: string | null
          end_time?: string | null
          id?: number
          outletId?: string | null
          start_time?: string | null
          status?: boolean | null
          statusType?: boolean | null
          tenantId?: string | null
          update_at?: string | null
        }
        Update: {
          amount?: number | null
          created_at?: string
          delete_at?: string | null
          discountName?: string | null
          end_time?: string | null
          id?: number
          outletId?: string | null
          start_time?: string | null
          status?: boolean | null
          statusType?: boolean | null
          tenantId?: string | null
          update_at?: string | null
        }
        Relationships: []
      }
      EventCategory: {
        Row: {
          created_at: string
          id: number
          nameCategory: string | null
          status: boolean | null
          tenantId: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          nameCategory?: string | null
          status?: boolean | null
          tenantId?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          nameCategory?: string | null
          status?: boolean | null
          tenantId?: string | null
        }
        Relationships: []
      }
      EventType: {
        Row: {
          created_at: string
          delete_at: string | null
          nameType: string | null
          id: number
          status: boolean | null
          tenantId: string | null
          update_at: string | null
        }
        Insert: {
          created_at?: string
          delete_at?: string | null
          nameType?: string | null
          id?: number
          status?: boolean | null
          tenantId?: string | null
          update_at?: string | null
        }
        Update: {
          created_at?: string
          delete_at?: string | null
          nameType?: string | null
          id?: number
          status?: boolean | null
          tenantId?: string | null
          update_at?: string | null
        }
        Relationships: []
      }
      InventoryProducts: {
        Row: {
          created_at: string
          delete_at: string | null
          id: number
          inStock: number | null
          outStock: number | null
          productId: number | null
          status: boolean | null
          tenantId: string | null
          update_at: string | null
        }
        Insert: {
          created_at?: string
          delete_at?: string | null
          id?: number
          inStock?: number | null
          outStock?: number | null
          productId?: number | null
          status?: boolean | null
          tenantId?: string | null
          update_at?: string | null
        }
        Update: {
          created_at?: string
          delete_at?: string | null
          id?: number
          inStock?: number | null
          outStock?: number | null
          productId?: number | null
          status?: boolean | null
          tenantId?: string | null
          update_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "InventoryProducts_productId_fkey"
            columns: ["productId"]
            referencedRelation: "Products"
            referencedColumns: ["id"]
          }
        ]
      }
      ProductCategories: {
        Row: {
          categoryName: string | null
          created_at: string
          delete_at: string | null
          id: number
          status: boolean | null
          tenantId: string | null
          update_at: string | null
        }
        Insert: {
          categoryName?: string | null
          created_at?: string
          delete_at?: string | null
          id?: number
          status?: boolean | null
          tenantId?: string | null
          update_at?: string | null
        }
        Update: {
          categoryName?: string | null
          created_at?: string
          delete_at?: string | null
          id?: number
          status?: boolean | null
          tenantId?: string | null
          update_at?: string | null
        }
        Relationships: []
      }
      Products: {
        Row: {
          brandId: number | null
          categoryId: number | null
          created_at: string
          delete_at: string | null
          id: number
          productName: string | null
          tenantId: string | null
          update_at: string | null
        }
        Insert: {
          brandId?: number | null
          categoryId?: number | null
          created_at?: string
          delete_at?: string | null
          id?: number
          productName?: string | null
          tenantId?: string | null
          update_at?: string | null
        }
        Update: {
          brandId?: number | null
          categoryId?: number | null
          created_at?: string
          delete_at?: string | null
          id?: number
          productName?: string | null
          tenantId?: string | null
          update_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Products_brandId_fkey"
            columns: ["brandId"]
            referencedRelation: "BrandProducts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Products_categoryId_fkey"
            columns: ["categoryId"]
            referencedRelation: "ProductCategories"
            referencedColumns: ["id"]
          }
        ]
      }
      ProductSuppliers: {
        Row: {
          created_at: string
          delete_at: string | null
          id: number
          productId: number | null
          supplierId: number | null
          tenantId: string | null
          update_at: string | null
        }
        Insert: {
          created_at?: string
          delete_at?: string | null
          id?: number
          productId?: number | null
          supplierId?: number | null
          tenantId?: string | null
          update_at?: string | null
        }
        Update: {
          created_at?: string
          delete_at?: string | null
          id?: number
          productId?: number | null
          supplierId?: number | null
          tenantId?: string | null
          update_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ProductSuppliers_productId_fkey"
            columns: ["productId"]
            referencedRelation: "Products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ProductSuppliers_supplierId_fkey"
            columns: ["supplierId"]
            referencedRelation: "Suppliers"
            referencedColumns: ["id"]
          }
        ]
      }
      ProductUnits: {
        Row: {
          created_at: string
          delete_at: string | null
          id: number
          unitName: string | null
          unitSymbol: string | null
          update_at: string | null
        }
        Insert: {
          created_at?: string
          delete_at?: string | null
          id?: number
          unitName?: string | null
          unitSymbol?: string | null
          update_at?: string | null
        }
        Update: {
          created_at?: string
          delete_at?: string | null
          id?: number
          unitName?: string | null
          unitSymbol?: string | null
          update_at?: string | null
        }
        Relationships: []
      }
      Promos: {
        Row: {
          amount: number | null
          created_at: string
          delete_at: string | null
          end_time: string | null
          id: number
          outletId: string | null
          promoName: string | null
          promoType: boolean | null
          start_time: string | null
          status: boolean | null
          tenantId: string | null
          update_at: string | null
        }
        Insert: {
          amount?: number | null
          created_at?: string
          delete_at?: string | null
          end_time?: string | null
          id?: number
          outletId?: string | null
          promoName?: string | null
          promoType?: boolean | null
          start_time?: string | null
          status?: boolean | null
          tenantId?: string | null
          update_at?: string | null
        }
        Update: {
          amount?: number | null
          created_at?: string
          delete_at?: string | null
          end_time?: string | null
          id?: number
          outletId?: string | null
          promoName?: string | null
          promoType?: boolean | null
          start_time?: string | null
          status?: boolean | null
          tenantId?: string | null
          update_at?: string | null
        }
        Relationships: []
      }
      SalesTypes: {
        Row: {
          created_at: string
          delete_at: string | null
          id: number
          outletId: string | null
          salesTypeName: string | null
          status: boolean | null
          tenantId: string | null
          update_at: string | null
        }
        Insert: {
          created_at?: string
          delete_at?: string | null
          id?: number
          outletId?: string | null
          salesTypeName?: string | null
          status?: boolean | null
          tenantId?: string | null
          update_at?: string | null
        }
        Update: {
          created_at?: string
          delete_at?: string | null
          id?: number
          outletId?: string | null
          salesTypeName?: string | null
          status?: boolean | null
          tenantId?: string | null
          update_at?: string | null
        }
        Relationships: []
      }
      Services: {
        Row: {
          amount: number | null
          created_at: string
          delete_at: string | null
          id: number
          outletId: string | null
          servicesName: string | null
          status: boolean | null
          tenantId: string | null
          update_at: string | null
        }
        Insert: {
          amount?: number | null
          created_at?: string
          delete_at?: string | null
          id?: number
          outletId?: string | null
          servicesName?: string | null
          status?: boolean | null
          tenantId?: string | null
          update_at?: string | null
        }
        Update: {
          amount?: number | null
          created_at?: string
          delete_at?: string | null
          id?: number
          outletId?: string | null
          servicesName?: string | null
          status?: boolean | null
          tenantId?: string | null
          update_at?: string | null
        }
        Relationships: []
      }
      Suppliers: {
        Row: {
          created_at: string
          delete_at: string | null
          id: number
          status: boolean | null
          supplierAddress: string | null
          supplierEmail: string | null
          supplierName: string | null
          supplierPhone: string | null
          tenantId: string | null
          update_at: string | null
        }
        Insert: {
          created_at?: string
          delete_at?: string | null
          id?: number
          status?: boolean | null
          supplierAddress?: string | null
          supplierEmail?: string | null
          supplierName?: string | null
          supplierPhone?: string | null
          tenantId?: string | null
          update_at?: string | null
        }
        Update: {
          created_at?: string
          delete_at?: string | null
          id?: number
          status?: boolean | null
          supplierAddress?: string | null
          supplierEmail?: string | null
          supplierName?: string | null
          supplierPhone?: string | null
          tenantId?: string | null
          update_at?: string | null
        }
        Relationships: []
      }
      Taxes: {
        Row: {
          created_at: string
          delete_at: string | null
          id: number
          outletId: string | null
          status: boolean | null
          taxAmount: number | null
          taxName: string | null
          tenantId: string | null
          update_at: string | null
        }
        Insert: {
          created_at?: string
          delete_at?: string | null
          id?: number
          outletId?: string | null
          status?: boolean | null
          taxAmount?: number | null
          taxName?: string | null
          tenantId?: string | null
          update_at?: string | null
        }
        Update: {
          created_at?: string
          delete_at?: string | null
          id?: number
          outletId?: string | null
          status?: boolean | null
          taxAmount?: number | null
          taxName?: string | null
          tenantId?: string | null
          update_at?: string | null
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
