import {
  AlertDialog,
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
import { useState } from "react";

interface DeleteProductProps {
  productId: number;
  onDelete?: () => void;
}

export function DeleteProduct({ productId, onDelete }: DeleteProductProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false); // State untuk melacak loading

  const handleDelete = async () => {
    setIsLoading(true); // Set loading menjadi true saat proses dimulai
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
    } finally {
      setIsLoading(false); // Set loading menjadi false setelah proses selesai
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className="rounded-[5px] h-full"
          variant="destructive"
          disabled={isLoading} // Disable tombol saat loading
        >
          {isLoading ? "Deleting..." : "Delete"} {/* Tampilkan teks berbeda saat loading */}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-[#232323] text-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            className="bg-gray-600 hover:bg-gray-500"
            disabled={isLoading} // Disable tombol saat loading
          >
            Cancel
          </AlertDialogCancel>
          <Button
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-500"
            disabled={isLoading} // Disable tombol saat loading
          >
            {isLoading ? "Deleting..." : "Delete"} {/* Tampilkan teks berbeda saat loading */}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
