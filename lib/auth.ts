import { getServerSession, NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
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
  callbacks: {
    async signIn({ user, account, profile }) {
      const result = await db
        .select()
        .from(Users)
        .where(eq(Users.email, user?.email as string));
      console.log(result);
      if (!result[0]) {
        console.log("User not found");
        await db.insert(Users).values({
          name: user?.name as string,
          email: user?.email as string,
          imageUrl: user?.image as string,
          subscription: false,
        });
      }
      return true; // Return a boolean value or a string
    },
  },
};

export async function loginIsRequiredServer() {
  const session = await getServerSession(authConfig);
  if (!session) return redirect("/");
}
