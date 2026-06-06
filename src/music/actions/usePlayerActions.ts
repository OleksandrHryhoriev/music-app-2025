"use client";

import { PlaybackTrack } from "@/src/types/types";
import { getNextRepeat } from "../player/repeatMode";
import { usePlayerStore } from "../stores/playerStore";
import { getCurrentProgress } from "../selectors/selectors";

export function usePlayerActions() {
   const state = usePlayerStore.getState();
   const {
      engine,
      setPlayer,
      contextUri,
      isPlaying,
      repeatMode,
      shuffleState,
      nextTrack,
      prevTrack,
   } = state;

   const play = (track: PlaybackTrack, index: number) => {
      if (contextUri) {
         engine?.play(contextUri, index);
      } else {
         engine?.play(track.uri, null);
      }
      setPlayer({
         currentIndex: index,
         track,
         isPlaying: true,
         duration: track.duration,
         progress: 0,
         sdkTimeStamp: performance.now(),
      });
   };

   const togglePlay = () => {
      if (engine?.playbackType === "local") {
         engine.togglePlayLocal();
         setPlayer({ isPlaying: !isPlaying });
      } else {
         if (!isPlaying) {
            engine?.resume();
            setPlayer({ isPlaying: true });
         } else {
            engine?.pause();
            setPlayer({ isPlaying: false });
         }
      }
   };

   const seek = (progress: number) => {
      engine?.seek(progress);
      setPlayer({ progress });
   };

   const shuffle = () => {
      setPlayer({ shuffleState: !shuffleState });
      engine?.shuffle(!shuffleState);
   };

   const repeat = async () => {
      const next = getNextRepeat(repeatMode);
      try {
         setPlayer({ repeatMode: next });
         engine?.repeat(next);
      } catch {
         setPlayer({ repeatMode: repeatMode });
      }
   };

   const next = () => {
      if (nextTrack === null) return;
      if (engine?.playbackType === "local") {
         engine.next();
         return;
      }
      engine?.play(nextTrack.uri, null);
      //TODO handle adding new track to "nextTrack"
      //TODO handle autoplay
      //TODO work with context and queue
   };

   const prev = () => {
      const progress = getCurrentProgress(state);
      if (progress > 3000) {
         setPlayer({ progress: 0 });
         engine?.seek(0);
         return;
      }
      if (prevTrack === null) return;
      if (engine?.playbackType === "local") {
         engine.previous();
         return;
      }
      engine?.play(prevTrack.uri, null);
   };

   return { play, togglePlay, seek, shuffle, repeat, next, prev };
}
