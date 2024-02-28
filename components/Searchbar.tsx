"use client";
import { Search, XIcon } from 'lucide-react'
import React, { ChangeEventHandler, useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebounce } from '@/app/hooks/use-debounce';
import { Button } from './ui/button';

const Searchbar = ({emptyPlaceholder}: {emptyPlaceholder: string}) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const category = searchParams.get("category");
    const query = searchParams.get("query");

    const [value, setValue] = useState(query || "");

    const debouncedValue = useDebounce<string>(value, 500);

    const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setValue(e.target.value);
    }

    useEffect(() => {
        const query = {
            query: debouncedValue,
            category: category,
        };

        const params = new URLSearchParams(searchParams);

        if (debouncedValue) {
            params.set("query", debouncedValue);
        } else {
            params.delete("query");
        }

        router.replace(`${pathname}?${params.toString()}`)

    }, [debouncedValue, router, category]);

  return (
    <div className='relative'>
        <Search className='absolute h-4 w-4 top-3 left-4 text-muted-foreground'/>
        <Input
        autoFocus = {true}
        onChange={onChange}
        value = {value}
        placeholder= {emptyPlaceholder}
        className='pl-10' />
        {value !== "" ? 
        <Button 
        variant={"ghost"}
        size="icon"
        onClick={() => {setValue("")}}
        className="absolute top-3 right-4 rounded-full h-4 w-4">
            <XIcon className="h-3 w-3"/>
        </Button>
        :
        <></>
        }
    </div>
  )
}

export default Searchbar