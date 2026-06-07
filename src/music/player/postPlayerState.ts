import { HttpMethod } from "@/src/utils/isHttpMethod";

type PlayerAction =
   | "transfer"
   | "play"
   | "resume"
   | "pause"
   | "seek"
   | "next"
   | "previous"
   | "repeat"
   | "shuffle"
   | "volume";

type RequestBody<T = unknown> = {
   path: string;
   type: PlayerAction;
   method: HttpMethod;
   body?: T;
};

export default async function postPlayerState<T = unknown>(
   path: string,
   type: PlayerAction,
   method: HttpMethod,
   body?: T,
) {
   const reqBody: RequestBody = { path, type, method };
   if (body !== undefined) {
      reqBody.body = body;
   }
   return await fetch("/api/player", {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
   });
}
