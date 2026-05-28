import { PROVIDERS } from "@/src/music/providers/providers";
import { MusicProvider } from "@/src/music/providers/types";
import { prisma } from "@/src/prisma/prisma";

export type Refreshed = {
   access_token: string;
   expires_at: number;
   refresh_token: string;
};

export type ApiToken = {
   access_token: string;
   token_type: string;
   expires_in: number;
   refresh_token: string;
};

export async function getRefreshedToken(
   tokenEndpoint: string,
   refreshToken: string,
   authHeader: string,
): Promise<ApiToken> {
   const res = await fetch(tokenEndpoint, {
      method: "POST",
      headers: {
         "Content-Type": "application/x-www-form-urlencoded",
         Authorization: authHeader,
      },
      body: new URLSearchParams({
         grant_type: "refresh_token",
         refresh_token: refreshToken,
      }),
      cache: "no-store",
   });

   if (!res.ok) throw new Error(`Failed to refresh token: ${res.status}`);
   return res.json();
}

// Handle multiple refresh requests
const refreshLocks = new Map<string, Promise<Refreshed>>();

export async function withRefreshLock(
   key: string,
   fn: () => Promise<Refreshed>,
): Promise<Refreshed> {
   if (refreshLocks.has(key)) {
      return refreshLocks.get(key)!; // wait for existing refresh
   }

   const promise = fn().finally(() => {
      refreshLocks.delete(key);
   });

   refreshLocks.set(key, promise);
   return promise;
}

export async function refreshAccessToken(account: {
   refresh_token: string;
   provider: MusicProvider;
   userId: string;
}): Promise<Refreshed> {
   const config = PROVIDERS[account.provider];
   if (!config) {
      throw new Error(`Unsupported provider: ${account.provider}`); //TODO handle error case
   }

   const refreshed = await getRefreshedToken(
      config.tokenEndpoint,
      account.refresh_token,
      config.authHeader,
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
