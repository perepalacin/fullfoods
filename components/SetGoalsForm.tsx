"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Activity, ArrowLeftIcon, LockIcon } from "lucide-react";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Slider } from "./ui/slider";
import { Progress } from "./ui/progress";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";

const calculatorFormSchema = z.object({
  age: z.coerce
    .number({
      required_error: "Please enter your age",
      invalid_type_error: "Please enter your age",
    })
    .gte(1, {
      message: "Please provide a positive value.",
    })
    .max(100, {
      message: "Please provide a value under 100 years",
    }),
  height: z.coerce
    .number({
      required_error: "Please enter your height",
      invalid_type_error: "Please enter your height",
    })
    .gte(1, {
      message: "Please provide a positive value.",
    })
    .max(230, {
      message: "Please provide a value under 230 cm.",
    }),
  weight: z.coerce
    .number({
      required_error: "Please enter your weight",
      invalid_type_error: "Please enter your weight",
    })
    .gte(1, {
      message: "Please provide a positive value.",
    })
    .max(300, {
      message: "Please provide a value under 300 kg.",
    }),
  activity: z
    .string({
      required_error: "Please select a level of activity",
    })
    .min(1, {
      message: "Please select a level of activity.",
    }),
  gender: z
    .string({
      required_error: "Please choose a gender",
    })
    .min(1, {
      message: "Please choose a gender.",
    }),
});

