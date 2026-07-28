import { AlbumType } from "@/src/types/types";
import handleImageLoad from "@/src/utils/bgcolor/handleImageLoad";
import capitalize from "@/src/utils/functions/capitalize";
import { getDate } from "@/src/utils/functions/formateDate";
import { formatTimeHours } from "@/src/utils/functions/formatTime";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import DynamicText from "../../DynamicText";

type AlbumHeaderProps = {
   album: AlbumType;
   setBgColor: (color: string) => void;
};

const AlbumHeader = ({ album, setBgColor }: AlbumHeaderProps) => {
   const containerRef = useRef<HTMLDivElement | null>(null);

   const albumDuration = formatTimeHours(
      album.items.reduce(
         (accumulator, current) => accumulator + current.duration,
         0,
      ),
   );

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
               {album.image && (
                  <div className="h-full aspect-square relative rounded-sm overflow-hidden">
                     <Image
                        src={album.image.url}
                        fill={true}
                        sizes="20vw"
                        alt="album cover image"
                        onLoad={(event) =>
                           handleImageLoad(
                              event,
                              containerRef.current,
                              setBgColor,
                           )
                        }
                     />
                  </div>
               )}
               <div className="flex-1  min-w-0">
                  <div className="w-full">
                     <span className="text-sm mb-1">
                        {capitalize(album.type)}
                     </span>
                     <div className="w-full font-black mb-2">
                        <DynamicText
                           text={album.name}
                           minSize={32}
                           maxSize={96}
                        />
                     </div>
                     <div className="flex flex-wrap gap-x-1.5 gap-y-1 items-center">
                        <Link
                           href={`/artist/${album.artists[0].id}`}
                           className="flex items-center"
                        >
                           <span className="font-[600] text-sm textUnderline">
                              {album.artists[0].name}
                           </span>
                        </Link>
                        <span className="align-bottom flex gap-1 items-center text-(--textSecondaryColor) text-sm leading-none before:w-1 before:h-1 before:bg-(--textSecondaryColor) before:rounded-full whitespace-nowrap">
                           {getDate(album.release).year}
                        </span>
                        <span className="align-bottom flex gap-1 items-center text-(--textSecondaryColor) text-sm leading-none before:w-1 before:h-1 before:bg-(--textSecondaryColor) before:rounded-full whitespace-nowrap">
                           {`${album.items.length} songs, ${albumDuration}`}
                        </span>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default AlbumHeader;
