// import { libraryItems } from "@/src/mocks/playlists-mock";
import LibraryList from "./LibraryList";
import { getLibrary } from "@/src/music/services/libraryServices/library";

const LibraryContent = async () => {
   const libraryItems = await getLibrary();

   return (
      <>
         {libraryItems.length ? (
            <LibraryList libraryItems={libraryItems} />
         ) : (
            <div className="w-full text-center p-2">No library items found</div>
         )}
      </>
   );
};

export default LibraryContent;
