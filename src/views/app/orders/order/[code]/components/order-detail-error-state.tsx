import { AlertCircle, ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

interface OrderDetailErrorStateProps {
  errorDetail: string;
  canRetry: boolean;
  onRetry: () => void;
  onGoBack: () => void;
}

export function OrderDetailErrorState({
  errorDetail,
  canRetry,
  onRetry,
  onGoBack,
}: OrderDetailErrorStateProps) {
  return (
    <div className="container mx-auto px-4 py-16 text-center max-w-2xl">
      <div className="rounded-full bg-destructive/10 p-4 w-fit mx-auto mb-6">
        <AlertCircle className="h-12 w-12 text-destructive" />
      </div>
      <h2 className="text-2xl font-semibold mb-2">Error al cargar la orden</h2>
      <p className="text-muted-foreground mb-8">{errorDetail}</p>
      <div className="flex gap-3 justify-center">
        <Button variant="outline" onClick={onGoBack} className="cursor-pointer">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a órdenes
        </Button>
        {canRetry && (
          <Button onClick={onRetry} className="cursor-pointer">
            Reintentar
          </Button>
        )}
      </div>
    </div>
  );
}
