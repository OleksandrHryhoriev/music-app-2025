import { ClientProvider } from "../providers/types";
import { createRemoteEngine } from "./remoteEngine";
import { createSpotifyEngine } from "../providers/spotify/engine/spotifyEngine";
import { PlaybackEngine } from "./types";

export function createPlaybackEngine(provider: ClientProvider): PlaybackEngine {
   // TODO
   if (provider.playbackType === "local") {
      return createSpotifyEngine();
   }
   return createRemoteEngine();
}
