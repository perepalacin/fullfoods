import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { Categories } from "@/types";

const getCategories = async(): Promise<Categories[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    });

    const {data, error} = await supabase
        .from("categories")
        .select("*")
        .order("categoryName", {ascending: false});

    if (error) {
        console.log(error.message);
    }

    return (data as any) || [];
}

export default getCategories;