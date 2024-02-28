"use client";

import { cn } from '@/lib/utils';
import { Categories } from '@/types';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { ElementRef, useEffect, useRef } from 'react'

interface CategoriesSliderProps {
    data: Categories[]
}

const CategoriesSlider = ({data}: CategoriesSliderProps) => {

    const scrollRefLeft = useRef<ElementRef<"div">>(null);
    const scrollRefRight = useRef<ElementRef<"div">>(null);


    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();


    const category = searchParams.get("category");
    const onClick = (categoryName: string | undefined) => {
        const params = new URLSearchParams(searchParams);

        if (categoryName) {
            params.set("category", categoryName);
        } else {
            params.delete("category");
        }

        router.replace(`${pathname}?${params.toString()}`);
    }

    const onClickScrollLeft = () => {
        scrollRefLeft?.current?.scrollIntoView({ behavior: 'smooth', block: "nearest", inline: "center"});
    }

    const onClickScrollRight = () => {
        scrollRefRight?.current?.scrollIntoView({ behavior: 'smooth', block: "nearest", inline: "center"});
    }

    return (
    <div className='relative flex flex-col w-full'>
        {/* <hr className='bg-muted border-0 h-[2px] w-full z-30'/> */}
        <div 
        className='flex flex-row gap-2 overflow-x-scroll [&::-webkit-scrollbar]:h-0 z-10'
        >
            <div 
            className = " md:px-10"
            ref={scrollRefLeft}
            /> 
            <button 
                onClick={() => {onClick(undefined)}}
                className={cn("text-nowrap text-center text-sm px-4 py-3 rounded-full hover:primary/50 transition z-0",
                category === null ? "bg-primary text-white" : "bg-secondary hover:bg-primary/50")}>
                    All recipes
                </button>
            {data.map((item) => {
                return (
                <div
                key= {item.categoryName}>
                {item.categoryName !== "All" 
                ?
                <button 
                onClick={() => {onClick(item.categoryName)}}
                className={cn("text-nowrap text-center text-sm px-4 py-3 rounded-full hover:primary/50 transition z-0",
                item.categoryName === category ? "bg-primary text-white" : "bg-secondary hover:bg-primary/50")}>
                    {item.categoryName}
                </button>
                :
                <></>}
                </div>
                )
                })}
            <div 
            className='pr-14'
            ref={scrollRefRight} 
            />        
        </div>
        {/* <hr className='bg-muted border-0 h-[2px] w-full z-30'/> */}
        {/* TODO: Make this buttons work! */}
        <div>
          <button 
          onClick={onClickScrollLeft}
          className='hidden absolute md:flex md:flex-col items-center justify-center left-1 top-2 h-7 w-7 bg-secondary rounded-full hover:scale-110 z-20'>
            <ChevronLeftIcon className='w-5'/>
          </button>
          <div className='hidden md:block absolute left-0 top-0 h-full w-10 md:w-20 z-10 bg-gradient-to-r from-background to-transparent from-10%'></div>
          <button 
          onClick={onClickScrollRight}
          className='hidden absolute md:flex md:flex-col right-1 top-2 h-7 w-7 items-center justify-center bg-secondary rounded-full hover:scale-110 z-20'>
            <ChevronRightIcon className='w-5'/>
          </button>
          <div className='block absolute right-0 top-0 h-full w-20 z-10 bg-gradient-to-l from-background to-transparent from-10%'></div>
        </div>
    </div>
  )
}

export default CategoriesSlider

                
            