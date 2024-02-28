"use client";

import { Button } from "@/components/ui/button";
import { createBrowserClient } from "@supabase/ssr";
import Image from "next/image";
import React from "react";

export default function OAuthForm() {

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )

    const LoginWithGoogle = () => {
        supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${location.origin}/auth/callback`,
            }
        })

    }

	return (
        <Button 
        className="w-full flex flex-row gap-2"
        onClick={LoginWithGoogle}
        variant={"outline"}
        >
            <Image 
            src={"/Google__G__logo.svg.png"}
            alt="Google's Icon"
            width={14}
            height={14}/>
            Log in With Google
        </Button>
    );
}