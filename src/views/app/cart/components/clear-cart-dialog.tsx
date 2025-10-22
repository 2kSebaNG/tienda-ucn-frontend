import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui";

interface ClearCartDialogProps {
  clearingCart: boolean;
  confirmClean: () => void;
  cancelClean: () => void;
}

export const ClearCartDialog = ({
  clearingCart,
  confirmClean,
  cancelClean,
}: ClearCartDialogProps) => {
  return (
    <AlertDialog
      open={clearingCart}
      onOpenChange={open => !open && cancelClean()}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Vaciar carrito?</AlertDialogTitle>
          <AlertDialogDescription>
            ¿Estás seguro de que deseas vaciar tu carrito de compras?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer" onClick={cancelClean}>
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction className="cursor-pointer" onClick={confirmClean}>
            Vaciar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
