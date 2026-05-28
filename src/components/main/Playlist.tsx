import Image from "next/image";
import TrackList from "./TrackList/TrackList";
import { PlaylistType } from "@/src/types/types";

type PlaylistProps = {
   playlist: PlaylistType;
};

const Playlist = ({ playlist }: PlaylistProps) => {
   return (
      <div className="playlist-page w-full h-full">
         <div className="playlist-header w-full h-69 bg-amber-950 p-4 mb-5">
            <div className="w-full max-w-480 h-full mx-auto">
               <div className="h-full flex items-center gap-6">
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
                     <span>
                        {playlist.public
                           ? "Public Playlist"
                           : "Privat Playlist"}
                     </span>
                     <h2 className="text-2xl font-[800]">{playlist.name}</h2>
                  </div>
               </div>
            </div>
         </div>
         <div className="playlist-controls mb-5">CONTROLS</div>
         <div className="playlist-content px-4">
            <TrackList items={playlist.items} context={playlist.uri} />
         </div>
      </div>
   );
};

export default Playlist;
