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
      if (params.recipeId.slice(0, -1) !== recipeId) {
        throw new Error("There is a missmatch with the recipe Id, please check the URL");
      }
      const recipeName = info.get('recipeName');
      const briefDescription = info.get('briefDescription');
      const difficulty = info.get('difficulty');
      const time = info.get('time');
      const imagePath = String(info.get('imagePath'));
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

      console.log("Old image URL: " + imagePath.split('/'));
      const urlSegments = imagePath.split('/');
      const imageId = urlSegments[urlSegments.length - 1];

      if (imageFile) {
        const { data, error: imageError } = await supabase
        .storage
        .from('images')
        .update(imageId, imageFile, {
          cacheControl: '5',
          upsert: true
        }); 
        if (imageError) {
          throw new Error("Failed to update the recipe image");
        }
      };
      
      const { error: recipeError } = await supabase.from('recipes').update({
            recipeId: recipeId,
            recipeName: recipeName,
            briefDescription: briefDescription,
            difficulty: difficulty,
            time: time,
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
      }).eq("recipeId", recipeId);

      if (recipeError) {
        throw new Error("Failed to upload the recipe values");
      };

      const { error: relationDeleteError } = await supabase
        .from('ingredientsToRecipes')
        .delete()
        .eq('recipeId', recipeId);

      if (relationDeleteError) {
        throw new Error("Failed to delete existing relattions");
      }

      for (let i = 0; i < ingAndQuants.length; i++) {
        const {error: relationCreateError} = await supabase.from("ingredientsToRecipes").insert({
            recipeId: recipeId,
            ingredientId: ingAndQuants[i][0],
            quantity: ingAndQuants[i][1],
        });
        if (relationCreateError) {
          throw new Error("Failed to create a new relation");
        }
    }
    return NextResponse.json("Profile Updated Succesfully");
    } catch (error) {
      console.log("Recipe Update Error", error);
      return new NextResponse("Internal Error", { status: 500 });
    }
  };
  