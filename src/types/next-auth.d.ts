// import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
// import { JWT as DefaultJWT } from "next-auth/jwt";

// declare module "next-auth" {
//    interface Session extends DefaultSession {
//       access_token: string;
//       user: DefaultUser;
//    }
// }

// declare module "next-auth/jwt" {
//    interface JWT extends DefaultJWT {
//       access_token: string;
//       refresh_token: string;
//       expires_at: number;
//       userId: string;
//       error?: "RefreshAccessTokenError";
//    }
// }
