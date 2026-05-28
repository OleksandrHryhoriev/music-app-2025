import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";
import { prisma } from "./src/prisma/prisma";
import {
   refreshAccessToken,
   Refreshed,
   withRefreshLock,
} from "./src/lib/auth/refreshToken";
import { MusicProvider } from "./src/music/providers/types";

declare module "next-auth" {
   interface Session {
      access_token?: string;
      user: {
         id: string;
         email?: string | null;
      };
      provider: string;
      error?: string;
   }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
   adapter: PrismaAdapter(prisma),
   secret: process.env.AUTH_SECRET,
   session: { strategy: "database" },
   ...authConfig,
   callbacks: {
      async session({ session, user }) {
         if (session.user) {
            session.user.id = user.id;
         }

         // Get account for Spotify
         const account = await prisma.account.findFirst({
            where: { userId: user.id, provider: session.provider },
         });

         if (!account) return session;

         // If expired refresh with lock
         if (!account.expires_at || account.expires_at < Date.now() + 30000) {
            try {
               const refreshed: Refreshed = await withRefreshLock(user.id, () =>
                  refreshAccessToken({
                     refresh_token: account.refresh_token!,
                     provider: account.provider as MusicProvider,
                     userId: user.id,
                  }),
               );

               session.access_token = refreshed.access_token;
               return session;
            } catch (error) {
               session.error = `RefreshAccessTokenError ${error}`;
               return session;
            }
         }

         // Still valid
         session.access_token = account.access_token ?? undefined;
         session.provider = account.provider;
         return session;
      },
   },
});
