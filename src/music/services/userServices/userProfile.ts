import { getUserIdByProvider } from "@/src/lib/auth/authSession";
import { getMusicProvider } from "../../providers/getMusicProvider";

export async function getUserProfile(id: string) {
   const provider = await getMusicProvider();
   if (!provider) return null;

   const currentUserId = await getUserIdByProvider();
   if (currentUserId === id) {
      return provider.client.getMyProfile();
   }

   return provider.client.getUserProfile?.(id);
}

export async function getMyProfile() {
   const provider = await getMusicProvider();
   if (!provider) return null;

   return provider.client.getMyProfile();
}
