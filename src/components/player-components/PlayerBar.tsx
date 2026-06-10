import PlayerBarWrapper from "./PlayerBarWrapper";
import PlayerContent from "./PlayerContent";

const PlayerBar = () => {
   return (
      <section className="player-bar w-full h-full bg-black flex items-center justify-center overflow-x-auto">
         <PlayerBarWrapper>
            <PlayerContent />
         </PlayerBarWrapper>
      </section>
   );
};

export default PlayerBar;
