"use client";

import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button, Card } from "@/components/ui";
import { thousandSeparatorPipe } from "@/lib";

import { ClearCartDialog, RemoveItemDialog } from "./components";
import { useCartView } from "./hooks";

export default function CartView() {
  const {
    items,
    cart: { totalItems, totalPrice, hasItems },
    dialogs: { itemToRemove, clearingCart },
    isLoading,
    actions: {
      handleQuantityChange,
      handleRemoveWithConfirmation,
      handleConfirmRemove,
      handleCancelRemove,
      handleClearWithConfirmation,
      handleConfirmClear,
      handleCancelClear,
    },
  } = useCartView();

  if (isLoading && !hasItems) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
        <p className="text-muted-foreground">Cargando carrito...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link href="/products">
            <Button variant="outline" className="mb-2 -ml-3 cursor-pointer">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Continuar comprando
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Carrito de Compras</h1>
          <p className="text-muted-foreground mt-1">
            {totalItems} {totalItems === 1 ? "producto" : "productos"}
          </p>
        </div>

        {hasItems && (
          <Button
            className="cursor-pointer hover:bg-destructive/80"
            variant="destructive"
            onClick={handleClearWithConfirmation}
            disabled={isLoading}
          >
            Vaciar carrito
          </Button>
        )}
      </div>

      {/* Content */}
      {!hasItems ? (
        <div className="text-center py-16">
          <ShoppingBag className="w-24 h-24 mx-auto text-muted-foreground/40 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Tu carrito está vacío</h2>
          <p className="text-muted-foreground mb-6">
            Agrega algunos productos para comenzar a comprar
          </p>
          <Link href="/products">
            <Button size="lg" className="cursor-pointer">
              Ver productos
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(item => (
              <Card key={item.productId} className="p-6">
                <div className="flex gap-4">
                  {item.productImageUrl && (
                    <Image
                      src={item.productImageUrl}
                      alt={item.productTitle}
                      width={96}
                      height={96}
                      className="w-24 h-24 object-cover rounded"
                    />
                  )}

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg mb-1">
                      {item.productTitle}
                    </h3>
                    <p className="text-muted-foreground mb-3">
                      ${thousandSeparatorPipe(item.price)} c/u
                    </p>

                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground">
                        Cantidad:
                      </span>
                      <div className="flex items-center gap-2">
                        <Button
                          className="cursor-pointer"
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            handleQuantityChange({
                              productId: item.productId.toString(),
                              quantity: item.quantity - 1,
                            })
                          }
                          disabled={item.quantity <= 1 || isLoading}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-12 text-center font-medium">
                          {item.quantity}
                        </span>
                        <Button
                          className="cursor-pointer"
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            handleQuantityChange({
                              productId: item.productId.toString(),
                              quantity: item.quantity + 1,
                            })
                          }
                          disabled={isLoading}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="text-right flex flex-col justify-between">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive cursor-pointer"
                      onClick={() =>
                        handleRemoveWithConfirmation(item.productId.toString())
                      }
                      disabled={isLoading}
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>

                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Subtotal
                      </p>
                      <p className="text-xl font-bold">
                        ${thousandSeparatorPipe(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-4">
              <h2 className="text-xl font-bold mb-4">Resumen del Pedido</h2>

              <div className="space-y-3 mb-6">
                {/* Desglose detallado por producto */}
                <div className="space-y-2 pb-3 border-b">
                  <p className="text-sm font-medium text-muted-foreground mb-2">
                    Desglose:
                  </p>
                  {items.map(item => (
                    <div
                      key={item.productId}
                      className="flex justify-between text-xs"
                    >
                      <span className="text-muted-foreground">
                        {item.quantity} × ${thousandSeparatorPipe(item.price)}
                      </span>
                      <span className="font-medium">
                        ${thousandSeparatorPipe(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Subtotal */}
                <div className="flex justify-between text-sm pt-2">
                  <span className="text-muted-foreground">
                    Subtotal ({items.length}{" "}
                    {items.length === 1 ? "producto" : "productos"})
                  </span>
                  <span className="font-medium">
                    ${thousandSeparatorPipe(totalPrice)}
                  </span>
                </div>

                {/* Total */}
                <div className="border-t pt-3 flex justify-between">
                  <span className="font-bold text-lg">Total a Pagar</span>
                  <span className="font-bold text-2xl text-primary">
                    ${thousandSeparatorPipe(totalPrice)}
                  </span>
                </div>
              </div>

              <Link href={"/checkout"}>
                <Button
                  className="w-full mb-3 cursor-pointer"
                  size="lg"
                  disabled={isLoading || !hasItems}
                >
                  Proceder al Checkout
                </Button>
              </Link>

              <p className="text-xs text-muted-foreground text-center">
                Los precios incluyen todos los cargos aplicables
              </p>
            </Card>
          </div>
        </div>
      )}

      {/* Clear Cart Dialog */}
      <ClearCartDialog
        clearingCart={clearingCart}
        confirmClean={handleConfirmClear}
        cancelClean={handleCancelClear}
      />

      {/* Remove Item Dialog */}
      <RemoveItemDialog
        itemToRemove={itemToRemove}
        cancelRemove={handleCancelRemove}
        confirmRemove={handleConfirmRemove}
      />
    </div>
  );
}
