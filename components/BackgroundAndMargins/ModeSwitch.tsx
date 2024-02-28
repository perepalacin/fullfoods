"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();


  useEffect(() => {
    setMounted(true);
  }, []);


  if (!mounted) {
    return null;
  }


  return (
    <Button
    size = {"icon"}
    variant={"ghost"}
    className=""
    onClick={() => {theme === "dark" ? setTheme("light") : setTheme("dark")}}
    >
    {/* TODO: Convert it into a switch */}
    {/* TODO: Add button Animations! */}
    {/* TODO: Optimize this code, use a ternary operator to just display one of the icons! */}
        <MoonIcon className="h-[1.2rem] w-[1.2rem] rotate-0 duration-200 block dark:hidden dark:rotate-90 group-hover:scale-110" />
        <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 hidden dark:block duration-200 dark:-rotate-90 group-hover:scale-110" />
    </Button>
  );
};

