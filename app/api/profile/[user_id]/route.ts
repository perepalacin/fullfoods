import { readUserSession } from "@/actions/auth/actions";
import { type CookieOptions, createServerClient } from '@supabase/ssr'
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { user_id: string } }
  ) {

    try {
      const body = await req.json();
    const userData = await readUserSession();
      const { username, bio } = body;
        console.log("Hello world!");
      if (!params.user_id) {
        return new NextResponse("User ID is required", { status: 400 });
      }
  
      if (!userData.data.session) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
  
      if (!username || !bio) {
        return new NextResponse("Missing required fields", { status: 400 });
      };
  
      const cookieStore = cookies();
      const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          cookies: {
            get(name: string) {
              return cookieStore.get(name)?.value
            },
            set(name: string, value: string, options: CookieOptions) {
              cookieStore.set({ name, value, ...options })
            },
            remove(name: string, options: CookieOptions) {
              cookieStore.delete({ name, ...options })
            },
          },
        }
      )
      const { error } = await supabase.from('user_profiles').update({
        username: username,
        bio: bio,
      }).eq("user_id", params.user_id)
    return NextResponse.json("Profile Updated Succesfully");
    } catch (error) {
      console.log("User Profile Update Error", error);
      return new NextResponse("Internal Error", { status: 500 });
    }
  };
  