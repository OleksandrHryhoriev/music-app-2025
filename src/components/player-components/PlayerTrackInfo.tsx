"use client";

import { usePlayerStore } from "@/src/music/stores/playerStore";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const PlayerTrackInfo = () => {
   const track = usePlayerStore((state) => state.track);
   return (
      track && (
         <div className="flex gap-4 items-center w-full">
            <div
               className="relative flex-none w-14 h-14 rounded-sm overflow-hidden bg-cyan-950"
               onClick={() => {}} //TODO
            >
               <Image
                  src={track.album.image.url}
                  alt="image"
                  width={56}
                  height={56}
               />
            </div>
            <div className="flex flex-col overflow-hidden">
               <Link
                  href={`/track/${track.id}`}
                  className={`track-name cursor-pointer text-sm leading-none truncate mb-1 hover:underline`}
               >
                  {track.name}
               </Link>
               <div className="track-artists truncate">
                  {track.artists.map((artist, index) => (
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
      )
   );
};

export default PlayerTrackInfo;
