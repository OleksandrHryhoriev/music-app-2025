"use client";

import { createContext, ReactNode, useState } from "react";
import LibraryHeader from "./LibraryHeader";
import LibraryNav from "./LibraryNav";
import { libOptions, LibOptions } from "@/src/types/types";

export const FilterContext = createContext([...libOptions]);
export const WrapperCollapsedContext = createContext(false);

type LibraryWrapperProps = {
   children: ReactNode;
};

const LibraryWrapper = ({ children }: LibraryWrapperProps) => {
   const [isHovered, setIsHovered] = useState<boolean>(false);
   const [isWrapperCollapsed, setIsWrapperCollapsed] = useState<boolean>(false);
   const [filterOptions, setFilterOptions] = useState<LibOptions[]>([
      ...libOptions,
   ]);

   return (
      <aside
         className={`${
            isWrapperCollapsed ? "w-18" : "w-85"
         } h-full flex flex-col duration-300`}
         onMouseEnter={() => setIsHovered(true)}
         onMouseLeave={() => setIsHovered(false)}
      >
         <LibraryHeader
            isWrapperCollapsed={isWrapperCollapsed}
            isWrapperHovered={isHovered}
            setIsWrapperCollapsed={setIsWrapperCollapsed}
         />
         {!isWrapperCollapsed && (
            <LibraryNav
               navItems={filterOptions}
               setFilterOptions={setFilterOptions}
            />
         )}
         {/* //TODO Implement Search */}
         <WrapperCollapsedContext value={isWrapperCollapsed}>
            <FilterContext value={filterOptions}>{children}</FilterContext>
         </WrapperCollapsedContext>
      </aside>
   );
};

export default LibraryWrapper;
