import logo from "@/assets/logo.svg";
import product from "@/assets/products/mouse.jpg";

export default function ItemTransaction() {
  return (
    <div className="flex px-[20px] py-[10px] justify-between items-center w-[424px] h-[100px] bg-[#303030]">
      <div className="flex h-full gap-[13px]">
        <div className="w-[50px] h-full">
          <img
            className="w-full h-full object-cover object-center"
            src={product}
            alt="product"
          />
        </div>
        <div className="flex flex-col text-[7px] justify-between">
          <div className="flex flex-col gap-[2px]">
            <h1 className="font-bold text-xs text-[#F74D4D]">Mouse</h1>
            <p className="text-[#F74D4D]">
              <b>Saturday</b>, 14 Juli 2021
            </p>
            <p>Price : Rp.500.000</p>
          </div>
          <h1 className="font-bold">Sub Total : 500.000</h1>
        </div>
      </div>
      <img width={50} src={logo} alt="logo" />
    </div>
  );
}
