import createSupabaseServerClient from "@/lib/supabase/server";

//FUNCTION USED TO GET ALL THE CATEGORIES.
export async function getCategories () {
    const supabase = await createSupabaseServerClient();

    const {data, error} = await supabase
    .from("categories")
    .select("*")
    .order("categoryName", {ascending: false});

    if (error) {
        console.log(error.message);
    }
    return (data as any) || [];
}

//FUNCTION USED TO LOAD AN IMAGE FROM THE FOOD IMAGES STORAGE.
export const useLoadFoodImage = async (image: string) => {

    const supabase = await createSupabaseServerClient();
    const {data: imageData} = supabase.storage.from("images").getPublicUrl(image);
    return imageData.publicUrl;
}

//FUNCTION USED TO GET A RECIPE BASED ON ITS ID.
export async function getRecipeById (recipeId: string) {
    const supabase = await createSupabaseServerClient();

    const {data, error} = await supabase 
        .from("recipes")
        .select(`*,
        user_profiles (user_id, username)
        `)
        .eq("recipeId", recipeId)
        .single();

    if (error) {
        console.log(error.message);
    }
    return (data as any) || [];
}

//FUNCTION USED TO GET ALL THE INGREDIENTS AND QUANTITIES IN A RECIPE BASED ON ITS ID
export async function getRecipeIngAndQuantbyId (recipeId: string) {
    const supabase = await createSupabaseServerClient();
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

//FUNCTION USED TO GET THE NECESSARY DATA TO DISPLAY IT ON THE EXPLORE PAGE WITHOUT QUERY OR CATEGORY FILTERS
export async function getRecipeItems () {
    const supabase = await createSupabaseServerClient();
    //https://supabase.com/docs/guides/database/joins-and-nesting
    const {data, error} = await supabase
    .from("recipes")
    .select(`
    briefDescription,
    difficulty,
    image,
    nOfIngredients,
    recipeId,
    recipeName,
    savedTimes,
    time,
    user_profiles (user_id, username)`)
    .limit(20);

    if (error) {
        console.log(error.message);
    }
    
    return (data as any) || [];
}

export async function getRecipeItemsSearchResults (query: string | null, category: string | null) {
    const supabase = await createSupabaseServerClient();
    //https://supabase.com/docs/guides/database/joins-and-nesting
    if (!query && !category) {
        const {data, error} = await getRecipeItems();
        
        if (error) {
            console.log(error.message);
        }
        
        return (data as any) || [];
    };
    if (!category && query) {
    const {data, error} = await supabase
    .from("recipes")
    .select(`
    briefDescription,
    difficulty,
    image,
    nOfIngredients,
    recipeId,
    recipeName,
    savedTimes,
    time,
    user_profiles (user_id, username)`)
    .limit(20)
    .textSearch("recipeName", `%${query}$`)
    .order("createdAt", {ascending: false});
    
    if (error) {
        console.log(error.message);
    }
    
    return (data as any) || [];
    } else {
        //TODO: Fix this fetch!
        const {data, error} = await supabase.
        from("categoriesToRecipes")
        .select(`
            recipes(
                briefDescription,
                difficulty,
                image,
                nOfIngredients,
                recipeId,
                recipeName,
                savedTimes,
                time,
                user_profiles (user_id, username)`)
        .eq("category_name", category)
        .limit(20)
        .order("createdAt", {ascending: false});
        
        if (error) {
            console.log(error.message);
        }
        
        return (data as any) || [];
    }
}

//FUNCTION USED TO GET A RECIPE BASED ON ITS ID.
export async function getRecipeByUserId (user_id: string) {
    const supabase = await createSupabaseServerClient();

    const {data, error} = await supabase 
        .from("recipes")
        .select(`
        briefDescription,
        difficulty,
        image,
        nOfIngredients,
        recipeId,
        recipeName,
        savedTimes,
        time,
        user_profiles (user_id, username)`)
        .limit(20)
        .eq("user_id", user_id);

    if (error) {
        console.log(error.message);
    }
    return (data as any) || [];
}

//FUNCTION USED TO GET THE PFP FROM THE PFP-IMAGES BUCKET
export const useLoadRecipeImage = async (image: string) => {

    const supabase = await createSupabaseServerClient();
    const {data: imageData} = supabase.storage.from("images").getPublicUrl(image);
    return imageData.publicUrl;
}

//Function that gets the number of saved times
export async function getRecipeSavedTimes (recipeId: string) {
    const supabase = await createSupabaseServerClient();
    //https://supabase.com/docs/guides/database/joins-and-nesting
    const {data, error} = await supabase
    .from("recipes")
    .select(`
    savedTimes
    `)
    .eq("recipeId", recipeId);

    if (error) {
        console.log(error.message);
    }
    
    return (data as any) || [];
}

//FUNCTION USED TO GET A RECIPE BASED ON ITS ID.
export async function getSavedRecipes (user_id: string) {
    console.log(user_id);
    const supabase = await createSupabaseServerClient();

    const {data, error} = await supabase 
        .from('saved_recipes')
        .select(`
            recipes (
                briefDescription,
                difficulty,
                image,
                nOfIngredients,
                recipeId,
                recipeName,
                savedTimes,
                time
            )
        `)
        .limit(20);

    if (error) {
        console.log(error.message);
    }
    return (data as any) || [];
}