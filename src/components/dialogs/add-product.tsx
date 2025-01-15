import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "@/axios"

export function CreateProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | string>("");
  const [stock, setStock] = useState<number | string>("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    []
  );
  const [image, setImage] = useState<File | null>(null);
  const navigate = useNavigate();

  // Fetch categories from the server
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/categories");
        setCategories(response.data.data || []);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        setCategories([]); // Set empty array on error
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image) {
      alert("Please upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", String(price));
    formData.append("stock", String(stock));
    formData.append("categoryId", categoryId);
    formData.append("image", image);

    try {
      const response = await axios.post("/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        alert("Product created successfully!");
        navigate("/admin/product"); // Redirect to product list or any page
      }
    } catch (error) {
      console.error("Error creating product:", error);
      alert("Failed to create product. Please make sure you are logged in.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#56C05A] w-1/6" variant="outline">Add Product</Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-500 text-white sm:max-w-[425px] pb-[50px] lg:max-w-[90%] lg:h-[70%]">
        <DialogHeader>
          <DialogTitle>Add Product</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit}
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
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border bg-transparent border-gray-300 p-2 rounded"
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="price" className="mb-2 font-semibold">
                Price:
              </label>
              <input
                id="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="border bg-transparent border-gray-300 p-2 rounded"
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="stock" className="mb-2 font-semibold">
                Stock:
              </label>
              <input
                id="stock"
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="border bg-transparent border-gray-300 p-2 rounded"
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="categoryId" className="mb-2 font-semibold">
                Category:
              </label>
              <select
                id="categoryId"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="border bg-transparent border-gray-300 p-2 rounded"
                required
              >
                <option value="" disabled>
                  Select a category
                </option>
                {categories.map((category) => (
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
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border bg-transparent hide-scrollbar min-h-[200px] border-gray-300 p-2 rounded"
                required
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
                onChange={(e) => setImage(e.target.files?.[0] || null)}
                className="border border-gray-300 p-2 rounded"
                required
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="absolute shadow-lg m-[25px] bottom-0 right-0 text-white px-4 py-2 rounded bg-[#56C05A]"
            >
              Create Product
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
