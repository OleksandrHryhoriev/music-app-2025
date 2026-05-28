"use client";

import capitalize from "@/src/utils/functions/capitalize";
import AddIcon from "../icons/AddIcon";
import { libOptions, LibOptions } from "@/src/types/types";

type LibraryNavProps = {
   navItems: LibOptions[];
   setFilterOptions: React.Dispatch<React.SetStateAction<LibOptions[]>>;
};

const LibraryNav = ({ navItems, setFilterOptions }: LibraryNavProps) => {
   return (
      <nav className="p-4 pt-2 flex items-center">
         {navItems.length > 1 ? (
            <ul className="flex gap-2 items-center">
               {navItems.map((item) => (
                  <li key={item}>
                     <button
                        className="flex items-center h-8 px-3 rounded-4xl bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.18)] duration-300 text-sm cursor-pointer"
                        onClick={() => setFilterOptions([item])}
                     >
                        <span>{capitalize(item) + "s"}</span>
                     </button>
                  </li>
               ))}
            </ul>
         ) : (
            <>
               <button
                  className="w-8 h-8 p-1.5 rounded-full bg-[#2d2d2d] hover:bg-[#383838]  duration-300 rotate-45 mr-3 cursor-pointer"
                  onClick={() => setFilterOptions([...libOptions])}
               >
                  <AddIcon title="Reset" />
               </button>
               <button
                  className="py-1.5 px-3 rounded-4xl bg-[rgba(255,255,255,1)] hover:none duration-300 text-sm text-black cursor-pointer"
                  onClick={() => setFilterOptions([...libOptions])}
               >
                  <span>{capitalize(navItems[0]) + "s"}</span>
               </button>
            </>
         )}
      </nav>
   );
};

export default LibraryNav;
