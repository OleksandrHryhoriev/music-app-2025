"use client";

import formatTime from "@/src/utils/functions/formatTime";
import { useEffect, useState } from "react";
import PlaybackProgressBar from "./PlaybackProgressBar";
import { usePlayerStore } from "@/src/music/stores/playerStore";
import { getCurrentProgress } from "@/src/music/selectors/selectors";
import { usePlayerActions } from "@/src/music/actions/usePlayerActions";

const PlaybackBar = () => {
   const [playbackTime, setPlaybackTime] = useState<number>(0);

   const duration = usePlayerStore((s) => s.duration);
   const isPlaying = usePlayerStore((s) => s.isPlaying);
   const playerLoaded = usePlayerStore((s) => s.playerLoaded);

   const { seek } = usePlayerActions();

   useEffect(() => {
      if (playerLoaded) {
         const progress = usePlayerStore.getState().progress;
         setPlaybackTime(progress);
      }
   }, [playerLoaded]);

   useEffect(() => {
      if (!isPlaying) return;
      let frame: number;

      const update = () => {
         const state = usePlayerStore.getState();
         const current = getCurrentProgress(state);

         if (state.isPlaying && state.duration - current < 200) {
            cancelAnimationFrame(frame);

            usePlayerStore.getState().setPlayer({
               progress: 0,
               isPlaying: false,
            });
            setPlaybackTime(0);
            return;
         }

         setPlaybackTime((prev) => {
            if (prev === current) return prev;
            return current;
         });
         frame = requestAnimationFrame(update);
      };

      frame = requestAnimationFrame(update);

      return () => cancelAnimationFrame(frame);
   }, [isPlaying]);

   const handleOnChange = (value: number) => {
      setPlaybackTime(value);
      seek(value);
   };

   return (
      <div className="playback-bar w-full flex items-center justify-between gap-2">
         <div className="playback-position secondary-text text-xs text-right min-w-12">
            {formatTime(playbackTime)}
         </div>
         <div className="playback-progressbar flex-auto ">
            <PlaybackProgressBar
               playbackTime={playbackTime}
               onChange={handleOnChange}
               duration={duration}
            />
         </div>
         <div className="playback-duration secondary-text text-xs text-left min-w-12">
            {formatTime(duration)}
         </div>
      </div>
   );
};

export default PlaybackBar;
