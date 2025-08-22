import { getCachedSession } from "@/src/lib/authSession";

export async function GET(
   request: Request,
   { params }: { params: Promise<{ id: string }> }
) {
   const session = await getCachedSession();

   if (!session?.access_token) {
      return new Response(JSON.stringify({ error: "Not authenticated" }), {
         status: 401,
      });
   }

   const { id: playlistId } = await params;

   const res = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      {
         headers: {
            Authorization: `Bearer ${session.access_token}`,
         },
      }
   );

   if (!res.ok) {
      return new Response(
         JSON.stringify({ error: "Failed to fetch playlist" }),
         {
            status: res.status,
         }
      );
   }

   const data = await res.json();
   return new Response(JSON.stringify(data), { status: 200 });
}
