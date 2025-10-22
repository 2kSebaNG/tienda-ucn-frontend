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
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const { items, setItems, getTotalItems, getTotalPrice } = useCartStore();

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  const {
    data: cart,
    refetch: fetchCart,
    isLoading: isFetching,
  } = useGetCart();
  const updateQuantityMutation = useUpdateQuantityMutation();
  const removeItemMutation = useRemoveItemFromCartMutation();
  const clearCartMutation = useClearCartMutation();

  useEffect(() => {
    if (cart) setItems(cart.data.items);
  }, [cart, setItems]);

  useEffect(() => {
    if (isOpen)
      fetchCart().catch(err => {
        const apiError = handleApiError(err).details;
        toast.error(apiError || "Error cargando el carrito");
      });
  }, [isOpen, fetchCart]);

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

  const handleCheckout = () => {
    setIsOpen(false);
    router.push("/checkout");
  };

  const handleViewCart = () => {
    setIsOpen(false);
    router.push("/cart");
  };

  return {
    isOpen,
    setIsOpen,
    items,
    isLoading: isFetching || isMutating,
    totalItems,
    totalPrice,
    handleQuantityChange,
    handleRemoveItem,
    handleClearCart,
    handleCheckout,
    handleViewCart,
    fetchCart,
  };
}
