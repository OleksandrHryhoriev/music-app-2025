// import fetchMusicApi from "@/src/lib/api/fetchMusicApi";
// import { getMusicApiPath } from "@/src/lib/api/getMusicApiPath";
import { Suspense } from "react";

export default async function Track({
   params,
}: {
   params: Promise<{ id: string }>;
}) {
   const { id } = await params;
   // const apiPath = await getMusicApiPath()
   //    if (!apiPath)
   //       return <div className="p-2">Music API paths are not determing</div>;
   // const track = await fetchMusicApi(apiPath.track + id);

   // console.log(track);
   return (
      <Suspense key={id} fallback={<h2>Loading...</h2>}>
         <div className="h-full w-full">Track: {id}</div>
      </Suspense>
   );
}
