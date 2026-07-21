import Image from "next/image";
import DynamicText from "../../DynamicText";
import { ArtistType } from "@/src/types/types";
import { useRef } from "react";
import handleImageLoad from "@/src/utils/bgcolor/handleImageLoad";
// import Link from "next/link";

type ArtistHeaderProps = {
   artist: ArtistType;
   setBgColor: (color: string) => void;
};

const ArtistHeader = ({ artist, setBgColor }: ArtistHeaderProps) => {
   const containerRef = useRef<HTMLDivElement | null>(null);

   return (
      <div
         ref={containerRef}
         className="page-header w-full mb-5"
         style={{
            height:
               "clamp(240px, 240px + (320 - 240) * ((100cqw - 450px) / (1280 - 450)), 320px)",
         }}
      >
         <div className="w-full max-w-480 h-full mx-auto relative z-5">
            {artist.image && (
               <div className="w-full h-full absolute top-0 left-0 overflow-hidden">
                  <Image
                     className="object-cover blur-xs scale-110"
                     src={artist.image.url}
                     fill={true}
                     sizes="20vw"
                     alt="artist cover image"
                     onLoad={(event) =>
                        handleImageLoad(event, containerRef.current, setBgColor)
                     }
                  />
               </div>
            )}
            <div className="bg-black opacity-25 w-full h-full absolute top-0 left-0"></div>
            <div className="w-full max-w-480 h-full mx-auto relative z-5">
               <div className="h-full flex items-end gap-6 p-4">
                  <div className="w-full flex-auto flex flex-col gap-3">
                     <div className="w-full font-black">
                        <DynamicText text={artist.name} />
                     </div>
                     <p className="text-lg pl-2">
                        {artist.followers
                           .toString()
                           .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
                        followers
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ArtistHeader;
