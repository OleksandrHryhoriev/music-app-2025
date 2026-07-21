import AlbumPage from "@/src/components/main/pages/album/AlbumPage";
import NotFoundPage from "@/src/components/NotFoundPage/NotFoundPage";
import { getAlbum } from "@/src/music/services/pageServices/album/album";

export default async function Page({
   params,
}: {
   params: Promise<{ id: string }>;
}) {
   const { id } = await params;
   const album = await getAlbum(id);

   if (album === null) return <NotFoundPage category="album" />;

   return <AlbumPage album={album} />;
}
