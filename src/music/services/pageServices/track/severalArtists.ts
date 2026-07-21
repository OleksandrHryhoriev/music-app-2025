import { getMusicProvider } from "../../../providers/getMusicProvider";

export async function getSeveralArtists(ids: string) {
   const provider = await getMusicProvider();

   if (!provider) return null;

   return provider.client.getSeveralArtists(ids);
}
