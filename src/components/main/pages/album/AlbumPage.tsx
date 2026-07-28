"use client";

import { AlbumType } from "@/src/types/types";
import { useState } from "react";
import MainWrapper from "../../MainWrapper";
import PlayButton from "../../PlayButton";
import TrackList from "../../trackList/TrackList";
import AlbumHeader from "./AlbumHeader";

type AlbumPageProps = {
   album: AlbumType;
};

const AlbumPage = ({ album }: AlbumPageProps) => {
   const [bgColor, setBgColor] = useState<string>("");

   return (
      <MainWrapper title={album.name} context={album.uri} bgColor={bgColor}>
         <div
            className="album-container w-full min-w-[420px] relative"
            style={{ containerType: "inline-size" }}
         >
            <AlbumHeader album={album} setBgColor={setBgColor} />
            <div className="album-controls mb-5 relative z-2 flex gap-5">
               <div className="w-14 h-14 ml-10 rounded-full overflow-hidden">
                  <PlayButton context={album.uri} color="#000000" />
               </div>
            </div>
            <div className="album-content px-4 relative z-2">
               <TrackList
                  items={album.items}
                  context={album.uri}
                  type="album"
               />
            </div>
         </div>
      </MainWrapper>
   );
};

export default AlbumPage;
