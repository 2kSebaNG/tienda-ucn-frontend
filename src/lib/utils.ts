import { jwtDecode } from "jwt-decode";

import { JwtClaims } from "@/models/generics";

export const isValidId = (id: string): boolean => {
  return /^[1-9]\d*$/.test(id);
};

export const isRutValid = (rut: string): boolean => {
  const rutRegex = /^\d{7,8}-[0-9kK]$/;
  if (!rutRegex.test(rut)) return false;

  const [body, dv] = rut.split("-");
  let sum = 0;
  let multiplier = 2;

  for (let i = body.length - 1; i >= 0; i--) {
    sum += parseInt(body.charAt(i), 10) * multiplier;
    multiplier = multiplier === 7 ? 2 : multiplier + 1;
  }

  const expectedDv = 11 - (sum % 11);
  const dvCalculated =
    expectedDv === 11 ? "0" : expectedDv === 10 ? "K" : expectedDv.toString();

  return dvCalculated.toUpperCase() === dv.toUpperCase();
};

export const hasLegalAge = (birthDate: Date): boolean => {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age >= 18;
};

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
