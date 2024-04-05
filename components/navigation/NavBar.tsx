import { BananaIcon, PlusIcon, SearchIcon, SettingsIcon } from 'lucide-react'
import React from 'react'
import { ThemeSwitch } from '@/components/BackgroundAndMargins/ModeSwitch'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import MaxWidthWrapper from '../BackgroundAndMargins/MaxWidthWrapper'
import SignOut from '../Auth/SignOut'
import { readUserSession } from '@/actions/auth/actions'

const NavBar = async () => {


    const {data} = await readUserSession();

  return (
    <div className='flex flex-col top-0 w-full sticky z-30'>
    <div className=' bg-card border-b border-border shadow-sm'>
        <MaxWidthWrapper>
            {/* TODO: Style this fucking side bar xd */}
            <div className='flex justify-between items-center w-full'>
                <Link href={"/"}>
                    <div className='flex gap-2 items-center'>
                        <BananaIcon className='text-primary'/>
                        <p className='text-2xl md:text-4xl font-bold'>
                            Full<span className='text-primary'>foods</span>
                        </p>
                    </div>
                </Link>
                <div className='hidden md:flex md:flex-row gap-2'>
                    <Link
                    href={"/explore"}>
                        <Button variant={"ghost"} className='text-lg hover:underline'>
                            Explore recipes
                        </Button>
                    </Link>
                    <Link
                    href={"/recipe/create/new"}>
                        <Button variant={"ghost"} className='text-lg hover:underline'>
                            Create a recipe
                        </Button>
                    </Link>
                    <Link
                    href={"/setup/profile"}>
                        <Button variant={"ghost"} className='text-lg hover:underline'>
                            Settings
                        </Button>
                    </Link>
                </div>
                <div className='hidden md:flex md:flex-row gap-2 items-center justify-end'>
                    <ThemeSwitch />
                    {data.session 
                    ?
                    <SignOut />
                    :
                    <Button>
                    <Link
                    href="/auth">
                        Sign In
                    </Link>
                </Button>
                    }

                    {/* {
                        user
                    ?
                        <UserButton afterSignOutUrl="/"/>
                    :
                        <Link href={"/sign-in"}>
                            <Button variant="default">
                                Sign In
                            </Button>
                        </Link>
                    } */}
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className='block md:hidden'>
                            Menu
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuItem>
                            <Link
                            href={"/explore"}>
                                <Button variant={"ghost"} className='flex flex-row  items-start justify-start gap-1'>
                                    <SearchIcon className='w-5 h-5'/>
                                    Explore recipes
                                </Button>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem>
                        <Link
                            href={"/recipe/create/new"}>
                                <Button variant={"ghost"} className='flex flex-row  items-start justify-start gap-1'>
                                    <PlusIcon className='w-5 h-5'/>
                                    Create Recipe
                                </Button>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem>
                        <Link
                            href={"/setup/profile"}>
                                <Button variant={"ghost"} className='flex flex-row  items-start justify-start gap-1'>
                                    <SettingsIcon className='w-5 h-5'/>
                                    Settings                                </Button>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem>
                            <ThemeSwitch/>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </MaxWidthWrapper>
    </div>
    </div>
  )
}

export default NavBar