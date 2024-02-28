import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { Ingredients } from "@/types";


//This action also returns the alegies!
const getIngredientById = async (ingredientId: string): Promise<Ingredients> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    });

    const {data, error} = await supabase
        .from("ingredients")
        .select(`
        *,
        alergies (alergyName)`)
        .eq("ingredientId", ingredientId)
        .single();

    if (error) {
        console.log(error.message);
    }

    return (data as any) || [];
}

export default getIngredientById;