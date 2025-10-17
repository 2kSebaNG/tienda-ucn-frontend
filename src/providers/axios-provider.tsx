import axios from "axios";
import { getSession } from "next-auth/react";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(async config => {
  // Solo intentar obtener la sesión si estamos en el cliente
  if (typeof window !== "undefined") {
    const session = await getSession();
    const token = session?.accessToken;

    // Si hay una sesión activa, siempre agregar el token de autorización
    if (token) {
      config.headers = config.headers ?? {};
      (config.headers as Record<string, string>)["Authorization"] =
        `Bearer ${token}`;
    }
  }

  return config;
});
