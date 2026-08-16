// import { PrismaClient } from "@prisma/client";

// const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

// export const prisma = globalForPrisma.prisma || new PrismaClient();

// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
   prismaInstance: PrismaClient;
};

const prismaClient = globalForPrisma.prismaInstance || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
   globalForPrisma.prismaInstance = prismaClient;
}

export const prisma = prismaClient.$extends({
   query: {
      session: {
         async create({ args, query }) {
            const userId = args.data.userId;

            if (userId) {
               const account = await prismaClient.account.findFirst({
                  where: { userId: userId },
                  select: { provider: true },
               });

               if (account?.provider) {
                  args.data.provider = account.provider;
               } else {
                  args.data.provider = "unknown";
               }
            }

            return query(args);
         },
      },
   },
});
