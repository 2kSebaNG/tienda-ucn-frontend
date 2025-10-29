"use client";

import { ArrowLeft, Calendar, Download, Package, Receipt } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatDate, thousandSeparatorPipe } from "@/lib";

import { OrderDetailErrorState, OrderDetailSkeleton } from "./components";
import { useOrderDetail } from "./hooks";

export default function OrderDetailView() {
  const params = useParams();
  const orderCode = params.code as string;

  const {
    order,
    items,
    isLoading,
    error,
    actions: { handleDownloadPDF, handleGoBack, handleRetry },
  } = useOrderDetail(orderCode);

  if (isLoading) {
    return <OrderDetailSkeleton />;
  }

  if (error) {
    return (
      <OrderDetailErrorState
        onRetry={handleRetry}
        onGoBack={handleGoBack}
        canRetry={error.canRetry}
        errorDetail={error.details || "Ha ocurrido un error inesperado."}
      />
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <Button
          variant="outline"
          className="mb-4 cursor-pointer"
          onClick={handleGoBack}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a mis órdenes
        </Button>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold">Orden {order.code}</h1>
            <div className="flex items-center gap-2 mt-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span className="text-sm">
                Realizada el {formatDate(order.createdAt)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Products */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Package className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">
                  Productos ({items.length})
                </h2>
                <p className="text-sm text-muted-foreground">
                  Detalles de tu pedido
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-4 pb-4 border-b last:border-b-0 last:pb-0"
                >
                  {item.mainImageURL && (
                    <div className="relative w-20 h-20 flex-shrink-0">
                      <Image
                        src={item.mainImageURL}
                        alt={item.productTitle}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium line-clamp-2">
                      {item.productTitle}
                    </h3>
                    {item.productDescription && (
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {item.productDescription}
                      </p>
                    )}
                    <div className="flex items-center gap-3 mt-2">
                      <p className="text-sm text-muted-foreground">
                        Cantidad: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-semibold">{item.priceAtMoment}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column - Order Summary */}
        <div className="lg:col-span-1">
          <Card className="p-6 sticky top-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Receipt className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-xl font-bold">Resumen</h2>
            </div>

            <div className="space-y-3 mb-6">
              {/* Detailed breakdown by product */}
              <div className="space-y-2 pb-3">
                <p className="text-sm font-medium text-muted-foreground mb-2">
                  Desglose:
                </p>
                {items.map((item, index) => {
                  const priceNum = parseFloat(
                    item.priceAtMoment.replace(/[$.]/g, "")
                  );
                  const subtotal = priceNum * item.quantity;
                  return (
                    <div key={index} className="flex justify-between text-xs">
                      <span className="text-muted-foreground truncate mr-2">
                        {item.quantity} × {item.priceAtMoment}
                      </span>
                      <span className="font-medium whitespace-nowrap">
                        ${thousandSeparatorPipe(subtotal)}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Total */}
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg">Total Pagado</span>
                  <span className="font-bold text-2xl text-primary">
                    {order.totalPrice}
                  </span>
                </div>
              </div>
            </div>

            <Button
              className="w-full cursor-pointer"
              size="lg"
              onClick={handleDownloadPDF}
            >
              <Download className="mr-2 h-5 w-5" />
              Descargar PDF
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
