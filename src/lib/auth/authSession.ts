import { auth } from "@/auth";
import { prisma } from "@/src/prisma/prisma";
import { cache } from "react";
import { refreshAccessToken, withRefreshLock } from "./refreshToken";
import { MusicProvider } from "@/src/music/providers/types";

type SessionData = {
   userId: string;
   provider: MusicProvider;
   accessToken: string;
   refreshToken: string;
   expiresAt: number;
};

function isExpired(session: SessionData | null): boolean {
   if (!session) return true;
   return Date.now() + 30000 >= session.expiresAt;
}

async function getSessionData(userId: string): Promise<SessionData | null> {
   const account = await prisma.account.findFirst({
      where: {
         userId,
      },
   });

   if (!account || !account.access_token || !account.refresh_token) {
      return null;
   }

   return {
      userId,
      provider: account.provider as MusicProvider,
      accessToken: account.access_token,
      refreshToken: account.refresh_token,
      expiresAt: account.expires_at || 0,
   };
}

async function refreshSession(
   session: SessionData,
): Promise<SessionData | null> {
   try {
      console.log("Try to refresh session", session);
      const refreshed = await withRefreshLock(session.userId, () =>
         refreshAccessToken({
            refresh_token: session.refreshToken!,
            provider: session.provider,
            userId: session.userId,
         }),
      );

      return {
         userId: session.userId,
         provider: session.provider,
         accessToken: refreshed.access_token,
         refreshToken: refreshed.refresh_token,
         expiresAt: refreshed.expires_at,
      };
   } catch (error) {
      console.log("Refresh session error: ", error);
      return null;
   }
}

const _ensureFreshSession = async (
   userId: string,
): Promise<SessionData | null> => {
   let session = await getSessionData(userId);

   if (!session) return null;

   if (isExpired(session)) {
      const refreshed = await refreshSession(session);
      if (!refreshed) return null;
      session = refreshed;
   }

   return session;
};

const ensureFreshSession = cache(
   async (userId: string): Promise<SessionData | null> => {
      return await _ensureFreshSession(userId);
   },
);

export const getUser = cache(async () => {
   const session = await auth();
   return session?.user ?? null;
});

export async function getSession(): Promise<SessionData | null> {
   const user = await getUser();
   if (!user?.id) return null;

   return await ensureFreshSession(user.id);
}

export async function getAccessToken(): Promise<string | null> {
   const user = await getUser();
   if (!user?.id) return null;

   const session = await ensureFreshSession(user.id);
   return session?.accessToken ?? null;
}

export async function getProviderFromSession(): Promise<string | null> {
   const user = await getUser();
   if (!user?.id) return null;

   const session = await ensureFreshSession(user.id);
   return session?.provider ?? null;
}
