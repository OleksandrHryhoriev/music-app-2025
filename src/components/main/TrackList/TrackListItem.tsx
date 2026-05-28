"use client";

import { usePlayerStore } from "@/src/music/stores/playerStore";
import { PlaybackTrack, TrackType } from "@/src/types/types";
import formateDate from "@/src/utils/functions/formateDate";
import formatTime from "@/src/utils/functions/formatTime";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import PauseIcon from "../../icons/PauseIcon";
import PlayIcon from "../../icons/PlayIcon";
import { usePlayerActions } from "@/src/music/actions/usePlayerActions";

type TrackListItemProps = {
   item: TrackType;
   added_at: string;
   index: number;
   isActive: boolean;
};

const TrackListItem = ({
   item,
   added_at,
   index,
   isActive,
}: TrackListItemProps) => {
   const [isCurrent, setIsCurrent] = useState<boolean>(false);
   const [isHovered, setIsHovered] = useState<boolean>(false);

   const { track, isPlaying } = usePlayerStore((s) => s);

   const { play, togglePlay } = usePlayerActions();

   useEffect(() => {
      if (track?.id === item.id) {
         setIsCurrent(true);
      } else {
         setIsCurrent(false);
      }
   }, [track, item]);

   const handlePlayTrack = (track: PlaybackTrack): void => {
      if (isCurrent) {
         togglePlay();
         return;
      }

      setIsCurrent(true);
      play(track, index);
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
            className="track-index text-center"
            onClick={() => handlePlayTrack(item)}
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
               <Link
                  href={`/track/${item.id}`}
                  className={`track-name cursor-pointer text-lg ${isCurrent && "text-(--textActiveColor)"} leading-none truncate mb-1 hover:underline`}
               >
                  {item.name}
               </Link>
               <div className="track-artists truncate">
                  {item.artists.map((artist, index) => (
                     <span key={artist.id}>
                        {index > 0 && (
                           <span className="secondary-text">, </span>
                        )}
                        <Link
                           href={`/artist/${artist.id}`}
                           className="text-xs secondary-hovered-text"
                        >
                           {artist.name}
                        </Link>
                     </span>
                  ))}
               </div>
            </div>
         </div>
         <div className="track-album hidden lg:block">
            <Link
               href={`/album/${item.album.id}`}
               className="cursor-pointer text-sm block truncate secondary-hovered-text"
            >
               {item.album.name}
            </Link>
         </div>
         <div className="track-added text-sm secondary-text">
            {formateDate(added_at)}
         </div>
         <div className="track-duration justify-self-end secondary-text">
            {formatTime(item.duration)}
         </div>
      </div>
   );
};

export default TrackListItem;
