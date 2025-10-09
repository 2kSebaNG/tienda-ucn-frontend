import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import z from "zod";

import { extractUserFromJwt, handleApiError } from "@/lib";
import { authService } from "@/services";

export const authConfig = {
  pages: {
    signIn: "/auth/login",
    newUser: "/products",
    verifyRequest: "/auth/verify-account",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
        token.exp = user.tokenExp;
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.role = token.role as string;
        session.user.tokenExp = token.tokenExp as number;
      }

      return session;
    },
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        rememberMe: { label: "Remember Me", type: "boolean" },
      },
      async authorize(credentials) {
        try {
          const parsedCredentials = z
            .object({
              email: z.email(),
              password: z.string(),
              rememberMe: z.coerce.boolean(),
            })
            .safeParse(credentials);

          if (!parsedCredentials.success) {
            return null;
          }

          const { email, password, rememberMe } = parsedCredentials.data;

          const response = await authService.login({
            email,
            password,
            rememberMe,
          });

          if (response.status !== 200) {
            return null;
          }

          const token = response.data.data;

          const user = extractUserFromJwt(token);

          if (!user || !user.id) {
            return null;
          }

          return {
            id: user.id,
            email: user.email,
            role: user.role,
            tokenExp: user.exp,
          };
        } catch (error) {
          const apiError = handleApiError(error);

          throw new Error(apiError.details);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthConfig;

export const { signIn, handlers } = NextAuth(authConfig);
