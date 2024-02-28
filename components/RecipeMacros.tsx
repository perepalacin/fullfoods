"use client";

//THIS COMPONENT CONTAINS ALL THE LOGIC AND RENDERING REGARDING A SINGLE RECIPE AND HOW THE INGREDIENTS OF IT
//ARE ADDED AND MANAGED, QUANTITIES, ETC...
import React, { ChangeEventHandler, useEffect, useState } from "react";
import KcalsGraph from "./KcalsGraph";
import { Button } from "./ui/button";
import { Repeat2Icon, XIcon } from "lucide-react";
import { Separator } from "./ui/separator";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import Link from "next/link";
import toast from "react-hot-toast";
import DrawerAddElement from "./DrawerAddElement";
import Searchbar from "./Searchbar";
import { useDebounce } from "@/app/hooks/use-debounce";
import { ExportMacrosProps, Ingredients, recipeIngredientAndQuantities } from "@/types";

interface RecipeMacrosProps {
  //Array that holds the info of the ingredients and its quantities:
  recipeIngredientQuantities: recipeIngredientAndQuantities[]
  
  //This allows to call a function on the parent component so that it can receive the list of ingredients.
  exportIngredientList?: (IngredientIdAndQuant: ExportMacrosProps) => void;
}

const RecipeMacros: React.FC<RecipeMacrosProps> = ({
  recipeIngredientQuantities,
  exportIngredientList,
}) => {
  //State that holds each ingredient and it's quantity on it.

  const [recipeIngAndQuant, setRecipeIngAndQuant] = useState<recipeIngredientAndQuantities[]>(recipeIngredientQuantities);
  
  //Function that handles the change in the quantities of each ingredient
  const handleChange = (text: string, key: number) => {
     if (Number(text) <= 0) {
       toast.error("Please provide a positive value", {id: "negativeNumber"});
       return null;
     }
     setRecipeIngAndQuant(prevValues => {
      const newArray = [...prevValues];
      newArray[key].quantity = Number(text);
      return newArray;
     });
  };

  //Function that handles adding or switching ingredients
  const addSwitchNewIngredients = (key: number | null, newIngredient: Ingredients) => {
     for (let i = 0; i < recipeIngAndQuant.length; i++) {
      if (recipeIngAndQuant[i].ingredients.ingredientId === newIngredient.ingredientId) {
         toast.error("This ingredient is already in the recipe", {id: "repeatedIngredient"})
         return (null);
       }
     }
    if (key !== null) {
      if (newIngredient.units === "pieces") {
        setRecipeIngAndQuant(prevValues => {
          const newArray = [...prevValues];
          newArray[key].quantity = 1;
          return newArray;
        });
      } else {
        setRecipeIngAndQuant(prevValues => {
          const newArray = [...prevValues];
          newArray[key].quantity = 100;
          return newArray;
        });
      }
      setRecipeIngAndQuant(prevValues => {
        const newArray = [...prevValues];
        newArray[key].ingredients = newIngredient;
        return newArray;
      });
    } else {
        setRecipeIngAndQuant(prevValues => {
          const newArray = [...prevValues];
          // Create a new object with the quantity and ingredient values
          const newRecipeIngredientQuantity: recipeIngredientAndQuantities = {
              quantity: newIngredient.units === "pieces" ? 1 : 100, // Assuming the quantity is always 1, change it if necessary
              ingredients: newIngredient
          };
          // Push the new object into the array
          newArray.push(newRecipeIngredientQuantity);
          return newArray;
        });
    }
  };

  //Function that calculates the macros of the recipe
  const setMacros = () => {
    const newArray = {
      prote: 0,
      carbs: 0,
      sugar: 0,
      fat: 0,
      saturatedFat: 0,
      salt: 0,
      fiber: 0,
      units: "serving",
    };
    for (let i = 0; i < recipeIngAndQuant.length; i++) {
      //TODO: WE will have to revisit this when we add units!
      if (recipeIngAndQuant[i].ingredients.units === "pieces") {
      newArray.prote =
        newArray.prote +
        (Number(recipeIngAndQuant[i].ingredients.prote) * Number(recipeIngAndQuant[i].quantity));
      newArray.carbs =
        newArray.carbs +
        (Number(recipeIngAndQuant[i].ingredients.carbs) * Number(recipeIngAndQuant[i].quantity));
      newArray.sugar =
        newArray.sugar +
        (Number(recipeIngAndQuant[i].ingredients.sugar) * Number(recipeIngAndQuant[i].quantity));
      newArray.fat =
        newArray.fat +
        (Number(recipeIngAndQuant[i].ingredients.fat) * Number(recipeIngAndQuant[i].quantity));
      newArray.saturatedFat =
        newArray.saturatedFat +
        (Number(recipeIngAndQuant[i].ingredients.saturatedFat) * Number(recipeIngAndQuant[i].quantity));
      newArray.salt =
        newArray.salt +
        (Number(recipeIngAndQuant[i].ingredients.salt) * Number(recipeIngAndQuant[i].quantity));
      newArray.fiber =
        newArray.fiber +
        (Number(recipeIngAndQuant[i].ingredients.fiber) * Number(recipeIngAndQuant[i].quantity));
    } else {
        newArray.prote =
          newArray.prote +
          (Number(recipeIngAndQuant[i].ingredients.prote) * Number(recipeIngAndQuant[i].quantity)) / 100;
        newArray.carbs =
          newArray.carbs +
          (Number(recipeIngAndQuant[i].ingredients.carbs) * Number(recipeIngAndQuant[i].quantity)) / 100;
        newArray.sugar =
          newArray.sugar +
          (Number(recipeIngAndQuant[i].ingredients.sugar) * Number(recipeIngAndQuant[i].quantity)) / 100;
        newArray.fat =
          newArray.fat +
          (Number(recipeIngAndQuant[i].ingredients.fat) * Number(recipeIngAndQuant[i].quantity)) / 100;
        newArray.saturatedFat =
          newArray.saturatedFat +
          (Number(recipeIngAndQuant[i].ingredients.saturatedFat) * Number(recipeIngAndQuant[i].quantity)) / 100;
        newArray.salt =
          newArray.salt +
          (Number(recipeIngAndQuant[i].ingredients.salt) * Number(recipeIngAndQuant[i].quantity)) / 100;
        newArray.fiber =
          newArray.fiber +
          (Number(recipeIngAndQuant[i].ingredients.fiber) * Number(recipeIngAndQuant[i].quantity)) / 100;
    }
  }
    setRecipeMacros(newArray);
  };

  //State that displays the macros
  const [recipeMacros, setRecipeMacros] = useState({
    prote: 0,
    carbs: 0,
    sugar: 0,
    fat: 0,
    saturatedFat: 0,
    salt: 0,
    fiber: 0,
    units: "serving",
  });

  //useEffect to calculate the macros on first page load.
  useEffect(() => {
    setMacros();
  }, []);

  //useEffect that calculates the macros everytime we edit the quantities, add or substract an ingredient
  useEffect(() => {
    setMacros();
    //We also use this rerender to export the data if it is requested by parent component!
  if (exportIngredientList) {
    const exportMacros: ExportMacrosProps = {
      ingAndQuant: [],
      kcals: recipeMacros.carbs*4 + recipeMacros.prote*4 + recipeMacros.fat*8,
      prote: recipeMacros.prote,
      carbs: recipeMacros.carbs,
      sugar: recipeMacros.sugar,
      fat: recipeMacros.fat,
      saturatedFat: recipeMacros.saturatedFat,
      salt: recipeMacros.salt,
      fiber: recipeMacros.fiber,
    }
    for(let i = 0; i<recipeIngAndQuant.length; i++) {
      exportMacros.ingAndQuant.push([recipeIngAndQuant[i].ingredients.ingredientId, recipeIngAndQuant[i].quantity]);
    }
    exportIngredientList(exportMacros);
   }
  }, [recipeIngAndQuant]);



  //Function that handles the delete of an ingredient.
  const handleDelete = (key: number) => {
  //   //TODO: Make the toast error dark mode!
    if(recipeIngAndQuant.length === 1) {
      toast.error("You can't delete all the ingredients in a recipe", {
        ariaProps: {
          role: 'status',
          'aria-live': 'polite',
      }, 
    id: "emptyList"});
    } else {
      setRecipeIngAndQuant(prevValue => {
        const newArray = prevValue.slice(0, key).concat(prevValue.slice(key + 1));
        return newArray;
      })
  }
  };

  return (
    <div className="flex flex-col gap-2">
      <KcalsGraph {...recipeMacros} />
      <Separator />
      <div>
        <table className="w-full text-left">
          <thead className="pt-4">
            <tr className="w-full border-b border-border">
              <th
                className="lg:w-4/6 text-lg font-bold md:text-2xl"
                scope="col"
              >
                Ingredient List:{" "}
                <span className="font-normal">per 1 serving</span>
              </th>
              <th
                className="min-w-1/6 text-foreground-muted text-lg font-bold md:text-2xl hidden md:block text-center align-bottom"
                scope="col"
              >
                <p>Quantity</p>
              </th>
              <th
                className="w-1/4 md:w-36 text-foreground-muted font-normal"
                scope="col"
              >
                <div className="flex flex-row justify-end w-full md:mb-2">
                  <DrawerAddElement prompt="ingredient" isReplace={false} addSwitchNewIngredient = {addSwitchNewIngredients} indexToReplace={null} ingredientToReplace={null}/>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="">
            {recipeIngAndQuant.map((item: recipeIngredientAndQuantities, key: number) => {
              return (
                <tr
                  key={item.ingredients.ingredientId}
                  className="w-full hover:bg-accent dark:hover:bg-card border-b border-border transition-colors duration-300"
                >
                  <th className="relative py-2 px-2">
                    <p className="hover:underline peer max-w-fit">
                      <Link href={`/ingredient/${item.ingredients.ingredientId}`}>- {item.ingredients.ingredientName}</Link>
                    </p>
                    <div className="flex flex-row md:hidden items-center gap-2 mt-2">
                      <Input
                        type="number"
                        value={item.quantity}
                        className="max-w-24 text-center"
                        onChange={(e) => handleChange(e.target.value, key)}
                      />
                      {
                        item.ingredients.units === "pieces"
                      ?
                        <p className="font-normal">per unit {item.quantity> 1 ? "s" : ""}</p>
                      :
                        <p className="font-normal">{item.ingredients.units}</p>
                      }
                    </div>
                    <Card className="hidden absolute my-1 md:peer-hover:flex flex-col gap-2 p-4 z-30 text-nowrap font-normal">
                      <p className="text-lg underline font-semibold">
                        Nutrition facts per {item.ingredients.units === "pieces" ? "unit" : "100" + item.ingredients.units} of product:
                      </p>
                      <p>
                        <span className="font-semibold">
                          {(
                            //TODO: Ensure the numbers match!
                            Math.round(
                              Number(item.ingredients.kcals) * Number(item.quantity)
                            ) / 100
                          ).toString()}
                        </span>{" "}
                        kcals
                      </p>
                      <p>
                        <span className="font-semibold">
                          {(
                            Math.round(
                              Number(item.ingredients.prote) * Number(item.quantity)
                            ) / 100
                          ).toString()}{" "}
                          g
                        </span>{" "}
                        of Protein
                      </p>
                      <p>
                        <span className="font-semibold">
                          {(
                            Math.round(
                              Number(item.ingredients.carbs) * Number(item.quantity)
                            ) / 100
                          ).toString()}{" "}
                          g
                        </span>{" "}
                        of Carbohydrates of which sugars:{" "}
                        <span className="font-semibold">
                          {(
                            Math.round(
                              Number(item.ingredients.sugar) * Number(item.quantity)
                            ) / 100
                          ).toString()}{" "}
                          g
                        </span>
                      </p>
                      <p>
                        <span className="font-semibold">
                          {(
                            Math.round(
                              Number(item.ingredients.fat) * Number(item.quantity)
                            ) / 100
                          ).toString()}{" "}
                          g
                        </span>{" "}
                        of Fat of which saturated:{" "}
                        <span className="font-semibold">
                          {(
                            Math.round(
                              Number(item.ingredients.saturatedFat) *
                                Number(item.quantity)
                            ) / 100
                          ).toString()}{" "}
                          g
                        </span>
                      </p>
                      <p>
                        <span className="font-semibold">
                          {(
                            Math.round(
                              Number(item.ingredients.salt) * Number(item.quantity)
                            ) / 100
                          ).toString()}{" "}
                          g
                        </span>{" "}
                        of Salt
                      </p>
                      <p>
                        <span className="font-semibold">
                          {(
                            Math.round(
                              Number(item.ingredients.fiber) * Number(item.quantity)
                            ) / 100
                          ).toString()}{" "}
                          g
                        </span>{" "}
                        of Fiber
                      </p>
                    </Card>
                  </th>
                  <th className="hidden align-center py-2 md:flex justify-center items-center gap-2 w-full">
                    <Input
                      type="number"
                      value={item.quantity}
                      className="max-w-24 text-center"
                      onChange={(e) => handleChange(e.target.value, key)}
                    />
                    {
                        item.ingredients.units === "pieces"
                      ?
                        <p className="font-normal text-xs md:text-base">unit {item.quantity > 1 ? "s" : ""}</p>
                      :
                        <p className="font-normal text-xs md:text-base">{item.ingredients.units}</p>
                      }
                  </th>
                  <th className="text-right md:text-center">
                    <div className="flex flex-row justify-end md:justify-center">
                      <DrawerAddElement prompt="ingredient" isReplace={true} addSwitchNewIngredient = {addSwitchNewIngredients} indexToReplace={key} ingredientToReplace={item.ingredients}/>
                      <Button
                        size={"icon"}
                        variant={"ghost"}
                        type="button"
                        className="rounded-full hover:text-primary active:bg-primary/30"
                        onClick= {() => handleDelete(key)}
                      >
                        <XIcon />
                      </Button>
                      </div>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecipeMacros;
