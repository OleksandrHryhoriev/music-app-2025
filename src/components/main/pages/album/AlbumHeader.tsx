import Image from "next/image";
import DynamicText from "../../DynamicText";
import { AlbumType } from "@/src/types/types";
import { formatTimeHours } from "@/src/utils/functions/formatTime";
import { useRef } from "react";
import Link from "next/link";
import handleImageLoad from "@/src/utils/bgcolor/handleImageLoad";

type AlbumHeaderProps = {
   album: AlbumType;
   setBgColor: (color: string) => void;
};

const AlbumHeader = ({ album, setBgColor }: AlbumHeaderProps) => {
   const containerRef = useRef<HTMLDivElement | null>(null);

   const albumDuration = formatTimeHours(
      album.items.reduce(
         (accumulator, current) => accumulator + current.item.duration,
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
                  <div className="w-full flex flex-col gap-3">
                     <span className="text-sm">Album</span>
                     <div className="w-full font-black">
                        <DynamicText
                           text={album.name}
                           minSize={32}
                           maxSize={96}
                        />
                     </div>
                     <div className="flex flex-wrap items-center">
                        <Link
                           href={`/user/${album.artists[0].id}`}
                           className="flex gap-1 items-center mr-2 "
                        >
                           <span className="font-[600] text-sm textUnderline">
                              {album.artists[0].name}
                           </span>
                        </Link>
                        <span className="align-bottom flex gap-1 items-center text-(--textSecondaryColor) text-sm leading-none before:w-1 before:h-1 before:bg-(--textSecondaryColor) before:rounded-full whitespace-nowrap">
                           {album.release}
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
