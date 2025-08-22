// import fetchSpotify from "@/hooks/fetchSpotify";
// import { TPlaylist } from "@/src/types/spotify-types/types";
// import Playlists from "./Playlists";
// import { USER_PLAYLISTS_PATH } from "@/lib/spotify-consts";

const Library = async () => {
   // const data = await fetchSpotify(USER_PLAYLISTS_PATH);
   // const playlists: TPlaylist[] | null = data?.items || null;

   return (
      <div className="libraryWrapper w-[420px]">
         <div className="library-header flex items-center justify-between p-4 pt-3 ">
            <div className="title font-bold">Your Library</div>
            <div className="actions flex gap-2">
               <button className="create w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-2xl leading-none">
                  +
               </button>
               <button className="expand w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
                  ++
               </button>
            </div>
         </div>
         <div className="p-2">Playlist 1</div>
         {/* {playlists ? (
            <Playlists playlists={playlists} />
         ) : (
            <div className="p-2">No playlists found</div>
         )} */}
      </div>
   );
};

export default Library;
