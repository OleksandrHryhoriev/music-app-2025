import Header from "@/src/components/header-components/Header";
import Library from "@/src/components/library-components/Library";
import PlayerBar from "@/src/components/player-components/PlayerBar";

export default function App({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <div className="app w-full h-screen">
         <div className="relative min-w-[500px] h-full overflow-hidden my-0 mx-auto px-2.5 grid grid-rows-[auto_1fr_88px] grid-cols-[auto_1fr_auto] gap-x-2">
            <div className="col-span-3 relative z-100">
               <Header />
            </div>
            <div className="library bg-(--backgroundSecondary) rounded-[8px] overflow-hidden bottom-line">
               <Library />
            </div>
            <main className="main bg-(--backgroundSecondary) rounded-[8px] overflow-hidden bottom-line">
               {children}
            </main>
            <div className="now-playing-view bg-(--backgroundSecondary) rounded-[8px] p-2 bottom-line">
               Now playing
            </div>
            <div className="col-span-3">
               <PlayerBar />
            </div>
         </div>
      </div>
   );
}
