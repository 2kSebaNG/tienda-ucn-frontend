import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui";

import { NewProductCard } from "./components";

export default function NewProductView() {
  return (
    <div className="flex flex-col items-center min-h-screen pt-8 px-4">
      <div className="w-full max-w-6xl">
        <div className="mb-2">
          <Link href="/admin/products">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 hover:bg-gray-100 cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Volver</span>
            </Button>
          </Link>
        </div>
        <NewProductCard />
      </div>
    </div>
  );
}
