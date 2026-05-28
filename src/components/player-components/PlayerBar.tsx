import PlayerContent from "./PlayerContent";

const PlayerBar = () => {
   return (
      <section className="player-bar w-full h-full bg-black flex items-center justify-center">
         <div className="player-wrapper w-full h-full p-2">
            <PlayerContent />
         </div>
      </section>
   );
};

export default PlayerBar;
