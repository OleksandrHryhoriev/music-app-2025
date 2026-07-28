import { MusicBaseType } from "@/src/types/types";
import Link from "next/link";

type TrackAlbumProps = {
   album: MusicBaseType;
};

const TrackAlbum = ({ album }: TrackAlbumProps) => {
   return (
      <div className="track-album hidden lg:flex">
         <Link
            href={`/album/${album.id}`}
            className="self-start max-w-full text-sm secondary-text truncate-lh"
         >
            <span className="secondary-hovered-text textUnderline">
               {album.name}
            </span>
         </Link>
      </div>
   );
};

export default TrackAlbum;
