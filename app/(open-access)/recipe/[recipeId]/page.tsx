"use server";
import {getRecipeById, getRecipeIngAndQuantbyId, useLoadFoodImage} from "@/actions/recipes/get/actions";
import RecipeMacros from "@/components/RecipeMacros";
import RecipeSteps from "@/components/RecipeSteps";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Recipes, recipeIngredientAndQuantities } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";

interface RecipePageProps {
  params: {
    recipeId: string;
  };
}

const page = async ({ params }: RecipePageProps) => {
  //Function that fetches the recipe data included the ingredients info
  const recipe: Recipes = await getRecipeById(params.recipeId);
  const recipeIngAndQuant: recipeIngredientAndQuantities[] =
    await getRecipeIngAndQuantbyId(params.recipeId);

  let imagePath: string | undefined;
  if (recipe.image) {
    imagePath = await useLoadFoodImage(recipe.image);
  }

  if (!recipe) {
    return (
      //TODO: Create this message
      <p>Sorry we coulnd't find the page you are looking for</p>
    );
  }

  return (
    <div className="flex flex-col gap-4 pb-20">
      <div className="w-full flex flex-col md:flex-row gap-1 md:gap-4">
        <div className="order-2 md:order-1 w-full md:w-1/2 flex flex-col gap-2 md:gap-4 justify-center items-start md:items-center">
          <h1 className="text-2xl md:text-4xl 2xl:text-7xl font-bold text-left md:text-center">
            {recipe.recipeName}
          </h1>
          <p className="italic w-full  text-left md:text-center text-muted-foreground">
            by:{" "}
            <Link 
            href = {`/profile/${recipe.user_profiles.username}/posts`} 
            className="text-foreground font-semibold cursor-pointer hover:underline"
            >
              @{recipe.user_profiles.username}
            </Link>
          </p>
          {/* TODO: Convert this into the save row! */}
          <div className="hidden md:flex md:flex-row w-full justify-between">
            <p className="w-full text-center text-muted-foreground">
              Saved:{" "}
              <span className="text-foreground font-semibold cursor-pointer">
                {recipe.savedTimes} times
              </span>
            </p>
            <p className="w-full text-center text-muted-foreground">
              Difficulty:{" "}
              <span className="text-foreground font-semibold cursor-pointer">
                {recipe.difficulty}
              </span>
            </p>
            <p className="w-full text-center text-muted-foreground">
              Time:{" "}
              <span className="text-foreground font-semibold cursor-pointer">
                {recipe.time}
              </span>
            </p>
            <p className="w-full text-center text-muted-foreground">
              Ingredients:{" "}
              <span className="text-foreground font-semibold cursor-pointer">
                {recipe.nOfIngredients}
              </span>
            </p>
          </div>
          <p className="line-clamp-6">{recipe.briefDescription}</p>
        </div>
        <div className="order-1 md:order-2 w-full md:w-1/2 relative">
          <Suspense
            fallback={
            <Skeleton className="w-full h-44 rounded-t-md" />
            }
          >
            {imagePath ? (
              <Image
                src={imagePath}
                alt="Image of the dish"
                width={1200}
                height={1200}
                className="w-full object-cover rounded-md max-h-[300px] md:max-h-[400px] xl:max-h-[550px]"
              />
            ) : (
              <></>
            )}
          </Suspense>
          <div className="block md:hidden absolute top-2 left-2 rounded-md py-1 px-2 bg-secondary/50">
            <p className="w-full text-center">
              Saved:{" "}
              <span className="font-semibold">{recipe.savedTimes} times</span>
            </p>
          </div>
          <div className="block md:hidden absolute top-2 right-2 rounded-md py-1 px-2 bg-secondary/50">
            <p className="w-full text-center">
              Difficulty:{" "}
              <span className="font-semibold">{recipe.difficulty}</span>
            </p>
          </div>
          <div className="block md:hidden absolute bottom-2 left-2 rounded-md py-1 px-2 bg-secondary/50">
            <p className="w-full text-center">
              Time: <span className="font-semibold">{recipe.time}</span>
            </p>
          </div>
          <div className="block md:hidden absolute bottom-2 right-2 rounded-md py-1 px-2 bg-secondary/50">
            <p className="w-full text-center">
              <span className="font-semibold">{recipe.nOfIngredients}</span>{" "}
              ingredient{" "}
              {recipe.nOfIngredients && recipe.nOfIngredients > 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </div>
      {recipeIngAndQuant.length > 0 ? (
        //TODO: Fix this! Pass both the ingredients and the quantities together!
        //GOD BLESS SUPABASE!
        <RecipeMacros recipeIngredientQuantities={recipeIngAndQuant} />
      ) : (
        <></>
      )}
      <Separator />
      {recipe.steps ? <RecipeSteps steps={recipe.steps} /> : <></>}
    </div>
  );
};

export default page;
