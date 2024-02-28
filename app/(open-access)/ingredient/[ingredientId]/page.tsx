//TODO: Make this page behind the middleware (Auth only)

import { readUserSession } from "@/actions/auth/actions";
import getIngredientById from "@/actions/getIngredientById";
import KcalsGraph from "@/components/KcalsGraph";
import { Separator } from "@/components/ui/separator";

import Image from "next/image";
import { redirect } from "next/navigation";

interface IngredientPageProps {
  params: {
    ingredientId: string;
  };
}

const page = async ({ params }: IngredientPageProps) => {

  const {data} = await readUserSession();
  if (!data.session) {
    return redirect("/");
  }

  const ingredient = await getIngredientById(params.ingredientId);

  var ingredientMacros = {
    prote: 0,
    carbs: 0,
    sugar: 0,
    fat: 0,
    saturatedFat: 0,
    salt: 0,
    fiber: 0,
    units: "g",
  };

  if (ingredient) {
    ingredientMacros = {
      prote: Number(ingredient.prote),
      carbs: Number(ingredient.carbs),
      sugar: Number(ingredient.sugar),
      fat: Number(ingredient.fat),
      saturatedFat: Number(ingredient.saturatedFat),
      salt: Number(ingredient.salt),
      fiber: Number(ingredient.fiber),
      units: ingredient.units,
    };
  } else {
    return <p>Sorry we couldn't find what you were looking for</p>;
  }

  return (
    <div className="relative flex flex-col items-center md:flex-row md:items-start w-full h-full mt-2 md:mt-10 gap-4">
      <div className="md:flex flex-col gap-4 hidden sticky top-20">
        <Image
          src={ingredient.image || "/emptydish.jpg"}
          alt="Ingredient's picture"
          width={300}
          height={300}
          className="rounded-md border sticky"
        />
        {/* <div className='flex flex-row gap-4 items-center justify-around'>
                    <div className=' flex flex-col gap-1 justify-center items-center'>
                        <BookmarkIcon className='w-4 h-4 md:w-6 md:h-6' />
                        Save
                    </div>
                    <div className='flex flex-col gap-1 justify-center items-center'>
                        <BanIcon className='w-4 h-4 md:w-6 md:h-6'/>
                        Block
                    </div>
                </div> */}
      </div>
      <div className="w-full flex flex-col px-4 gap-2 md:border-l-2 border-border items-start">
        <h1 className="text-2xl md:text-7xl font-bold">
          {ingredient.ingredientName}
        </h1>
        {/* TODO: Make this functionality useful only for logged in users! */}
        <div className="flex flex-row w-full justify-between items-center gap-4">
          {ingredient.brand ? (
            <p className="text-lg md:text-2xl font-semibold text-muted-foreground">
              Brand: <span className="text-foreground">{ingredient.brand}</span>
            </p>
          ) : (
            <p className="text-lg md:text-2xl font-semibold text-muted-foreground">
              Category:{" "}
              <span className="text-foreground">{ingredient.category}</span>
            </p>
          )}
        </div>
        <div className="md:hidden gap-4 flex flex-col w-full items-center justify-center">
          <Image
            src={ingredient.image || "/emptydish.jpg"}
            alt="Ingredient's picture"
            width={300}
            height={300}
            className="rounded-md border"
          />
          {/* <div className='flex flex-row gap-4 items-center justify-around'>
                    <div className=' flex flex-col gap-1 justify-center items-center'>
                        <BookmarkIcon className='w-4 h-4 md:w-6 md:h-6' />
                        Save
                    </div>
                    <div className='flex flex-col gap-1 justify-center items-center'>
                        <BanIcon className='w-4 h-4 md:w-6 md:h-6'/>
                        Block
                    </div>
            </div> */}
        </div>
        <Separator />
        {/* TODO: Fix this error */}
        <KcalsGraph {...ingredientMacros} />
        <Separator />

        {ingredient.alergies ? (
          <div>
            <p className="text-lg font-bold md:text-2xl">
              Alergies and intolerances:
            </p>
            {ingredient.alergies.map((item) => (
              <li key={item.alergyName} className="font-semibold text-lg">
                {item.alergyName}
              </li>
            ))}
          </div>
        ) : (
            <p className="text-lg font-bold md:text-2xl">
                No alergies or intolerances detected.
            </p>
        )}
      </div>
    </div>
  );
};

export default page;
