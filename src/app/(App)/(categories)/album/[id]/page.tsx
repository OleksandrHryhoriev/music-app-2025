import { Suspense } from "react";

export default async function Page({
   params,
}: {
   params: Promise<{ id: string }>;
}) {
   const { id } = await params;

   return (
      <Suspense key={id} fallback={<h2>Loading...</h2>}>
         <div className="h-full w-full">Album: {id}</div>
      </Suspense>
   );
}
