"use client";

import { PlaybackTrack } from "@/src/types/types";
import { getNextRepeat } from "../player/repeatMode";
import { usePlayerStore } from "../stores/playerStore";
import { getNextIndex, getPrevIndex } from "../player/getNextPrevIndex";

export function usePlayerActions() {
   const state = usePlayerStore.getState();
   const {
      engine,
      setPlayer,
      contextUri,
      isPlaying,
      repeatMode,
      shuffleState,
   } = state;

   const play = (track: PlaybackTrack, index: number) => {
      setPlayer({
         currentIndex: index,
         track,
         isPlaying: true,
         duration: track.duration,
         progress: 0,
      });

      if (contextUri) {
         engine?.play(contextUri, index);
      } else {
         engine?.play(track.uri, null);
      }
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
      if (engine?.playbackType === "local") {
         setPlayer((prev) => ({
            currentIndex: prev.currentIndex + 1,
            progress: 0,
         }));
         engine?.next();
         return;
      }

      if (contextUri === null) return; //TODO handle if contextUri is not supported by musicAPI

      const nextIndex = getNextIndex(state);
      if (nextIndex === null) return;
      setPlayer({
         currentIndex: nextIndex,
         progress: 0,
      });
      engine?.play(contextUri, nextIndex);
   };

   const prev = () => {
      const prevIndex = getPrevIndex(state);
      if (prevIndex === null) return;
      if (prevIndex === state.currentIndex) {
         setPlayer({ progress: 0 });
         engine?.seek(0);
         return;
      }

      setPlayer({
         currentIndex: prevIndex,
         progress: 0,
      });

      if (engine?.playbackType === "local") {
         engine?.previous();
         return;
      }

      if (contextUri === null) return; //TODO handle if contextUri is not supported by musicAPI
      engine?.play(contextUri, prevIndex);
   };

   return { play, togglePlay, seek, shuffle, repeat, next, prev };
}
