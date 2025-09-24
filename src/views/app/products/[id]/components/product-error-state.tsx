import { Button } from "@/components/ui";

interface ProductErrorStateProps {
  error: unknown;
  onRetry: () => void;
}

export const ProductErrorState = ({
  error,
  onRetry,
}: ProductErrorStateProps) => {
  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-center items-center p-8 text-red-500 bg-red-50 border border-red-200 rounded-lg">
        <div className="text-center">
          <div className="font-semibold">Error al cargar el producto</div>
          <div className="text-sm mt-1">
            {error && typeof error === "object" && "message" in error
              ? String(error.message)
              : "Ha ocurrido un error inesperado"}
          </div>
          <Button className="m-2 bg-pink-950" onClick={onRetry}>
            Reintentar
          </Button>
        </div>
      </div>
    </div>
  );
};
