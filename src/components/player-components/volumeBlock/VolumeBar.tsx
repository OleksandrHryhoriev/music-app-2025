import { useEffect, useRef, useState } from "react";

type VolumeBarProps = {
   volume: number;
   step?: number;
   onChange: (value: number) => void;
};

const VolumeBar = ({ volume, step = 10, onChange }: VolumeBarProps) => {
   const volumeBarRef = useRef<HTMLDivElement>(null);
   const [volumeValue, setVolumeValue] = useState<number>(volume);
   const [hoverValue, setHoverValue] = useState<number | null>(null);
   const [dragging, setDragging] = useState<boolean>(false);

   useEffect(() => {
      if (!dragging) {
         setVolumeValue(volume);
      }
   }, [volume, dragging]);

   function getPointerPosition(clientX: number): number {
      if (!volumeBarRef.current) return volume;

      const rect = volumeBarRef.current.getBoundingClientRect();
      const percent = (clientX - rect.left) / rect.width;

      const clamped = Math.min(1, Math.max(0, percent));

      return Math.round(clamped * 100);
   }

   const handlePointerMove = (e: React.PointerEvent) => {
      const value = getPointerPosition(e.clientX);

      setHoverValue(value);
      if (dragging) {
         setVolumeValue(value);
      }
   };

   function handlePointerDown(e: React.PointerEvent) {
      (e.target as HTMLElement).setPointerCapture(e.pointerId);

      const value = getPointerPosition(e.clientX);

      setDragging(true);
      setVolumeValue(value);
   }

   function handlePointerUp(e: React.PointerEvent) {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      const value = getPointerPosition(e.clientX);

      setDragging(false);
      onChange(value);
   }

   function handlePointerLeave() {
      if (!dragging) {
         setHoverValue(null);
      }
   }

   function handleKeyDown(e: React.KeyboardEvent) {
      let newValue = volume;

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
            newValue = 100;
            break;

         default:
            return;
      }

      e.preventDefault();

      newValue = Math.max(0, Math.min(100, newValue));
      onChange(newValue);
   }

   return (
      <div
         ref={volumeBarRef}
         role="slider"
         tabIndex={0}
         aria-valuemin={0}
         aria-valuemax={100}
         aria-valuenow={volumeValue}
         className="volumebar w-full py-1 relative cursor-pointer"
         onPointerMove={handlePointerMove}
         onPointerDown={handlePointerDown}
         onPointerUp={handlePointerUp}
         onPointerLeave={handlePointerLeave}
         onKeyDown={handleKeyDown}
      >
         <div className="volumebar-bg w-full h-1 rounded-sm bg-(--textSecondaryColor) opacity-50"></div>
         <div
            style={
               {
                  width: `${volumeValue}%`,
               } as React.CSSProperties
            }
            //TODO: transition
            className={`volumebar-current h-1 rounded-sm ${hoverValue ? "bg-(--textActiveColor)" : "bg-(--textMainColor)"} absolute z-5 top-1 left-0`}
         >
            {hoverValue !== null && (
               <span className="block w-2.5 h-2.5 rounded-lg bg-(--textMainColor) absolute z-15 -right-1.25 -top-0.75"></span>
            )}
         </div>
         {hoverValue ? (
            <div
               style={
                  {
                     width: `${hoverValue}%`,
                  } as React.CSSProperties
               }
               className="volumebar-hover h-1 rounded-sm bg-(--textMainColor) absolute z-2 top-1 left-0"
            ></div>
         ) : null}
      </div>
   );
};

export default VolumeBar;
