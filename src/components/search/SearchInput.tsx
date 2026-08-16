"use client";

import getRandomIndex from "@/src/utils/functions/getRandomIndex";
import { useEffect, useState } from "react";

const PLACEHOLDERS: string[] = [
   "what's the vibe today?",
   "find your next obsession",
   "what are we blasting today?",
   "what's on repeat today?",
   "got a song in mind?",
   "find your sound",
   "tracks, beats, artists",
   "looking for a certified banger?",
   "feed your playlist",
   "match your mood",
   "what's hitting the spot today?",
   "find something to cruise to",
   "what's the soundtrack for today?",
];

const SearchInput = () => {
   const [value, setValue] = useState<string>("");
   const [placeholder, setPlaceholder] = useState<string>("");
   const [isFocused, setIsFocused] = useState<boolean>(false);

   useEffect(() => {
      const index = getRandomIndex(PLACEHOLDERS.length);
      setPlaceholder(PLACEHOLDERS[index]);
   }, []);
   return (
      <input
         className={`w-full h-full outline-none py-1 pl-13 pr-4 border-(--backgroundSecondary) border-2 rounded-full bg-(--backgroundSecondary) hover:bg-(--bgHover) placeholder:text-(--textSecondaryColor) ${isFocused ? "border-(--textSecondaryColor)" : "hover:border-(--bgHover)"} duration-200`}
         type="text"
         name="seach"
         value={value}
         placeholder={`${placeholder}...`}
         onChange={(event) => setValue(event.target.value)}
         onFocus={() => setIsFocused(true)}
         onBlur={() => setIsFocused(false)}
      />
   );
};

export default SearchInput;
