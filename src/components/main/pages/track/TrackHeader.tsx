import Image from "next/image";
import DynamicText from "../../DynamicText";
import { TrackType } from "@/src/types/types";
import { useRef } from "react";
import Link from "next/link";
import handleImageLoad from "@/src/utils/bgcolor/handleImageLoad";
import formatTime from "@/src/utils/functions/formatTime";

type TrackHeaderProps = {
   track: TrackType;
   setBgColor: (color: string) => void;
};

const TrackHeader = ({ track, setBgColor }: TrackHeaderProps) => {
   const containerRef = useRef<HTMLDivElement | null>(null);

   return (
      <div
         ref={containerRef}
         className="page-header w-full p-4 mb-5"
         style={{
            height:
               "clamp(200px, 200px + (280 - 200) * ((100cqw - 450px) / (1280 - 450)), 280px)",
         }}
      >
         <div className="w-full max-w-480 h-full mx-auto relative z-5">
            <div className="h-full w-full flex items-end gap-6">
               <div className="h-full aspect-square relative rounded-sm overflow-hidden bg-blue-950">
                  {track.album.image && (
                     <Image
                        src={track.album.image.url}
                        fill={true}
                        sizes="20vw"
                        alt="track cover image"
                        onLoad={(event) =>
                           handleImageLoad(
                              event,
                              containerRef.current,
                              setBgColor,
                           )
                        }
                     />
                  )}
               </div>
               <div className="flex-1  min-w-0">
                  <div className="w-full flex flex-col gap-3">
                     <span className="text-sm">Song</span>
                     <div className="w-full font-black">
                        <DynamicText
                           text={track.name}
                           minSize={32}
                           maxSize={96}
                        />
                     </div>
                     <div className="flex flex-wrap gap-1 items-center">
                        <Link
                           href={`/artist/${track.artists[0].id}`}
                           className="flex gap-1 items-center mr-2 "
                        >
                           <span className="font-[600] text-sm textUnderline">
                              {track.artists[0].name}
                           </span>
                        </Link>
                        <span className="align-bottom flex gap-1 items-center text-(--textSecondaryColor) text-sm leading-none before:w-1 before:h-1 before:bg-(--textSecondaryColor) before:rounded-full whitespace-nowrap">
                           <Link href={`/artist/${track.album.id}`}>
                              <span className="textUnderline">
                                 {track.album.name}
                              </span>
                           </Link>
                        </span>
                        <span className="align-bottom flex gap-1 items-center text-(--textSecondaryColor) text-sm leading-none before:w-1 before:h-1 before:bg-(--textSecondaryColor) before:rounded-full whitespace-nowrap">
                           {track.album.id /*TODO release date*/}
                        </span>
                        <span className="align-bottom flex gap-1 items-center text-(--textSecondaryColor) text-sm leading-none before:w-1 before:h-1 before:bg-(--textSecondaryColor) before:rounded-full whitespace-nowrap">
                           {formatTime(track.duration)}
                        </span>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default TrackHeader;
