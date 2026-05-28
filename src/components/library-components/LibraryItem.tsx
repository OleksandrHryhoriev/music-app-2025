"use client";

import { useContext } from "react";
import { WrapperCollapsedContext } from "./LibraryWrapper";
import { LibItemType } from "@/src/types/types";
import Link from "next/link";
import Image from "next/image";
import capitalize from "@/src/utils/functions/capitalize";
import LogoIcon from "../icons/LogoIcon";

type LibraryItemProps = {
   playlistData: LibItemType;
   isActive: boolean;
};

const LibraryItem = ({ playlistData, isActive }: LibraryItemProps) => {
   const isWrapperCollapsed = useContext(WrapperCollapsedContext);

   return (
      <Link
         href={`/${playlistData.type}/${playlistData.id}`}
         className={` flex items-center ${
            isWrapperCollapsed ? "w-16" : "w-full"
         } cursor-pointer rounded-sm p-2 duration-200  ${
            isActive
               ? "bg-(--bgActive) hover:bg-(--bgActiveHover)"
               : "hover:bg-(--bgHover)"
         }`}
      >
         <div
            className={`relative flex-none w-12 h-12 overflow-hidden ${
               playlistData.type === "artist" ? "rounded-full" : "rounded-sm"
            }`}
         >
            {playlistData.image ? (
               <Image src={playlistData.image} alt="image" fill sizes="20vw" />
            ) : (
               <LogoIcon color="var(--textSecondaryColor)" />
            )}
         </div>
         {isWrapperCollapsed ? null : (
            <div className="flex-auto ml-2 overflow-hidden">
               <p className="mb-1 truncate">{playlistData.name}</p>
               <div className="flex gap-1">
                  <span className="text-sm text-[#8b8b8b] ">
                     {capitalize(playlistData.type)}
                  </span>
                  {(playlistData.owner || playlistData.artist) && (
                     <span className="text-sm text-[#8b8b8b] flex items-center gap-1 before:w-1 before:h-1 before:bg-[#8b8b8b] before:rounded-full">
                        {playlistData.owner || playlistData.artist}
                     </span>
                  )}
               </div>
            </div>
         )}
      </Link>
   );
};

export default LibraryItem;
