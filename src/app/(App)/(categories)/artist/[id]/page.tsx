import { getArtist } from "@/src/music/services/pageServices/artist";
import NotFoundPage from "@/src/components/NotFoundPage/NotFoundPage";
import Artist from "@/src/components/main/Artist";

export default async function Page({
   params,
}: {
   params: Promise<{ id: string }>;
}) {
   const { id } = await params;
   const artist = await getArtist(id);

   if (artist === null) return <NotFoundPage category="artist" />;

   return <Artist artist={artist} />;
}
