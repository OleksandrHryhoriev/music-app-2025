"use client";

import { usePlayerStore } from "@/src/music/stores/playerStore";
import { TrackType } from "@/src/types/types";
import formateDate from "@/src/utils/functions/formateDate";
import formatTime from "@/src/utils/functions/formatTime";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import PauseIcon from "../../icons/PauseIcon";
import PlayIcon from "../../icons/PlayIcon";
import { usePlayerActions } from "@/src/music/actions/usePlayerActions";

type TrackListItemProps = {
   context: string;
   item: TrackType;
   added_at?: string;
   index: number;
   isActive: boolean;
};

const TrackListItem = ({
   context,
   item,
   added_at,
   index,
   isActive,
}: TrackListItemProps) => {
   const [isCurrent, setIsCurrent] = useState<boolean>(false);
   const [isHovered, setIsHovered] = useState<boolean>(false);

   const { track, isPlaying, setPlayer } = usePlayerStore((s) => s);

   const { play, togglePlay } = usePlayerActions();

   useEffect(() => {
      if (track?.id === item.id) {
         setIsCurrent(true);
      } else {
         setIsCurrent(false);
      }
   }, [track, item]);

   const handlePlayTrack = (): void => {
      if (isCurrent) {
         togglePlay();
         return;
      }

      setPlayer({ track: item });
      setIsCurrent(true);
      play(context, index);
   };

   const handleMouseEnter = (): void => {
      setIsHovered(true);
   };
   const handleMouseLeave = (): void => {
      setIsHovered(false);
   };
   return (
      <div
         className={`tracklist_row w-full py-2 px-4 rounded-sm duration-200 ${isActive ? "bg-(--bgActive) hover:bg-(--bgActiveHover)" : "hover:bg-(--bgHover)"}`}
         onMouseEnter={handleMouseEnter}
         onMouseLeave={handleMouseLeave}
      >
         <div
            className="track-index text-center p-0.5 hover:cursor-pointer"
            onClick={() => handlePlayTrack()}
         >
            {isActive || isHovered ? (
               isCurrent && isPlaying ? (
                  <PauseIcon color={"var(--textActiveColor)"} />
               ) : (
                  <PlayIcon color={"#ffffff"} />
               )
            ) : isCurrent && isPlaying ? (
               <PauseIcon color={"var(--textActiveColor)"} />
            ) : (
               index + 1
            )}
         </div>
         <div className="track-title flex gap-2 items-center">
            <div
               className="relative flex-none w-10 h-10 rounded-sm overflow-hidden bg-cyan-950"
               // onDoubleClick={async () => {}}
            >
               <Image
                  src={item.album.image.url}
                  alt="image"
                  width={48}
                  height={48}
               />
            </div>
            <div className="flex flex-col overflow-hidden">
               <div className="track-name mb-1 flex">
                  <Link
                     href={`/track/${item.id}`}
                     className={`self-start max-w-full text-lg  ${isCurrent && "text-(--textActiveColor)"}`}
                  >
                     <div
                        className={`${isCurrent && "text-(--textActiveColor) textActiveUnderline"} textUnderline leading-[1.1] truncate`}
                     >
                        {item.name}
                     </div>
                  </Link>
               </div>
               <div className="track-artists secondary-text truncate-lh">
                  {item.artists.map((artist, index) => (
                     <span key={artist.id}>
                        {index > 0 && (
                           <span className="secondary-text">, </span>
                        )}
                        <Link
                           href={`/artist/${artist.id}`}
                           className="text-xs secondary-hovered-text textUnderline leading-[1.1]"
                        >
                           {artist.name}
                        </Link>
                     </span>
                  ))}
               </div>
            </div>
         </div>
         <div className="track-album hidden lg:flex">
            <Link
               href={`/album/${item.album.id}`}
               className="self-start max-w-full text-sm secondary-text truncate-lh"
            >
               <span className="secondary-hovered-text textUnderline">
                  {item.album.name}
               </span>
            </Link>
         </div>
         {added_at && (
            <div className="track-added text-sm secondary-text">
               {formateDate(added_at)}
            </div>
         )}
         <div className="track-duration justify-self-end secondary-text">
            {formatTime(item.duration)}
         </div>
      </div>
   );
};

export default TrackListItem;
