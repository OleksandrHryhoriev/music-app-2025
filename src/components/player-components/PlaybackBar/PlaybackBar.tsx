"use client";

import formatTime from "@/src/utils/functions/formatTime";
import React, { useEffect, useState } from "react";
import PlaybackProgressBar from "./PlaybackProgressBar";
import { usePlayerStore } from "@/src/music/stores/playerStore";
import { getCurrentProgress } from "@/src/music/selectors/selectors";

const PlaybackBar = () => {
   const [playbackTime, setPlaybackTime] = useState<number>(0);

   const duration = usePlayerStore((s) => s.duration);
   const isPlaying = usePlayerStore((s) => s.isPlaying);

   useEffect(() => {
      console.log("Player render");

      return () => {
         console.log("Player unmouted");
      };
   }, []);

   useEffect(() => {
      if (!isPlaying) return;
      let frame: number;

      const update = () => {
         const state = usePlayerStore.getState();
         const current = getCurrentProgress(state);

         if (state.isPlaying && state.duration - current < 200) {
            usePlayerStore.getState().setPlayer({
               progress: 0,
               isPlaying: false,
            });
            setPlaybackTime(0);
            return;
         }

         setPlaybackTime(current);
         frame = requestAnimationFrame(update);
      };

      frame = requestAnimationFrame(update);

      return () => cancelAnimationFrame(frame);
   }, [isPlaying]);

   return (
      <div className="playback-bar w-full flex items-center justify-between gap-2">
         <div className="playback-position secondary-text text-xs text-right min-w-12">
            {formatTime(playbackTime)}
         </div>
         <div className="playback-progressbar flex-auto ">
            <PlaybackProgressBar
               playbackTime={playbackTime}
               onChange={setPlaybackTime}
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
