export const extractErrorMessage = (error: unknown): string => {
  if (
    error &&
    typeof error === "object" &&
    "response" in error &&
    error.response &&
    typeof error.response === "object" &&
    "data" in error.response &&
    error.response.data &&
    typeof error.response.data === "object"
  ) {
    const responseData = error.response.data as Record<string, unknown>;

    if (responseData.errors && typeof responseData.errors === "object") {
      const errors = responseData.errors as Record<string, unknown>;
      const allMessages: string[] = [];

      Object.values(errors).forEach(fieldErrors => {
        if (Array.isArray(fieldErrors)) {
          fieldErrors.forEach(item => {
            if (typeof item === "string") {
              allMessages.push(item);
            }
          });
        }
      });

      return allMessages.length > 0
        ? allMessages.join(", ")
        : "Error de validación";
    }

    if (responseData.message && typeof responseData.message === "string") {
      return responseData.message;
    }

    if (responseData.title && typeof responseData.title === "string") {
      return responseData.title;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  if (
    error &&
    typeof error === "object" &&
    "message" in error &&
    typeof (error as { message: unknown }).message === "string"
  ) {
    return (error as { message: string }).message;
  }

  return "Ha ocurrido un error inesperado";
};

export const getErrorDetails = (error: unknown) => {
  const getStatus = (): number | undefined => {
    if (
      error &&
      typeof error === "object" &&
      "response" in error &&
      error.response &&
      typeof error.response === "object" &&
      "status" in error.response &&
      typeof (error.response as { status: unknown }).status === "number"
    ) {
      return (error.response as { status: number }).status;
    }
    return undefined;
  };

  const status = getStatus();
  const isNetworkError = !status;
  if (isNetworkError) {
    return {
      type: "network",
      title: "Error de Conexión",
      message:
        "No se pudo conectar con el servidor. Verifica tu conexión a internet.",
      canRetry: true,
    };
  }

  switch (status) {
    case 400:
      return {
        type: "validation",
        title: "Error de Validación",
        message: extractErrorMessage(error),
        canRetry: false,
      };

    case 404:
      return {
        type: "not-found",
        title: "No Encontrado",
        message: "El recurso solicitado no existe o ha sido eliminado.",
        canRetry: false,
      };

    case 500:
    case 502:
    case 503:
    case 504:
      return {
        type: "server",
        title: "Error del Servidor",
        message:
          "Ha ocurrido un error interno en el servidor. Intenta nuevamente más tarde.",
        canRetry: true,
      };

    default:
      return {
        type: "unknown",
        title: "Error Inesperado",
        message: extractErrorMessage(error),
        canRetry: status >= 500,
      };
  }
};
