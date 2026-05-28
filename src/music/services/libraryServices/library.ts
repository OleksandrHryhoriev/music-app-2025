import { getMusicProvider } from "../../providers/getMusicProvider";

export async function getLibrary() {
   const provider = await getMusicProvider();

   if (!provider) return [];

   return provider.client.getLibrary();
}
