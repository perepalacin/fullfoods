"use server";

//https://www.youtube.com/watch?v=PdmKlne1gRY&t=626s&ab_channel=DailyWebCoding
import createSupabaseServerClient from "@/lib/supabase/server";


//FUNCTION TO GET THE CURRENT USER
export async function readUserSession() {
    "use server";
    const supabase = await createSupabaseServerClient();
    return supabase.auth.getSession();
}

//FUCNTION TO HANDLE THE SIGN UP USING JUST EMAIL AND PASSWORD
export async function signUpWithEmailAndPassword(data: {
	email: string;
	password: string;
	confirm: string;
}) {
    const supabase = await createSupabaseServerClient();
    const result = await supabase.auth.signUp({
        email: data.email, 
        password: data.password
    });
    return JSON.stringify(result);
}

//FUNCTION TO HANDLE THE SIGN IN FOR USERS WITH EMAIL AND PASSWORD
export async function signInWithEmailAndPassword(data: {
	email: string;
	password: string;
}) {
    const supabase = await createSupabaseServerClient();
    const result = await supabase.auth.signInWithPassword({
        email: data.email, 
        password: data.password
    });
    return JSON.stringify(result);
}