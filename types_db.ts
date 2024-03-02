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
      alergies: {
        Row: {
          alergyName: string
          id: string
        }
        Insert: {
          alergyName: string
          id?: string
        }
        Update: {
          alergyName?: string
          id?: string
        }
        Relationships: []
      }
      alergiesToIngredients: {
        Row: {
          alergyId: string
          id: string
          ingredientId: string
        }
        Insert: {
          alergyId: string
          id?: string
          ingredientId: string
        }
        Update: {
          alergyId?: string
          id?: string
          ingredientId?: string
        }
        Relationships: [
          {
            foreignKeyName: "alergiesToIngredients_alergyId_fkey"
            columns: ["alergyId"]
            isOneToOne: false
            referencedRelation: "alergies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "alergiesToIngredients_ingredientId_fkey"
            columns: ["ingredientId"]
            isOneToOne: false
            referencedRelation: "ingredients"
            referencedColumns: ["ingredientId"]
          }
        ]
      }
      categories: {
        Row: {
          categoryName: string
        }
        Insert: {
          categoryName: string
        }
        Update: {
          categoryName?: string
        }
        Relationships: []
      }
      categoriesToRecipes: {
        Row: {
          category_name: string | null
          recipeId: string
        }
        Insert: {
          category_name?: string | null
          recipeId: string
        }
        Update: {
          category_name?: string | null
          recipeId?: string
        }
        Relationships: [
          {
            foreignKeyName: "categoriesToRecipes_category_name_fkey"
            columns: ["category_name"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["categoryName"]
          },
          {
            foreignKeyName: "categoriesToRecipes_recipeId_fkey"
            columns: ["recipeId"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["recipeId"]
          }
        ]
      }
      customers: {
        Row: {
          id: string
          stripe_customer_id: string | null
        }
        Insert: {
          id: string
          stripe_customer_id?: string | null
        }
        Update: {
          id?: string
          stripe_customer_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customers_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      ingredients: {
        Row: {
          brand: string | null
          carbs: number
          category: string | null
          ecoScore: number | null
          fat: number
          fiber: number
          image: string | null
          ingredientId: string
          ingredientName: string
          kcals: number
          novaScore: number | null
          nutriScore: number | null
          prote: number
          salt: number
          saturatedFat: number
          sugar: number
          units: string
        }
        Insert: {
          brand?: string | null
          carbs: number
          category?: string | null
          ecoScore?: number | null
          fat: number
          fiber: number
          image?: string | null
          ingredientId?: string
          ingredientName: string
          kcals: number
          novaScore?: number | null
          nutriScore?: number | null
          prote: number
          salt: number
          saturatedFat: number
          sugar: number
          units?: string
        }
        Update: {
          brand?: string | null
          carbs?: number
          category?: string | null
          ecoScore?: number | null
          fat?: number
          fiber?: number
          image?: string | null
          ingredientId?: string
          ingredientName?: string
          kcals?: number
          novaScore?: number | null
          nutriScore?: number | null
          prote?: number
          salt?: number
          saturatedFat?: number
          sugar?: number
          units?: string
        }
        Relationships: []
      }
      ingredientsToRecipes: {
        Row: {
          ingredientId: string
          quantity: number
          recipeId: string
          user_id: string | null
        }
        Insert: {
          ingredientId: string
          quantity?: number
          recipeId: string
          user_id?: string | null
        }
        Update: {
          ingredientId?: string
          quantity?: number
          recipeId?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ingredientsToRecipes_ingredientId_fkey"
            columns: ["ingredientId"]
            isOneToOne: false
            referencedRelation: "ingredients"
            referencedColumns: ["ingredientId"]
          },
          {
            foreignKeyName: "ingredientsToRecipes_recipeId_fkey"
            columns: ["recipeId"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["recipeId"]
          }
        ]
      }
      prices: {
        Row: {
          active: boolean | null
          currency: string | null
          description: string | null
          id: string
          interval: Database["public"]["Enums"]["pricing_plan_interval"] | null
          interval_count: number | null
          metadata: Json | null
          product_id: string | null
          trial_period_days: number | null
          type: Database["public"]["Enums"]["pricing_type"] | null
          unit_amount: number | null
        }
        Insert: {
          active?: boolean | null
          currency?: string | null
          description?: string | null
          id: string
          interval?: Database["public"]["Enums"]["pricing_plan_interval"] | null
          interval_count?: number | null
          metadata?: Json | null
          product_id?: string | null
          trial_period_days?: number | null
          type?: Database["public"]["Enums"]["pricing_type"] | null
          unit_amount?: number | null
        }
        Update: {
          active?: boolean | null
          currency?: string | null
          description?: string | null
          id?: string
          interval?: Database["public"]["Enums"]["pricing_plan_interval"] | null
          interval_count?: number | null
          metadata?: Json | null
          product_id?: string | null
          trial_period_days?: number | null
          type?: Database["public"]["Enums"]["pricing_type"] | null
          unit_amount?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "prices_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          }
        ]
      }
      products: {
        Row: {
          active: boolean | null
          description: string | null
          id: string
          image: string | null
          metadata: Json | null
          name: string | null
        }
        Insert: {
          active?: boolean | null
          description?: string | null
          id: string
          image?: string | null
          metadata?: Json | null
          name?: string | null
        }
        Update: {
          active?: boolean | null
          description?: string | null
          id?: string
          image?: string | null
          metadata?: Json | null
          name?: string | null
        }
        Relationships: []
      }
      recipes: {
        Row: {
          briefDescription: string | null
          carbs: number
          createdAt: string
          difficulty: string
          fat: number
          fiber: number
          image: string | null
          kcals: number
          nOfIngredients: number
          prote: number
          recipeId: string
          recipeName: string
          salt: number
          saturatedFat: number
          savedTimes: number | null
          steps: string[] | null
          sugar: number
          time: string
          updatedAt: string | null
          user_id: string
        }
        Insert: {
          briefDescription?: string | null
          carbs: number
          createdAt?: string
          difficulty?: string
          fat: number
          fiber: number
          image?: string | null
          kcals: number
          nOfIngredients: number
          prote: number
          recipeId?: string
          recipeName: string
          salt: number
          saturatedFat: number
          savedTimes?: number | null
          steps?: string[] | null
          sugar: number
          time: string
          updatedAt?: string | null
          user_id?: string
        }
        Update: {
          briefDescription?: string | null
          carbs?: number
          createdAt?: string
          difficulty?: string
          fat?: number
          fiber?: number
          image?: string | null
          kcals?: number
          nOfIngredients?: number
          prote?: number
          recipeId?: string
          recipeName?: string
          salt?: number
          saturatedFat?: number
          savedTimes?: number | null
          steps?: string[] | null
          sugar?: number
          time?: string
          updatedAt?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_recipes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["user_id"]
          }
        ]
      }
      saved_recipes: {
        Row: {
          recipeId: string
          user_id: string
        }
        Insert: {
          recipeId?: string
          user_id?: string
        }
        Update: {
          recipeId?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_saved_recipes_recipeId_fkey"
            columns: ["recipeId"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["recipeId"]
          }
        ]
      }
      subscriptions: {
        Row: {
          cancel_at: string | null
          cancel_at_period_end: boolean | null
          canceled_at: string | null
          created: string
          current_period_end: string
          current_period_start: string
          ended_at: string | null
          id: string
          metadata: Json | null
          price_id: string | null
          quantity: number | null
          status: Database["public"]["Enums"]["subscription_status"] | null
          trial_end: string | null
          trial_start: string | null
          user_id: string
        }
        Insert: {
          cancel_at?: string | null
          cancel_at_period_end?: boolean | null
          canceled_at?: string | null
          created?: string
          current_period_end?: string
          current_period_start?: string
          ended_at?: string | null
          id: string
          metadata?: Json | null
          price_id?: string | null
          quantity?: number | null
          status?: Database["public"]["Enums"]["subscription_status"] | null
          trial_end?: string | null
          trial_start?: string | null
          user_id: string
        }
        Update: {
          cancel_at?: string | null
          cancel_at_period_end?: boolean | null
          canceled_at?: string | null
          created?: string
          current_period_end?: string
          current_period_start?: string
          ended_at?: string | null
          id?: string
          metadata?: Json | null
          price_id?: string | null
          quantity?: number | null
          status?: Database["public"]["Enums"]["subscription_status"] | null
          trial_end?: string | null
          trial_start?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_price_id_fkey"
            columns: ["price_id"]
            isOneToOne: false
            referencedRelation: "prices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      user_profiles: {
        Row: {
          bio: string | null
          created_at: string
          email: string | null
          instagram: string | null
          phone: string | null
          profile_picture: string | null
          user_id: string
          username: string
          webpage: string | null
          youtube: string | null
        }
        Insert: {
          bio?: string | null
          created_at?: string
          email?: string | null
          instagram?: string | null
          phone?: string | null
          profile_picture?: string | null
          user_id?: string
          username: string
          webpage?: string | null
          youtube?: string | null
        }
        Update: {
          bio?: string | null
          created_at?: string
          email?: string | null
          instagram?: string | null
          phone?: string | null
          profile_picture?: string | null
          user_id?: string
          username?: string
          webpage?: string | null
          youtube?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          avatar_url: string | null
          billing_address: Json | null
          full_name: string | null
          id: string
          payment_method: Json | null
        }
        Insert: {
          avatar_url?: string | null
          billing_address?: Json | null
          full_name?: string | null
          id: string
          payment_method?: Json | null
        }
        Update: {
          avatar_url?: string | null
          billing_address?: Json | null
          full_name?: string | null
          id?: string
          payment_method?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      search_with_categories: {
        Args: {
          query: string
          categories: string
        }
        Returns: {
          recipes_recipeid: string
          recipe_recipename: string
        }[]
      }
    }
    Enums: {
      pricing_plan_interval: "day" | "week" | "month" | "year"
      pricing_type: "one_time" | "recurring"
      subscription_status:
        | "trialing"
        | "active"
        | "canceled"
        | "incomplete"
        | "incomplete_expired"
        | "past_due"
        | "unpaid"
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
