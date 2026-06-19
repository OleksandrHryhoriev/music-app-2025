"use client";

import Image from "next/image";
import TrackList from "./TrackList/TrackList";
import { PlaylistType } from "@/src/types/types";
import { formatTimeHours } from "@/src/utils/functions/formatTime";
import MainWrapper from "./MainWrapper";
import getRandomColor from "@/src/utils/functions/getRandomColor";
import PlayButton from "./PlayButton";
import { useEffect, useState } from "react";

type PlaylistProps = {
   playlist: PlaylistType;
};

const Playlist = ({ playlist }: PlaylistProps) => {
   const [bgColor, setBgColor] = useState<string>("");

   useEffect(() => {
      const color = getRandomColor();
      setBgColor(color);
   }, []);

   const playlistDuration = formatTimeHours(
      playlist.items.reduce(
         (accumulator, current) => accumulator + current.item.duration,
         0,
      ),
   );

   return (
      <MainWrapper
         title={playlist.name}
         context={playlist.uri}
         bgColor={bgColor}
      >
         <div className="playlist-container w-full">
            <div
               className="playlist-header w-full h-70 p-4 mb-5"
               style={{ backgroundColor: bgColor }}
            >
               <div className="w-full max-w-480 h-full mx-auto">
                  <div className="h-full flex items-end gap-6">
                     {playlist.image && (
                        <div className="h-full aspect-square relative ">
                           <Image
                              src={playlist.image.url}
                              fill={true}
                              sizes="20vw"
                              alt="Playlist cover image"
                           />
                        </div>
                     )}
                     <div className="flex-auto flex flex-col gap-3">
                        <span className="text-sm">
                           {playlist.public
                              ? "Public Playlist"
                              : "Privat Playlist"}
                        </span>
                        <h2 className="text-6xl font-[900]">{playlist.name}</h2>
                        <div className="flex items-end">
                           <span className="flex gap-1 items-center mr-2">
                              <span className="font-[600]">
                                 {playlist.owner.name}
                              </span>
                           </span>
                           <span className="align-bottom flex gap-1 items-center text-(--textSecondaryColor) text-sm leading-none before:w-1 before:h-1 before:bg-(--textSecondaryColor) before:rounded-full">
                              {`${playlist.items.length} songs, ${playlistDuration}`}
                           </span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div className="playlist-controls mb-5">
               <div className="w-14 h-14 ml-10 rounded-full overflow-hidden">
                  <PlayButton context={playlist.uri} color="#000000" />
               </div>
            </div>
            <div className="playlist-content px-4">
               <TrackList items={playlist.items} context={playlist.uri} />
            </div>
         </div>
      </MainWrapper>
   );
};

export default Playlist;
