"use client";

import {
  ExportMacrosProps,
  Recipes,
  UploadRecipeProps,
  recipeIngredientAndQuantities,
} from "@/types";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  BarChartIcon,
  Loader2Icon,
  RocketIcon,
  Router,
  TimerIcon,
  XIcon,
} from "lucide-react";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import RecipeMacros from "./RecipeMacros";
import DrawerAddElement from "./DrawerAddElement";
import toast from "react-hot-toast";
import uniqid from "uniqid";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import createSupabaseClientClient from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useLoadFoodImage } from "@/actions/recipes/get/actions";
import axios from "axios";

//Ingredient and quantities:
interface CreateRecipeFormProps {
  originalRecipe: Recipes | null;
  //Array that holds the info of the ingredients and its quantities:
  OriginalRecipeIngAndQuant: recipeIngredientAndQuantities[] | null;
  //Array that holds all the categories
  //categories: Categories[];
}

const CreateRecipeForm = ({
  originalRecipe,
  OriginalRecipeIngAndQuant,
}: //categories,
CreateRecipeFormProps) => {
  const router = useRouter();
  const supabase = createSupabaseClientClient();

  //States that regulat all the inputs inside the form.
  const [recipeName, setRecipeName] = useState<string>(
    originalRecipe?.recipeName || ""
  );
  const [validatedRecipeName, setValidatedRecipeName] = useState<string | null>(
    null
  );
  const [briefDescription, setBriefDescription] = useState<string>(
    originalRecipe?.briefDescription || ""
  );
  const [validatedbriefDescription, setValidatedBriefDescription] = useState<
    string | null
  >(null);
  const [oldImage, setOldImage] = useState<string | null>(
    originalRecipe?.image || null
  );
  const [newImage, setNewImage] = useState<File | null>(null);

  const [validatedImage, setValidatedImage] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState<string>(
    originalRecipe?.difficulty || ""
  );
  const [validatedDifficulty, setValidatedDifficulty] = useState<string | null>(
    null
  );
  const [time, setTime] = useState<string>(originalRecipe?.time || "");
  const [validatedTime, setValidatedTime] = useState<string | null>(null);
  const [steps, setSteps] = useState<string[]>(originalRecipe?.steps || []);
  const [validatedSteps, setValidatedSteps] = useState<string | null>(null);
  const initializeFakeSteps: boolean[] = [];
  if (originalRecipe?.steps) {
    for (let i = 0; i < originalRecipe.steps.length; i++) {
      if (originalRecipe.steps[i] !== "") {
        initializeFakeSteps.push(true);
      }
    }
  }
  const [fakeSteps, setFakeSteps] = useState<boolean[]>(
    initializeFakeSteps || null
  );
  const [recipeIngredientAndQuant, setRecipeIngAndQuant] = useState<
    recipeIngredientAndQuantities[]
  >(OriginalRecipeIngAndQuant || []);
  const [exportedIngAndQuantArray, setExportedIngAndQuantArray] =
    useState<ExportMacrosProps | null>(null);
  const [validatedIngAndQuant, setValidatedIntAndQuant] = useState<
    string | null
  >(null);

  //State that disables all forms during upload.
  const [isLoading, setIsLoading] = useState(false);

  //Function that handles the input change of all the forms
  const handleChange = (field: string, key: number | null, value: string) => {
    switch (field) {
      case "recipeName":
        setValidatedRecipeName(null);
        if (value.length > 50) {
          toast.error("The recipe name should be under 50 characters", {
            id: "recipeNameMaxLength",
          });
          break;
        }
        setRecipeName(value);
        break;
      case "briefDescription":
        setValidatedBriefDescription(null);
        if (value.length > 250) {
          toast.error("The description should be under 250 characters", {
            id: "recipeDescriptionMaxLength",
          });
          break;
        }
        setBriefDescription(value);
        break;
      // case "image":
      //   setValidatedImage(null);
      //   setImage(value);
      //   break;
      case "difficulty":
        setValidatedDifficulty(null);
        setDifficulty(value);
        break;
      case "time":
        setValidatedTime(null);
        setTime(value);
        break;
      case "steps":
        setValidatedSteps(null);
        if (key !== null) {
          if (value.length > 250) {
            toast.error(
              "Each step explanation should be under 250 characters",
              { id: "recipeStepMaxLength" }
            );
            break;
          }
          setSteps((prevSteps) => {
            const newArray = [...prevSteps];
            newArray[key] = value;
            return newArray;
          });
        }
        break;
    }
    return null;
  };

  //Function that handles when a new step for the recipe is created
  const handleCreateNewStep = () => {
    if (steps[steps.length - 1] === "" && steps.length !== 0) {
      toast.error("Please fill in the previous step before adding a new one", {
        id: "emptyPreviousStep",
      });
      return null;
    }
    setFakeSteps((prevFakeSteps) => {
      const newArray = [...prevFakeSteps];
      newArray.push(true);
      return newArray;
    });
    setSteps((prevSteps) => {
      const newArray = [...prevSteps];
      newArray.push("");
      return newArray;
    });
  };

  //Function that handles when a step is deleted.
  const handleDeleteStep = (key: number) => {
    setValidatedSteps(null);
    setFakeSteps((prevFakeSteps) => {
      const newArray = prevFakeSteps
        .slice(0, key)
        .concat(prevFakeSteps.slice(key + 1));
      return newArray;
    });

    setSteps((prevSteps) => {
      const newArray = prevSteps.slice(0, key).concat(prevSteps.slice(key + 1));
      return newArray;
    });
  };

  //Function that handles the import of ingredients from the recipeMacros component!
  const importIngredientList = (exportedIngAndQuant: ExportMacrosProps) => {
    setValidatedIntAndQuant(null);
    setExportedIngAndQuantArray(exportedIngAndQuant);
    return null;
  };

  //Function that handles the upload of the values onto our db
  const handleSubmit = async () => {
    var typeError = false;
    setIsLoading(true);
    //First we check that all required fields are included.
    if (!recipeName) {
      setValidatedRecipeName("Please give your recipe a name");
      typeError = true;
    }
    if (!difficulty) {
      setValidatedDifficulty("Please assign a difficulty to your recipe");
      typeError = true;
    }
    //This doesn't work yet
    if (!time) {
      setValidatedTime(
        "Please specify how long does your recipe take to prepare"
      );
      typeError = true;
    }
    if (!briefDescription) {
      setValidatedBriefDescription(
        "Please give your recipe a brief description"
      );
      typeError = true;
    }
    console.log(oldImage);
    if (!newImage && oldImage === null) {
      setValidatedImage("Please upload a picture of the cooked recipe");

      typeError = true;
    }
    if (steps.length === 0) {
      setValidatedSteps(
        "Please add instructions on how to elaborate your recipe"
      );

      typeError = true;
    } else {
      if (steps[steps.length] === "") {
        setValidatedSteps("Please do not leavy any recipe step empty.");
        typeError = true;
      }
    }
    if (
      !exportedIngAndQuantArray ||
      exportedIngAndQuantArray.ingAndQuant.length === 0
    ) {
      setValidatedIntAndQuant(
        "Please add at least one ingredient to your recipe"
      );

      typeError = true;
    }
    //This doesnt work because of the nature of the async state, the value gets validated after the if is accomplished,
    //thus the function keeps executing!
    if (typeError === true) {
      toast.error("Please fill in the required fields", {
        id: "missingFields",
      });
      setIsLoading(false);
      return null;
    }

    const uuid4: string = uuidv4();

    const formData = new FormData();
    if (exportedIngAndQuantArray) {
      formData.append("recipeId", originalRecipe?.recipeId || uuid4);
      formData.append("recipeName", recipeName);
      formData.append("briefDescription", briefDescription);
      formData.append("difficulty", difficulty);
      formData.append("time", time);
      if (oldImage) {
        formData.append("imagePath", oldImage);
      } else {
        formData.append("imagePath", "");
      }
      if (newImage) {
        
        formData.append("imageFile", newImage);
      }
      formData.append("kcals", exportedIngAndQuantArray.kcals.toString());
      formData.append("prote", exportedIngAndQuantArray.prote.toString());
      formData.append("carbs", exportedIngAndQuantArray.carbs.toString());
      formData.append("fat", exportedIngAndQuantArray.fat.toString());
      formData.append("sugar", exportedIngAndQuantArray.sugar.toString());
      formData.append("salt", exportedIngAndQuantArray.salt.toString());
      formData.append(
        "saturatedFat",
        exportedIngAndQuantArray.saturatedFat.toString()
      );
      formData.append("fiber", exportedIngAndQuantArray.fiber.toString());
      formData.append("steps", JSON.stringify(steps));
      formData.append(
        "ingAndQuants",
        JSON.stringify(exportedIngAndQuantArray.ingAndQuant)
      );
      formData.append(
        "nOfIngredients",
        exportedIngAndQuantArray.ingAndQuant.length.toString()
      );

      try {
        if (originalRecipe?.recipeId) {
          await axios.patch(
            `/api/recipe/${originalRecipe.recipeId}}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
              data: formData,
            }
          );
        } else {
          await axios.post(`/api/recipe`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            data: formData,
          });
        }
      } catch (error) {
        toast.error("Something went wrong, please try again later", {
          id: "profileUpdateError",
        });
        setIsLoading(false);
        return null;
      }
      toast.success("Recipe uploaded succesfully", {id: "successUpload"});
      const recipeId = originalRecipe?.recipeId || uuid4;
      router.push(`/recipe/${recipeId}`);
    } else {
      toast.error("Please add at least one ingredient to the recipe", {
        id: "missingIngredients",
      });
    }
  };

  return (
    <div className="flex flex-col gap-0 pb-20">
      {/* SUBMIT BUTTON */}
      <div className="w-full flex flex-col md:flex-row gap-2 md:gap-0 items-center justify-between">
        <p className="text-left md:text-2xl 2xl:text-3xl font-bold">
          Fill in the fields to create your own recipe
        </p>
        {/* TODO: if it's edit, change the text to Edit the fields to update your recipe! */}
        {/* TODO:  put this button inside the form so that it manages the submit. */}
        <Button
          type="submit"
          disabled={isLoading}
          variant={"mainbutton"}
          className="flex flex-row gap-2"
          onClick={handleSubmit}
        >
          {isLoading ? (
            <Loader2Icon className="animate-spin w-4 h-4" />
          ) : (
            <RocketIcon className="w-4 h-4" />
          )}
          Submit
        </Button>
      </div>
      <Separator className="" />
      <div className="flex flex-col gap-2 mt-4">
        <div className="w-full flex flex-col md:flex-row gap-1 md:gap-4">
          <div className="order-2 md:order-1 w-full md:w-1/2 flex flex-col gap-2 md:gap-4 justify-center items-center">
            {/* Recipe name */}
            <Textarea
              autoFocus={true}
              disabled={isLoading}
              placeholder="Recipe Name"
              rows={2}
              value={recipeName}
              onChange={(e) => {
                handleChange("recipeName", null, e.target.value);
              }}
              className="min-w-full border-dashed border-2 h-full text-2xl md:text-4xl 2xl:text-7xl font-bold focus:ring-0"
            />
            <p className="text-[red]">{validatedRecipeName}</p>
            <p className="italic w-full text-center text-muted-foreground">
              by:{" "}
              <span className="text-foreground font-semibold cursor-pointer hover:underline">
                @UserName
              </span>
            </p>
            <div className="flex flex-col lg:flex-row w-full items-center md:justify-around gap-2">
              {/* Difficulty */}
              <div className="flex flex-col gap-2">
                <div className="flex flex-row gap-2 items-center">
                  <BarChartIcon className="w-5 h-5" />
                  <p className="mr-2 text-lg font-semibold">Difficulty: </p>
                  <Select
                    disabled={isLoading}
                    defaultValue={difficulty}
                    onValueChange={(value) => {
                      handleChange("difficulty", null, value);
                    }}
                  >
                    <SelectTrigger className="w-[180px] border-border border-2 border-dashed">
                      <SelectValue placeholder="Select a difficulty" />
                    </SelectTrigger>
                    <SelectContent className="border-primary">
                      <SelectItem value="Easy">Easy</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <p className="text-[red]">{validatedDifficulty}</p>
              </div>
              {/* Time */}
              <div>
                <div className="flex flex-row items-center gap-2">
                  <TimerIcon className="w-5 h-5" />
                  <p className="mr-2   text-lg font-semibold">Time:</p>
                  <Select
                    disabled={isLoading}
                    defaultValue={time}
                    onValueChange={(value) => {
                      handleChange("time", null, value);
                    }}
                  >
                    <SelectTrigger className="w-[240px] border-border border-2 border-dashed">
                      <SelectValue placeholder="Select a cooking time" />
                    </SelectTrigger>
                    <SelectContent className="h-64 border-primary">
                      <SelectItem value="5 min">5 min</SelectItem>
                      <SelectItem value="10 min">10 min</SelectItem>
                      <SelectItem value="15 min">15 min</SelectItem>
                      <SelectItem value="20 min">20 min</SelectItem>
                      <SelectItem value="30 min">30 min</SelectItem>
                      <SelectItem value="45 min">45 min</SelectItem>
                      <SelectItem value="1 h">1 h</SelectItem>
                      <SelectItem value="1 h 15 min">1 h 15 min</SelectItem>
                      <SelectItem value="1 h 30 min">1 h 30 min</SelectItem>
                      <SelectItem value="1 h 45 min">1 h 45 min</SelectItem>
                      <SelectItem value="2 h">2 h</SelectItem>
                      <SelectItem value="2 h 15 min">2 h 15 min</SelectItem>
                      <SelectItem value="2 h 30 min">2 h 30 min</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <p className="text-[red]">{validatedTime}</p>
              </div>
            </div>
            {/* Description */}
            <div className="flex flex-col gap-2 w-full">
              <p className="font-semibold text-lg">Recipe description:</p>
              <Textarea
                autoFocus={false}
                disabled={isLoading}
                placeholder="This delicious creamy dish is perfect for the summer nights! Simple, fast and tasty, delight your guests with just three ingredients."
                maxLength={251}
                value={briefDescription}
                onChange={(e) => {
                  handleChange("briefDescription", null, e.target.value);
                }}
                rows={4}
                className="border-dashed border-2 w-full focus:ring-0 text-lg"
              />
              <p className="text-[red]">{validatedbriefDescription}</p>
            </div>
          </div>
          {/* IMAGE */}
          <div className="order-1 md:order-2 w-full md:w-1/2 relative">
            <div className="group relative p-2 rounded-md border-2 border-border border-dashed cursor-pointer">
              <div className="relative w-full h-full z-10 block md:hidden md:group-hover:block transition-all">
                {newImage !== null ? (
                  <div className="absolute top-4 right-4 flex w-full flex-row justify-end">
                    <Button
                      onClick={() => {
                        setNewImage(null);
                      }}
                      variant={"mainbutton"}
                    >
                      Remove
                    </Button>
                  </div>
                ) : (
                  <></>
                )}
              </div>
              {newImage ? (
                <Image
                  alt="not found"
                  width={1500}
                  height={1500}
                  src={URL.createObjectURL(newImage)}
                  className="group-hover:opacity-70 transition-opacity duration-300 rounded-sm max-h-[300px] md:max-h-[400px] xl:max-h-[550px] object-cover"
                />
              ) : (
                <Image
                  alt="not found"
                  width={1500}
                  height={1500}
                  src={oldImage || "/placeholder.svg"}
                  className="group-hover:opacity-70 transition-opacity duration-300 rounded-sm max-h-[300px] md:max-h-[400px] xl:max-h-[550px] object-cover"
                />
              )}
              {!newImage ? (
                <div className="absolute top-0 left-0 min-w-full min-h-full flex flex-row justify-center items-center">
                  <p className="text-lg md:text-2xl font-semibold text-[black] py-2 px-4 bg-white/30 rounded-md">
                    {!oldImage
                      ? "Tap to add a picture"
                      : "Tap to edit the picture"}
                  </p>
                </div>
              ) : (
                <></>
              )}
              <Input
                type="file"
                accept="image/x-png, image/jpeg"
                onChange={(event) => {
                  if (event.target.value[0]) {
                    setNewImage(event.target.files?.[0] || null);
                  }
                  setValidatedImage(null);
                }}
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
            <p className="text-[red] text-center mt-2">{validatedImage}</p>
          </div>
        </div>
        <Separator />
        {setRecipeIngAndQuant.length > 0 ? (
          <RecipeMacros
            recipeIngredientQuantities={recipeIngredientAndQuant}
            exportIngredientList={importIngredientList}
          />
        ) : (
          <div className="flex flex-col gap-2">
            <p className="lg:w-4/6 text-lg font-bold md:text-2xl">
              Ingredient List:{" "}
              <span className="font-normal">per 1 serving</span>
            </p>
            <DrawerAddElement
              prompt="ingredient"
              isReplace={false}
              addSwitchNewIngredient={() => {} /*addFirstIngredient*/}
              indexToReplace={null}
              ingredientToReplace={null}
            />
            <Separator />
          </div>
        )}
        <p className="text-[red]">{validatedIngAndQuant}</p>
        {/* {validatedIngredients !== null && <p className="text-[red]">{validatedIngredients}</p>} */}
        {/* STEPS */}
        <p className="text-lg font-bold md:text-2xl">Recipe steps:</p>
        {fakeSteps.length > 0 ? (
          <div className="w-full flex flex-col gap-2">
            {fakeSteps.map((item, key: number) => {
              return (
                <div key={key} className="flex flex-col gap-2 w-full">
                  <div className="flex flex-row justify-start gap-2 items-center">
                    <p className="font-semibold text-lg">Step {key + 1}</p>
                    <Button
                      size={"icon"}
                      type="button"
                      variant={"ghost"}
                      className="rounded-full hover:text-primary active:bg-primary/30"
                      onClick={() => handleDeleteStep(key)}
                    >
                      <XIcon className="w-5 h-5" />
                    </Button>
                  </div>
                  <Textarea
                    autoFocus={false}
                    disabled={isLoading}
                    value={steps[key]}
                    maxLength={251}
                    onChange={(e) => {
                      handleChange("steps", key, e.target.value);
                    }}
                    placeholder="Describe this recipe step in less than 250 characters."
                    rows={2}
                    className="border-dashed border-2 w-full focus:ring-0 text-lg"
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <></>
        )}
        <div className="flex flex-col items-start gap-2">
          <Button
            variant={"mainbutton"}
            onClick={handleCreateNewStep}
            className=""
            type="button"
          >
            Add a step
          </Button>
          <p className="text-[red]">{validatedSteps}</p>
        </div>
      </div>
    </div>
  );
};

export default CreateRecipeForm;
