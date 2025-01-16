import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import axios from "@/axios";
import { useForm } from "react-hook-form";

interface Category {
  id: number;
  name: string;
}

interface EditProductProps {
  productId: number;
}

interface ProductData {
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: number;
  imageUrl?: File;
}

export function EditProduct({ productId }: EditProductProps) {
  const { register, handleSubmit, setValue } = useForm<ProductData>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch product data for the given productId
    axios.get(`/products/${productId}`).then((response) => {
      const product = response.data;
      setValue("name", product.name);
      setValue("description", product.description);
      setValue("price", product.price);
      setValue("stock", product.stock);
      setValue("categoryId", product.categoryId);
    });

    // Fetch categories for the dropdown
    axios.get(`/categories`).then((response) => {
      if (Array.isArray(response.data)) {
        setCategories(response.data);
      } else {
        console.error("Invalid categories data format:", response.data);
        setCategories([]); // Ensure categories is always an array
      }
    }).catch((error) => {
      console.error("Error fetching categories:", error);
    });
  }, [productId, setValue]);

  const onSubmit = async (data: ProductData) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price.toString());
    formData.append("stock", data.stock.toString());
    formData.append("categoryId", data.categoryId.toString());
    if (image) {
      formData.append("image", image);
    }

    try {
      await axios.put(`/products/${productId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Product updated successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Failed to edit product", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-[5px] w-[100px] bg-[#56C05A]" variant="outline">
          Edit Product
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-500 text-white sm:max-w-[425px] pb-[50px] lg:max-w-[90%] lg:h-[70%]">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-3 bg-gray-500 gap-4 w-full text-sm max-h-[300px] overflow-y-auto hide-scrollbar"
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label htmlFor="name" className="mb-2 font-semibold">
                Name:
              </label>
              <input
                id="name"
                type="text"
                {...register("name", { required: true })}
                className="border bg-transparent border-gray-300 p-2 rounded"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="price" className="mb-2 font-semibold">
                Price:
              </label>
              <input
                id="price"
                type="number"
                {...register("price", { required: true })}
                className="border bg-transparent border-gray-300 p-2 rounded"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="stock" className="mb-2 font-semibold">
                Stock:
              </label>
              <input
                id="stock"
                type="number"
                {...register("stock", { required: true })}
                className="border bg-transparent border-gray-300 p-2 rounded"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="categoryId" className="mb-2 font-semibold">
                Category:
              </label>
              <select
                id="categoryId"
                {...register("categoryId", { required: true })}
                className="border bg-transparent border-gray-300 p-2 rounded"
              >
                <option value="" disabled>
                  Select a category
                </option>
                {categories && categories.map((category) => (
                  <option className="bg-gray-900" key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex col-span-2 flex-col gap-4">
            <div className="flex flex-col">
              <label htmlFor="description" className="mb-2 font-semibold">
                Description:
              </label>
              <textarea
                id="description"
                {...register("description", { required: true })}
                className="border bg-transparent hide-scrollbar min-h-[200px] border-gray-300 p-2 rounded"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="image" className="mb-2 font-semibold">
                Image:
              </label>
              <input
                id="image"
                type="file"
                accept="image/*"
                {...register("imageUrl")}
                onChange={(e) => setImage(e.target.files?.[0] || null)}
                className="border border-gray-300 p-2 rounded"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className={`absolute shadow-lg m-[25px] bottom-0 right-0 text-white px-4 py-2 rounded bg-[#3498db] ${loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Update Product"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
