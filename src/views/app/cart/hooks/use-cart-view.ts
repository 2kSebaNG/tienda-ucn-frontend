import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
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

export function useCartView() {
  // State
  const [itemToRemove, setItemToRemove] = useState<string | null>(null);
  const [clearingCart, setClearingCart] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  // Router
  const router = useRouter();

  // Store
  const { items, setItems, getTotalItems, getTotalPrice } = useCartStore();

  // Session management
  const { data: session } = useSession();
  const isAuthenticated = !!session?.user;
  const isAdmin = session?.user?.role.toLowerCase() === "admin";

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

  // Computed values
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();
  const hasItems = items.length > 0;
  const isLoading = isFetching || isMutating;
  const hasItemToRemove = !!itemToRemove;

  // Actions - Quantity
  const handleQuantityChange = async (item: CartItemRequest) => {
    if (item.quantity < 1) return;

    setIsMutating(true);
    try {
      const updatedCart = await updateQuantityMutation.mutateAsync(item);
      setItems(updatedCart.data.items);
      toast.success("Cantidad actualizada");
    } catch (err) {
      const apiError = handleApiError(err).details;
      toast.error(apiError || "Error actualizando cantidad");
    } finally {
      setIsMutating(false);
    }
  };

  // Actions - Remove Item
  const handleRemoveWithConfirmation = (itemId: string) => {
    setItemToRemove(itemId);
  };

  const handleConfirmRemove = async () => {
    if (!itemToRemove) return;

    setIsMutating(true);
    try {
      const updatedCart = await removeItemMutation.mutateAsync(itemToRemove);
      setItems(updatedCart.data.items);
      toast.success("Producto eliminado del carrito");
      setItemToRemove(null);
    } catch (err) {
      const apiError = handleApiError(err).details;
      toast.error(apiError || "Error eliminando producto");
    } finally {
      setIsMutating(false);
    }
  };

  const handleCancelRemove = () => {
    setItemToRemove(null);
  };

  // Actions - Clear Cart
  const handleClearWithConfirmation = () => {
    setClearingCart(true);
  };

  const handleConfirmClear = async () => {
    if (!clearingCart) return;

    setIsMutating(true);
    try {
      const updatedCart = await clearCartMutation.mutateAsync();
      setItems(updatedCart.data.items);
      toast.success("Carrito vaciado");
      setClearingCart(false);
    } catch (err) {
      const apiError = handleApiError(err).details;
      toast.error(apiError || "Error vaciando carrito");
    } finally {
      setIsMutating(false);
    }
  };

  const handleCancelClear = () => {
    setClearingCart(false);
  };

  // Actions - Refresh
  const handleRefreshCart = () => {
    fetchCart();
  };

  // Actions - Redirection
  const handleRedirectToCheckout = () => {
    if (!isAuthenticated) {
      toast.error("Debes iniciar sesión para proceder al checkout");
      return;
    }
    if (isAdmin) {
      toast.error("Los administradores no pueden realizar compras");
      return;
    }
    router.push("/checkout");
  };

  return {
    // Cart data
    items,
    cart: {
      totalItems,
      totalPrice,
      hasItems,
    },

    // Session data
    session: {
      isAuthenticated,
      isAdmin,
    },

    // Dialog states
    dialogs: {
      itemToRemove,
      hasItemToRemove,
      clearingCart,
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

      // Remove item actions
      handleRemoveWithConfirmation,
      handleConfirmRemove,
      handleCancelRemove,

      // Clear cart actions
      handleClearWithConfirmation,
      handleConfirmClear,
      handleCancelClear,

      // Refresh action
      handleRefreshCart,

      // Redirection action
      handleRedirectToCheckout,
    },
  };
}
