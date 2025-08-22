import type { NextAuthConfig } from "next-auth";
import Spotify from "next-auth/providers/spotify";
import {
   SPOTIFY_CLIENT_ID,
   SPOTIFY_CLIENT_SECRET,
   SPOTIFY_LOGIN_URL,
} from "./lib/spotify-consts";

export default {
   providers: [
      Spotify({
         clientId: SPOTIFY_CLIENT_ID!,
         clientSecret: SPOTIFY_CLIENT_SECRET!,
         authorization: SPOTIFY_LOGIN_URL,
      }),
   ],
} satisfies NextAuthConfig;
