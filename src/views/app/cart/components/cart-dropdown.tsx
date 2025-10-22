"use client";

import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui";
import { thousandSeparatorPipe } from "@/lib";

import { useCartDropdown } from "../hooks";

export const CartDropdown = () => {
  const {
    isOpen,
    setIsOpen,
    items,
    isLoading,
    totalItems,
    totalPrice,
    handleQuantityChange,
    handleRemoveItem,
    handleClearCart,
    handleViewCart,
  } = useCartDropdown();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative cursor-pointer">
          <ShoppingCart className="h-5 w-5" />
          {/* Solo mostrar badge después de montar en el cliente */}
          {isMounted && totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {totalItems > 99 ? "99+" : totalItems}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-96 p-0">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold text-lg">
            Carrito {totalItems > 0 && `(${totalItems})`}
          </h3>

          {items.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1 text-destructive hover:bg-destructive/10 cursor-pointer"
              disabled={isLoading}
              onClick={handleClearCart}
            >
              <Trash2 className="h-4 w-4" />
              Vaciar
            </Button>
          )}
        </div>

        {/* Content */}
        <div className="max-h-96 overflow-y-auto">
          {isLoading && items.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2" />
              <p>Cargando...</p>
            </div>
          ) : items.length === 0 ? (
            <div className="p-8 text-center">
              <ShoppingCart className="w-16 h-16 mx-auto text-muted-foreground/40 mb-3" />
              <p className="text-muted-foreground mb-2">
                Tu carrito está vacío
              </p>
              <Link href="/products">
                <Button
                  variant="link"
                  size="sm"
                  className="cursor-pointer"
                  onClick={() => setIsOpen(false)}
                >
                  Explorar productos
                </Button>
              </Link>
            </div>
          ) : (
            <div className="divide-y">
              {items.map(item => (
                <div
                  key={item.productId}
                  className="p-4 hover:bg-accent/50 transition-colors"
                >
                  <div className="flex gap-3">
                    {item.productImageUrl && (
                      <Image
                        src={item.productImageUrl}
                        alt={item.productTitle}
                        width={64}
                        height={64}
                        className="w-16 h-16 object-cover rounded"
                      />
                    )}

                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate mb-1">
                        {item.productTitle}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        ${thousandSeparatorPipe(item.price)}
                      </p>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7 cursor-pointer"
                          onClick={() =>
                            handleQuantityChange(
                              {
                                productId: item.productId.toString(),
                                quantity: item.quantity,
                              },
                              -1
                            )
                          }
                          disabled={item.quantity <= 1 || isLoading}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7 cursor-pointer"
                          onClick={() =>
                            handleQuantityChange(
                              {
                                productId: item.productId.toString(),
                                quantity: item.quantity,
                              },
                              1
                            )
                          }
                          disabled={isLoading}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex flex-col justify-between items-end">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 cursor-pointer text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() =>
                          handleRemoveItem(item.productId.toString())
                        }
                        disabled={isLoading}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>

                      <p className="text-sm font-medium">
                        ${thousandSeparatorPipe(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-4 border-t bg-muted/30">
            <div className="flex justify-between items-center mb-3">
              <span className="font-semibold">Total:</span>
              <span className="text-xl font-bold text-primary">
                ${thousandSeparatorPipe(totalPrice)}
              </span>
            </div>

            <div className="flex flex-col mt-3 gap-2">
              {/* Checkout */}

              <Button
                className="w-full cursor-pointer"
                size="sm"
                onClick={handleViewCart}
              >
                Ver detalle
              </Button>
            </div>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
