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
      Businesses: {
        Row: {
          BusinessEmail: string | null
          BusinessID: string
          BusinessImage: string | null
          BusinessName: string | null
          BusinessPhone: string | null
          BusinessPulse: string | null
          BusinessStatus: boolean | null
          CreatedAt: string
          UpdatedAt: string | null
        }
        Insert: {
          BusinessEmail?: string | null
          BusinessID?: string
          BusinessImage?: string | null
          BusinessName?: string | null
          BusinessPhone?: string | null
          BusinessPulse?: string | null
          BusinessStatus?: boolean | null
          CreatedAt?: string
          UpdatedAt?: string | null
        }
        Update: {
          BusinessEmail?: string | null
          BusinessID?: string
          BusinessImage?: string | null
          BusinessName?: string | null
          BusinessPhone?: string | null
          BusinessPulse?: string | null
          BusinessStatus?: boolean | null
          CreatedAt?: string
          UpdatedAt?: string | null
        }
        Relationships: []
      }
      CertificateWorkshop: {
        Row: {
          created_at: string
          email: string | null
          event: string | null
          fullName: string | null
          id: string
          phone: string | null
          serial: string | null
          userInfo: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          event?: string | null
          fullName?: string | null
          id?: string
          phone?: string | null
          serial?: string | null
          userInfo?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          event?: string | null
          fullName?: string | null
          id?: string
          phone?: string | null
          serial?: string | null
          userInfo?: string | null
        }
        Relationships: []
      }
      EventCategories: {
        Row: {
          CreatedAt: string
          EventCategoryID: string
          EventCategoryName: string | null
          EventCategoryStatus: boolean | null
          UpdatedAt: string | null
        }
        Insert: {
          CreatedAt?: string
          EventCategoryID?: string
          EventCategoryName?: string | null
          EventCategoryStatus?: boolean | null
          UpdatedAt?: string | null
        }
        Update: {
          CreatedAt?: string
          EventCategoryID?: string
          EventCategoryName?: string | null
          EventCategoryStatus?: boolean | null
          UpdatedAt?: string | null
        }
        Relationships: []
      }
      EventParticipations: {
        Row: {
          CreatedAt: string
          EventID: string | null
          EventParticipationID: number
          UserID: string
        }
        Insert: {
          CreatedAt?: string
          EventID?: string | null
          EventParticipationID?: number
          UserID: string
        }
        Update: {
          CreatedAt?: string
          EventID?: string | null
          EventParticipationID?: number
          UserID?: string
        }
        Relationships: [
          {
            foreignKeyName: "EventParticipations_EventID_fkey"
            columns: ["EventID"]
            isOneToOne: false
            referencedRelation: "Events"
            referencedColumns: ["EventID"]
          }
        ]
      }
      Events: {
        Row: {
          BusinessID: string | null
          CreatedAt: string
          EventCategory: Json | null
          EventDate: string | null
          EventDesc: Json | null
          EventID: string
          EventImage: Json[] | null
          EventMaxUser: number | null
          EventName: string | null
          EventRundown: Json | null
          EventStatus: boolean | null
          EventTime: Json | null
          EventType: Json | null
          UpdatedAt: string | null
        }
        Insert: {
          BusinessID?: string | null
          CreatedAt?: string
          EventCategory?: Json | null
          EventDate?: string | null
          EventDesc?: Json | null
          EventID?: string
          EventImage?: Json[] | null
          EventMaxUser?: number | null
          EventName?: string | null
          EventRundown?: Json | null
          EventStatus?: boolean | null
          EventTime?: Json | null
          EventType?: Json | null
          UpdatedAt?: string | null
        }
        Update: {
          BusinessID?: string | null
          CreatedAt?: string
          EventCategory?: Json | null
          EventDate?: string | null
          EventDesc?: Json | null
          EventID?: string
          EventImage?: Json[] | null
          EventMaxUser?: number | null
          EventName?: string | null
          EventRundown?: Json | null
          EventStatus?: boolean | null
          EventTime?: Json | null
          EventType?: Json | null
          UpdatedAt?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Events_BusinessID_fkey"
            columns: ["BusinessID"]
            isOneToOne: false
            referencedRelation: "Businesses"
            referencedColumns: ["BusinessID"]
          }
        ]
      }
      EventStages: {
        Row: {
          Automate: number
          CreatedAt: string
          EventID: string | null
          EventStageDesc: Json | null
          EventStageID: string
          EventStageName: string | null
          UpdatedAt: string | null
        }
        Insert: {
          Automate?: number
          CreatedAt?: string
          EventID?: string | null
          EventStageDesc?: Json | null
          EventStageID?: string
          EventStageName?: string | null
          UpdatedAt?: string | null
        }
        Update: {
          Automate?: number
          CreatedAt?: string
          EventID?: string | null
          EventStageDesc?: Json | null
          EventStageID?: string
          EventStageName?: string | null
          UpdatedAt?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "EventStages_EventID_fkey"
            columns: ["EventID"]
            isOneToOne: false
            referencedRelation: "Events"
            referencedColumns: ["EventID"]
          }
        ]
      }
      EventTrivia: {
        Row: {
          CreatedAt: string
          EventID: string | null
          EventStage: string | null
          EventTriviaArticle: Json | null
          EventTriviaCode: number | null
          EventTriviaID: string
          EventTriviaName: string | null
          EventTriviaPulse: number | null
          EventTriviaQuestion: Json[] | null
          UpdatedAt: string | null
        }
        Insert: {
          CreatedAt?: string
          EventID?: string | null
          EventStage?: string | null
          EventTriviaArticle?: Json | null
          EventTriviaCode?: number | null
          EventTriviaID?: string
          EventTriviaName?: string | null
          EventTriviaPulse?: number | null
          EventTriviaQuestion?: Json[] | null
          UpdatedAt?: string | null
        }
        Update: {
          CreatedAt?: string
          EventID?: string | null
          EventStage?: string | null
          EventTriviaArticle?: Json | null
          EventTriviaCode?: number | null
          EventTriviaID?: string
          EventTriviaName?: string | null
          EventTriviaPulse?: number | null
          EventTriviaQuestion?: Json[] | null
          UpdatedAt?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "EventTrivia_EventID_fkey"
            columns: ["EventID"]
            isOneToOne: false
            referencedRelation: "Events"
            referencedColumns: ["EventID"]
          },
          {
            foreignKeyName: "EventTrivia_EventStage_fkey"
            columns: ["EventStage"]
            isOneToOne: false
            referencedRelation: "EventStages"
            referencedColumns: ["EventStageID"]
          }
        ]
      }
      EventTypes: {
        Row: {
          CreatedAt: string
          EventTypeID: string
          EventTypeName: string | null
          EventTypeStatus: boolean | null
          UpdatedAt: string | null
        }
        Insert: {
          CreatedAt?: string
          EventTypeID?: string
          EventTypeName?: string | null
          EventTypeStatus?: boolean | null
          UpdatedAt?: string | null
        }
        Update: {
          CreatedAt?: string
          EventTypeID?: string
          EventTypeName?: string | null
          EventTypeStatus?: boolean | null
          UpdatedAt?: string | null
        }
        Relationships: []
      }
      Sponsorships: {
        Row: {
          BusinessID: string | null
          CreatedAt: string
          SponsorEmail: string | null
          SponsorID: string
          SponsorImage: string | null
          SponsorName: string | null
          SponsorPhone: string | null
          UpdatedAt: string | null
        }
        Insert: {
          BusinessID?: string | null
          CreatedAt?: string
          SponsorEmail?: string | null
          SponsorID?: string
          SponsorImage?: string | null
          SponsorName?: string | null
          SponsorPhone?: string | null
          UpdatedAt?: string | null
        }
        Update: {
          BusinessID?: string | null
          CreatedAt?: string
          SponsorEmail?: string | null
          SponsorID?: string
          SponsorImage?: string | null
          SponsorName?: string | null
          SponsorPhone?: string | null
          UpdatedAt?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Sponsorships_BusinessID_fkey"
            columns: ["BusinessID"]
            isOneToOne: false
            referencedRelation: "Businesses"
            referencedColumns: ["BusinessID"]
          }
        ]
      }
      StageCheckpoints: {
        Row: {
          Automate: number | null
          CreatedAt: string
          EventID: string | null
          EventStageID: string | null
          EventStageStatus: number | null
          StageCheckpointID: string
          UserID: string
        }
        Insert: {
          Automate?: number | null
          CreatedAt?: string
          EventID?: string | null
          EventStageID?: string | null
          EventStageStatus?: number | null
          StageCheckpointID?: string
          UserID: string
        }
        Update: {
          Automate?: number | null
          CreatedAt?: string
          EventID?: string | null
          EventStageID?: string | null
          EventStageStatus?: number | null
          StageCheckpointID?: string
          UserID?: string
        }
        Relationships: [
          {
            foreignKeyName: "StageCheckpoints_EventID_fkey"
            columns: ["EventID"]
            isOneToOne: false
            referencedRelation: "Events"
            referencedColumns: ["EventID"]
          },
          {
            foreignKeyName: "StageCheckpoints_EventStageID_fkey"
            columns: ["EventStageID"]
            isOneToOne: false
            referencedRelation: "EventStages"
            referencedColumns: ["EventStageID"]
          }
        ]
      }
      TriviaAnswers: {
        Row: {
          CreatedAt: string
          EventID: string | null
          EventStageID: string | null
          EventTriviaID: string | null
          TriviaAnswer: Json | null
          TriviaAnswerID: string
          TriviaExp: number | null
          TriviaPulse: number | null
          UserID: string | null
        }
        Insert: {
          CreatedAt?: string
          EventID?: string | null
          EventStageID?: string | null
          EventTriviaID?: string | null
          TriviaAnswer?: Json | null
          TriviaAnswerID?: string
          TriviaExp?: number | null
          TriviaPulse?: number | null
          UserID?: string | null
        }
        Update: {
          CreatedAt?: string
          EventID?: string | null
          EventStageID?: string | null
          EventTriviaID?: string | null
          TriviaAnswer?: Json | null
          TriviaAnswerID?: string
          TriviaExp?: number | null
          TriviaPulse?: number | null
          UserID?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "TriviaAnswers_EventID_fkey"
            columns: ["EventID"]
            isOneToOne: false
            referencedRelation: "Events"
            referencedColumns: ["EventID"]
          },
          {
            foreignKeyName: "TriviaAnswers_EventStageID_fkey"
            columns: ["EventStageID"]
            isOneToOne: false
            referencedRelation: "EventStages"
            referencedColumns: ["EventStageID"]
          },
          {
            foreignKeyName: "TriviaAnswers_EventTriviaID_fkey"
            columns: ["EventTriviaID"]
            isOneToOne: false
            referencedRelation: "EventTrivia"
            referencedColumns: ["EventTriviaID"]
          },
          {
            foreignKeyName: "TriviaAnswers_UserID_fkey"
            columns: ["UserID"]
            isOneToOne: false
            referencedRelation: "Users"
            referencedColumns: ["UserID"]
          }
        ]
      }
      Users: {
        Row: {
          BusinessID: string | null
          CreatedAt: string
          UpdatedAt: string | null
          UserEmail: string | null
          UserHunterName: string | null
          UserID: string
          UserPassword: string | null
          UserPhone: string | null
          UserRole: string | null
          UserStatus: boolean | null
        }
        Insert: {
          BusinessID?: string | null
          CreatedAt?: string
          UpdatedAt?: string | null
          UserEmail?: string | null
          UserHunterName?: string | null
          UserID?: string
          UserPassword?: string | null
          UserPhone?: string | null
          UserRole?: string | null
          UserStatus?: boolean | null
        }
        Update: {
          BusinessID?: string | null
          CreatedAt?: string
          UpdatedAt?: string | null
          UserEmail?: string | null
          UserHunterName?: string | null
          UserID?: string
          UserPassword?: string | null
          UserPhone?: string | null
          UserRole?: string | null
          UserStatus?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "Users_BusinessID_fkey"
            columns: ["BusinessID"]
            isOneToOne: false
            referencedRelation: "Businesses"
            referencedColumns: ["BusinessID"]
          }
        ]
      }
      UsersProfile: {
        Row: {
          CreatedAt: string
          ProfileDesc: Json | null
          ProfileExp: number | null
          ProfileID: string
          ProfileImage: Json | null
          ProfileName: string | null
          ProfileNIK: string | null
          ProfilePulse: number | null
          UpdatedAt: string | null
          UserID: string | null
        }
        Insert: {
          CreatedAt?: string
          ProfileDesc?: Json | null
          ProfileExp?: number | null
          ProfileID?: string
          ProfileImage?: Json | null
          ProfileName?: string | null
          ProfileNIK?: string | null
          ProfilePulse?: number | null
          UpdatedAt?: string | null
          UserID?: string | null
        }
        Update: {
          CreatedAt?: string
          ProfileDesc?: Json | null
          ProfileExp?: number | null
          ProfileID?: string
          ProfileImage?: Json | null
          ProfileName?: string | null
          ProfileNIK?: string | null
          ProfilePulse?: number | null
          UpdatedAt?: string | null
          UserID?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "UsersProfile_UserID_fkey"
            columns: ["UserID"]
            isOneToOne: false
            referencedRelation: "Users"
            referencedColumns: ["UserID"]
          }
        ]
      }
      VoucherClaims: {
        Row: {
          CreatedAt: string
          UserID: string | null
          VoucherClaimID: string
          VoucherID: string | null
        }
        Insert: {
          CreatedAt?: string
          UserID?: string | null
          VoucherClaimID?: string
          VoucherID?: string | null
        }
        Update: {
          CreatedAt?: string
          UserID?: string | null
          VoucherClaimID?: string
          VoucherID?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "VoucherClaims_UserID_fkey"
            columns: ["UserID"]
            isOneToOne: false
            referencedRelation: "Users"
            referencedColumns: ["UserID"]
          },
          {
            foreignKeyName: "VoucherClaims_VoucherID_fkey"
            columns: ["VoucherID"]
            isOneToOne: false
            referencedRelation: "Vouchers"
            referencedColumns: ["VoucherID"]
          }
        ]
      }
      Vouchers: {
        Row: {
          BusinessID: string | null
          CreatedAt: string
          SponsorID: string | null
          VoucherDesc: Json | null
          VoucherExp: number | null
          VoucherExpire: string | null
          VoucherID: string
          VoucherMaxClaimed: number | null
          VoucherName: string | null
          VoucherPulse: number | null
          VoucherStatus: boolean | null
        }
        Insert: {
          BusinessID?: string | null
          CreatedAt?: string
          SponsorID?: string | null
          VoucherDesc?: Json | null
          VoucherExp?: number | null
          VoucherExpire?: string | null
          VoucherID?: string
          VoucherMaxClaimed?: number | null
          VoucherName?: string | null
          VoucherPulse?: number | null
          VoucherStatus?: boolean | null
        }
        Update: {
          BusinessID?: string | null
          CreatedAt?: string
          SponsorID?: string | null
          VoucherDesc?: Json | null
          VoucherExp?: number | null
          VoucherExpire?: string | null
          VoucherID?: string
          VoucherMaxClaimed?: number | null
          VoucherName?: string | null
          VoucherPulse?: number | null
          VoucherStatus?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "Vouchers_BusinessID_fkey"
            columns: ["BusinessID"]
            isOneToOne: false
            referencedRelation: "Businesses"
            referencedColumns: ["BusinessID"]
          },
          {
            foreignKeyName: "Vouchers_SponsorID_fkey"
            columns: ["SponsorID"]
            isOneToOne: false
            referencedRelation: "Sponsorships"
            referencedColumns: ["SponsorID"]
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

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
