"use client";

import { SpotifyEngine } from "@/src/music/engine/types";
import { SpotifyPlayerStateSchema } from "../schemas";
import { SetPlayerType, usePlayerStore } from "@/src/music/stores/playerStore";
import { getCurrentProgress } from "@/src/music/selectors/selectors";
import getSpotifyPath, { SPOTIFY_PATH } from "../endpoints";
import postPlayerState from "@/src/music/player/postPlayerState";
import { fromSpotifySDKRepeat } from "../repeatMode/adapters";

const TOKEN_CHECK_INTERVAL_MINUTES = 5;
const TOKEN_MIN_LEFT_MINUTES = 10;

export function setSpotifyLocalPlayer(
   engine: SpotifyEngine,
   setPlayer: SetPlayerType,
) {
   const script = document.createElement("script");
   script.src = "https://sdk.scdn.co/spotify-player.js";
   script.async = true;
   document.body.appendChild(script);

   let player: Spotify.Player;
   let tokenRefreshInterval: ReturnType<typeof setTimeout> | null = null;
   let tokenExpiresAt: number;

   window.onSpotifyWebPlaybackSDKReady = () => {
      player = new window.Spotify.Player({
         name: "Local Player",
         getOAuthToken: async (cb) => {
            const res = await fetch("/api/token", { method: "POST" });
            const { accessToken, expiresAt } = await res.json();
            tokenExpiresAt = Number(expiresAt);
            cb(accessToken);
         },
      });

      engine.sdk = player;

      player.addListener("ready", async ({ device_id }) => {
         setPlayer({ deviceId: device_id });
         engine.deviceId = device_id;

         const apiPath = getSpotifyPath(SPOTIFY_PATH.player.player);
         const body = { device_ids: [device_id], play: false };
         const res = await postPlayerState(apiPath, "transfer", "PUT", body);
         if (res.ok) {
            console.log("Player ready");
         }

         const volume = usePlayerStore.getState().volume / 100;
         player.setVolume(volume);

         if (!tokenRefreshInterval) {
            async function updateToken() {
               if (!tokenExpiresAt) return;
               const timeLeft = tokenExpiresAt - Date.now();
               const MIN_LEFT = TOKEN_MIN_LEFT_MINUTES * 60 * 1000;

               if (timeLeft <= MIN_LEFT) {
                  // console.log(
                  //    `🕒 [Auth] Proactive token refresh triggered. Time left: ${Math.round(timeLeft / 1000 / 60)} min.  Updating SDK...`,
                  // );
                  try {
                     await player.connect();
                  } catch (error) {
                     console.log(error);
                  }
               }
            }
            updateToken();

            const INTERVAL = TOKEN_CHECK_INTERVAL_MINUTES * 60 * 1000;
            tokenRefreshInterval = setInterval(updateToken, INTERVAL);
         }
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

      player.addListener("authentication_error", ({ message }) => {
         console.error("Auth error:", message);
      });

      player.addListener("initialization_error", ({ message }) => {
         console.error("Init error:", message);
      });
      player.addListener("account_error", ({ message }) => {
         console.error("Account error:", message);
      });
      player.addListener("playback_error", ({ message }) => {
         console.error("Playback error:", message);
      });
   };

   return () => {
      if (tokenRefreshInterval) {
         clearInterval(tokenRefreshInterval);
      }
      player?.disconnect();
      script.remove();
   };
}
