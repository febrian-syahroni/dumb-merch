import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
}

export default function DetailItem() {
  const { id } = useParams<{ id: string }>(); // Mengambil id dari URL
  const [product, setProduct] = useState<Product | null>(null);

  const formatRupiah = (number: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number);
  };

  useEffect(() => {
    const fetchProductDetail = async () => {
      if (!id) return;
      const response = await fetch(`http://localhost:8080/api/products/${id}`);
      const data = await response.json();
      setProduct(data);
    };

    fetchProductDetail();
  }, []);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-[500px] mt-[50px] gap-[50px]">
      <img src={product.imageUrl} className="w-[350px] rounded-md h-full bg-slate-500" />

      {/* Detail */}

      <div className="flex flex-col w-1/2 justify-between">
        <div className="flex flex-col">

          <h1 className="text-[40px] font-bold text-[#F74D4D]">{product.name}</h1>
          <p>stock : {product.stock}</p>
        </div>
        <div className="relative description overflow-y-auto hide-scrollbar w-full h-[300px] gap-[10px] flex flex-col w-[59%] text-[13px]">
          {product.description}
        </div>
        <h1 className="text-right font-bold text-[20px] text-[#F74D4D]">
          {formatRupiah(product.price)}
        </h1>
        <button className="rounded-[5px] h-[40px] bg-[#F74D4D]">
          Buy
        </button>
      </div>
    </div>
  );
}
