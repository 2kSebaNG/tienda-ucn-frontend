import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { extractUserFromJwt, handleApiError } from "@/lib";
import { authService } from "@/services";

export const authConfig = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        rememberMe: { label: "Remember Me", type: "boolean" },
      },
      async authorize(credentials) {
        if (
          !credentials?.email ||
          !credentials?.password ||
          !credentials?.rememberMe
        ) {
          throw new Error(
            "El correo electrónico, la contraseña y la opción de recordar son requeridos"
          );
        }

        const { email, password, rememberMe } = credentials;

        try {
          const response = await authService.login({
            email: email as string,
            password: password as string,
            rememberMe: rememberMe === "true",
          });

          if (response.data.data) {
            const user = extractUserFromJwt(response.data.data);

            const userObject = {
              id: user.id,
              email: user.email,
              accessToken: response.data.data,
              role: user.role,
              exp: user.exp,
            };

            return userObject;
          }
          throw new Error("Error en la respuesta del servidor");
        } catch (error) {
          const apiError = handleApiError(error);
          throw new Error(
            apiError.details || "No hay conexión con el servidor"
          );
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.role = user.role;
        token.exp = user.exp;
        token.refreshAttempted = false;
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
        session.user.id = token.sub as string;
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
  },
  secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthConfig;

export const { signIn, handlers } = NextAuth(authConfig);
