import { getSession, refreshSession } from "@/src/lib/auth/authSession";
import isHttpMethod from "@/src/utils/isHttpMethod";

export async function POST(req: Request) {
   try {
      const session = await getSession();
      if (session) {
         console.log(
            "[API PLAYER ROUTE] Session:",
            session,
            "Expires at:",
            new Date(session?.expiresAt).toLocaleString(),
         );
      }

      // const token = await getAccessToken();
      // console.log("TOKEN: ", token);
      const token = session?.accessToken;
      if (!token) {
         return new Response("Unauthorized from player/route", { status: 401 });
      }

      const { path, type, method, body } = await req.json();

      if (!isHttpMethod(method)) {
         return new Response("Invalid HTTP method", { status: 400 });
      }

      let res = await fetch(path, {
         method,
         headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
         },
         body: body ? JSON.stringify(body) : undefined,
      });

      if (res.status === 401) {
         console.warn(
            "[API PLAYER] Music API returns 401. Try to refresh token...",
         );

         const refreshedSession = await refreshSession(session);

         if (refreshedSession?.accessToken) {
            console.log(
               "[API PLAYER] Token refreshed. Retry to call Music API...",
            );

            res = await fetch(path, {
               method,
               headers: {
                  Authorization: `Bearer ${refreshedSession.accessToken}`,
                  "Content-Type": "application/json",
               },
               body: body ? JSON.stringify(body) : undefined,
               cache: "no-store",
            });
         }
      }

      if (!res.ok) {
         const text = await res.text();
         console.error(`Music API ${type} error: `, text);

         return new Response(text, { status: res.status });
      }

      // console.log(res.body);
      return new Response(null, { status: 204 });
   } catch (e) {
      console.error(`API error: `, e);

      return new Response("Internal Server Error", { status: 500 });
   }
}
