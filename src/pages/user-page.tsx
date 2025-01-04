import logo from "@/src/assets/logo.svg";
import CardProduct from "../modals/card-product";
export default function UserPage() {
  return (
    <div className="relative flex flex-col justify-center px-[80px] bg-[#0B0B0B] text-white w-full h-screen">
      {/* Header */}
      <div className="absolute flex justify-between px-[50px] py-[20px] left-0 top-0 w-full">
        <img width={50} src={logo} alt="logo" />
        <div className="flex text-[15px] font-bold items-center gap-[23px]">
          <p>Complain</p>
          <p>Profile</p>
          <p>Logout</p>
        </div>
      </div>

      <div className="flex flex-col gap-[30px]">
        <h1 className="text-3xl font-bold text-[#F74D4D]">Product</h1>

        {/* Products */}
        <div className="flex flex-row scrollbar overflow-x-auto w-full h-[300px] gap-[15px]">
          {/* Item */}
          <CardProduct />
          <CardProduct />
          <CardProduct />
          <CardProduct />
          <CardProduct />
          <CardProduct />
          <CardProduct />
          <CardProduct />
          <CardProduct />
          <CardProduct />
          <CardProduct />
          <CardProduct />
        </div>
      </div>
    </div>
  );
}
