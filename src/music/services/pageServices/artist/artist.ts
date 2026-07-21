import { getMusicProvider } from "../../../providers/getMusicProvider";

export async function getArtist(id: string) {
   const provider = await getMusicProvider();

   if (!provider) return null;

   return provider.client.getArtist(id);
}
