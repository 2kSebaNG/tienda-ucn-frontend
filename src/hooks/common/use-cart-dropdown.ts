import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import {
  useClearCartMutation,
  useGetCart,
  useRemoveItemFromCartMutation,
  useUpdateQuantityMutation,
} from "@/hooks/api";
import { handleApiError } from "@/lib";
import { CartItemRequest } from "@/models/requests";
import { useCartStore } from "@/stores";

export function useCartDropdown() {
  // State
  const [isOpen, setIsOpen] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  // Router
  const router = useRouter();

  // Store
  const { items, setItems, getTotalItems, getTotalPrice } = useCartStore();

  // API calls
  const {
    data: cart,
    refetch: fetchCart,
    isLoading: isFetching,
  } = useGetCart();
  const updateQuantityMutation = useUpdateQuantityMutation();
  const removeItemMutation = useRemoveItemFromCartMutation();
  const clearCartMutation = useClearCartMutation();

  // Effects
  useEffect(() => {
    if (cart) setItems(cart.data.items);
  }, [cart, setItems]);

  useEffect(() => {
    if (isOpen) {
      fetchCart().catch(err => {
        const apiError = handleApiError(err).details;
        toast.error(apiError || "Error cargando el carrito");
      });
    }
  }, [isOpen, fetchCart]);

  // Computed values
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();
  const hasItems = items.length > 0;
  const isLoading = isFetching || isMutating;

  // Actions - Quantity
  const handleQuantityChange = async (item: CartItemRequest, delta: number) => {
    const newQty = item.quantity + delta;
    if (newQty < 1) return;

    setIsMutating(true);
    try {
      const updatedData = await updateQuantityMutation.mutateAsync({
        productId: item.productId,
        quantity: newQty,
      });
      setItems(updatedData.data.items);
      toast.success("Cantidad actualizada");
    } catch (err) {
      const apiError = handleApiError(err).details;
      toast.error(apiError || "Error actualizando cantidad");
    } finally {
      setIsMutating(false);
    }
  };

  // Actions - Remove Item
  const handleRemoveItem = async (itemId: string) => {
    setIsMutating(true);
    try {
      const updatedData = await removeItemMutation.mutateAsync(itemId);
      setItems(updatedData.data.items);
      toast.success("Producto eliminado");
    } catch (err) {
      const apiError = handleApiError(err).details;
      toast.error(apiError || "Error eliminando producto");
    } finally {
      setIsMutating(false);
    }
  };

  // Actions - Clear Cart
  const handleClearCart = async () => {
    setIsMutating(true);
    try {
      const cleanedCart = await clearCartMutation.mutateAsync();
      setItems(cleanedCart.data.items);
      toast.success("Carrito vaciado");
    } catch (err) {
      const apiError = handleApiError(err).details;
      toast.error(apiError || "Error vaciando carrito");
    } finally {
      setIsMutating(false);
    }
  };

  // Actions - Navigation
  const handleViewCart = () => {
    setIsOpen(false);
    router.push("/cart");
  };

  // Actions - Dropdown
  const handleOpenDropdown = () => {
    setIsOpen(true);
  };

  const handleCloseDropdown = () => {
    setIsOpen(false);
  };

  const handleToggleDropdown = () => {
    setIsOpen(prev => !prev);
  };

  // Actions - Refresh
  const handleRefreshCart = () => {
    fetchCart();
  };

  return {
    // Dropdown state
    dropdown: {
      isOpen,
    },

    // Cart data
    items,
    cart: {
      totalItems,
      totalPrice,
      hasItems,
    },

    // Loading states
    isLoading,
    isFetching,
    isMutating,

    // Mutation states
    errors: {
      update: updateQuantityMutation.error,
      remove: removeItemMutation.error,
      clear: clearCartMutation.error,
    },

    // Actions
    actions: {
      // Quantity actions
      handleQuantityChange,

      // Item actions
      handleRemoveItem,
      handleClearCart,

      // Navigation actions
      handleViewCart,

      // Dropdown actions
      handleOpenDropdown,
      handleCloseDropdown,
      handleToggleDropdown,

      // Refresh action
      handleRefreshCart,
    },
  };
}
