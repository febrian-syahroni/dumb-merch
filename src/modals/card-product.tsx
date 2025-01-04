import product from "@/src/assets/products/mouse.jpg";

export default function CardProduct() {
  return (
    <div className="flex flex-col overflow-hidden rounded-md min-w-[200px] h-full">
      <div className="w-full h-[70%]">
        <img
          className="object-cover object-center w-full h-full"
          src={product}
          alt="Item"
        />
      </div>
      <div className="flex flex-col w-full justify-between bg-[#212121] text-xs px-[16px] py-[14px] h-full">
        <h1 className="font-bold text-sm text-[#F74D4D]">Mouse</h1>
        <p>Rp.500.000</p>
        <p>Stock : 600</p>
      </div>
    </div>
  );
}
