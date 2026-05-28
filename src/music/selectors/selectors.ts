import { PlayerState } from "../stores/playerStore";

export function getCurrentProgress(state: PlayerState) {
   if (!state.isPlaying) {
      return Math.min(state.progress, state.duration);
   }

   const elapsed = performance.now() - state.sdkTimeStamp;

   return Math.min(Math.floor(state.progress + elapsed), state.duration);
}
