export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      invites: {
        Row: {
          id: number
          created_at: string | null
          user_id: string | null
          list_id: string | null
          status: string | null
          seen: boolean
          invited_user_id: string | null
        }
        Insert: {
          id?: number
          created_at?: string | null
          user_id?: string | null
          list_id?: string | null
          status?: string | null
          seen?: boolean
          invited_user_id?: string | null
        }
        Update: {
          id?: number
          created_at?: string | null
          user_id?: string | null
          list_id?: string | null
          status?: string | null
          seen?: boolean
          invited_user_id?: string | null
        }
      }
      items: {
        Row: {
          id: string
          created_at: string | null
          desc: string
          amount: string
          checked: boolean | null
          list_id: string
        }
        Insert: {
          id?: string
          created_at?: string | null
          desc?: string
          amount: string
          checked?: boolean | null
          list_id: string
        }
        Update: {
          id?: string
          created_at?: string | null
          desc?: string
          amount?: string
          checked?: boolean | null
          list_id?: string
        }
      }
      list_users: {
        Row: {
          id: number
          created_at: string | null
          user_id: string
          list_id: string
        }
        Insert: {
          id?: number
          created_at?: string | null
          user_id: string
          list_id: string
        }
        Update: {
          id?: number
          created_at?: string | null
          user_id?: string
          list_id?: string
        }
      }
      lists: {
        Row: {
          id: string
          created_at: string | null
          created_by: string | null
          list_name: string
        }
        Insert: {
          id?: string
          created_at?: string | null
          created_by?: string | null
          list_name?: string
        }
        Update: {
          id?: string
          created_at?: string | null
          created_by?: string | null
          list_name?: string
        }
      }
      profiles: {
        Row: {
          id: string
          email: string | null
          username: string | null
        }
        Insert: {
          id: string
          email?: string | null
          username?: string | null
        }
        Update: {
          id?: string
          email?: string | null
          username?: string | null
        }
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
  }
}
