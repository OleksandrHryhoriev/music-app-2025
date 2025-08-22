import fetchSpotify from "@/src/hooks/fetchSpotify";
import Tracks from "./Tracks";
import { PLAYLIST_PATH } from "@/lib/spotify-consts";

const Playlist = async () => {
   const id = "31uTx1KSmkHhcdxb5bFQKC";
   const data = await fetchSpotify(PLAYLIST_PATH + id);
   const tracks = data?.tracks || null;
   // const tracks = false;
   // console.log("Tracks:", tracks);
   return tracks ? (
      <Tracks tracks={tracks.items} />
   ) : (
      <div className="p-2">No playlist found</div>
   );
};

export default Playlist;
