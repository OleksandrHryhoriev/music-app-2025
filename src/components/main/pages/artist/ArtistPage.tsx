"use client";

import { ArtistType, TrackType } from "@/src/types/types";
import { useState } from "react";
import MainWrapper from "../../MainWrapper";
import PlayButton from "../../PlayButton";
import ArtistHeader from "./ArtistHeader";
import ArtistTrackList from "./ArtistTrackList";

type ArtistPageProps = {
   artist: ArtistType;
   topTracks: TrackType[] | null;
};

const ArtistPage = ({ artist, topTracks }: ArtistPageProps) => {
   const [bgColor, setBgColor] = useState<string>("");
   return (
      <MainWrapper title={artist.name} context={artist.uri} bgColor={bgColor}>
         <div
            className="artist-container w-full min-w-[420px] relative"
            style={{ containerType: "inline-size" }}
         >
            <ArtistHeader artist={artist} setBgColor={setBgColor} />
            <div className="page-controls mb-5 relative z-2">
               <div className="w-14 h-14 ml-10 rounded-full overflow-hidden">
                  {topTracks && (
                     <PlayButton context={artist.uri} color="#000000" />
                  )}
               </div>
            </div>
            <div className="artist-content px-4 relative z-2">
               <h3 className="text-2xl font-bold pl-3 mb-2">Popular</h3>
               {topTracks && (
                  <ArtistTrackList items={topTracks} context={artist.uri} />
               )}
            </div>
         </div>
      </MainWrapper>
   );
};

export default ArtistPage;
