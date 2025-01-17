import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import api from "@/axios"
import { useToast } from "@/hooks/use-toast";

interface DeleteProductProps {
  productId: number;
  onDelete?: () => void;
}

export function DeleteProduct({ productId, onDelete }: DeleteProductProps) {
  const { toast } = useToast()

  const handleDelete = async () => {
    try {
      await api.delete(`/products/${productId}`);
      toast({
        title: "Success",
        description: "Product deleted successfully",
      });
      onDelete?.();
      alert("Product deleted successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting product:", error);
      toast({
        title: "Error",
        description: "Failed to delete product",
        variant: "destructive",
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="rounded-[5px]" variant="destructive">Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-[#232323] text-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-gray-600 hover:bg-gray-500">Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-500">Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
