import { basicAuth, SPOTIFY_TOKEN_ENDPOINT } from "./spotify-consts";
import { prisma } from "@/lib/prisma";
import { getRefreshedToken } from "./utils";

export type Refreshed = {
   access_token: string;
   expires_at: number;
   refresh_token: string;
};

export type SpotifyToken = {
   access_token: string;
   token_type: string;
   expires_in: number;
   refresh_token: string;
   scope: string;
};

export async function refreshAccessToken(account: {
   refresh_token: string;
   provider: string;
   userId: string;
}): Promise<Refreshed> {
   const refreshed: SpotifyToken = await getRefreshedToken(
      SPOTIFY_TOKEN_ENDPOINT,
      account.refresh_token,
      basicAuth
   );

   const newToken = {
      access_token: refreshed.access_token,
      expires_at: Date.now() + refreshed.expires_in * 1000,
      refresh_token: refreshed.refresh_token ?? account.refresh_token,
   };

   await prisma.account.updateMany({
      where: { userId: account.userId, provider: account.provider },
      data: {
         access_token: newToken.access_token,
         refresh_token: newToken.refresh_token,
         expires_at: newToken.expires_at,
      },
   });

   return newToken;
}
