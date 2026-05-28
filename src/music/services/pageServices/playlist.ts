import { getMusicProvider } from "../../providers/getMusicProvider";

export async function getPlaylist(id: string) {
   const provider = await getMusicProvider();

   if (!provider) return null;

   return provider.client.getPlaylist?.(id);
}
