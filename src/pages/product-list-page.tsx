import { CreateProduct } from "@/components/dialogs/add-product";
import { EditProduct } from "@/components/dialogs/edit-product";
import axios from "axios";
import { useEffect, useState } from "react";

export interface Product {
  id: string; // Adjust the type based on your database schema
  name: string;
  price: number;
  description: string;
  imageUrl: string; // Optional, depending on your schema
  stock: number;
}

function limitWords(text: string, maxWords: number) {
  const words = text.split(' '); // Pisahkan kata berdasarkan spasi
  return words.slice(0, maxWords).join(' '); // Ambil maxWords kata pertama dan gabungkan kembali
}

export default function ProductListPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const formatRupiah = (number: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>("http://localhost:8080/api/products"); // Update the endpoint URL if necessary
        setProducts(response.data);
      } catch (err) {
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="absolute top-[100px] px-[80px] flex flex-col gap-[20px] w-full">

      <h1 className="text-xl font-bold">List Products</h1>

      <CreateProduct />

      {/* Table */}
      <div className="text-base overflow-y-auto hide-scrollbar max-h-[400px] bg-[#303030]">
        <table className="table-auto w-full border-b">
          <thead className="sticky top-0 shadow-lg">
            <tr className="h-[50px]">
              <th className="font-bold p-2 text-left bg-gray-800 text-white">
                No
              </th>
              <th className="font-bold p-2 text-left bg-gray-800 text-white">
                Photo
              </th>
              <th className="font-bold p-2 text-left bg-gray-800 text-white">
                Product Name
              </th>
              <th className="font-bold p-2 text-left bg-gray-800 text-white">
                Product Desc
              </th>
              <th className="font-bold p-2 text-left bg-gray-800 text-white">
                Price
              </th>
              <th className="font-bold p-2 text-left bg-gray-800 text-white">
                Qty
              </th>
              <th className="font-bold px-4 text-left bg-gray-800 text-white">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map(item => (
              <tr key={item.id} className="odd:bg-[#232323]">
                <td className="p-2 border-b text-left">{products.indexOf(item) + 1}</td>
                <td className="p-2 border-b text-left"><img width={50} src={item.imageUrl} alt="" /></td>
                <td className="p-2 border-b text-left">{item.name}</td>
                <td className="p-2 overflow-y-auto border-b text-left">
                  <p className="w-[300px] ">{limitWords(item.description, 10)}</p>
                </td>
                <td className="p-2 border-b text-left">{formatRupiah(item.price)}</td>
                <td className="p-2 border-b text-left">{item.stock}</td>
                <td className="py-2 px-4 border-b text-left">
                  <div className="flex h-[30px] gap-[15px]">
                  <EditProduct productId={parseInt(item.id)} />
                    <button className="rounded-[5px] w-[100px] bg-[#F74D4D]">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
