import { readUserSession } from '@/actions/auth/actions';
import getRecipeById from '@/actions/getRecipeById';
import getRecipeQuantities from '@/actions/getRecipeQuantities';
import CreateRecipeForm from '@/components/CreateRecipeForm';
import { Recipes, recipeIngredientAndQuantities } from '@/types';
import { redirect } from 'next/navigation';
import React from 'react'

interface CreateRecipePageProps {
    params: {
        recipeId: string;
    };
};

//PAGE TO CREATE OR EDIT NEW RECIPES
const CreateRecipePage = async ({params}: CreateRecipePageProps) => {
  const {data} = await readUserSession();
  if (!data.session) {
    return redirect("/");
  } else {
    console.log(data.session.user.id);
  }
    if (params.recipeId !== "new") {
        const recipe: Recipes = await getRecipeById(params.recipeId);
        const recipeIngAndQuant: recipeIngredientAndQuantities[] = await getRecipeQuantities(params.recipeId);      
        return (
            <CreateRecipeForm originalRecipe={recipe} OriginalRecipeIngAndQuant={recipeIngAndQuant}/>
        )
    }

  return (
    <CreateRecipeForm originalRecipe={null} OriginalRecipeIngAndQuant={null}/>
  )
}

export default CreateRecipePage;