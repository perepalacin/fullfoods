"use client";
import { Button } from "./ui/button";
import { ChangeEventHandler, useEffect, useState } from "react";
import { useDebounce } from "@/app/hooks/use-debounce";
import { PlusIcon, Repeat2Icon, Search, XIcon } from "lucide-react";
import { Input } from "./ui/input";
import Image from "next/image";
import { Ingredients } from "@/types";

interface DrawerAddElementProps {
  prompt: string;
  isReplace: boolean;
  addSwitchNewIngredient: (key: number | null, ingredient: Ingredients) => void;
  indexToReplace: number | null;
  ingredientToReplace: Ingredients | null;
}

//This component deploys a drawer that allows the user to select either an ingredient to add to the recipe or a recipe to add to a meal plan.
//Accepts the params string that can either be "ingredient" is we want to add an ingredient or "recipe" if we want to add a recipe.
const DrawerAddElement: React.FC<DrawerAddElementProps> = ({
  prompt,
  isReplace,
  addSwitchNewIngredient,
  indexToReplace,
}) => {
  //State that holds the result of the db query
  const [ingredientsQueryResult, setIngredientsQueryResult] =
    useState<Ingredients[]>();
  //State that holds the valeu of the input
  const [inputValue, setInputValue] = useState<string>("");
  //Function that sets the value of the input
  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputValue(e.target.value);
  };
  //We use a debounce that delays the db call upon user input
  const debouncedValue = useDebounce<string>(inputValue, 500);

  //API call that gets the ingredients based on the query.
  const getIngredientList = async () => {
    console.log("Fetch!");
    const response = await fetch(`/api/ingredientList/${debouncedValue}`);
    const data: Ingredients[] = await response.json();
    setIngredientsQueryResult(data);
  };

  //When debouncedvalue changes we call do the APi call
  useEffect(() => {
    getIngredientList();
    //Here we send the api queue
  }, [debouncedValue]);

  //States that manage the visibility of the drawer.
  //isDrawerOpen is set to true when we want to be able to see it
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  //isTransitioning has a bit of delay so that we can see the transition
  const [isTransitioning, setIsTransitioning] = useState(false);

  //Pressing the esc key will close the drawer.
  const handleEsc = (event: KeyboardEvent) => {
    if (event.key === "Escape" || event.key === "Esc") {
      setIsDrawerOpen(false);
    }
  };

  //We detect the event press
  if (typeof document !== "undefined") {
    document.addEventListener("keydown", handleEsc);
  }

  //We forbid the scrolling of the page when the drawer is visible.
  //We have to add a padding to the page to prevent popping when the scrollbar disappears.
  useEffect(() => {
    if (isDrawerOpen) {
      // Use a setTimeout to ensure that the class is applied in the next render cycle
      document.body.style.overflow = "hidden";
      if (window.innerWidth > 600) {
        document.body.style.padding = "0px 16px 0px 0px";
      } else {
        document.body.style.padding = "0px 0px 0px 0px";
      }
      setTimeout(() => setIsTransitioning(true), 0);
    } else {
      document.body.style.overflow = "auto";
      document.body.style.padding = "0px 0px 0px 0px";
      setIsTransitioning(false);
    }
    return () => {
      document.body.style.overflow = "auto";
      document.body.style.padding = "0px 0px 0px 0px";
    };
  }, [isDrawerOpen]);

  return (
    <div className={`${isReplace ? "max-w-10" : "max-w-36"}`}>
      {isReplace ? (
        <Button
          size={"icon"}
          variant={"ghost"}
          className="rounded-full hover:text-primary active:bg-primary/30"
          type="button"
          onClick={() => {
            setIsDrawerOpen(true);
          }}
        >
          <Repeat2Icon />
        </Button>
      ) : (
        <Button
          onClick={() => {
            setIsDrawerOpen(true);
          }}
          variant={"mainbutton"}
          className="w-full"
          type="button"
        >
          {prompt === "ingredient" ? "Add an ingredient" : "Add a recipe"}
        </Button>
      )}
      {isDrawerOpen && (
        <div>
          <div
            //Backdrop of the drawer
            className={`fixed w-full h-full top-0 left-0 z-30 transition-opacity duration-700
            ${isTransitioning ? "bg-black/70 dark:bg-black/50" : "bg-black/0"}`}
            onClick={() => setIsDrawerOpen(false)}
          />
          <div
            className={`fixed bottom-0 md:top-0 right-0 h-2/3 md:h-screen w-full md:w-96 bg-card rounded-t-xl md:rounded-none border md:border-l border-border flex flex-col z-50 py-4 px-0.5 transition-transform duration-500 ${
              isTransitioning
                ? "transform transalte-y-0 md:translate-x-0"
                : "transform translate-y-full md:translate-y-0 md:translate-x-full"
            }`}
          >
            <div className="flex flex-col gap-2 px-1 py-2 w-full">
              <div className="flex flex-row w-full justify-between items-center px-2">
                <p className="text-xl font-semibold">
                  {prompt === "ingredient"
                    ? "Select an ingredient"
                    : "Select a recipe"}
                </p>
                <Button
                  size="icon"
                  variant="ghost"
                  className=""
                  type="button"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  <XIcon />
                </Button>
              </div>
              <div className="relative">
                <Search className="absolute h-4 w-4 top-3 left-4 text-muted-foreground" />
                <Input
                  //autoFocus={true}
                  onChange={onChange}
                  value={inputValue}
                  placeholder={"Search for ingredients..."}
                  className="pl-10"
                />

                {inputValue !== "" ? (
                  <Button
                    variant={"ghost"}
                    size="icon"
                    type="button"
                    onClick={() => {
                      setInputValue("");
                    }}
                    className="absolute top-3 right-4 rounded-full h-4 w-4"
                  >
                    <XIcon className="h-3 w-3" />
                  </Button>
                ) : (
                  <></>
                )}
              </div>
              <div className="flex flex-col overflow-y-auto h-full">
                {ingredientsQueryResult?.map((item) => {
                  return (
                    <Button
                      key={item.ingredientId}
                      variant={"ghost"}
                      type="button"
                      className="group w-full h-full flex flex-row gap-2 justify-between items-center px-1 py-0 hover:bg-accent rounded-md"
                      onClick={() => {
                        addSwitchNewIngredient(indexToReplace, item);
                        setIsDrawerOpen(false);
                      }}
                    >
                      <div className="flex flex-row gap-2 items-center w-full">
                        <Image
                          src={item.image || "emptydish.png"}
                          alt="Picture of the ingredient"
                          className="w-16 h-16 rounded-md object-cover"
                          width={120}
                          height={120}
                        />
                        <div className="flex flex-col gap-0.5 overflow-ellipsis items-start">
                          <p className="text-base font-semibold line-clamp-1">
                            {item.ingredientName}
                          </p>
                          {item.brand ? (
                            <p className="text-base line-clamp-1 text-muted-foreground">
                              Brand:{" "}
                              <span className="text-foreground font-semibold">
                                {item.brand}
                              </span>
                            </p>
                          ) : (
                            <p className="text-base line-clamp-1 text-muted-foreground">
                              Category:{" "}
                              <span className="text-foreground font-semibold">
                                {item.category}
                              </span>
                            </p>
                          )}
                          <p className="text-muted-foreground text-sm md:text-base line-clamp-1">
                            <span className="text-foreground">
                              {Number(item.kcals)}
                            </span>{" "}
                            kcals -{" "}
                            <span className="text-foreground">
                              {Number(item.carbs)}
                            </span>{" "}
                            C/{" "}
                            <span className="text-foreground">
                              {Number(item.fat)}
                            </span>{" "}
                            F/{" "}
                            <span className="text-foreground">
                              {Number(item.prote)}
                            </span>{" "}
                            P
                          </p>
                        </div>
                      </div>
                      <div
                        className="rounded-full group-hover:text-primary active:bg-primary/30 px-2 py-2"
                      >
                        <PlusIcon />
                      </div>
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DrawerAddElement;
