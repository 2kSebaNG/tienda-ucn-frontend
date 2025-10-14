import { Button } from "@/components/ui";

interface AdminProductsErrorStateProps {
  error?: string;
  canRetry: boolean;
  onRetry: () => void;
}

export const AdminProductsErrorState = ({
  error,
  canRetry,
  onRetry,
}: AdminProductsErrorStateProps) => {
  return (
    <div className="flex justify-center items-center p-8 text-red-500 bg-red-50 border border-red-200 rounded-lg mx-5">
      <div className="text-center">
        <div className="font-semibold">Error al cargar los productos</div>
        <div className="text-sm mt-1">
          {error && error !== "" ? error : "Ha ocurrido un error inesperado"}
        </div>
        {canRetry && (
          <Button className="m-2 bg-pink-950" onClick={onRetry}>
            Reintentar
          </Button>
        )}
      </div>
    </div>
  );
};
