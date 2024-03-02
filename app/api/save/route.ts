import { readUserSession } from "@/actions/auth/actions";
import { getRecipeSavedTimes } from "@/actions/recipes/get/actions";
import createSupabaseServerClient from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
  ) {

    try {
        const body = await req.json();
        const {recipeId} = body;
        const userData = await readUserSession();
      if (!userData.data.session) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
  
        var savedTimes = await getRecipeSavedTimes(recipeId) + 1;

      const supabase = await createSupabaseServerClient();

      const { error } = await supabase.from('saved_recipes').insert({
        recipeId: recipeId
      });

      // const { error: updateSavedTimesError } = await supabase.from('recipes').update({
      //   savedTimes: savedTimes
      // }).eq("recipeId", recipeId);
      // if (error) {
      //   throw new Error("Could not save recipe");
      // }
      // if (updateSavedTimesError) {
      //   throw new Error("Could update save count");
      // }
    return NextResponse.json("Recipe Saved Succesfully");
    } catch (error) {
      console.log("Could not save recipe", error);
      return new NextResponse("Internal Error", { status: 500 });
    }
  };
  