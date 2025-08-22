"use client";

import { TTrack } from "@/src/types/spotify-types/types";

// import Image from "next/image";

type TracksProps = {
   tracks: any[];
};

const Tracks = ({ tracks }: TracksProps) => {
   return (
      <ul>
         {tracks.map((tr) => (
            <li key={tr.track.id} className="mb-2 flex gap-2 items-center">
               <div className="relative w-8 h-8">
                  {/* <Image
                     src={tr.images[2]?.url || tr.images[0]?.url}
                     alt="image"
                     fill
                  /> */}
               </div>
               <span
                  className="cursor-pointer"
                  onClick={() => {
                     console.log(tr);
                     //  handleClick(tr.id);
                  }}
               >
                  {tr.track.name.toUpperCase()}
               </span>
            </li>
         ))}
      </ul>
   );
};

export default Tracks;
