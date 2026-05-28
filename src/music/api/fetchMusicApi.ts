import { getAccessToken } from "@/src/lib/auth/authSession";
import { UnauthorizedError } from "../errors";

export default async function fetchMusicApi<T>(
   url: string,
   options?: RequestInit,
): Promise<T> {
   const token = await getAccessToken();

   console.log("From fetchMusicApi. Token: ", token ? true : false);

   if (!token) {
      console.log("NO SESSION TO FETCH API");
      throw new Error("No access token");
   }

   const res = await fetch(url, {
      ...options,
      headers: {
         Authorization: `Bearer ${token}`,
         ...options?.headers,
      },
   });
   console.log(res.status);
   if (res.status === 401) {
      throw new UnauthorizedError();
   }

   if (!res.ok) throw new Error(`Request failed: ${res.status}`);

   return res.json();
}
