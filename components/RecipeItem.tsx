import {useLoadFoodImage} from "@/actions/recipes/get/actions";
import { RecipeItemProps, Recipes } from "@/types";
import { BookmarkIcon, CircleUserIcon, TimerIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";
import { RecipeCardImageSkeleton } from "./skeletos";
import { Skeleton } from "./ui/skeleton";
import SaveButton from "./SaveButton";

interface RecipeItemComponentProps {
  recipe: RecipeItemProps;
  displayAuthor: boolean
}

const RecipeItem = async ({ recipe, displayAuthor }: RecipeItemComponentProps) => {
  let imagePath: string | undefined;
  if (recipe.image) {
    imagePath = await useLoadFoodImage(recipe.image);
  }

  console.log(recipe);
  return (
    //TODO: Change the format of the card if there is no image associated to the dish
    <div className="relative" key={recipe.recipeId}>
      <Link href={`/recipe/${recipe.recipeId}`} className="peer">
        <div className="break-inside-avoid-column group w-full flex flex-col gap-1 md:gap-4 rounded-lg border border-border bg-card text-card-foreground shadow-sm  mb-4 hover:shadow-xl transition-shadow duration-300 cursor-pointer">
          <div className="group relative w-full overflow-clip">
            <Suspense fallback={<Skeleton className="w-full h-44 rounded-t-md" />}>
              {imagePath ? (
                <Image
                  src={imagePath || "/emptydish.jpg"}
                  alt="Image of the dish"
                  width={300}
                  height={300}
                  className="w-full rounded-t-md"
                />
              ) : (
                <></>
              )}
            </Suspense>
            <p className="absolute top-2 left-2 bg-secondary/30 backdrop-blur-md px-2 rounded-md">
              Difficulty: {recipe.difficulty}
            </p>
            <p className="absolute bottom-2 left-2 bg-secondary/30 backdrop-blur-md px-2 rounded-md">
              {/* TODO: Add the nº of ingredients! */}
              {recipe.nOfIngredients} ingredient
              {recipe.nOfIngredients > 1 ? "s" : ""}
            </p>
            <div className="absolute flex flex-row gap-1 items-center bottom-2 right-2 bg-secondary/30 backdrop-blur-md px-2 rounded-md">
              <TimerIcon className="w-4 h-4" />
              <p>{recipe.time}</p>
            </div>
          </div>
          <div className="group px-1.5 md:px-4 pb-1 md:pb-2 flex flex-col md:gap-2">
            <p className="group group-hover:underline text-lg md:text-xl font-semibold">
              {recipe.recipeName}
            </p>
            <p className="text-sm md:text-base text-muted-foreground">
              {recipe.briefDescription}
            </p>
            {displayAuthor ?
              <hr className="border-0 bg-border h-px w-full mb-1"/>
            :
              <></>
            }
            {displayAuthor ? 
            <div className="flex flex-row justify-between items-center">
              {/* This may turn into a rating system */}
              <div className="flex flex-row items-center gap-1">
                <BookmarkIcon className="w-4 h-4 text-muted-foreground" />
                {recipe.savedTimes}
              </div>
              {/* turn this into an Linkt to navigate to the user page! */}
              <Link
              href = {`/profile/${recipe.user_profiles.username}/posts`} 
              className="flex flex-row items-center gap-1 hover:underline cursor-pointer">
                <CircleUserIcon className="w-4 h-4" />
                {/* TODO: */}
                <p className="italic">@{recipe.user_profiles.username}</p>
              </Link>
            </div>
              :
              <></>
              }
          </div>
        </div>
      </Link>
      
      {/* TODO: SAVE Button only for AUth users! */}
      <div className="opacity-0 drop-shadow-md absolute right-2 top-2 flex flex-row gap-1.5 transition translate translate-x-1/4 peer-hover:opacity-100 peer-hover:translate-x-0 hover:opacity-100 hover:translate-x-0">
        <SaveButton recipeId={recipe.recipeId} />
      </div>
    </div>
  );
};

export default RecipeItem;
