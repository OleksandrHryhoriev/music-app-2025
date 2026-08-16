"use client";

import { useEffect, useState } from "react";
import MuteIcon from "../../icons/player-icons/MuteIcon";
import VolumeBar from "./VolumeBar";
import UnmuteIcon from "../../icons/player-icons/UnmuteIcon";
import { usePlayerActions } from "@/src/music/actions/usePlayerActions";
import { usePlayerStore } from "@/src/music/stores/playerStore";
import { loadVolume } from "@/src/utils/volumeStorage";

const VolumeBlock = () => {
   const volumeValue = usePlayerStore((s) => s.volume);
   const setVolumeValue = usePlayerStore((s) => s.setVolume);
   const [isMuted, setIsMuted] = useState<boolean>(false);

   const { setVolume } = usePlayerActions();

   useEffect(() => {
      setVolumeValue(loadVolume());
   }, [setVolumeValue]);

   const handleChange = (value: number) => {
      if (isMuted === true) {
         setIsMuted(false);
      }
      setVolume(value);

      setVolumeValue(value);
   };

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
            onChange={handleChange}
         />
      </div>
   );
};

export default VolumeBlock;
