import Image from "next/image";
// import TrackList from "./TrackList/TrackList";
import { ArtistType } from "@/src/types/types";

type ArtistProps = {
   artist: ArtistType;
};

const Artist = ({ artist }: ArtistProps) => {
   return (
      <div className="artist-page w-full h-full">
         <div className="artist-header w-full h-90 bg-amber-950 p-4 mb-5 relative">
            {artist.image && (
               <div className="w-full h-full absolute top-0 left-0">
                  <Image
                     className="object-cover"
                     src={artist.image.url}
                     fill={true}
                     sizes="20vw"
                     alt="artist cover image"
                  />
               </div>
            )}
            <div className="w-full max-w-480 h-full mx-auto relative z-5">
               <div className="h-full flex items-center gap-6">
                  <div className="flex-auto flex flex-col gap-3">
                     <h2 className="text-8xl font-[800]">{artist.name}</h2>
                     <p className="text-lg">{artist.followers} followers</p>
                  </div>
               </div>
            </div>
         </div>
         <div className="artist-controls mb-5">CONTROLS</div>
         <div className="artist-content px-4">
            {/* <TrackList items={artist.items} context={artist.uri} /> */}
         </div>
      </div>
   );
};

export default Artist;
