import { getCategories, getRecipeItems, getRecipeItemsSearchResults } from '@/actions/recipes/get/actions';
import CategoriesSlider from '@/components/CategorySlider';
import PageContent from '@/components/ExploreRecipesContent';
import Searchbar from '@/components/Searchbar';
import { RecipeItemProps, Recipes } from '@/types';
import React from 'react'

export const revalidate = 0;

interface RootPageProps {
    searchParams: {
      category: string;
      query: string;
    }
  }

const page = async ({searchParams}: RootPageProps) => {

    var recipes: RecipeItemProps[] = []
    const categories = await getCategories();

    if (searchParams.query || searchParams.category) {
      recipes = await getRecipeItemsSearchResults(searchParams.query, searchParams.category);
    } else {
      recipes = await getRecipeItems();
    } 

  return (
    <div className='flex flex-col gap-2 h-full'>
        <Searchbar emptyPlaceholder= 'Search for recipes by name or author'/>
        <CategoriesSlider data = {categories}/>
        <PageContent recipes = {recipes} displayAuthor = {true}/>
    </div>
  )
}

export default page