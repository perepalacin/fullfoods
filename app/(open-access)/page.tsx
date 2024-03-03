import { Button } from "@/components/ui/button";
import { ArrowRightIcon, GlobeIcon, GoalIcon, Share2Icon, TimerReset } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center gap-10">
      {/* Landing PAGE */}
      <div className="w-full flex flex-row gap-10 text-center px-10 items-center">
        <div className="flex flex-col gap-2 items-center">
          <h1 className='text-4xl font-bold tracking-tight sm:text-6xl'>
            Stop wasting <span className="text-primary">time planning</span> your meals!
          </h1>
          <p className='hidden md:block mt-3 text-lg leading-8 text-muted-foreground'>
            Get access to an unlimited amount of healthy, easy and tasty recipes.
            <span className='text-foreground'>
              {" "}Plan your meals within minutes! Share them with your friends or even better, 
            </span>
          </p>
          <Link href={"/auth"}>
          <Button className="w-80" variant={"mainbutton"}>
            Sign up for free today
            <ArrowRightIcon className="ml-2 w-5 h-5"/>
          </Button>
          </Link>
        </div>
        <div className="border-border px-1 py-2 rounded-md border">
          <Image 
          src={"/FullFoodsLandingLight.png"}
          width={2000}
          height={2000}
          alt="Image of the main page"
          className="w-full dark:hidden block"
          />
          <Image 
          src={"/FullFoodsLandingDark.png"}
          width={2000}
          height={2000}
          alt="Image of the main page"
          className="w-full hidden dark:block"
          />
        </div>
      </div>


      <div className="w-full flex flex-row justify-around gap-2">
      <div className="w-1/5 flex flex-col gap-2 text-center items-center bg-card border border-border rounded-md shadow-md py-8 px-2">
        <div className="flex flex-row gap-2 items-center text-lg font-semibold">
          <Share2Icon className="w-5 h-5"/>
          <p className="">Share your recipes with friends</p>
          </div>
          <p className="text-muted-foreground">Take full advantage of the social features and share your recipes with the whole world! You can also take inspiration from others.</p>
        </div>
        <div className="w-1/5 flex flex-col gap-2 text-center items-center bg-card border border-border rounded-md shadow-md py-8 px-2">
          <div className="flex flex-row gap-2 items-center text-lg font-semibold">
          <GoalIcon className="w-5 h-5"/>
          <p className="">Get accurate nutrition data</p>
          </div>
          <p className="text-muted-foreground">FullFoods features a very curated and extense database of all the ingredients and their nutritious value.</p>
        </div>
        <div className="w-1/5 flex flex-col gap-2 text-center items-center bg-card border border-border rounded-md shadow-md py-8 px-2">
          <div className="flex flex-row gap-2 items-center text-lg font-semibold">
          <GlobeIcon className="w-5 h-5"/>
          <p className="">Access thousands of recipes</p>
          </div>
          <p className="text-muted-foreground">Find recipes uploaded by your favorite influencers, friends... If it is not in FullFoods, it doesn't exist There is not limit!</p>
        </div>
      </div>



      <div className="w-full flex flex-row gap-10 text-center px-10 items-center">
        <div className="flex flex-col gap-2 items-center w-1/2">
          <h2 className='text-2xl font-bold tracking-tight sm:text-6xl'>
            Say goodbye to dull spreedsheets and bloated web pages!
          </h2>
          <p className='hidden md:block mt-3 text-lg leading-8 text-muted-foreground'>
            The internet is flooded with dull and bloated recipe pages.
            <span className='text-foreground'>
              {" "}Access your recipe library anywhere, anytime. Enjoy the simplicity of the UI, without ads, banners or useless information.
            </span>
          </p>
        </div>
        <div className="border-border px-1 py-2 rounded-md border">
          <Image 
          src={"/RecipePageLight.png"}
          width={2000}
          height={2000}
          alt="Image of the main page"
          className="w-full dark:hidden block"
          />
          <Image 
          src={"/RecipePageDark.png"}
          width={2000}
          height={2000}
          alt="Image of the main page"
          className="w-full hidden dark:block"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2  items-center justify-center">
      <p className="text-center text-3xl font-semibold">
        Join the foodie revolution now!
      </p>
        <Link href={"/auth"}>
          <Button className="w-80" variant={"mainbutton"}>
            Sign up for free today
            <ArrowRightIcon className="ml-2 w-5 h-5"/>
          </Button>
        </Link>
      </div>
      <div className="flex flex-col gap-2 text-muted-foreground text-center">
        <p>This page is a project created by Pere Palacín, started in 03/01/2024 and was considered finished in 02/03/2024.</p>
        <p>All right reserved 2024. The author is not the owner of any of the picutres displayed, please contact the author if you want any picture to be removed.</p>
        <p>The code is available on Github at: /github/perepalacin</p>
      </div>
    </div>
  );
}
