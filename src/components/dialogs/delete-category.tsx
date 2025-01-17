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

interface DeleteCategoryProps {
  categoryId: number;
  onDelete?: () => void;
}

export function DeleteCategory({ categoryId, onDelete }: DeleteCategoryProps) {
  const { toast } = useToast()

  const handleDelete = async () => {
    try {
      await api.delete(`/categories/${categoryId}`);
      toast({
        title: "Success",
        description: "Category deleted successfully",
      });
      onDelete?.();
      alert("Category deleted successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting category:", error);
      toast({
        title: "Error",
        description: "Failed to delete category",
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
