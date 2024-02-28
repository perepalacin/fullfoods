import createSupabaseServerClient from "@/lib/supabase/server";
import { Button } from "../ui/button";
import { redirect } from "next/navigation";

export default function SignOut () {

    const logout = async () => {
        "use server";
        const supabase = await createSupabaseServerClient();
        await supabase.auth.signOut();
        redirect("/");
    }

    return (
        <form action={logout}>
            <Button variant={"mainbutton"}>Sign Out</Button>
        </form>
    )
}