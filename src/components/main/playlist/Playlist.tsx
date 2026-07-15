"use client";

import TrackList from "../TrackList/TrackList";
import { PlaylistType } from "@/src/types/types";
import MainWrapper from "../MainWrapper";
import PlayButton from "../PlayButton";
import { useState } from "react";
import PlaylistHeader from "./playlistHeader/PlaylistHeader";

type PlaylistProps = {
   playlist: PlaylistType;
};

const Playlist = ({ playlist }: PlaylistProps) => {
   const [bgColor, setBgColor] = useState<string>("");

   return (
      <MainWrapper
         title={playlist.name}
         context={playlist.uri}
         bgColor={bgColor}
      >
         <div
            className="playlist-container w-full min-w-[420px] relative"
            style={{ containerType: "inline-size" }}
         >
            <PlaylistHeader playlist={playlist} setBgColor={setBgColor} />
            <div className="playlist-controls mb-5 relative z-2">
               <div className="w-14 h-14 ml-10 rounded-full overflow-hidden">
                  <PlayButton context={playlist.uri} color="#000000" />
               </div>
            </div>
            <div className="playlist-content px-4 relative z-2">
               <TrackList items={playlist.items} context={playlist.uri} />
            </div>
         </div>
      </MainWrapper>
   );
};

export default Playlist;
