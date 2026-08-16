import { getSession } from "@/src/lib/auth/authSession";
// import { apiError } from "@/src/music/errors";
import { NextResponse } from "next/server";

export async function POST() {
   const session = await getSession();
   if (session) {
      console.log(
         "[API TOKEN ROUTE] Session:",
         session,
         "Expires at:",
         new Date(session?.expiresAt).toLocaleTimeString(),
      );
   }
   // const token = await getAccessToken();

   if (!session?.accessToken) {
      console.log("NO TOKEN TO FETCH API");
      // return apiError({ reason: "Unauthenticated" });
      return NextResponse.json({ accessToken: null });
   }

   return NextResponse.json({
      accessToken: session.accessToken,
      expiresAt: session.expiresAt,
   });
}
