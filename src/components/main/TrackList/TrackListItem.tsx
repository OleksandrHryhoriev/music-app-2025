"use client";

import { usePlayerActions } from "@/src/music/actions/usePlayerActions";
import { usePlayerStore } from "@/src/music/stores/playerStore";
import { TrackType } from "@/src/types/types";
import formatTime from "@/src/utils/functions/formatTime";
import Image from "next/image";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import PauseIcon from "../../icons/PauseIcon";
import PlayIcon from "../../icons/PlayIcon";

type TrackListItemProps = {
   context: string | string[];
   item: TrackType;
   index: number;
   withImage?: boolean;
   isActive: boolean;
   children?: ReactNode;
};

const TrackListItem = ({
   context,
   item,
   index,
   withImage = true,
   isActive,
   children,
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
         className={`tracklist-row w-full py-2 px-4 rounded-sm duration-200 ${isActive ? "bg-(--bgActive) hover:bg-(--bgActiveHover)" : "hover:bg-(--bgHover)"}`}
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
            {withImage && (
               <div
                  className="relative flex-none w-10 h-10 rounded-sm overflow-hidden bg-(--backgroundMain)"
                  // onDoubleClick={async () => {}}
               >
                  {item.album?.image?.url && (
                     <Image
                        src={item.album.image.url}
                        alt="image"
                        width={48}
                        height={48}
                     />
                  )}
               </div>
            )}
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
         {children}
         <div className="track-duration justify-self-end secondary-text">
            {formatTime(item.duration)}
         </div>
      </div>
   );
};

export default TrackListItem;
