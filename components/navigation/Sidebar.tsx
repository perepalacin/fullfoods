import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { PlusSquareIcon, Search, SearchIcon } from "lucide-react";
import NavBarItems from "./NavBarItems";

const Sidebar = () => {
  return (
    <div className="pt-2 px-2 flex flex-col gap-2 h-full sticky z-30 mb-4 bg-card border-r border-border shadow-sm items-start">
      <NavBarItems />
    </div>
  );
};

export default Sidebar;
