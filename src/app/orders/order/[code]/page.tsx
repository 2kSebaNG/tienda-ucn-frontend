import { Metadata } from "next";

import { OrderDetailView } from "@/views";

interface OrderDetailPageProps {
  params: Promise<{ code: string }>;
}

export async function generateMetadata({
  params,
}: OrderDetailPageProps): Promise<Metadata> {
  const { code } = await params;

  if (!code) {
    return {
      title: "Orden no encontrada",
      description: "No se pudo encontrar la orden solicitada.",
    };
  }

  return {
    title: `Detalle de la Orden ${code}`,
    description: `Detalles y estado de la orden con código ${code}.`,
  };
}

export default function OrderDetailPage() {
  return <OrderDetailView />;
}
