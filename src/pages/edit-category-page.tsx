import logo from "@/src/assets/logo.svg";

export default function EditCategoryPage() {
  return (
    <div className="relative flex flex-col justify-center px-[80px] bg-[#0B0B0B] text-white w-full h-screen">
      {/* Header */}
      <div className="absolute flex justify-between px-[50px] py-[20px] left-0 top-0 w-full">
        <img width={50} src={logo} alt="logo" />
        <div className="flex text-[15px] font-bold items-center gap-[23px]">
          <p>Complain</p>
          <p className="text-[#F74D4D]">Category</p>
          <p>Product</p>
          <p>Logout</p>
        </div>
      </div>

      <h1 className="mb-[48px] font-bold text-xl">Edit Category</h1>

      {/* Edit */}
      <div className="flex flex-col gap-[70px]">
        <input
          className="border rounded-[5px] px-[20px] bg-[#3D3D3D] h-[50px]"
          type="text"
          placeholder="Mouse"
        />
        <button className="rounded-[5px] h-[50px] bg-[#56C05A]">Save</button>
      </div>
    </div>
  );
}
