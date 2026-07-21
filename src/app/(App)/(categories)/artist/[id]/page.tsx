import { getArtist } from "@/src/music/services/pageServices/artist/artist";
import NotFoundPage from "@/src/components/NotFoundPage/NotFoundPage";
import Artist from "@/src/components/main/pages/artist/ArtistPage";
import { getArtistTopTracks } from "@/src/music/services/pageServices/artist/artistTopTracks";

export default async function Page({
   params,
}: {
   params: Promise<{ id: string }>;
}) {
   const { id } = await params;
   const artist = await getArtist(id);

   if (artist === null) return <NotFoundPage category="artist" />;

   const topTracks = await getArtistTopTracks(id);

   return <Artist artist={artist} topTracks={topTracks} />;
}
