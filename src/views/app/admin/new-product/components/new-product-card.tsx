import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui";

import { NewProductForm } from "./new-product-form";

export function NewProductCard() {
  return (
    <Card className="w-full max-w-6xl mb-6 flex flex-col">
      <CardHeader className="flex-shrink-0">
        <CardTitle>Nuevo Producto</CardTitle>
        <CardDescription>Ingresa los datos del nuevo producto.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <NewProductForm />
      </CardContent>
    </Card>
  );
}
