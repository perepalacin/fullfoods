"use client";

import createSupabaseClientClient from "@/lib/supabase/client";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

export default function AuthUI() {
  const supabase = createSupabaseClientClient();
  return (
    <div className="flex flex-col space-y-4 w-96">
        <div className="dark:hidden block">
      <Auth
        magicLink
        providers={["google"]}
        supabaseClient={supabase}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: "#16A34A",
                brandAccent: "#16A34A",
              },
            },
          },
        }}
      />
      </div>
      <div className="hidden dark:block">
      <Auth
        theme="dark"
        magicLink
        providers={["google"]}
        supabaseClient={supabase}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: "#22C55E",
                brandAccent: "#22C55E",
              },
            },
          },
        }}
      />
      </div>
    </div>
  );
}
