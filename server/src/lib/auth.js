import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./db.js";
import { deviceAuthorization } from "better-auth/plugins";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),
  basePath: "/api/auth",
  trustedOrigins: ["https://cli-ai.vercel.app"],
  plugins: [
    deviceAuthorization({
      expiresIn: "30m", //device code expiration time
      interval: "5s", //minimun polling interval
    }),
  ],
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    },
  },
});
