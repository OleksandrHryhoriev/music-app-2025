"use client";

import { useState } from "react";
import MuteIcon from "../../icons/player-icons/MuteIcon";
import VolumeBar from "./VolumeBar";
import UnmuteIcon from "../../icons/player-icons/UnmuteIcon";
import { usePlayerActions } from "@/src/music/actions/usePlayerActions";

const VolumeBlock = () => {
   //TODO add anchor for initial value to localStorage
   const [volumeValue, setVolumeValue] = useState<number>(50);
   const [isMuted, setIsMuted] = useState<boolean>(false);

   const { setVolume } = usePlayerActions();

   return (
      <div className="volumeBlock w-full max-w-40 flex gap-1 items-center">
         <button
            className="player-mute player-button"
            onClick={() => {
               setIsMuted((prev) => !prev);
               setVolume(!isMuted ? 0 : volumeValue);
            }}
         >
            <span>{isMuted ? <UnmuteIcon /> : <MuteIcon />}</span>
         </button>
         <VolumeBar
            volume={isMuted ? 0 : volumeValue}
            onChange={(value) => {
               if (isMuted === true) {
                  setIsMuted(false);
               }
               setVolume(value);

               setVolumeValue(value);
            }}
         />
      </div>
   );
};

export default VolumeBlock;
