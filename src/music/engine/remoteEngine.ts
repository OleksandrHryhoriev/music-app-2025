import { RemoteEngine } from "./types";

export function createRemoteEngine(): RemoteEngine {
   return {
      playbackType: "remote",
      async play(track) {
         await fetch("/api/play", {
            method: "POST",
            body: JSON.stringify({ uri: track.uri }),
         });
      },
      async pause() {
         await fetch("/api/pause", { method: "POST" });
      },
   };
}
