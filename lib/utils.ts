import { Refreshed, type SpotifyToken } from "./spotify";

export async function getRefreshedToken(
   tokenEndpoint: string,
   refreshToken: string,
   basicAuth: string
): Promise<SpotifyToken> {
   const response = await fetch(tokenEndpoint, {
      method: "POST",
      headers: {
         "Content-Type": "application/x-www-form-urlencoded",
         Authorization: `Basic ${basicAuth}`,
      },
      body: new URLSearchParams({
         grant_type: "refresh_token",
         refresh_token: refreshToken,
      }),
   });

   if (!response.ok) throw new Error("Failed to refresh token");
   return response.json();
}

const refreshLocks = new Map<string, Promise<Refreshed>>();

export async function withRefreshLock(
   key: string,
   fn: () => Promise<Refreshed>
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
