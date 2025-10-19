import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    role: string;
    exp: number;
    accessToken: string;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      role: string;
    };
    accessToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    role: string;
    exp: number;
  }
}
