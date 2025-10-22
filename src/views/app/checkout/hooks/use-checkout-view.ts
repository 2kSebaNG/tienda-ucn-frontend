"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { useCheckoutMutation, useGetCart } from "@/hooks/api";
import { handleApiError } from "@/lib";
import { useCartStore } from "@/stores";

interface CheckoutChanges {
  hasChanges: boolean;
  removedItems: Array<{ title: string }>;
  updatedItems: Array<{
    title: string;
    oldQuantity: number;
    newQuantity: number;
  }>;
}

export function useCheckoutView() {
  const { items, setItems, getTotalItems, getTotalPrice } = useCartStore();

  const [checkoutChanges, setCheckoutChanges] =
    useState<CheckoutChanges | null>(null);
  const [showCheckoutDialog, setShowCheckoutDialog] = useState(false);
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  const {
    data: cart,
    refetch: fetchCart,
    isLoading: isFetching,
  } = useGetCart();
  const checkoutMutation = useCheckoutMutation();

  useEffect(() => {
    if (cart) setItems(cart.data.items);
  }, [cart, setItems]);

  const detectChanges = (
    oldItems: typeof items,
    newItems: typeof items
  ): CheckoutChanges => {
    const removedItems: Array<{ title: string }> = [];
    const updatedItems: Array<{
      title: string;
      oldQuantity: number;
      newQuantity: number;
    }> = [];

    const newMap = new Map(newItems.map(i => [i.productId, i]));
    const oldMap = new Map(oldItems.map(i => [i.productId, i]));

    oldItems.forEach(oldItem => {
      if (!newMap.has(oldItem.productId))
        removedItems.push({ title: oldItem.productTitle });
    });

    newItems.forEach(newItem => {
      const oldItem = oldMap.get(newItem.productId);
      if (oldItem && oldItem.quantity !== newItem.quantity) {
        updatedItems.push({
          title: newItem.productTitle,
          oldQuantity: oldItem.quantity,
          newQuantity: newItem.quantity,
        });
      }
    });

    return {
      hasChanges: removedItems.length > 0 || updatedItems.length > 0,
      removedItems,
      updatedItems,
    };
  };

  const handleCheckout = async () => {
    if (items.length === 0) return;
    setIsCreatingOrder(true);
    try {
      const currentItems = [...items];
      const newCartData = await checkoutMutation.mutateAsync();
      const newItems = newCartData.data.items || [];
      const changes = detectChanges(currentItems, newItems);

      setItems(newItems);
      setCheckoutChanges(changes);
      setShowCheckoutDialog(true);
    } catch (err) {
      const apiError = handleApiError(err).details;
      toast.error(apiError || "Error al verificar el carrito");
    } finally {
      setIsCreatingOrder(false);
    }
  };

  const createOrder = () => {
    setShowCheckoutDialog(false);
    setCheckoutChanges(null);
    //TODO: Agregar lógica de creación de orden
    toast.success("Pedido creado exitosamente!");
  };

  const cancelCheckout = () => {
    setShowCheckoutDialog(false);
    setCheckoutChanges(null);
    toast.info("Revisa tu carrito antes de continuar");
  };

  return {
    items,
    isLoading: isFetching || isCreatingOrder,
    totalItems,
    totalPrice,
    checkoutChanges,
    showCheckoutDialog,
    handleCheckout,
    createOrder,
    cancelCheckout,
    fetchCart,
  };
}
