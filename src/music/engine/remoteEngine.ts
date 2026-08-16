import { RemoteEngine } from "./types";

export function createRemoteEngine(): RemoteEngine {
   return {
      playbackType: "remote",
      async play(uri) {
         await fetch("/api/play", {
            method: "POST",
            body: JSON.stringify({ uri: uri }),
         });
      },
      async pause() {
         await fetch("/api/pause", { method: "POST" });
      },
      async resume() {},
      async seek(positionMs) {
         console.log(positionMs);
      },
      async repeat(mode) {
         console.log(mode);
      },
      async shuffle(state) {
         console.log(state);
      },
      async next() {},
      async previous() {},
      async volume(value) {
         console.log(value);
      },
   };
}
