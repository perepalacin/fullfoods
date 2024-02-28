import Stripe from "stripe";

export interface UserDetails {
    id: string;
    first_name: string;
    last_name: string;
    full_name?: string;
    avatar_url?: string;
    billing_adress?: Stripe.Address;
    payment_method?: Stripe.PaymentMethod[Stripe.PaymentMethod.Type];
}

export interface Product {
    id: string;
    active?: boolean;
    name?: string;
    description?: string;
    image?: string;
    metadata?: Stripe.Metadata;
}

export interface Price {
    id: string;
    product_id?: string;
    active?: string;
    descrpition?: string;
    unit_amount?: number;
    currency?: string;
    type?: Stripe.Price.Type;
    interval?: Stripe.Price.Recurring.Interval;
    interval_count?: number;
    trial_period_days?: number | null;
    metadata?: Stripe.Metadata;
    products?: Product;
}

export interface Subscription {
    id: string;
    user_id: string;
    status?: Stripe.Subscription.Status;
    metadata?: Stripe.Metadata;
    price_id?: string;
    quantity?: number;
    cancel_at_perdio_end?: boolean;
    created:string;
    current_period_start:string;
    current_period_end: string;
    ended_at?: string;
    cancel_at?:string;
    canceled_at?: string;
    trial_start?: string;
    trial_end?: string;
    prices?: Price;

}

export interface Categories {
    categoryId: string;
    categoryName: string;
}

export interface RecipeItemProps {
    briefDescription?: string | null;
    difficulty: string;
    image: string | null;
    nOfIngredients: number;
    recipeId: string;
    recipeName: string;
    savedTimes: number | null;
    time: string;
    author_username: string | null;
    user_id: string;
}

export interface Recipes {
    briefDescription?: string | null;
    carbs: number;
    createdAt: string;
    difficulty: string;
    fat: number;
    fiber: number;
    image: string | null;
    kcals: number;
    nOfIngredients: number;
    prote: number;
    recipeId: string;
    recipeName: string;
    salt: number;
    saturatedFat: number;
    savedTimes: number | null;
    steps: string[] | null;
    sugar: number;
    time: string;
    updatedAt: string | null;
    author_username: string | null;
}

export interface Ingredients {
          brand: string | null;
          carbs: number;
          category: string | null;
          ecoScore: number | null;
          fat: number;
          fiber: number;
          image: string | null;
          ingredientId: string;
          ingredientName: string;
          kcals: number;
          novaScore: number | null;
          nutriScore: number | null;
          prote: number;
          salt: number;
          saturatedFat: number;
          sugar: number;
          units: string;
          alergies: Alergies[] | null;
}

export interface Alergies {
    alergyName: string;
    id: string | null;
}

export interface recipeIngredientAndQuantities {
    quantity: number;
    ingredients: Ingredients;
}

export interface ExportMacrosProps {
    ingAndQuant: Array<[string, number]>;
    kcals: number;
    prote: number;
    carbs: number;
    sugar: number;
    fat: number;
    saturatedFat: number;
    salt: number;
    fiber: number;
}

export interface UploadRecipeProps {
        
    briefDescription: string | null;
    carbs: number;
    difficulty: string;
    fat: number;
    saturatedFat: number;
    fiber: number;
    imagePath: string | null;
    imageFile: File | null;
    kcals: number;
    nOfIngredients: number;
    prote: number;
    recipeId: string | null;
    recipeName: string;
    salt: number;
    steps: string[] | null;
    sugar: number;
    time: string;
    ingAndQuant: Array<[string, number]>;
    author_username: string | null;
}

export interface userProfileDetails {
    bio: string | null
    created_at: string
    email: string | null
    instagram: string | null
    phone: string | null
    profile_picture: string | null
    user_id: string
    username: string | null
    webpage: string | null
    youtube: string | null
}