import React from "react";
import SearchInput from "./SearchInput";
import SearchButton from "./SearchButton";

const SearchForm = () => {
   return (
      <form className="search-form w-full h-full relative">
         <SearchInput />
         <SearchButton />
      </form>
   );
};

export default SearchForm;
