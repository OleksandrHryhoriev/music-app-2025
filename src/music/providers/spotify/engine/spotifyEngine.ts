import postPlayerState from "@/src/music/player/postPlayerState";
import { SpotifyEngine } from "../../../engine/types";
import getSpotifyPath, { SPOTIFY_PATH } from "../endpoints";
import { toSpotifyRepeat } from "../repeatMode/adapters";

export function createSpotifyEngine(): SpotifyEngine {
   let player: Spotify.Player | null = null;

   return {
      playbackType: "local",
      get sdk() {
         return player;
      },
      set sdk(p: Spotify.Player | null) {
         player = p;
      },
      async play(uri, index = null) {
         const apiPath = getSpotifyPath(SPOTIFY_PATH.player.play);
         let context = {};
         if (index !== null) {
            context = { context_uri: uri, offset: { position: index } };
         } else {
            context = { uris: [uri] };
         }
         await postPlayerState(apiPath, "play", "PUT", context);
      },
      async resume() {
         this.sdk?.resume();
      },
      async pause() {
         this.sdk?.pause();
      },
      async resumeLocal() {
         this.sdk?.resume();
      },
      async togglePlayLocal() {
         this.sdk?.togglePlay();
      },
      async seek(positionMs) {
         this.sdk?.seek(positionMs);
      },
      async repeat(mode) {
         const state = toSpotifyRepeat(mode);
         const apiPath = getSpotifyPath(SPOTIFY_PATH.player.repeat) + state;
         await postPlayerState(apiPath, "repeat", "PUT");
      },
      async shuffle(state) {
         const apiPath = getSpotifyPath(SPOTIFY_PATH.player.shuffle) + state;
         await postPlayerState(apiPath, "shuffle", "PUT");
      },
      async next() {
         this.sdk?.nextTrack();
      },
      async previous() {
         this.sdk?.previousTrack();
      },
      async volume(value) {
         this.sdk?.setVolume(value / 100);
      },
      // async play(uri, index = null) {
      //    const apiPath = getSpotifyPath(SPOTIFY_PATH.player.play);
      //    let context = {};
      //    if (index !== null) {
      //       context = { context_uri: uri, offset: { position: index } };
      //    } else {
      //       context = { uris: [uri] };
      //    }
      //    await postPlayerState(apiPath, "play", "PUT", context);
      // },
      // async resume() {
      //    const apiPath = getSpotifyPath(SPOTIFY_PATH.player.play);
      //    await postPlayerState(apiPath, "resume", "PUT");
      // },
      // async pause() {
      //    const apiPath = getSpotifyPath(SPOTIFY_PATH.player.pause);
      //    await postPlayerState(apiPath, "pause", "PUT");
      // },
      // async resumeLocal() {
      //    player?.resume();
      // },
      // async togglePlayLocal() {
      //    player?.togglePlay();
      // },
      // async seek(positionMs) {
      //    if (player) {
      //       try {
      //          await player?.seek(positionMs);
      //          return;
      //       } catch (error) {
      //          throw new Error(`${error}`);
      //       }
      //    }

      //    const apiPath = getSpotifyPath(SPOTIFY_PATH.player.seek) + positionMs;
      //    await postPlayerState(apiPath, "seek", "PUT");
      // },
      // async repeat(mode) {
      //    const state = toSpotifyRepeat(mode);
      //    const apiPath = getSpotifyPath(SPOTIFY_PATH.player.repeat) + state;
      //    await postPlayerState(apiPath, "repeat", "PUT");
      // },
      // async shuffle(state) {
      //    const apiPath = getSpotifyPath(SPOTIFY_PATH.player.shuffle) + state;
      //    await postPlayerState(apiPath, "shuffle", "PUT");
      // },
      // async next() {
      //    const apiPath = getSpotifyPath(SPOTIFY_PATH.player.next);
      //    await postPlayerState(apiPath, "next", "POST");
      // },
      // async previous() {
      //    const apiPath = getSpotifyPath(SPOTIFY_PATH.player.previous);
      //    await postPlayerState(apiPath, "previous", "POST");
      // },
      // async volume(value) {
      //    const apiPath = getSpotifyPath(SPOTIFY_PATH.player.volume) + value;
      //    await postPlayerState(apiPath, "volume", "PUT");
      // },
   };
}
