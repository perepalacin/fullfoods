import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { Ingredients } from "@/types";

const getIngredients = async(): Promise<Ingredients[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    });

    const {data, error} = await supabase
        .from("ingredients")
        .select("*")
        .order("ingredientName", {ascending: false})
        .limit(20);

    if (error) {
        console.log(error.message);
    }

    return (data as any) || [];
}

export default getIngredients;