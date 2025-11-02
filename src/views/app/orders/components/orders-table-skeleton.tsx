import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";

export function OrdersTableSkeleton() {
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
          {[...Array(5)].map((_, i) => (
            <TableRow key={i}>
              <TableCell>
                <div className="h-4 w-24 bg-muted animate-pulse rounded" />
              </TableCell>
              <TableCell>
                <div className="h-4 w-32 bg-muted animate-pulse rounded" />
              </TableCell>
              <TableCell className="text-right">
                <div className="h-4 w-8 bg-muted animate-pulse rounded ml-auto" />
              </TableCell>
              <TableCell className="text-right">
                <div className="h-4 w-20 bg-muted animate-pulse rounded ml-auto" />
              </TableCell>
              <TableCell className="text-right">
                <div className="h-8 w-20 bg-muted animate-pulse rounded ml-auto" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
