import { getMusicProvider } from "../../providers/getMusicProvider";

export async function getPlaylists() {
   const provider = await getMusicProvider();

   if (!provider) return [];

   return provider.client.getPlaylistList?.();
}
