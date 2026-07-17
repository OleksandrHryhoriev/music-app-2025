"use client";

import { LibItemType } from "@/src/types/types";
import { useContext, useState } from "react";
import { FilterContext } from "./LibraryWrapper";
import LibraryItem from "./LibraryItem";
import CustomScrollbar from "../CustomScrollbar/CustomScrollbar";

type LibraryListProps = {
   libraryItems: LibItemType[];
};

const LibraryList = ({ libraryItems }: LibraryListProps) => {
   const [activeId, setActiveId] = useState<string>("");

   const filterOptions = useContext(FilterContext);

   const filteredPlaylists = libraryItems.filter((item) =>
      filterOptions.includes(item.type),
   );

   return (
      <div className="w-full flex-auto overflow-hidden">
         <CustomScrollbar>
            <ul className="w-full p-1">
               {filteredPlaylists.length ? (
                  filteredPlaylists.map((item) => (
                     <li
                        key={item.id}
                        onClick={() => {
                           setActiveId(item.id);
                        }}
                     >
                        <LibraryItem
                           libItemData={item}
                           isActive={item.id === activeId}
                        />
                     </li>
                  ))
               ) : (
                  <div className="flex justify-center">
                     No {filterOptions[0]}s found
                  </div>
               )}
            </ul>
         </CustomScrollbar>
      </div>
   );
};

export default LibraryList;
