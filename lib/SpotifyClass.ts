import { JWT } from "next-auth/jwt";
import { basicAuth, SPOTIFY_TOKEN_ENDPOINT } from "./spotify-consts";
import { auth } from "@/auth";

export class Spotify {
   async refreshAccessToken(token: JWT): Promise<JWT> {
      console.log("REFRESHING TOKEN....");
      try {
         const res = await fetch(SPOTIFY_TOKEN_ENDPOINT, {
            method: "POST",
            headers: {
               Authorization: `Basic ${basicAuth}`,
               "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
               grant_type: "refresh_token",
               refresh_token: token.refreshToken as string,
            }),
         });

         const refreshed = await res.json();
         // console.log(res.status);
         // console.log(refreshed);

         // if (!res.ok) throw refreshed;

         return {
            ...token,
            accessToken: refreshed.access_token,
            accessTokenExpires: Date.now() + refreshed.expires_in * 1000,
            // accessTokenExpires: Date.now() + 600 * 1000,
            refreshToken: refreshed.refresh_token ?? token.refreshToken,
            error: null,
         };
      } catch (error) {
         console.error("Error refreshing Spotify token", error);
         return { ...token, error: "RefreshAccessTokenError" };
      }
   }

   async fetchSpotify() {
      const session = await auth();

      if (session) {
         const accessToken = session.accessToken;

         if (!accessToken) {
            throw new Error("No access token");
         }

         try {
            const res = await fetch(`https://api.spotify.com/v1/me/playlists`, {
               headers: {
                  Authorization: `Bearer ${accessToken}`,
               },
            });
            console.log(res.status);
            const data = await res.json();
            return data.items;
         } catch (error) {
            console.log(error);
         }
      }
   }
}
