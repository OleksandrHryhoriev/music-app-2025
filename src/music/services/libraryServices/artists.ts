import { getMusicProvider } from "../../providers/getMusicProvider";

export async function getArtists() {
   const provider = await getMusicProvider();

   if (!provider) return [];

   return provider.client.getArtistList?.();
}
