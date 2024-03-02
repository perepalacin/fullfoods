import { readUserSession } from "@/actions/auth/actions";
import createSupabaseServerClient from "@/lib/supabase/server";
import { type CookieOptions, createServerClient } from '@supabase/ssr'
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { user_id: string } }
  ) {
    try {

      const userData = await readUserSession();
      if (!params.user_id) {
        return new NextResponse("User ID is required", { status: 400 });
      }
  
      if (!userData.data.session) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
  
      const info = await req.formData();
      const path = String(info.get('path'));
      const avatarFile = info.get('image');

      if (!avatarFile) {
        return new NextResponse("Missing required fields", { status: 400 });
      };
      
      const supabase = await createSupabaseServerClient();

      const { data, error } = await supabase
      .storage
      .from('profile_pictures')
      .update(path, avatarFile, {
        cacheControl: '5',
        upsert: true
      });
      
    return NextResponse.json("Profile Updated Succesfully");
    } catch (error) {
      console.log("User Profile Update Error", error);
      return new NextResponse("Internal Error", { status: 500 });
    }
  };
  