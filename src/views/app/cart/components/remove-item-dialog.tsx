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

interface RemoveItemDialogProps {
  itemToRemove: string | null;
  cancelRemove: () => void;
  confirmRemove: () => void;
}

export const RemoveItemDialog = ({
  itemToRemove,
  cancelRemove,
  confirmRemove,
}: RemoveItemDialogProps) => {
  return (
    <AlertDialog
      open={!!itemToRemove}
      onOpenChange={open => !open && cancelRemove()}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Eliminar producto?</AlertDialogTitle>
          <AlertDialogDescription>
            ¿Estás seguro de que deseas eliminar este producto del carrito?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer" onClick={cancelRemove}>
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction className="cursor-pointer" onClick={confirmRemove}>
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
