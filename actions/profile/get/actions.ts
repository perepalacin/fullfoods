"use server";

import createSupabaseServerClient from "@/lib/supabase/server";

//FUNCTION THAT FETCHES USER DATA BASED ON THIER USERNAME
//USEFUL TO NOT EXPOSE THEIR ID
export async function getUserProfileByUsername(username: string) {
    const supabase = await createSupabaseServerClient();

    const {data, error} = await supabase 
        .from("user_profiles")
        .select("*")
        .eq("username", username)
        .single();

    if (error) {
        console.log(error.message);
    }
    return (data as any) || [];
}

//FUNCTION USED TO FETCH USER DATA BASED ON THEIR ID
//USEFULL TO USE WITH THE GET SESSION FROM SUPABASE
export async function getUserProfileByUserId(user_id: string) {
    const supabase = await createSupabaseServerClient();

    const {data, error} = await supabase 
        .from("user_profiles")
        .select("*")
        .eq("user_id", user_id)
        .single();

    if (error) {
        console.log(error.message);
    }
    return (data as any) || [];
}

//FUNCTION USED TO GET THE PFP FROM THE PFP-IMAGES BUCKET
export const useLoadProfilePicture = async (image: string) => {

    const supabase = await createSupabaseServerClient();
    const {data: imageData} = supabase.storage.from("profile_pictures").getPublicUrl(image);
    return imageData.publicUrl;
}