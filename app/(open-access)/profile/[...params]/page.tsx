import { readUserSession } from "@/actions/auth/actions";
import { getUserProfileByUsername, useLoadProfilePicture } from "@/actions/profile/get/actions";
import { getRecipeByUserId } from "@/actions/recipes/get/actions";
import CenteredWidthWrapper from "@/components/BackgroundAndMargins/CenteredWidthWrapper";
import ExploreRecipesContent from "@/components/ExploreRecipesContent";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { RecipeItemProps, userProfileDetails } from "@/types";
import { BookmarkIcon, LayoutGridIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

interface ProfilePageProps {
  params: {
    params: string[]
  }
    // author_username: string;
    // content: string;
}

const profilePage = async ({ params }: ProfilePageProps) => {

  //TODO: Check auth
  if (params.params.length>2) {
    redirect(`/profile/${params.params[0]}/${params.params[1]}`)
  } else if (params.params.length === 1) {
    redirect(`/profile/${params.params[0]}/posts`)
  }

  const profileDetails: userProfileDetails = await getUserProfileByUsername(
    params.params[0]
  );
  

  if (profileDetails.user_id === undefined) {
    return (
      <>
      {/* TODO: Make this more aesthetically pleasing */}
      <p className="">Sorry this user doesn't exist</p>
      <Link
      href ="/">
        Go back to main page
      </Link>
      </>
    )
  }

  const {data} = await readUserSession();
  if (!data.session) {
    return redirect("/");
  } else {
    console.log(data.session.user.id);
  }

  const recipes: RecipeItemProps[] = await getRecipeByUserId(profileDetails.user_id);
  let imagePath: string | undefined;
  if (profileDetails.profile_picture) {
    imagePath = await useLoadProfilePicture(profileDetails.profile_picture);
  }

  return (
    <div className="flex flex-col gap-4 w-full items-center justify-center">
      <CenteredWidthWrapper>
      <div className="flex flex-row gap-2 md:gap-10 justify-between items-center w-full">
        <div className="max-w-[70px] h-[70px] md:max-w-[200px] md:h-[200px] overflow-clip rounded-full bg-primary">
          <Image
            src={imagePath || "/emptydish.jpg"}
            alt="User's profile picture"
            width={300}
            height={300}
            className="object-cover h-[80px] md:h-[200px]"
          />
        </div>
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col md:flex-row gap-4 justify-start items-start md:items-center">
            <h1 className="text-xl md:text-7xl font-semibold mt-2">{profileDetails.username}</h1>
            {/* TODO: Render the button based on user auth */}
            {data.session.user.id === profileDetails.user_id 
            ?
            <Link
            href="/setup/profile">
              <Button variant="outline">Edit Profile</Button>
            </Link>
            :
            <Button className= "w-44" variant={"mainbutton"}>Follow</Button>
            }
          </div>
          {/* BIO */}
          <p className="font-semibold text-lg hidden md:block">{profileDetails.bio} </p>
          {/* USER STATS */}
          <div className="hidden md:flex flex-row gap-10 justify-start items-center">
            <div className="flex flex-row gap-1 items-center">
              <p>25</p>
              <p className="text-muted-foreground">Followers</p>
            </div>
            <div className="flex flex-row gap-1 items-center">
              <p>12</p>
              <p className="text-muted-foreground">Recipes</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 md:hidden">
      <p className="font-light text-base text-center text-muted-foreground mt-2">{profileDetails.bio} </p>
      <div className="flex flex-row gap-10 justify-around items-center">
            <div className="flex flex-row gap-1 items-center">
              <p>25</p>
              <p className="text-muted-foreground">Followers</p>
            </div>
            <div className="flex flex-row gap-1 items-center">
              <p>12</p>
              <p className="text-muted-foreground">Recipes</p>
            </div>
          </div>
          </div>
      <Separator className="mt-2"/>
      <div className="flex flex-row justify-center gap-10">
          <Link 
          href = {`/profile/${params.params[0]}/posts`}
          className={cn("flex flex-row gap-2 items-center border-b-2 hover:border-border hover:bg-secondary px-4 py-2",
                params.params[1] === "posts" ? "border-foreground" : "border-background")}
          >
          <LayoutGridIcon className="w-5 h-5"/>
          <p className="text-lg">Posts</p>
          </Link>
          <Link 
          href = {`/profile/${params.params[0]}/saved`}
          className={cn("flex flex-row gap-2 items-center border-b-2 hover:border-border hover:bg-secondary px-4 py-2",
          params.params[1] === "saved" ? "border-foreground" : "border-background")}
          >
            <BookmarkIcon className="w-5 h-5"/>
            <p className="text-lg">Saved</p>
          </Link>
      </div>
      </CenteredWidthWrapper>
      {/* TODO: Explore recipes gives me a hydration error I don't know why! */}
      <ExploreRecipesContent recipes={recipes}/>
    </div>
  );
};

export default profilePage;
