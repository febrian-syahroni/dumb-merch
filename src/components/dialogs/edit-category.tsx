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
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export function EditCategory({ categoryId }: { categoryId: number }) {
  const { register, handleSubmit, setValue } = useForm<{ name: string }>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get(`/categories/${categoryId}`).then((response) => {
      const data = response.data;
      setValue("name", data.name);
    });
  }, [])

  const onSubmit = async (data: { name: string }) => {
    setLoading(true);
    try {
      await api.put(`/categories/${categoryId}`, data);
      alert("Category updated successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Failed to edit category", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-[5px] h-full w-[100px] hover:bg-[#3D3D3D] bg-[#56C05A]" variant="default">Edit Category</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#232323] text-white">
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              type="text"
              {...register("name", { required: true })}
              className="bg-transparent col-span-3"
              placeholder="pedro"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            disabled={loading}
            onClick={handleSubmit(onSubmit)}
            className="bg-[#56C05A] hover:bg-[#3D3D3D]"
          >
            {loading ? "Saving..." : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
