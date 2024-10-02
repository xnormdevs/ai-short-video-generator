import { getServerSession, NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/configs/db";
import { Users } from "@/configs/schema";

export const authConfig: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      const result = await db
        .select()
        .from(Users)
        .where(eq(Users.email, user?.email as string));
      console.log(result);
      if (!result[0]) {
        await db.insert(Users).values({
          name: user?.name as string,
          email: user?.email as string,
          imageUrl: user?.image as string,
          subscription: false,
        });
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.email = token.email as string;
        session.user.name = token.name as string;
      }
      return session;
    },
  },
};

export async function loginIsRequiredServer() {
  const session = await getServerSession(authConfig);
  if (!session) return redirect("/");
}
