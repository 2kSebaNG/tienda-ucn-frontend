import { CartView } from "@/views";

export const metadata = {
  title: "Tu carrito de compras",
  description:
    "El carrito de compras que lleva un registro de los productos que deseas comprar.",
};

export default function CartPage() {
  return <CartView />;
}
