"use client";

import { TPlaylist } from "@/src/types/spotify-types/types";
import Image from "next/image";

type PlaylistsProps = {
   playlists: TPlaylist[];
};

const Playlists = ({ playlists }: PlaylistsProps) => {
   const handleClick = async (id: string) => {
      try {
         const res = await fetch(`/api/spotify/playlists/${id}`);
         const data = await res.json();
         console.log("Tracks:", data.items);
      } catch (error) {
         console.log(error);
      }
   };
   return (
      <ul>
         {playlists.map((pl) => (
            <li key={pl.id} className="mb-2 flex gap-2 items-center">
               <div className="relative w-8 h-8">
                  <Image
                     src={pl.images[2]?.url || pl.images[0]?.url}
                     alt="image"
                     fill
                     sizes="(max-width: 768px) 50vw, 30vw"
                  />
               </div>
               <span
                  className="cursor-pointer"
                  onClick={() => {
                     console.log(pl);
                     handleClick(pl.id);
                  }}
               >
                  {pl.name}
               </span>
            </li>
         ))}
      </ul>
   );
};

export default Playlists;
