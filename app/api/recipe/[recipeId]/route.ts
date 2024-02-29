import { readUserSession } from "@/actions/auth/actions";
import { getUserProfileByUserId } from "@/actions/profile/get/actions";
import createSupabaseServerClient from "@/lib/supabase/server";
import { userProfileDetails } from "@/types";
import { NextResponse } from "next/server";
import uniqid from "uniqid";

export async function PATCH(
    req: Request,
    { params }: { params: { recipeId: string } }
  ) {
    try {
        
    const supabase = await createSupabaseServerClient();

    const {data} = await readUserSession();
    if (!data.session) {
        return new NextResponse("Unauthorized", { status: 401 });
    }


  const profileDetails: userProfileDetails = await getUserProfileByUserId(
    data.session.user.id
  );
  
    //Check if the user id is the same as the one that created the recipe!
  
      const info = await req.formData();
      const recipeId = String(info.get('recipeId'));
      const recipeName = info.get('recipeName');
      const briefDescription = info.get('briefDescription');
      const difficulty = info.get('difficulty');
      const time = info.get('time');
      const oldImage = String(info.get('oldImage'));
      const imageFile = info.get('imageFile');
      const kcals = Number(info.get('kcals'));
      const prote = Number(info.get('prote'));
      const carbs = Number(info.get('carbs'));
      const sugar = Number(info.get('sugar'));
      const fat = Number(info.get('fat'));
      const saturatedFat = Number(info.get('saturatedFat'));
      const fiber = Number(info.get('fiber'));
      const salt = Number(info.get('salt'));
      const nOfIngredients = Number(info.get('nOfIngredients'));
      const steps = JSON.parse(String(info.get('steps')));
      const ingAndQuants = JSON.parse(String(info.get('ingAndQuants')));

      const uniqueID = uniqid();
      if (imageFile) {
        //Upload image
        const {
            data: imageData,
            error: imageError,
        } 
            = await supabase.storage.
            from("images").
            upload(`image-${uniqueID}`, imageFile, {cacheControl:"3600", upsert: false});    
    }

    const {error: recipeError} = await supabase.from("recipes").insert({
            recipeId: recipeId,
            recipeName: recipeName,
            briefDescription: briefDescription,
            difficulty: difficulty,
            time: time,
            image: `image-${uniqueID}`,
            kcals: kcals,
            prote: prote,
            carbs: carbs,
            sugar: sugar,
            fat: fat,
            saturatedFat: saturatedFat,
            salt: salt,
            fiber: fiber,
            steps: steps,
            nOfIngredients: nOfIngredients,
            author_username: profileDetails.username,
          });      

    for (let i = 0; i < ingAndQuants.length; i++) {
        const {error} = await supabase.from("ingredientsToRecipes").insert({
            recipeId: recipeId,
            ingredientId: ingAndQuants[i][0],
            quantity: ingAndQuants[i][1],
        });
    }
    return NextResponse.json("Profile Updated Succesfully");
    } catch (error) {
      console.log("User Profile Update Error", error);
      return new NextResponse("Internal Error", { status: 500 });
    }
  };
  