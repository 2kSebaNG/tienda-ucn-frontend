"use client";

import Image from "next/image";

import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Separator,
  Switch,
} from "@/components/ui";
import { cn } from "@/lib";
import { ProductForAdminResponse } from "@/models/responses";

import { AdminConfirmationDialog } from "./admin-confirmation-dialog";

interface AdminProductCardProps {
  product: ProductForAdminResponse;
  onToggleAvailability?: (id: string) => void;
  isToggling?: boolean;
}

export const AdminProductCard = ({
  product,
  onToggleAvailability,
  isToggling,
}: AdminProductCardProps) => {
  return (
    <Card
      className={cn(
        "flex flex-col overflow-hidden rounded-2xl shadow-md transition hover:shadow-lg",
        isToggling && "opacity-60"
      )}
    >
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={product.mainImageURL}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-contain"
        />
        {!product.isAvailable && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="text-white text-sm font-semibold">Inactivo</span>
          </div>
        )}
      </div>

      <CardHeader className="flex flex-col gap-1">
        <CardTitle className="text-lg font-semibold leading-tight">
          {product.title}
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {product.categoryName} · {product.brandName}
        </p>
      </CardHeader>

      <Separator />

      <CardContent className="flex flex-col gap-3 mt-2">
        <div className="flex flex-wrap gap-2">
          <Badge
            variant={product.stock > 0 ? "secondary" : "destructive"}
            className={cn(
              product.stock > 0
                ? "bg-green-100 text-green-700 hover:bg-green-200"
                : "bg-red-100 text-red-700 hover:bg-red-200"
            )}
          >
            {product.stockIndicator}
          </Badge>

          <Badge
            variant="outline"
            className={`${product.statusName === "New" ? "bg-blue-100 text-blue-700 hover:bg-blue-200" : product.statusName === "Used" ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200" : ""}`}
          >
            {product.statusName === "New"
              ? "Nuevo"
              : product.statusName === "Used"
                ? "Usado"
                : product.statusName}
          </Badge>
        </div>

        <div className="flex items-center justify-between text-sm">
          <p className="font-semibold text-base">{product.price}</p>
          <p className="text-muted-foreground">Stock: {product.stock}</p>
        </div>

        <p className="text-xs text-muted-foreground">
          Última actualización:{" "}
          {new Date(product.updatedAt).toLocaleDateString()}
        </p>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            {product.isAvailable ? "Disponible" : "No disponible"}
          </span>
          <AdminConfirmationDialog
            isActive={product.isAvailable}
            productData={{
              title: product.title,
              brandName: product.brandName,
            }}
            trigger={
              <Switch
                checked={product.isAvailable}
                className="cursor-pointer disabled:cursor-not-allowed"
                disabled={isToggling}
              />
            }
            onConfirm={() => onToggleAvailability?.(product.id.toString())}
          />
        </div>
      </CardContent>
    </Card>
  );
};
