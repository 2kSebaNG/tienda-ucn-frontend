import { useEffect, useState } from "react";
import { toast } from "sonner";

import {
  useAddItemToCartMutation,
  useUpdateQuantityMutation,
} from "@/hooks/api";
import { handleApiError } from "@/lib/api";
import { useCartStore } from "@/stores";

interface UseProductDetailCartProps {
  productId: number;
  productTitle: string;
  maxStock?: number;
}

export const useProductDetailCart = ({
  productId,
  productTitle,
  maxStock = 99,
}: UseProductDetailCartProps) => {
  // State
  const [localQuantity, setLocalQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  // Store
  const { items, setItems } = useCartStore();

  // API mutations
  const addItemMutation = useAddItemToCartMutation();
  const updateQuantityMutation = useUpdateQuantityMutation();

  // Computed values
  const cartItem = items.find(item => item.productId === productId);
  const isInCart = !!cartItem;
  const cartQuantity = cartItem?.quantity || 0;
  const hasChanges = cartItem
    ? cartItem.quantity !== localQuantity
    : localQuantity > 0;
  const canIncrement = localQuantity < maxStock;
  const canDecrement = localQuantity > 1;
  const canResetQuantity = isInCart && localQuantity !== 1;
  const canSetMax = isInCart && localQuantity !== maxStock;

  // Effects
  useEffect(() => {
    if (cartItem) {
      setLocalQuantity(cartItem.quantity);
    } else {
      setLocalQuantity(1);
    }
  }, [cartItem]);

  // Helpers
  const getButtonText = () => {
    if (isAdding) return "Procesando...";
    if (cartItem)
      return hasChanges ? "Actualizar cantidad" : "Ya está en el carrito";
    return "Añadir al carrito";
  };

  // Actions
  const handleIncrement = () => {
    if (canIncrement) {
      setLocalQuantity(prev => Math.min(prev + 1, maxStock));
    }
  };

  const handleDecrement = () => {
    if (canDecrement) {
      setLocalQuantity(prev => Math.max(prev - 1, 1));
    }
  };

  const handleResetQuantity = async () => {
    if (!canResetQuantity) return;

    setIsAdding(true);
    try {
      const updatedCart = await updateQuantityMutation.mutateAsync({
        productId: cartItem!.productId.toString(),
        quantity: 1,
      });
      setItems(updatedCart.data.items);
      setLocalQuantity(1);
      toast.success("Cantidad reiniciada a 1");
    } catch (err) {
      const apiError = handleApiError(err).details;
      toast.error(apiError || "Error al reiniciar la cantidad");
    } finally {
      setIsAdding(false);
    }
  };

  const handleSetMax = async () => {
    if (!canSetMax) return;

    setIsAdding(true);
    try {
      const updatedCart = await updateQuantityMutation.mutateAsync({
        productId: cartItem!.productId.toString(),
        quantity: maxStock,
      });
      setItems(updatedCart.data.items);
      setLocalQuantity(maxStock);
      toast.success(`Cantidad ajustada al stock máximo (${maxStock})`);
    } catch (err) {
      const apiError = handleApiError(err).details;
      toast.error(apiError || "Error al ajustar la cantidad máxima");
    } finally {
      setIsAdding(false);
    }
  };

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      if (cartItem) {
        const updatedCart = await updateQuantityMutation.mutateAsync({
          productId: cartItem.productId.toString(),
          quantity: localQuantity,
        });
        setItems(updatedCart.data.items);
        toast.success(`Cantidad actualizada a ${localQuantity}`);
      } else {
        const updatedCart = await addItemMutation.mutateAsync({
          productId: productId.toString(),
          quantity: localQuantity,
        });
        setItems(updatedCart.data.items);
        toast.success(`${productTitle} agregado al carrito`);
      }
    } catch (err) {
      const apiError = handleApiError(err).details;
      toast.error(apiError || "Error al actualizar el carrito");
    } finally {
      setIsAdding(false);
    }
  };

  return {
    // Quantity state
    quantity: {
      local: localQuantity,
      cart: cartQuantity,
      max: maxStock,
    },

    // Cart state
    cart: {
      isInCart,
      hasChanges,
    },

    // Validation state
    validation: {
      canIncrement,
      canDecrement,
      canResetQuantity,
      canSetMax,
    },

    // Loading states
    isAdding,
    isLoading: addItemMutation.isPending || updateQuantityMutation.isPending,

    // Mutation states
    error: addItemMutation.error || updateQuantityMutation.error,

    // UI helpers
    buttonText: getButtonText(),

    // Actions
    actions: {
      handleIncrement,
      handleDecrement,
      handleAddToCart,
      handleResetQuantity,
      handleSetMax,
    },
  };
};
