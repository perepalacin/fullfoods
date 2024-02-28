import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { Ingredients } from "@/types";

import getIngredients from "./getIngredients";

const getIngredientsByName = async (query: string): Promise<Ingredients[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    });

    if (!query) {
        const allIngredients = await getIngredients();
        return allIngredients
    };

    const {data, error} = await supabase
    .from("ingredients")
    .select("*")
    .textSearch("ingredientName", `%${query}$`)
    .order("ingredientName", {ascending: false});

    if (error) {
        console.log(error.message);
    }

    return (data as any) || [];
};

export default getIngredientsByName;