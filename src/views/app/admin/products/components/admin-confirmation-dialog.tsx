import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui";

export interface AdminConfirmationDialogProps {
  isActive: boolean;
  productData: {
    title: string;
    brandName: string;
  };
  trigger: React.ReactNode;
  onConfirm: () => void;
}

export const AdminConfirmationDialog = ({
  isActive,
  productData: { title, brandName },
  trigger,
  onConfirm,
}: AdminConfirmationDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="inline-flex cursor-pointer">{trigger}</div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{`${isActive ? "Desactivar" : "Activar"} el producto ${title} ${brandName}`}</DialogTitle>
          <DialogDescription>{`Esta acción ${isActive ? "desactivará" : "activará"} el producto ${title} ${brandName}. ¿Estás seguro de que deseas continuar?`}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="cursor-pointer">
              Cancelar
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              className={`cursor-pointer ${isActive ? "bg-red-500 text-white hover:bg-red-700" : "bg-green-500 text-white hover:bg-green-700"}`}
              onClick={() => onConfirm()}
            >
              {isActive ? "Desactivar" : "Activar"}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
