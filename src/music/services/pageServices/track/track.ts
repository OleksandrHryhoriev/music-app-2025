import { getMusicProvider } from "@/src/music/providers/getMusicProvider";

export async function getTrack(id: string) {
   const provider = await getMusicProvider();

   if (!provider) return null;

   return provider.client.getTrack(id);
}
