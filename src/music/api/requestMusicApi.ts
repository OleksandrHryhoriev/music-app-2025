import z from "zod";
import { getAccessToken } from "../../lib/auth/authSession";
import { apiError, ok } from "../errors";

export default async function requestMusicApi(
   url: string,
   schema: z.ZodSchema,
   options?: RequestInit,
) {
   try {
      // const session = await getSession();
      // if (session) {
      //    console.log(
      //       "[requestMusicApi] Сесія знайдена?:",
      //       session,
      //       "Користувач:",
      //       new Date(session?.expiresAt).toLocaleTimeString(),
      //    );
      // }
      const token = await getAccessToken();

      if (!token) {
         console.log("NO TOKEN TO FETCH API");
         return apiError({ reason: "Unauthenticated" });
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
         return apiError({ reason: "Unauthorized" });
      }

      if (!res.ok)
         return apiError({ reason: `RequestFailed`, status: res.status });

      const json = await res.json();
      const parsed = schema.safeParse(json);

      if (!parsed.success) {
         return apiError({ reason: "InvalidResponseData" });
      }

      return ok(parsed.data);
   } catch (error) {
      return apiError({ reason: "UnexpectedError", error: `${error}` });
   }
}
