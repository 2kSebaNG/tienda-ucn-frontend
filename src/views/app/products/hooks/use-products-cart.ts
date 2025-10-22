import { useState } from "react";
import { toast } from "sonner";

import {
  useAddItemToCartMutation,
  useUpdateQuantityMutation,
} from "@/hooks/api";
import { handleApiError } from "@/lib/api";
import { useCartStore } from "@/stores";

interface UseProductsCartProps {
  productId: number;
  productTitle: string;
}

export const useProductsCart = ({
  productId,
  productTitle,
}: UseProductsCartProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const { items, setItems } = useCartStore();

  const addItemMutation = useAddItemToCartMutation();
  const updateQuantityMutation = useUpdateQuantityMutation();

  const handleAddToCart = async () => {
    setIsAdding(true);

    try {
      const existingItem = items.find(i => i.productId === productId);

      if (!existingItem) {
        const newCart = await addItemMutation.mutateAsync({
          productId: productId.toString(),
          quantity: 1,
        });
        setItems(newCart.data.items);
      } else {
        const updatedCart = await updateQuantityMutation.mutateAsync({
          productId: productId.toString(),
          quantity: existingItem.quantity + 1,
        });
        setItems(updatedCart.data.items);
      }

      setJustAdded(true);
      toast.success(`${productTitle} agregado al carrito`);

      setTimeout(() => setJustAdded(false), 2000);
    } catch (err) {
      const apiError = handleApiError(err).details;
      toast.error(apiError || "Error agregando producto al carrito");
    } finally {
      setIsAdding(false);
    }
  };

  return {
    isAdding,
    justAdded,
    handleAddToCart,
  };
};
