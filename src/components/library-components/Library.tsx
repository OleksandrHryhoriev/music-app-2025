import { Suspense } from "react";
import LibraryWrapper from "./LibraryWrapper";
import LibraryContent from "./LibraryContent";
import LibraryListSkeleton from "./LibraryListSkeleton";

const Library = () => {
   return (
      <LibraryWrapper>
         <Suspense fallback={<LibraryListSkeleton />}>
            <LibraryContent />
         </Suspense>
      </LibraryWrapper>
   );
};

export default Library;
