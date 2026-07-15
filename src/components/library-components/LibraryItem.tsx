"use client";

import { useContext, useEffect, useState } from "react";
import { WrapperCollapsedContext } from "./LibraryWrapper";
import { LibItemType } from "@/src/types/types";
import Link from "next/link";
import Image from "next/image";
import capitalize from "@/src/utils/functions/capitalize";
import LogoIcon from "../icons/LogoIcon";
import PlayButton from "../main/PlayButton";
import { usePlayerStore } from "@/src/music/stores/playerStore";

type LibraryItemProps = {
   playlistData: LibItemType;
   isActive: boolean;
};

const LibraryItem = ({ playlistData, isActive }: LibraryItemProps) => {
   const isWrapperCollapsed = useContext(WrapperCollapsedContext);
   const [isHovered, setIsHovered] = useState<boolean>(false);
   const [isPlayed, setIsPlayed] = useState<boolean>(false);
   const contextCurrentUri = usePlayerStore((s) => s.contextCurrentUri);

   useEffect(() => {
      if (playlistData.uri === contextCurrentUri) {
         setIsPlayed(true);
      } else {
         setIsPlayed(false);
      }
   }, [contextCurrentUri, playlistData.uri]);

   const handleMouseEnter = (): void => {
      setIsHovered(true);
   };
   const handleMouseLeave = (): void => {
      setIsHovered(false);
   };

   return (
      <Link
         href={`/${playlistData.type}/${playlistData.id}`}
         className={`flex items-center ${
            isWrapperCollapsed ? "w-16" : "w-full"
         } cursor-pointer rounded-sm p-2 duration-200  ${
            isActive
               ? "bg-(--bgActive) hover:bg-(--bgActiveHover)"
               : "hover:bg-(--bgHover)"
         }`}
         onMouseEnter={handleMouseEnter}
         onMouseLeave={handleMouseLeave}
      >
         <div
            className={`relative flex-none w-12 h-12 overflow-hidden ${
               playlistData.type === "artist" ? "rounded-full" : "rounded-sm"
            }`}
         >
            {!isWrapperCollapsed && isHovered && (
               <div className="absolute w-full h-full z-2">
                  <PlayButton
                     context={playlistData.uri}
                     bgColor="rgb(60 60 60 / 70%)"
                     color="#ffffff"
                  />
               </div>
            )}
            {playlistData.image ? (
               <Image src={playlistData.image} alt="image" fill sizes="20vw" />
            ) : (
               <LogoIcon color="var(--textSecondaryColor)" />
            )}
         </div>
         {isWrapperCollapsed ? null : (
            <div className="flex-auto ml-2 overflow-hidden">
               <p
                  className={`truncate-lh ${isPlayed && "text-(--textActiveColor)"}`}
               >
                  {playlistData.name}
               </p>
               <div className="flex gap-1">
                  <span className="text-sm text-(--textSecondaryColor)">
                     {capitalize(playlistData.type)}
                  </span>
                  {(playlistData.owner || playlistData.artist) && (
                     <span className="text-sm text-(--textSecondaryColor) flex items-center gap-1 before:w-1 before:h-1 before:bg-(--textSecondaryColor) before:rounded-full">
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
