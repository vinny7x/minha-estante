import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/db";
import * as schema from "@/db/schema";
import { generateUsername } from "@/lib/utils/generateUsername";
import { eq } from "drizzle-orm";
import { lastLoginMethod } from "better-auth/plugins";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),

  socialProviders: {
    discord: {
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    },
  },

  plugins: [lastLoginMethod()],

  user: {
    additionalFields: {
      username: {
        type: "string",
        required: false,
        unique: true,
      },

      realname: {
        type: "string",
        required: false,
      },

      biography: {
        type: "string",
        required: false,
        defaultValue: "Apaixonado por livros 💙",
      },
    },
  },

  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          if (!user.username && user.name) {
            await db
              .update(schema.user)
              .set({
                username: generateUsername(user.name),
              })
              .where(eq(schema.user.id, user.id));
          }
        },
      },
    },
  },
});