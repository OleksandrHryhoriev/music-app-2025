import Image from "next/image";
import DynamicText from "../../DynamicText";
import { PlaylistType } from "@/src/types/types";
import { formatTimeHours } from "@/src/utils/functions/formatTime";
import { useRef } from "react";
import getColorsFromImage from "@/src/utils/bgcolor/getColorsFromImage";
import updatePalette from "@/src/utils/bgcolor/updatePalette";
import "./PlaylistHeader.css";
import Link from "next/link";

type PlaylistHeaderProps = {
   playlist: PlaylistType;
   setBgColor: (color: string) => void;
};

const PlaylistHeader = ({ playlist, setBgColor }: PlaylistHeaderProps) => {
   const containerRef = useRef<HTMLDivElement | null>(null);

   const playlistDuration = formatTimeHours(
      playlist.items.reduce(
         (accumulator, current) => accumulator + current.item.duration,
         0,
      ),
   );

   const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
      const imageElement = event.currentTarget;

      if (
         !imageElement ||
         !(imageElement instanceof HTMLImageElement) ||
         !imageElement.complete
      ) {
         return;
      }

      if (imageElement.naturalWidth === 0 || imageElement.naturalHeight === 0) {
         console.warn("Image has zero dimention.");
         return;
      }

      const { r, g, b } = getColorsFromImage(imageElement);

      if (containerRef.current) {
         updatePalette(r, g, b, containerRef.current);
         setBgColor(`rgb(${r}, ${g}, ${b})`);
      }
   };

   return (
      <div
         ref={containerRef}
         className="playlist-header w-full p-4 mb-5"
         style={{
            height:
               "clamp(200px, 200px + (280 - 200) * ((100cqw - 450px) / (1280 - 450)), 280px)",
         }}
      >
         <div className="w-full max-w-480 h-full mx-auto relative z-5">
            <div className="h-full w-full flex items-end gap-6">
               {playlist.image && (
                  <div className="h-full aspect-square relative rounded-sm overflow-hidden">
                     <Image
                        src={playlist.image.url}
                        fill={true}
                        sizes="20vw"
                        alt="Playlist cover image"
                        onLoad={handleImageLoad}
                     />
                  </div>
               )}
               <div className="flex-1  min-w-0">
                  <div className="w-full flex flex-col gap-3">
                     <span className="text-sm">
                        {playlist.public
                           ? "Public Playlist"
                           : "Privat Playlist"}
                     </span>
                     <div className="w-full font-black">
                        <DynamicText
                           text={playlist.name}
                           minSize={32}
                           maxSize={96}
                        />
                     </div>
                     <div className="flex flex-wrap items-center">
                        <Link
                           href={`/user/${playlist.owner.id}`}
                           className="flex gap-1 items-center mr-2 "
                        >
                           <span className="font-[600] text-sm textUnderline">
                              {playlist.owner.name}
                           </span>
                        </Link>
                        <span className="align-bottom flex gap-1 items-center text-(--textSecondaryColor) text-sm leading-none before:w-1 before:h-1 before:bg-(--textSecondaryColor) before:rounded-full whitespace-nowrap">
                           {`${playlist.items.length} songs, ${playlistDuration}`}
                        </span>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default PlaylistHeader;
