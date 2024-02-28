//Already converted to .ssr

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { Recipes } from "@/types";

const getRecipeById = async (id: string): Promise<Recipes> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    });

    const {data, error} = await supabase
        .from("recipes")
        .select("*")
        .eq("recipeId", id)
        .single();

    if (error) {
        console.log(error.message);
    }
    return (data as any) || [];
}

export default getRecipeById;