//TODO: delete the input value on one branch of the form if the user edits the others
//ADD the macro split on step 1;
//Add the female or male switch on step 3;
//Create a state that will contain the info of all the states;
//BETTER YET, USE ZOD TO CONTROL THOSE VALUES AND JUST CREATE A STATELESS FORM!
//Make the protein slider change the text prop (link it to the state);
//Create an api call that sends just the macro split to the db.
const SetGoalsForm = () => {
  const formLogic = [
    {
      position: 0,
      formTitle: "Have you ever tracked your macronutrient intake before?",
      label:
        "Please select yes if you already know your macros, select no if you want to calculate it.",
      previous: null,
      progress: 0,
      //next: yes = 1, no = 3
    },
    {
      position: 1,
      formTitle:
        "Perfect! The FullFoods app will still be a very useful tool to help you achieve your goals.",
      label:
        "Please specify how do you want to split your daily macronutrients intake. Recommended: 25% Protein, 55% Carbs, 20% Fat.",
      previous: 0,
      progress: 0.5,
      //next: 3
    },
    {
      position: 2,
      formTitle: "Amazing we are all set",
      label: "",
      previous: 1,
      progress: 1,
      //Next redirect to /dashboard
    },
    {
      position: 3,
      formTitle: "Don't worry! Everybody starts somewhere!",
      label:
        "Please, introduce the required data here so that we can estimate the amount of calories that your body needs.",
      previous: 0,
      progress: 0.33,
      //Next 4
    },
    {
      position: 4,
      formTitle:
        "Wonderful! You are already on the right path! Now tell us, which are your dietary goals?",
      label: "Please, select one option.",
      previous: 3,
      progress: 0.66,
      //Next 5,
    },
    {
      position: 5,
      formTitle:
        "Great! We are almost there! Do you have any requirement on the ammount of protein that you want to eat daily?",
      label:
        "If you say no we will choose a protein intake for you based on your goals.",
      previous: 4,
      progress: 0.75,
      //Next: Yes -> 6 No-> 2
    },
    {
      position: 6,
      formTitle: "Amazing we are all set",
      label: "",
      previous: 5,
      progress: 1,
      //Next redirect to /dashboard
    },
    {
      position: 7,
      formTitle: "How much protein do you want to eat?",
      label:
        "FullFoods recommends to eat 1.4 to 2.2 g of protein per kg (1-1.5g per lb) of bodyweight ",
      previous: 5,
      progress: 0.85,
      //next 3
    },
    {
      position: 8,
      formTitle: "Amazing we are all set",
      label: "",
      previous: 7,
      progress: 1,
      //Next redirect to /dashboard
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(formLogic[0]);

  const [kcals, setKcals] = useState("");
  const [prote, setProte] = useState(0.25);
  const [fat, setFat] = useState(0.2);
  const [carbs, setCarbs] = useState(0.55);
  const [weight, setWeight] = useState(1);

  const calculatorForm = useForm<z.infer<typeof calculatorFormSchema>>({
    resolver: zodResolver(calculatorFormSchema),
    defaultValues: {
      age: undefined,
      height: undefined,
      weight: undefined,
      activity: undefined,
      gender: undefined,
    },
  });

  const onSubmitCalculator = (values: z.infer<typeof calculatorFormSchema>) => {
    setWeight(values.weight);
    var newKcals = 0;
    let activityFactor = 0;
    switch (values.activity) {
      case "1":
        activityFactor = 1.2;
        break;
      case "2":
        activityFactor = 1.375;
        break;
      case "3":
        activityFactor = 1.465;
        break;
      case "4":
        activityFactor = 1.55;
        break;
      case "5":
        activityFactor = 1.725;
        break;
      case "6":
        activityFactor = 1.9;
        break;

    }
    if (values.gender === "1") {
      newKcals =
        13.397 * Number(values.weight) +
        4.799 * Number(values.height) -
        5.677 * Number(values.age) +
        88.362;
    } else {
      newKcals =
        9.247 * Number(values.weight) +
        3.098 * Number(values.height) -
        4.33 * Number(values.age) +
        447.593;
    }
    newKcals = newKcals * activityFactor;
    setKcals(String(newKcals));
    console.log(newKcals);
    console.log(Number(kcals)/(4)/weight);
    setCurrentQuestion(formLogic[4]);
  };

  const setMacrosplit = (value: number, macro: string) => {
    if (macro === "prote") {
      const proportion = (fat === 0 && carbs === 0) ? 0.5 : carbs/(fat+carbs);
      setProte(value);
      const newFat = (1 - value) * (1 - proportion);
      const newCarb = (1 - value) * proportion;
      setFat(newFat);
      setCarbs(newCarb);
    } else if (macro === "fat") {
      const remaining = 1 - prote;
      if (value >= remaining) {
        setFat(remaining);
        setCarbs(0);
      } else {
        setFat(value);
        setCarbs(remaining -value);
      }
    } else if (macro === "carbs"){
      const remaining = 1 - prote;
      if (value >= remaining) {
        setCarbs(remaining);
        setFat(0);
      } else {
        setCarbs(value);
        setFat(remaining -value);
      }
    }
  }
  
  const handleProteInput = () => {
    const newProte = prote;
    setProte(newProte*weight);
    const remaining = Number(kcals) - prote * 4;
    const neededFats = Number(kcals) * 0.2;
    if (neededFats <= remaining) {
      setFat(neededFats/8);
      setCarbs((remaining-neededFats)/4);
    } else {
      setFat(remaining/8);
      setCarbs(0);
    }
  }

  return (
    <div className="flex flex-col h-full justify-start items-center">
      <Progress
        value={currentQuestion.progress * 100}
        className="rounded-sm h-2"
      />
      <div className="flex flex-col w-full md:w-1/2 justify-center items-center gap-4 mt-2">
        {currentQuestion.previous !== null ? (
          <Button
            className="flex flex-row gap-2 items-start w-80"
            variant={"ghost"}
            onClick={() => {
              setCurrentQuestion(formLogic[currentQuestion.previous]);
              setProte(1);
            }
            }
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Go back to the previous question
          </Button>
        ) : (
          <Button
            className="flex flex-row gap-2 items-start w-full"
            disabled={true}
            variant={"ghost"}
          ></Button>
        )}
        <h1 className="text-3xl font-semibold text-center">
          {currentQuestion.formTitle}
        </h1>
        <p className="text-lg text-muted-foreground text-center">
          {currentQuestion.label}
        </p>
        {currentQuestion.position === 0 ? (
          <div className="flex flex-row justify-around gap-2">
            <Button
              className="w-32"
              variant={"mainbutton"}
              onClick={() => {
                setCurrentQuestion(formLogic[1]);
                setProte(0.25);
                setFat(0.2);
                setCarbs(0.55);
              }}
            >
              Yes
            </Button>
            <Button
              className="w-32"
              variant={"mainbutton"}
              onClick={() => setCurrentQuestion(formLogic[3])}
            >
              No
            </Button>
          </div>
        ) : (
          <></>
        )}
        {currentQuestion.position === 1 ? (
          //Introduce macros directly
          <div className="flex flex-col gap-4 w-full items-center">
            <div className="flex flex-row gap-2 items-center">
              <Input
                autoFocus={true}
                type="number"
                placeholder="2500"
                className="text-center w-32"
                value={kcals !== "" ? String(Math.round(Number(kcals)*100)/100) : ""}
                onChange={(e) => {setKcals(e.target.value)}}
              />
              <p>calories/day</p>
            </div>
            {/* PROTE */}
            <div className="flex flex-row gap-4 items-center">
              <p className="w-16">Protein:</p>
            <Slider 
              onValueChange={(event) => setMacrosplit(event[0], "prote")}
              defaultValue={[prote]}
              max = {1}
              min={0}
              className="w-64"
              step={0.01}
              value={[prote]}
              />
              <p className="w-12">{Math.round(prote*100)}%</p>
            </div>
            <div className="flex flex-row gap-4 items-center">
              <p className="w-16">Carbs:</p>
            <Slider 
              onValueChange={(event) => setMacrosplit(event[0], "carbs")}
              defaultValue={[carbs]}
              max = {1}
              min={0}
              className="w-64"
              step={0.01}
              value={[carbs]}
              />
            <p className="w-12">{Math.round(carbs*100)}%</p>
            </div>
            <div className="flex flex-row gap-4 items-center">
              <p className="w-16">Fat:</p>
            <Slider 
              onValueChange={(event) => setMacrosplit(event[0], "fat")}
              defaultValue={[fat]}
              max = {1}
              min={0}
              value={[fat]}
              className="w-64"
              step={0.01}
              />
              <p className="w-12">{Math.round(fat*100)}%</p>
            </div>
            <p>{Math.round(Number(kcals)*prote/4*1)/1} grams of Protein</p>
            <p>{Math.round(Number(kcals)*carbs/4*1)/1} grams of Carbs</p>
            <p>{Math.round(Number(kcals)*fat/8*1)/1} grams of Fat</p>
            <Button
                variant={"mainbutton"}
                onClick={() => {
                  setCurrentQuestion(formLogic[2]);
                }}
                className="w-44"
              >
                Continue
            </Button>
          </div>
        ) : (
          <></>
        )}
        {currentQuestion.position === 3 ? (
          <div className="">
            <Form {...calculatorForm}>
              <form
                onSubmit={calculatorForm.handleSubmit(onSubmitCalculator)}
                className="flex flex-col gap-4 px-2 md_px-0"
              >
                <FormField
                  name="age"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-center">
                      <div className="flex flex-row gap-2 w-full items-center">
                        <p>Age:</p>
                        <FormControl>
                          <Input
                            autoFocus={true}
                            placeholder="25..."
                            className="w-full text-centr"
                            type="number"
                            {...field}
                          />
                        </FormControl>
                      </div>
                      <FormMessage className="text-[red]" />
                    </FormItem>
                  )}
                />
                <FormField
                  name="gender"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-center">
                      <div className="flex flex-row gap-2 items-center">
                        <p>Gender:</p>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-64">
                              <SelectValue
                                placeholder="Choose an option"
                                defaultValue={field.name}
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="border-border">
                            <SelectItem value="1">Male</SelectItem>
                            <SelectItem value="2">Female</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <FormMessage className="text-[red]" />
                    </FormItem>
                  )}
                ></FormField>
                <FormField
                  name="height"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-center">
                      <div className="flex flex-row gap-2 w-full items-center">
                        <p>Height:</p>
                        <FormControl>
                          <Input
                            placeholder="180..."
                            className=""
                            type="number"
                            {...field}
                          />
                        </FormControl>
                        <p className="whitespace-nowrap">in cm</p>
                      </div>
                      <FormMessage className="text-[red]" />
                    </FormItem>
                  )}
                />
                <FormField
                  name="weight"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-center justify-between">
                      <div className="flex flex-row gap-2 items-center w-full">
                        <p>Weight:</p>
                        <FormControl>
                          <Input
                            placeholder="75..."
                            className=""
                            type="number"
                            {...field}
                          />
                        </FormControl>
                        <p className="whitespace-nowrap">in kg</p>
                      </div>
                      <FormMessage className="text-[red]" />
                    </FormItem>
                  )}
                />
                <FormField
                  name="activity"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-center">
                      <div className="flex flex-row gap-2 items-center">
                        <p>Activity:</p>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-64">
                              <SelectValue
                                placeholder="Choose an option"
                                defaultValue={field.name}
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="border-border">
                            <SelectItem value="1">
                              Sedentary: Little or no exercise
                            </SelectItem>
                            <SelectItem value="2">
                              Light: Exercise 1-3 times a week
                            </SelectItem>
                            <SelectItem value="3">
                              Moderate: Exercise 4-5 times a week
                            </SelectItem>
                            <SelectItem value="4">
                              Active: Daily exercise or intense exercise 3-4
                              times a week
                            </SelectItem>
                            <SelectItem value="5">
                              Very active: Intense exercise 6-7 times a week
                            </SelectItem>
                            <SelectItem value="6">
                              Extra active: Very intense exercise daily or
                              phisical job
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <FormMessage className="text-[red]" />
                    </FormItem>
                  )}
                ></FormField>
                <Button className="" variant="mainbutton" type="submit">
                  Continue
                </Button>
              </form>
            </Form>
          </div>
        ) : (
          <></>
        )}
        {currentQuestion.position === 4 ? (
          <div className="flex flex-col md:flex-row justify-between gap-2">
            <Button
              variant={"mainbutton"}
              className="h-16"
              onClick={() => {
                setCurrentQuestion(formLogic[5]);
                const newKcals = Number(kcals);
                setKcals(String(newKcals - 500));
              }}
            >
              Loose weight
              <br />
              -0.5 kg/week
            </Button>
            <Button
              variant={"mainbutton"}
              className="h-16"
              onClick={() => {
                setCurrentQuestion(formLogic[5]);
              }}
            >
              Maintain weight
            </Button>
            <Button
              variant={"mainbutton"}
              className="h-16"
              onClick={() => {
                setCurrentQuestion(formLogic[5]);
                const newKcals = Number(kcals);
                setKcals(String(newKcals + 500));
              }}
            >
              Gain weight
              <br />
              +0.5 kg/week
            </Button>
          </div>
        ) : (
          <></>
        )}
        {currentQuestion.position === 5 ? (
          <div className="flex flex-row justify-around gap-2">
            <Button
              className="w-32"
              variant={"mainbutton"}
              onClick={() => {
                setCurrentQuestion(formLogic[7]);
                setProte(1);
              }}
            >
              Yes
            </Button>
            <Button
              className="w-32"
              variant={"mainbutton"}
              onClick={() => 
              {setCurrentQuestion(formLogic[6]);
              setProte(Number(kcals)*0.25/4);
              setFat(Number(kcals)*0.2/8);
              setCarbs(Number(kcals)*0.55/4);
              }}
            >
              No
            </Button>
          </div>
        ) : (
          <></>
        )}
        {currentQuestion.position === 7 ? (
          <div className="flex flex-col gap-4 items-center">
            <div className="flex flex-col md:flex-row gap-4 md:gap-2">
              <p className="order-2 md:order-1 text-center md:text-start">
                {Math.round(prote*10)/10} g of Protein/ kg
              </p>
              <Slider
              onValueChange={(value) => {
                setProte(value[0]);
              }}
                max={Math.round(Number(kcals)/(4)/weight*100)/100}
                step={0.1}
                value={[prote]}
                className="order-1 md:order-2 w-[240px]"
              />
            </div>
            <Button
              className="w-44"
              variant={"mainbutton"}
              onClick={() => {
                setCurrentQuestion(formLogic[8]);
                handleProteInput();
              }}
            >
              Continue
            </Button>
          </div>
        ) : (
          <></>
        )}
        {currentQuestion.position === 2 ||
        currentQuestion.position === 6 ||
        currentQuestion.position === 8 ? (
          <div className="flex flex-col gap-4 items-center">
            <p className="text-center font-bold text-xl">
              You will be eating {Math.round(Number(kcals))} cals per day.
            </p>
            <p className="text-center font-semibold text-lg">
              {Math.round(prote*1)/1} grams of protein per day. ({Math.round(prote/Number(kcals)*4*100)}%)
            </p>
            <p className="text-center font-semibold text-lg">
              {Math.round(carbs*1)/1} grams of Carbohydrates per day. ({Math.round(carbs/Number(kcals)*4*100)}%)
            </p>
            <p className="text-center font-semibold text-lg">
              {Math.round(fat*1)/1} grams of fat per day. ({Math.round(fat/Number(kcals)*8*100)}%)
            </p>
            {/* TODO: Add some Graphs with the values. */}
            <p className="text-center">
              If you are happy with the results of your evaluation, press the
              submit button to save these goals.
            </p>
            <Button variant={"mainbutton"} className="w-44">
              Submit
            </Button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default SetGoalsForm;
