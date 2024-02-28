"use client";

import {
    Grid2X2,
    PlusSquare,
    Search
} from "lucide-react";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import clsx from "clsx";


//TODO: Update all icons to lucide react once their list works
//TODO: Add order to the items so dashboard is on the middle in small devices.
const links = [
    {name: "Home", href: "/dashboard", icon: Grid2X2},
    {name: "Explore recipes", href: "/explore", icon: Search},
    {name: "Create recipe", href: "/create", icon: PlusSquare},
];

export default function NavBarItems () {

    //We get the pathname for the conditional formating of the items
    const pathname = usePathname();

    return (
        <>
        {links.map((item) => {
            const LinkIcon = item.icon;
            return(
                <Link
                    key = {item.name}
                    href = {item.href}
                    className={clsx("flex flex-row w-40 items-center gap-2 py-2 px-2 rounded-md hover:bg-primary/50 active:bg-primary/70 ",
                    {
                         "bg-primary/30": pathname === item.href,
                    }, )}
                >
                    {
                        pathname === item.href 
                    ?
                        <LinkIcon className='w-5 text-primarytext dark:text-primarytext-dark'/>  
                    :
                        <LinkIcon className='w-5 text-secondarytext dark:text-secondarytext-dark'/>
                    }
                    { pathname === item.href 
                    ?
                    <p className='text-base text-primarytext dark:text-primarytext-dark'>{item.name}</p>
                    :
                    <p className='text-base text-secondarytext dark:text-secondarytext-dark'>{item.name}</p>
                    }

                </Link>
            )
        })}
        </>
    )
}
