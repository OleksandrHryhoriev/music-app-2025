import PlayerControls from "./PlayerControls";
import PlayerOthers from "./PlayerOthers";
import PlayerTrackInfo from "./PlayerTrackInfo";

const PlayerContent = () => {
   return (
      <div className="w-full h-full flex items-center justify-between ">
         <div className="now-playing-info h-full w-3/10 min-w-45 flex items-center">
            <PlayerTrackInfo />
         </div>
         <div className="player-controls h-full w-45/100 max-w-180">
            <PlayerControls />
         </div>
         <div className="other-controls h-full w-3/10 min-w-45 flex items-center">
            <PlayerOthers />
         </div>
      </div>
   );
};

export default PlayerContent;
