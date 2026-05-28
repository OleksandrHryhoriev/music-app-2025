"use client";

import { useState } from "react";
import AddIcon from "../icons/AddIcon";
import CollapseIcon from "../icons/CollapseIcon";
import ExpandIcon from "../icons/ExpandIcon";
import OpenIcon from "../icons/OpenIcon";
import LibraryIcon from "../icons/LibraryIcon";

type LibraryHeaderProps = {
   setIsWrapperCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
   isWrapperCollapsed: boolean;
   isWrapperHovered: boolean;
};

const LibraryHeader = ({
   setIsWrapperCollapsed,
   isWrapperCollapsed,
   isWrapperHovered,
}: LibraryHeaderProps) => {
   const [isMouseOver, setIsMouseOver] = useState(false);
   return (
      <>
         {isWrapperCollapsed ? (
            <div className="flex flex-col items-center gap-4 px-4 pt-6 pb-3">
               <button
                  className="cursor-pointer block w-6 h-6"
                  onClick={() => setIsWrapperCollapsed(false)}
                  onMouseEnter={() => setIsMouseOver(true)}
                  onMouseLeave={() => setIsMouseOver(false)}
               >
                  {isMouseOver ? <OpenIcon /> : <LibraryIcon />}
               </button>
               <button className="w-8.75 h-8.75 p-2 rounded-full bg-[#2d2d2d] hover:bg-[#383838]  duration-300">
                  <AddIcon title="Create a playlist or folder" />
               </button>
            </div>
         ) : (
            <div className="flex items-center justify-between p-4 pt-3">
               <div
                  className={`${
                     isWrapperHovered ? "pl-8" : ""
                  } flex items-center relative duration-200 cursor-pointer`}
                  onClick={() => setIsWrapperCollapsed(true)}
               >
                  <span
                     className={`${
                        isWrapperHovered
                           ? "opacity-100 left-0 duration-300 delay-100"
                           : "opacity-0 left-[-12] duration-150 delay-0"
                     } absolute w-5 h-5`}
                  >
                     <CollapseIcon />
                  </span>
                  <p className="font-semibold text-nowrap">Your Library</p>
               </div>
               <div className="flex gap-2">
                  <button className="w-8 h-8 p-1.5 rounded-full bg-[#2d2d2d] hover:bg-[#383838]  duration-300">
                     <AddIcon title="Create a playlist or folder" />
                  </button>
                  <button
                     className="w-8 h-8 p-1 rounded-full hover:bg-[#383838] duration-300"
                     onClick={() => {
                        //TODO Implement expand functionality
                     }}
                  >
                     <ExpandIcon />
                  </button>
               </div>
            </div>
         )}
      </>
   );
};

export default LibraryHeader;
