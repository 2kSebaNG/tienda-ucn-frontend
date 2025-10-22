import { jwtDecode } from "jwt-decode";

import { JwtClaims } from "@/models/generics";

export function extractUserFromJwt(token: string) {
  try {
    const decoded = jwtDecode<JwtClaims>(token);

    if (decoded.exp && decoded.exp < Math.floor(Date.now() / 1000)) {
      throw new Error("Token JWT expirado");
    }

    const user = {
      id: decoded[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
      ],
      email:
        decoded[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
        ],
      role: decoded[
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
      ],
      exp: decoded.exp,
    };

    if (!user.id || !user.email) {
      throw new Error("Claims requeridas faltantes en el JWT");
    }

    return user;
  } catch (error) {
    throw error;
  }
}

export function isTokenExpired(
  token: { exp?: number } | null | undefined
): boolean {
  if (!token || !token.exp) return true;
  const now = Math.floor(Date.now() / 1000);
  return token.exp < now;
}

export function isSessionExpired(
  session: { expires?: string } | null | undefined
): boolean {
  if (!session?.expires) return true; // sin session o expires → considerar expirado

  const expiresDate = new Date(session.expires).getTime(); // timestamp en ms
  const now = Date.now(); // timestamp actual en ms

  return now >= expiresDate;
}

export function jwtExpirationDate(
  token: { exp?: number } | null | undefined
): Date {
  if (!token || !token.exp) {
    return new Date(0);
  }

  return new Date(token.exp * 1000);
}

export function getPublicRouteFromAdmin(adminPath: string): string {
  if (adminPath === "/admin/products" || adminPath === "/admin/new-product") {
    return "/products";
  }

  return "/";
}
