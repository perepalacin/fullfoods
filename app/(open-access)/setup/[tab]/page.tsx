import { readUserSession } from '@/actions/auth/actions';
import { getUserProfileByUserId, useLoadProfilePicture } from '@/actions/profile/get/actions';
import EditProfileForm from '@/components/EditProfileForm';
import EditProfilePicture from '@/components/EditProfilePicture';
import SetGoalsForm from '@/components/SetGoalsForm';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { userProfileDetails } from '@/types';
import { CalendarClockIcon, ChevronRightIcon, RulerIcon, SquareUserRoundIcon, SunMoonIcon, TargetIcon, UserIcon } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'

const links = [
  {
    label: "Edit username and bio",
    link: "profile",
    icon: UserIcon
  },
  {
    label: "Change profile picture",
    link: "picture",
    icon: SquareUserRoundIcon
  },
  {
    label: "Goals",
    link: "goals",
    icon: TargetIcon
  },
  {
    label: "Manage subscriptions",
    link: "subscription",
    icon: CalendarClockIcon
  },
  {
    label: "Units",
    link: "units",
    icon: RulerIcon
  },
  {
    label: "Theme",
    link: "theme",
    icon: SunMoonIcon
  },
];

interface SettingsPageProps {
    params: {
      tab: string
    }
  }

  const SettingsPage = async ({ params }: SettingsPageProps) => {

    const relative = 0;
    const {data} = await readUserSession();
    if (!data.session) {
      return redirect("/");
    } else {
      console.log(data.session.user.id);
    }


  const profileDetails: userProfileDetails = await getUserProfileByUserId(
    data.session.user.id
  );

  let imagePath: string | null = null;
  if (profileDetails.profile_picture) {
    imagePath = await useLoadProfilePicture(profileDetails.profile_picture);
  }


  return (
    <div className='flex flex-col md:flex-row gap-2 w-full h-full'>
      {/* Nav */}
      <div className='flex flex-col gap-4 min-w-96 h-full bg-accent-muted px-4 py-2 rounded-md shadow-md'>
        {links.map((item, key) => {
          const LinkIcon = item.icon;
          return (
            <div key= {item.link}>
              <Link
              href={`/setup/${item.link}`}
              scroll={false}>
                <Button
                variant={"ghost"}
                className={cn("flex flex-row gap-2 items-center",
                params.tab === item.link ? "bg-secondary" : "")}>
                    <LinkIcon className='w-5 h-5'/>
                    <p className='text-xl'>{item.label}</p>
                    <ChevronRightIcon />
                </Button>
              </Link>
              {key === links.length - 1 ? <></> : <Separator />}
            </div>
          )
        })}
      </div>
      <div className='w-full'>
      {params.tab === "profile" ? <EditProfileForm originalBio={profileDetails.bio} originalUsername={profileDetails.username} user_id = {profileDetails.user_id}/> : <></>}
      {params.tab === "picture" && imagePath ? <EditProfilePicture originalPicture={imagePath} user_id={profileDetails.user_id} /> : <></>}
      {params.tab === "goals" ? <SetGoalsForm/> : <></>}
      </div>
    </div>
  )
}

export default SettingsPage