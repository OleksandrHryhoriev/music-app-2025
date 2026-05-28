import { auth } from "@/auth";
import { UnauthorizedError } from "@/src/music/errors";

export async function GET() {
   const session = await auth();

   if (!session) throw new UnauthorizedError();

   return Response.json({ accessToken: session.access_token });
}
