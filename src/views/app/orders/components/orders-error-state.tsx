import { AlertCircle } from "lucide-react";

import { Button } from "@/components/ui";

interface OrdersErrorStateProps {
  onRetry: () => void;
  errorDetail: string;
  canRetry: boolean;
}

export function OrdersErrorState({
  onRetry,
  errorDetail,
  canRetry = false,
}: OrdersErrorStateProps) {
  return (
    <div className="rounded-md border">
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="rounded-full bg-destructive/10 p-4 mb-4">
          <AlertCircle className="h-8 w-8 text-destructive" />
        </div>
        <h3 className="text-lg font-semibold mb-2">
          Error al cargar las órdenes
        </h3>
        <p className="text-sm text-muted-foreground mb-6 text-center max-w-md">
          {errorDetail}
        </p>
        {canRetry && (
          <Button
            onClick={onRetry}
            variant="outline"
            className="cursor-pointer"
          >
            Reintentar
          </Button>
        )}
      </div>
    </div>
  );
}
