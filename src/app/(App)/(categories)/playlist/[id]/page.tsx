// import { playlist } from "@/src/mocks/playlist-mock";

import PlaylistPage from "@/src/components/main/pages/playlist/PlaylistPage";
import NotFoundPage from "@/src/components/NotFoundPage/NotFoundPage";
import { getPlaylist } from "@/src/music/services/pageServices/playlist/playlist";

export default async function Page({
   params,
}: {
   params: Promise<{ id: string }>;
}) {
   const { id } = await params;
   const playlist = await getPlaylist(id);

   if (playlist === null) return <NotFoundPage category="playlist" />;

   return <PlaylistPage playlist={playlist} />;
}
