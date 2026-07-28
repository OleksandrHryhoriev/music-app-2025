import DurationIcon from "../../icons/DurationIcon";

type TrackListHeaderProps = {
   type: "album" | "playlist";
};

const TrackListHeader = ({ type }: TrackListHeaderProps) => {
   return (
      <div className="tracklist-row w-full py-2 px-4 text-sm secondary-text">
         <div className="track-index text-center">#</div>
         <div className="track-title">Title</div>
         {type === "playlist" && (
            <>
               <div className="track-album hidden lg:block">Album</div>
               <div className="track-added">Date added</div>
            </>
         )}
         <div className="track-duration justify-self-end">
            <span className="block w-5 h-5">
               <DurationIcon />
            </span>
         </div>
      </div>
   );
};

export default TrackListHeader;
