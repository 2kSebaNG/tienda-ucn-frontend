import { NewProductCard } from "./components/new-product-card";

export default function NewProductView() {
  return (
    <div className="flex flex-row items-start justify-center min-h-screen pt-8">
      <NewProductCard />
    </div>
  );
}
