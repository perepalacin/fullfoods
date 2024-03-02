import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import {
  BookMarked,
  BookmarkIcon,
  CircleUserIcon,
  TimerIcon,
  UserRoundIcon,
} from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { Button } from "./ui/button";
import { RecipeItemProps, Recipes } from "@/types";
import RecipeItem from "./RecipeItem";

//TODO: REname this component to ExplorePageContent

interface recipesProps {
  recipes: RecipeItemProps[];
  displayAuthor: boolean
}

const ExploreRecipesContent = ({ recipes, displayAuthor }: recipesProps) => {

    if (recipes.length === 0) {
        return (
            <p>Sorry we couldn't find what you were looking for!</p>
        )
    }

    //TODO: Add a return if the lenght of recipes is 0 saying somehting like: Sorry we couldnt find what you wew looking for
  return (
    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:colums-5 2xl:colums-6 gap-4 h-full">
      {recipes.map((item) => (
        <RecipeItem recipe={item} key={item.recipeId} displayAuthor={displayAuthor}/>
      ))}
    </div>
  );
};

export default ExploreRecipesContent;
