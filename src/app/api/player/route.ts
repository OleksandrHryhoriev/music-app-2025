import { getAccessToken } from "@/src/lib/auth/authSession";
import isHttpMethod from "@/src/utils/isHttpMethod";

export async function POST(req: Request) {
   try {
      const token = await getAccessToken();

      if (!token) {
         return new Response("Unauthorized", { status: 401 });
      }

      const { path, type, method, body } = await req.json();

      if (!isHttpMethod(method)) {
         return new Response("Invalid HTTP method", { status: 400 });
      }

      const res = await fetch(path, {
         method,
         headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
         },
         body: body ? JSON.stringify(body) : undefined,
      });

      if (!res.ok) {
         const text = await res.text();
         console.error(`Music API ${type} error: `, text);

         return new Response(text, { status: res.status });
      }

      console.log(res.body);
      return new Response(null, { status: 204 });
   } catch (e) {
      console.error(`API error: `, e);

      return new Response("Internal Server Error", { status: 500 });
   }
}
