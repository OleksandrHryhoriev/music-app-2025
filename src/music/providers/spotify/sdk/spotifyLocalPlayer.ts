"use client";

import { SpotifyEngine } from "@/src/music/engine/types";
import { SpotifyPlayerStateSchema } from "../schemas";
import { SetPlayerType, usePlayerStore } from "@/src/music/stores/playerStore";
import { getCurrentProgress } from "@/src/music/selectors/selectors";
import getSpotifyPath, { SPOTIFY_PATH } from "../endpoints";
import postPlayerState from "@/src/music/player/postPlayerState";
import { fromSpotifySDKRepeat } from "../repeatMode/adapters";

export function setSpotifyLocalPlayer(
   engine: SpotifyEngine,
   setPlayer: SetPlayerType,
) {
   const script = document.createElement("script");
   script.src = "https://sdk.scdn.co/spotify-player.js";
   script.async = true;
   document.body.appendChild(script);

   let player: Spotify.Player;

   window.onSpotifyWebPlaybackSDKReady = () => {
      player = new window.Spotify.Player({
         name: "Local Player",
         getOAuthToken: async (cb) => {
            const res = await fetch("/api/token");
            const { accessToken } = await res.json();
            cb(accessToken);
         },
         // getOAuthToken: (cb) => cb(accessToken),
         // volume: 0.5,
      });

      engine.sdk = player;

      player.addListener("ready", async ({ device_id }) => {
         setPlayer({ deviceId: device_id });

         const apiPath = getSpotifyPath(SPOTIFY_PATH.player.player);
         const body = { device_ids: [device_id], play: false };
         const res = await postPlayerState(apiPath, "transfer", "PUT", body);

         if (res.ok) {
            console.log("Player ready");
         }

         const volume = usePlayerStore.getState().volume / 100;
         player.setVolume(volume);
      });

      player.addListener("player_state_changed", (rawState: unknown) => {
         const parsed = SpotifyPlayerStateSchema.safeParse(rawState);

         if (!parsed.success) return;

         const state = parsed.data;

         const track = state.track_window.current_track;

         setPlayer((prev) => {
            const realProgress = getCurrentProgress(prev);
            if (
               track.id === prev.track?.id &&
               state.position < realProgress - 500
            ) {
               return { sdkTimeStamp: performance.now() };
            }

            return {
               track,
               nextTrack: state.track_window.next_tracks[0] || null,
               prevTrack: state.track_window.previous_tracks[0] || null,
               isPlaying: !state.paused,
               duration: track.duration,
               progress: state.position,
               shuffleState: state.shuffle,
               repeatMode: fromSpotifySDKRepeat(state.repeat_mode),
               playerLoaded: true,
               sdkTimeStamp: performance.now(),
            };
         });
      });

      player.addListener("not_ready", ({ device_id }) => {
         console.warn("Device offline:", device_id);
         setPlayer({ deviceId: null });
      });

      player.connect();

      player.addListener("initialization_error", ({ message }) => {
         console.error("Init error:", message);
      });

      player.addListener("authentication_error", ({ message }) => {
         console.error("Auth error:", message);
      });

      player.addListener("account_error", ({ message }) => {
         console.error("Account error:", message);
      });

      player.addListener("playback_error", ({ message }) => {
         console.error("Playback error:", message);
      });

      return () => {
         player?.disconnect();
      };
   };
}
