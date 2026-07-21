import { getMusicProvider } from "../../../providers/getMusicProvider";

export async function getArtistTopTracks(id: string) {
   const provider = await getMusicProvider();

   if (!provider) return null;

   return provider.client.getArtistTopTracks?.(id);
}
