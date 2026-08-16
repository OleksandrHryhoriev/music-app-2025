import React from "react";
import SearchIcon from "../icons/SearchIcon";

const SearchButton = () => {
   return (
      <button className="h-full aspect-square absolute z-3 top-0 left-0 rounded-l-full overflow-hidden cursor-pointer">
         <span className="block w-full h-full p-3 text-(--textSecondaryColor) hover:text-(--textMainColor) hover:scale-105 duration-200">
            <SearchIcon />
         </span>
      </button>
   );
};

export default SearchButton;
