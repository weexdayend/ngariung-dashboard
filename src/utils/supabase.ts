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
          status: boolean | null
          tenantId: string | null
          update_at: string | null
        }
        Insert: {
          brandName?: string | null
          created_at?: string
          delete_at?: string | null
          id?: number
          status?: boolean | null
          tenantId?: string | null
          update_at?: string | null
        }
        Update: {
          brandName?: string | null
          created_at?: string
          delete_at?: string | null
          id?: number
          status?: boolean | null
          tenantId?: string | null
          update_at?: string | null
        }
        Relationships: []
      }
      Business: {
        Row: {
          created_at: string
          email: string | null
          id: string
          name: string | null
          phone: string | null
          status: boolean | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: string
          name?: string | null
          phone?: string | null
          status?: boolean | null
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          name?: string | null
          phone?: string | null
          status?: boolean | null
        }
        Relationships: []
      }
      Customers: {
        Row: {
          created_at: string
          email: string | null
          id: string
          name: string | null
          phone: string | null
          status: boolean | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: string
          name?: string | null
          phone?: string | null
          status?: boolean | null
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          name?: string | null
          phone?: string | null
          status?: boolean | null
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
      Employee: {
        Row: {
          created_at: string
          email: string | null
          id: number
          name: string | null
          outletId: number | null
          phone: string | null
          role: Json | null
          userId: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: number
          name?: string | null
          outletId?: number | null
          phone?: string | null
          role?: Json | null
          userId?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: number
          name?: string | null
          outletId?: number | null
          phone?: string | null
          role?: Json | null
          userId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Employee_outletId_fkey"
            columns: ["outletId"]
            referencedRelation: "Outlet"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Employee_userId_fkey"
            columns: ["userId"]
            referencedRelation: "Users"
            referencedColumns: ["id"]
          }
        ]
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
          id: number
          nameType: string | null
          status: boolean | null
          tenantId: string | null
          update_at: string | null
        }
        Insert: {
          created_at?: string
          delete_at?: string | null
          id?: number
          nameType?: string | null
          status?: boolean | null
          tenantId?: string | null
          update_at?: string | null
        }
        Update: {
          created_at?: string
          delete_at?: string | null
          id?: number
          nameType?: string | null
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
      Membership: {
        Row: {
          created_at: string
          customersId: string | null
          expired_at: string | null
          id: string
          started_at: string | null
          status: boolean | null
          tenantId: string | null
        }
        Insert: {
          created_at?: string
          customersId?: string | null
          expired_at?: string | null
          id?: string
          started_at?: string | null
          status?: boolean | null
          tenantId?: string | null
        }
        Update: {
          created_at?: string
          customersId?: string | null
          expired_at?: string | null
          id?: string
          started_at?: string | null
          status?: boolean | null
          tenantId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Membership_customersId_fkey"
            columns: ["customersId"]
            referencedRelation: "Customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Membership_tenantId_fkey"
            columns: ["tenantId"]
            referencedRelation: "Business"
            referencedColumns: ["id"]
          }
        ]
      }
      MembershipDetail: {
        Row: {
          created_at: string
          id: number
          level: string | null
          memberId: string | null
          name: string | null
          prices: string | null
          pulse: string | null
          quota: string | null
          status: boolean | null
        }
        Insert: {
          created_at?: string
          id?: number
          level?: string | null
          memberId?: string | null
          name?: string | null
          prices?: string | null
          pulse?: string | null
          quota?: string | null
          status?: boolean | null
        }
        Update: {
          created_at?: string
          id?: number
          level?: string | null
          memberId?: string | null
          name?: string | null
          prices?: string | null
          pulse?: string | null
          quota?: string | null
          status?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "MembershipDetail_memberId_fkey"
            columns: ["memberId"]
            referencedRelation: "Membership"
            referencedColumns: ["id"]
          }
        ]
      }
      Outlet: {
        Row: {
          address: string | null
          city: string | null
          created_at: string
          id: number
          line: Json | null
          name: string | null
          postal: string | null
          province: string | null
          status: boolean | null
          tenantId: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          created_at?: string
          id?: number
          line?: Json | null
          name?: string | null
          postal?: string | null
          province?: string | null
          status?: boolean | null
          tenantId?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          created_at?: string
          id?: number
          line?: Json | null
          name?: string | null
          postal?: string | null
          province?: string | null
          status?: boolean | null
          tenantId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Outlet_tenantId_fkey"
            columns: ["tenantId"]
            referencedRelation: "Business"
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
          filePhoto: string | null
          id: number
          prices: number | null
          productName: string | null
          sotrage: string | null
          status: boolean | null
          tenantId: string | null
          update_at: string | null
        }
        Insert: {
          brandId?: number | null
          categoryId?: number | null
          created_at?: string
          delete_at?: string | null
          filePhoto?: string | null
          id?: number
          prices?: number | null
          productName?: string | null
          sotrage?: string | null
          status?: boolean | null
          tenantId?: string | null
          update_at?: string | null
        }
        Update: {
          brandId?: number | null
          categoryId?: number | null
          created_at?: string
          delete_at?: string | null
          filePhoto?: string | null
          id?: number
          prices?: number | null
          productName?: string | null
          sotrage?: string | null
          status?: boolean | null
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
          },
          {
            foreignKeyName: "Products_sotrage_fkey"
            columns: ["sotrage"]
            referencedRelation: "buckets"
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
      Room: {
        Row: {
          capacity: string | null
          created_at: string
          id: number
          name: string | null
          outletId: number | null
          size: string | null
          status: boolean | null
          tenantId: string | null
          vip: boolean | null
        }
        Insert: {
          capacity?: string | null
          created_at?: string
          id?: number
          name?: string | null
          outletId?: number | null
          size?: string | null
          status?: boolean | null
          tenantId?: string | null
          vip?: boolean | null
        }
        Update: {
          capacity?: string | null
          created_at?: string
          id?: number
          name?: string | null
          outletId?: number | null
          size?: string | null
          status?: boolean | null
          tenantId?: string | null
          vip?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "Room_outletId_fkey"
            columns: ["outletId"]
            referencedRelation: "Outlet"
            referencedColumns: ["id"]
          }
        ]
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
      Schedule: {
        Row: {
          created_at: string
          date: string | null
          id: number
          outletId: number | null
        }
        Insert: {
          created_at?: string
          date?: string | null
          id?: number
          outletId?: number | null
        }
        Update: {
          created_at?: string
          date?: string | null
          id?: number
          outletId?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "Schedule_outletId_fkey"
            columns: ["outletId"]
            referencedRelation: "Outlet"
            referencedColumns: ["id"]
          }
        ]
      }
      ScheduleDetail: {
        Row: {
          created_at: string
          currentBookings: number | null
          endTime: string | null
          eventCategory: Json | null
          eventName: string | null
          eventType: Json | null
          gates: boolean | null
          id: string
          maxBookings: number | null
          pic: Json | null
          prices: Json | null
          room: Json | null
          scheduleId: number | null
          startTime: string | null
        }
        Insert: {
          created_at?: string
          currentBookings?: number | null
          endTime?: string | null
          eventCategory?: Json | null
          eventName?: string | null
          eventType?: Json | null
          gates?: boolean | null
          id?: string
          maxBookings?: number | null
          pic?: Json | null
          prices?: Json | null
          room?: Json | null
          scheduleId?: number | null
          startTime?: string | null
        }
        Update: {
          created_at?: string
          currentBookings?: number | null
          endTime?: string | null
          eventCategory?: Json | null
          eventName?: string | null
          eventType?: Json | null
          gates?: boolean | null
          id?: string
          maxBookings?: number | null
          pic?: Json | null
          prices?: Json | null
          room?: Json | null
          scheduleId?: number | null
          startTime?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ScheduleDetail_scheduleId_fkey"
            columns: ["scheduleId"]
            referencedRelation: "Schedule"
            referencedColumns: ["id"]
          }
        ]
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
      Users: {
        Row: {
          collectionId: string | null
          created_at: string
          email: string | null
          id: string
          name: string | null
          password: string | null
          phone: string | null
          role: string | null
          status: boolean | null
          tenantId: string | null
        }
        Insert: {
          collectionId?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name?: string | null
          password?: string | null
          phone?: string | null
          role?: string | null
          status?: boolean | null
          tenantId?: string | null
        }
        Update: {
          collectionId?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name?: string | null
          password?: string | null
          phone?: string | null
          role?: string | null
          status?: boolean | null
          tenantId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Users_tenantId_fkey"
            columns: ["tenantId"]
            referencedRelation: "Business"
            referencedColumns: ["id"]
          }
        ]
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
