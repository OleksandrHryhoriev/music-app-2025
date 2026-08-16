"use client";

import NextIcon from "../icons/player-icons/NextIcon";
import PrevIcon from "../icons/player-icons/PrevIcon";
import RepeatIcon from "../icons/player-icons/RepeatIcon";
import ShuffleIcon from "../icons/player-icons/ShuffleIcon";
import PlayIcon from "../icons/PlayIcon";
import PauseIcon from "../icons/PauseIcon";
import { usePlayerStore } from "@/src/music/stores/playerStore";
import { usePlayerActions } from "@/src/music/actions/usePlayerActions";
import PlaybackBar from "./PlaybackBar/PlaybackBar";

const PlayerControls = () => {
   const { isPlaying, repeatMode, shuffleState } = usePlayerStore((s) => s);

   const { togglePlay, shuffle, repeat, next, prev } = usePlayerActions();

   return (
      <div className="w-full h-full flex flex-col items-center justify-center">
         <div className="player-control-buttons w-full flex justify-center items-center gap-2 mb-2">
            <button
               className="player-shuffle player-button"
               onClick={() => shuffle()}
            >
               <span>
                  <ShuffleIcon
                     color={shuffleState ? "var(--textActiveColor)" : undefined}
                  />
               </span>
            </button>
            <button
               className="player-prev player-button"
               onClick={() => {
                  prev();
               }}
            >
               <span>
                  <PrevIcon />
               </span>
            </button>
            <button
               className="player-playpause player-button rounded-full bg-white mx-2"
               onClick={() => togglePlay()}
            >
               <span>
                  {isPlaying ? (
                     <PauseIcon color="#000000" />
                  ) : (
                     <PlayIcon color="#000000" />
                  )}
               </span>
            </button>
            <button
               className="player-next player-button"
               onClick={() => {
                  next();
               }}
            >
               <span>
                  <NextIcon />
               </span>
            </button>
            <button
               className="player-repeat player-button relative"
               onClick={() => repeat()}
            >
               {repeatMode === "one" && (
                  <span className="absolute text-(--textActiveColor) text-[8px] p-[1px] top-1.5 left-[13px] text-center bg-(--backgroundMain) ">
                     1
                  </span>
               )}
               <span>
                  <RepeatIcon
                     color={
                        repeatMode !== "off"
                           ? "var(--textActiveColor)"
                           : undefined
                     }
                  />
               </span>
            </button>
            {/* <button
               className="player-next player-button"
               onClick={() => {
                  console.log(usePlayerStore.getState());
               }}
            >
               <span>
                  <NextIcon />
               </span>
            </button> */}
         </div>
         <div className="player-playback w-full">
            <PlaybackBar />
         </div>
      </div>
   );
};

export default PlayerControls;
