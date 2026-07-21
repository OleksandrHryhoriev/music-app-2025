"use client";

import { ArtistType, TrackType } from "@/src/types/types";
import MainWrapper from "../../MainWrapper";
import PlayButton from "../../PlayButton";
import { useState } from "react";
import TrackHeader from "./TrackHeader";
import Image from "next/image";
import Link from "next/link";

type TrackPageProps = {
   track: TrackType;
   artists: ArtistType[] | null;
};

const TrackPage = ({ track, artists }: TrackPageProps) => {
   const [bgColor, setBgColor] = useState<string>("");

   return (
      <MainWrapper title={track.name} context={track.uri} bgColor={bgColor}>
         <div
            className="track-container w-full min-w-[420px] relative"
            style={{ containerType: "inline-size" }}
         >
            <TrackHeader track={track} setBgColor={setBgColor} />
            <div className="track-controls mb-5 relative z-2">
               <div className="w-14 h-14 ml-10 rounded-full overflow-hidden">
                  <PlayButton context={[track.uri]} color="#000000" />
               </div>
            </div>
            <div className="track-content px-4 relative z-2">
               <ul className="artists-list flex flex-col p-2">
                  {artists?.map((artist) => (
                     <li
                        key={artist.id}
                        className="rounded-md hover:bg-(--bgActive)"
                     >
                        <Link
                           href={`/artist/${artist.id}`}
                           className="artist p-2 flex gap-4 items-center"
                        >
                           <div className="w-20 aspect-square relative rounded-full overflow-hidden bg-blue-950">
                              {artist.image && (
                                 <Image
                                    src={artist.image.url}
                                    fill={true}
                                    sizes="20vw"
                                    alt="artist image"
                                 />
                              )}
                           </div>
                           <div className="flex flex-col">
                              <span className="text-sm">Atrist</span>
                              <div className="">
                                 <span className="font-[600] text-md textUnderline">
                                    {artist.name}
                                 </span>
                              </div>
                           </div>
                        </Link>
                     </li>
                  ))}
               </ul>
            </div>
         </div>
      </MainWrapper>
   );
};

export default TrackPage;
