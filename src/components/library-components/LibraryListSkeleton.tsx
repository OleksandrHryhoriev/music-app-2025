"use client";

import { useContext } from "react";
import CustomScrollbar from "../CustomScrollbar/CustomScrollbar";
import LogoIcon from "../icons/LogoIcon";
import { WrapperCollapsedContext } from "./LibraryWrapper";

const LibraryListSkeleton = () => {
   const isWrapperCollapsed = useContext(WrapperCollapsedContext);
   const listArray = Array.from({ length: 6 }, (_, i) => i + 1);
   return (
      <div className="w-full flex-auto overflow-hidden">
         <CustomScrollbar>
            <ul className="w-full p-1">
               {listArray.map((item) => (
                  <li key={item}>
                     <div
                        className={`flex items-center ${
                           isWrapperCollapsed ? "w-16" : "w-full"
                        } cursor-pointer rounded-sm p-2 duration-200`}
                     >
                        <div className="relative flex-none w-12 h-12 overflow-hidden rounded-sm">
                           <LogoIcon color="var(--textSecondaryColor)" />
                        </div>
                        {isWrapperCollapsed ? null : (
                           <div className="flex-auto ml-2 overflow-hidden">
                              <p className="mb-1 h-4 w-60 bg-(var(--textMainColor))"></p>
                              <div className="h-3.5 w-20 bg-(var(--textSecondaryColor))"></div>
                           </div>
                        )}
                     </div>
                  </li>
               ))}
            </ul>
         </CustomScrollbar>
      </div>
   );
};

export default LibraryListSkeleton;
