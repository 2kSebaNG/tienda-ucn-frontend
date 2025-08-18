import { ProductCard } from "@/components";
import { Product } from "@/models/product";

const products: Product[] = [
  {
    id: 1,
    name: "Polera Negra Hombre",
    price: 25000,
    imageUrl: "/image.png",
  },
  {
    id: 2,
    name: "Computador de escritorio",
    price: 200000,
    imageUrl: "/full_image-1.webp",
  },
  {
    id: 3,
    name: "Audifonos Sony Negros",
    price: 90000,
    imageUrl: "/465984-800-800.webp",
  },
];

export default function ProductsView() {
  return (
    <div className="flex flex-col gap-y-4">
      <h1 className="flex justify-center items-center text-5xl p-2 italic">
        Productos disponibles
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
