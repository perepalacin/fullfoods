//already converted to .ssr
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { recipeIngredientAndQuantities } from "@/types";

const getRecipeQuantities = async (recipeId: string): Promise<recipeIngredientAndQuantities[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    });

    //https://supabase.com/docs/guides/database/joins-and-nesting
    const {data, error} = await supabase
    .from("ingredientsToRecipes")
    .select(`
    quantity,
    ingredients (*)`)
    .eq("recipeId", recipeId);

    if (error) {
        console.log(error.message);
    }
    
    return (data as any) || [];
}

export default getRecipeQuantities;