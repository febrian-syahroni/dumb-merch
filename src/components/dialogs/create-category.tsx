import api from "@/axios";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface FormData {
  name: string;
}

export function CreateCategory() {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      await api.post("/categories", data);
      toast({ description: "Category created successfully" });
      setOpen(false);
      reset();
      alert("Category Created successfully!");
      window.location.reload();
    } catch (error) {
      toast({ description: "Failed to create category" });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-[5px] w-1/6 hover:bg-[#3D3D3D] bg-[#56C05A]" variant="default">
          Add Category
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#232323] text-white">
        <DialogHeader>
          <DialogTitle>Create Category</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                type="text"
                className="bg-transparent col-span-3"
                placeholder="Enter category name"
                {...register("name", { required: "Category name is required" })}
              />
            </div>
            {errors.name && (
              <span className="text-red-500 text-sm ml-[120px]">{errors.name.message}</span>
            )}
          </div>
          <DialogFooter>
            <Button type="submit" className="bg-[#56C05A] hover:bg-[#4CAF50]">
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
