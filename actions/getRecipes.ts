import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { Recipes } from "@/types";

const getRecipes = async(): Promise<Recipes[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    });

    const {data, error} = await supabase
        .from("recipes")
        .select("*")
        .order("createdAt", {ascending: false})
        .limit(20);

    if (error) {
        console.log(error.message);
    }

    return (data as any) || [];
}

export default getRecipes;