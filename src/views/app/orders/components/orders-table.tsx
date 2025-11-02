import { Download, Eye } from "lucide-react";

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { formatDate } from "@/lib";
import { Order } from "@/models/responses";

interface OrdersTableProps {
  orders: Order[];
  onViewDetail: (orderId: string) => void;
  onDownloadPDF: (orderId: string) => void;
}

export function OrdersTable({
  orders,
  onViewDetail,
  onDownloadPDF,
}: OrdersTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Código</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead className="text-right">Productos</TableHead>
            <TableHead className="text-right">Total</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map(order => (
            <TableRow key={order.code}>
              <TableCell className="font-medium">{order.code}</TableCell>
              <TableCell>{formatDate(order.purchasedAt)}</TableCell>
              <TableCell className="text-right">{order.items.length}</TableCell>
              <TableCell className="text-right font-medium">
                {order.total}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onViewDetail(order.code)}
                    className="h-8 w-8 p-0 cursor-pointer"
                  >
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">Ver detalle</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDownloadPDF(order.code)}
                    className="h-8 w-8 p-0 cursor-pointer"
                  >
                    <Download className="h-4 w-4" />
                    <span className="sr-only">Descargar PDF</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
