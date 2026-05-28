import { usePlayerActions } from "@/src/music/actions/usePlayerActions";
import formatTime from "@/src/utils/functions/formatTime";
import React, { useEffect, useRef, useState } from "react";

type PlaybackProgressBarProps = {
   playbackTime: number;
   duration: number;
   step?: number;
   onChange: (value: number) => void;
};

const PlaybackProgressBar = ({
   playbackTime,
   duration,
   step = 5000,
   onChange,
}: PlaybackProgressBarProps) => {
   const progressbarRef = useRef<HTMLDivElement>(null);
   const [playbackValue, setPlaybackValue] = useState<number>(playbackTime);
   const [hoverValue, setHoverValue] = useState<number | null>(null);
   const [dragging, setDragging] = useState<boolean>(false);

   const { seek } = usePlayerActions();

   useEffect(() => {
      if (!dragging) {
         setPlaybackValue(playbackTime);
      }
   }, [playbackTime, dragging]);

   function getMousePosition(clientX: number): number {
      if (!progressbarRef.current) return playbackTime;

      const rect = progressbarRef.current.getBoundingClientRect();
      const percent = (clientX - rect.left) / rect.width;

      const clamped = Math.min(1, Math.max(0, percent));

      return Math.round(clamped * duration);
   }

   const handlePointerMove = (e: React.PointerEvent) => {
      const value = getMousePosition(e.clientX);

      setHoverValue(value);
      if (dragging) {
         setPlaybackValue(value);
      }
   };

   function handlePointerDown(e: React.PointerEvent) {
      (e.target as HTMLElement).setPointerCapture(e.pointerId);

      const value = getMousePosition(e.clientX);

      setDragging(true);
      setPlaybackValue(value);
   }

   function handlePointerUp(e: React.PointerEvent) {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      const value = getMousePosition(e.clientX);

      setDragging(false);
      onChange(value);
      seek(value);
   }

   function handlePointerLeave() {
      if (!dragging) {
         setHoverValue(null);
      }
   }

   function handleKeyDown(e: React.KeyboardEvent) {
      let newValue = playbackTime;

      switch (e.key) {
         case "ArrowRight":
         case "ArrowUp":
            newValue += step;
            break;

         case "ArrowLeft":
         case "ArrowDown":
            newValue -= step;
            break;

         case "Home":
            newValue = 0;
            break;

         case "End":
            newValue = duration;
            break;

         default:
            return;
      }

      e.preventDefault();

      newValue = Math.max(0, Math.min(duration, newValue));
      onChange(newValue);
      seek(newValue);
   }

   const playbackPercent: string = ((playbackValue / duration) * 100).toFixed(
      3,
   );
   const hoverPercent: string | null = hoverValue
      ? ((hoverValue / duration) * 100).toFixed(3)
      : null;

   return (
      <div
         ref={progressbarRef}
         role="slider"
         tabIndex={0}
         aria-valuemin={0}
         aria-valuemax={duration}
         aria-valuenow={playbackValue}
         className="progressbar w-full py-1 relative cursor-pointer"
         onPointerMove={handlePointerMove}
         onPointerDown={handlePointerDown}
         onPointerUp={handlePointerUp}
         onPointerLeave={handlePointerLeave}
         onKeyDown={handleKeyDown}
      >
         <div className="progressbar-bg w-full h-1 rounded-sm bg-(--textSecondaryColor) opacity-50"></div>
         <div
            style={
               {
                  width: `${playbackPercent}%`,
               } as React.CSSProperties
            }
            //TODO: transition
            className={`progressbar-current h-1 rounded-sm ${hoverValue ? "bg-(--textActiveColor)" : "bg-(--textMainColor)"} absolute z-5 top-1 left-0`}
         >
            {hoverValue !== null && (
               <span className="block w-2.5 h-2.5 rounded-lg bg-(--textMainColor) absolute z-15 -right-1.25 -top-0.75"></span>
            )}
         </div>
         {hoverPercent && (
            <div
               style={
                  {
                     width: `${hoverPercent}%`,
                  } as React.CSSProperties
               }
               className="progressbar-hover h-1 rounded-sm bg-(--textMainColor) absolute z-2 top-1 left-0"
            >
               {hoverValue && (
                  <div className="absolute -top-7 right-0 translate-x-1/2 px-1.5 py-0.25 rounded-sm bg-(--bgActive) text-sm text-(--textMainColor) flex items-center justify-center">
                     {formatTime(hoverValue)}
                  </div>
               )}
            </div>
         )}
      </div>
   );
};

export default PlaybackProgressBar;
