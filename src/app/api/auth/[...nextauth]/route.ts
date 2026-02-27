import { createNewUser } from "@/lib/db/queries/user/createNewUser";
import { getUserByDiscordId } from "@/lib/db/queries/user/getUserByDiscordId";
import NextAuth, { AuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt"
  },
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      authorization: { params: { scope: 'identify email' } }
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        const discordId = account.providerAccountId;

        let dbUser = await getUserByDiscordId(discordId);

        if (!dbUser) {
          dbUser = await createNewUser({
            discordId,
            username: user.name ?? "",
            realname: user.name ?? "",
            email: user.email ?? "",
            image: user.image ?? "",
          });
        }

        token.userId = dbUser.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.userId) {
        session.user.id = token.userId as string;
      }
      return session;
    },
  }

};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };