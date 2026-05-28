// import { playlist } from "@/src/mocks/playlist-mock";
import Playlist from "@/src/components/main/Playlist";
// import NotFoundPage from "@/src/components/NotFoundPage/NotFoundPage";
import { getPlaylist } from "@/src/music/services/pageServices/playlist";

export default async function Page({
   params,
}: {
   params: Promise<{ id: string }>;
}) {
   const { id } = await params;
   const playlist = await getPlaylist(id);

   // if (playlist.error) return <NotFoundPage category="playlist" />;

   return <Playlist playlist={playlist} />;
}
