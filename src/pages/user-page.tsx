import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export interface Product {
  id: string; // Adjust the type based on your database schema
  name: string;
  price: number;
  description: string;
  imageUrl: string; // Optional, depending on your schema
  stock: number;
}

export default function UserPage() {
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
    <div className="absolute top-0 pt-[90px] flex flex-col justify-start h-[95%] text-white w-full">

      <div className="flex flex-col h-full overflow-y-auto hide-scrollbar">
        <h1 className="z-10 sticky top-0 w-full pb-[20px] px-[50px] bg-[#0B0B0B] text-3xl font-bold text-[#F74D4D]">Product</h1>

        {/* Products */}
        <div className="grid grid-cols-6 px-[50px] h-full w-full gap-[15px]">
          {/* Item */}
          {products.map((item) => (

            <Link to={`/detail-product/${item.id}`} key={item.id} className="hover:scale-105 duration-300 flex flex-col overflow-hidden rounded-[5px] h-[300px]">
              <div className="w-full h-[70%]">
                <img
                  className="object-cover object-center w-full h-full"
                  src={item.imageUrl}
                  alt="Item"
                />
              </div>
              <div className="flex flex-col w-full justify-between bg-[#212121] text-xs px-[16px] py-[14px] h-full">
                <h1 className="font-bold text-sm text-[#F74D4D]">{item.name}</h1>
                <p>{formatRupiah(item.price)}</p>
                <p>Stock : {item.stock}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
