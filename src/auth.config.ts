import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { extractUserFromJwt } from "@/lib";

export const authConfig = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        token: { label: "Token", type: "string" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.token) {
          return null;
        }

        try {
          const user = extractUserFromJwt(credentials.token as string);

          return {
            id: user.id,
            email: user.email,
            accessToken: credentials.token as string,
            role: user.role,
            exp: user.exp,
          };
        } catch (error) {
          return error as null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.userId = user.id;
        token.role = user.role;
        token.customExp = user.exp;
      }

      if (trigger === "update" && session) {
        if (session.user?.email) {
          token.email = session.user.email;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.accessToken = token.accessToken as string;
        session.customExp = token.customExp as number;
        session.user.id = token.userId as string;
        session.user.role = token.role as string;

        if (token.email) {
          session.user.email = token.email as string;
        }
      }

      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthConfig;

export const { handlers } = NextAuth(authConfig);
