"use client";

import { useState } from "react";
import CollapseIcon from "../icons/CollapseIcon";
import ExpandIcon from "../icons/ExpandIcon";
import AddIcon from "../icons/AddIcon";
import OpenIcon from "../icons/OpenIcon";

const LibraryWrapper = () => {
   const [isHovered, setIsHovered] = useState<boolean>(false);
   const [isWrapperCollapsed, setIsWrapperCollapsed] = useState<boolean>(false);

   return (
      <div
         className={`libraryWrapper ${
            isWrapperCollapsed ? "w-18" : "w-85"
         } h-full`}
         onMouseEnter={() => setIsHovered(true)}
         onMouseLeave={() => setIsHovered(false)}
      >
         {isWrapperCollapsed ? (
            <div className="library-header flex items-center justify-center p-4 pt-3">
               <button
                  className="cursor-pointer"
                  onClick={() => {
                     setIsWrapperCollapsed((prev) => !prev);
                  }}
               >
                  <span className="block w-6 h-6">
                     <OpenIcon />
                  </span>
               </button>
            </div>
         ) : (
            <div className="library-header flex items-center justify-between p-4 pt-3">
               <button
                  className={`${
                     isHovered ? "pl-8" : ""
                  } flex items-center relative duration-300 cursor-pointer`}
                  onClick={() => {
                     setIsWrapperCollapsed((prev) => !prev);
                  }}
               >
                  <span
                     className={`${
                        isHovered
                           ? "opacity-100 left-0 duration-300 delay-200"
                           : "opacity-0 left-[-12] duration-150 delay-0"
                     } absolute w-5 h-5`}
                  >
                     <CollapseIcon />
                  </span>
                  <p className="title font-semibold">Your Library</p>
               </button>
               <div className="actions flex gap-2">
                  <button className="create w-8 h-8 p-1.5 rounded-full bg-[#2d2d2d] hover:bg-[#383838]  duration-300">
                     <AddIcon title="Create a playlist or folder" />
                  </button>
                  <button className="expand w-8 h-8 p-1 rounded-full hover:bg-[#383838] duration-300">
                     <ExpandIcon />
                  </button>
               </div>
            </div>
         )}
      </div>
   );
};

export default LibraryWrapper;
