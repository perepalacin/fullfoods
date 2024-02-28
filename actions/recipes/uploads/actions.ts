'use server'

import createSupabaseServerClient from '@/lib/supabase/server'
import { UploadRecipeProps } from '@/types'
import { redirect } from 'next/navigation'

export async function UploadRecipe(values: UploadRecipeProps) {

    const supabase = await createSupabaseServerClient();

  const { error } = await supabase.from("recipes").insert({
    recipeName: values.recipeName,
    briefDescription: values.briefDescription,
    difficulty: values.difficulty,
    time: values.time,
    image: "12345678",
    kcals: values.kcals,
    prote: values.prote,
    carbs: values.carbs,
    sugar: values.sugar,
    fat: values.fat,
    saturatedFat: values.saturatedFat,
    salt: values.salt,
    fiber: values.fiber,
    steps: values.steps,
    nOfIngredients: values.ingAndQuant.length,
    author_username: "FullFoods",
  })

  if (error) {
    console.log("Error");
  }
}
