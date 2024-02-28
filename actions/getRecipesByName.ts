import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";

import { Recipes } from "@/types";

import getRecipes from "./getRecipes";

const getRecipesByName = async (query: string): Promise<Recipes[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    });

    if (!query) {
        const allRecipes = await getRecipes();
        return allRecipes
    };

    const {data, error} = await supabase
    .from("recipes")
    .select("*")
    .textSearch("recipeName", `%${query}$`)
    .order("createdAt", {ascending: false});

    if (error) {
        console.log(error.message);
    }

    return (data as any) || [];
};

export default getRecipesByName;