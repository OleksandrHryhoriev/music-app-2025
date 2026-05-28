import { MusicProvider, MusicProviderConfig } from "./types";
import { sporifyClient } from "./spotify/client";
import {
   SPOTIFY_AUTH_HEADER,
   SPOTIFY_TOKEN_ENDPOINT,
} from "./spotify/endpoints";

export const PROVIDERS: Record<MusicProvider, MusicProviderConfig> = {
   spotify: {
      tokenEndpoint: SPOTIFY_TOKEN_ENDPOINT,
      authHeader: SPOTIFY_AUTH_HEADER,
      client: sporifyClient,
      playbackType: "local",
   },
} as const;
