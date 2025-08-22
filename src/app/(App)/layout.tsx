import Header from "@/src/components/header-components/Header";
import LibraryWrapper from "@/src/components/library-components/LibraryWrapper";
import Player from "@/src/components/player-components/Player";

export default function App({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <div className="max-w-['1920px'] h-full my-0 mx-auto px-2.5 grid grid-rows-[auto_1fr_60px] grid-cols-[auto_1fr_auto] gap-2">
         <div className="col-span-3">
            <Header />
         </div>
         <div className="library bg-[#1c1c1c] rounded-[8px]">
            <LibraryWrapper />
         </div>
         <div className="home bg-[#1c1c1c] rounded-[8px] p-2 ">{children}</div>
         <div className="now-play bg-[#1c1c1c] rounded-[8px] p-2">
            Now playing
         </div>
         <div className="col-span-3">
            <Player />
         </div>
      </div>
   );
}
