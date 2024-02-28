import createSupabaseServerClient from "@/lib/supabase/server";
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: Request) {
  const uuid4: string = uuidv4();
  const uuid4_2: string = uuidv4();
  
  const supabase = await createSupabaseServerClient();
  const {error} = await supabase.from("ingredientsToRecipes").insert({
    recipeId: uuid4,
    ingredientId: uuid4_2,
    quantity: 12,
  });

  if (error) {
    return error.message;
  }
}