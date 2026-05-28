import { getMusicProvider } from "../../providers/getMusicProvider";

export async function getAlbums() {
   const provider = await getMusicProvider();

   if (!provider) return [];

   return provider.client.getAlbumList?.();
}
