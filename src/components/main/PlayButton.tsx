"use client";

import { usePlayerActions } from "@/src/music/actions/usePlayerActions";
import PauseIcon from "../icons/PauseIcon";
import PlayIcon from "../icons/PlayIcon";
import { usePlayerStore } from "@/src/music/stores/playerStore";
import { useEffect, useState } from "react";

type PlayButtonProps = {
   context: string | string[];
   bgColor?: string;
   color: string;
   index?: number;
};

const PlayButton = ({
   context,
   color,
   bgColor = "#1ed760",
   index,
}: PlayButtonProps) => {
   const [isCurrentPlaying, setIsCurrentPlaying] = useState<boolean>(false);
   const { isPlaying, contextCurrentUri } = usePlayerStore((s) => s);
   const { togglePlay, play } = usePlayerActions();

   useEffect(() => {
      if (contextCurrentUri === context /*TODO*/) {
         //TODO
         setIsCurrentPlaying(isPlaying);
      } else {
         setIsCurrentPlaying(false);
      }
   }, [contextCurrentUri, context, isPlaying]);

   const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      event.preventDefault();
      if (contextCurrentUri === context) {
         // TODO
         togglePlay();
         return;
      }
      play(context, index);
   };
   return (
      <button
         className="w-full h-full flex items-center justify-center hover:scale-105 transition-transform cursor-pointer"
         style={{ backgroundColor: bgColor }}
         onClick={handleClick}
      >
         <span className="w-4.5 h-4.5">
            {isCurrentPlaying ? (
               <PauseIcon color={color} />
            ) : (
               <PlayIcon color={color} />
            )}
         </span>
      </button>
   );
};

export default PlayButton;
