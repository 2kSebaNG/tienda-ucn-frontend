import { AxiosError } from "axios";

import { ApiErrorResult, ErrorDetail } from "@/models/generics";

export const handleApiError = (error: unknown): ApiErrorResult => {
  if (error instanceof AxiosError) {
    // Network/connection error
    if (!error.response) {
      return {
        message: "Error de red",
        details: "No se pudo conectar con el servidor",
        canRetry: true,
      };
    }

    // Not found error with custom format
    if (error.response.status === 404 && error.response.data) {
      const errorData = error.response.data as ErrorDetail;
      return {
        message: errorData.message || "Recurso no encontrado",
        details: errorData.details,
        canRetry: false,
      };
    }

    // Other HTTP errors with custom format
    if (error.response.data && typeof error.response.data === "object") {
      if (error.response.data.errors) {
        const errors = Object.values(error.response.data.errors)
          .flat()
          .join(", ");
        return {
          message:
            error.response.data.message || `Error ${error.response.status}`,
          details: errors,
          canRetry: error.response.status >= 500,
        };
      }

      const errorData = error.response.data as ErrorDetail;

      if (errorData.message === "Argumento fuera de rango") {
        return {
          message: "Producto no encontrado",
          details: "No se encontraron coincidencias con la búsqueda.",
          canRetry: false,
        };
      }

      return {
        message: errorData.message || `Error ${error.response.status}`,
        details: errorData.details,
        canRetry: error.response.status >= 500,
      };
    }

    // HTTP errors without custom format
    return {
      message: `Error ${error.response.status}`,
      details: getDefaultErrorMessage(error.response.status),
      canRetry: error.response.status >= 500,
    };
  }

  // Generic Error
  return {
    message: "Ha ocurrido un error inesperado. Inténtalo nuevamente.",
    details: undefined,
    canRetry: true,
  };
};

const getDefaultErrorMessage = (statusCode: number): string => {
  switch (statusCode) {
    case 400:
      return "Solicitud inválida. Verifica los datos enviados.";
    case 401:
      return "No tienes autorización para realizar esta acción.";
    case 403:
      return "No tienes permisos para acceder a este recurso.";
    case 404:
      return "El recurso solicitado no fue encontrado.";
    case 500:
      return "Error interno del servidor. Inténtalo más tarde.";
    case 502:
      return "El servidor no está disponible temporalmente.";
    case 503:
      return "Servicio no disponible. Inténtalo más tarde.";
    default:
      return "Ha ocurrido un error. Inténtalo nuevamente.";
  }
};
