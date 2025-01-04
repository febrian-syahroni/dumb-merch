import logo from "@/src/assets/logo.svg";

export default function EditProductPage() {
  return (
    <div className="relative flex flex-col px-[80px] bg-[#0B0B0B] text-white w-full h-screen">
      {/* Header */}
      <div className="absolute flex justify-between px-[50px] py-[20px] left-0 top-0 w-full">
        <img width={50} src={logo} alt="logo" />
        <div className="flex text-[15px] font-bold items-center gap-[23px]">
          <p>Complain</p>
          <p>Category</p>
          <p className="text-[#F74D4D]">Product</p>
          <p>Logout</p>
        </div>
      </div>

      <h1 className="mt-[130px] font-bold text-xl">Edit Product</h1>
      <div className="flex flex-col overflow-y-auto scrollbar h-[350px] mt-[20px] gap-[40px]">
        {/* Edit */}
        <div className="text-xs justify-start flex flex-col gap-[15px]">
          <div className="flex items-center gap-[17px]">
            <button className="px-[10px] h-[40px] rounded-[5px] bg-[#F74D4D]">
              Upload Image
            </button>
            <p>Mouse.jpg</p>
          </div>
          <input
            className="border rounded-[5px] px-[20px] bg-[#3D3D3D] min-h-[50px]"
            type="text"
            placeholder="Mouse"
          />
          <textarea
            placeholder="Lorem ipsum odor amet, consectetuer adipiscing elit. Vestibulum nulla nunc fusce at; risus faucibus a. Dui porttitor erat rutrum aptent viverra varius commodo leo. Posuere consequat porttitor placerat, penatibus metus facilisis? Quisque lobortis pulvinar mollis platea libero. Egestas euismod efficitur hac taciti magnis tellus tristique. Nisi torquent dis lacinia vivamus posuere. Varius gravida imperdiet mattis; donec nostra luctus laoreet."
            className="border scrollbar py-2 rounded-[5px] px-[20px] bg-[#3D3D3D] min-h-[50px]"></textarea>
          <input
            className="border rounded-[5px] px-[20px] bg-[#3D3D3D] min-h-[50px]"
            type="text"
            placeholder="Rp.500.000"
          />
          <input
            className="border rounded-[5px] px-[20px] bg-[#3D3D3D] min-h-[50px]"
            type="text"
            placeholder="600"
          />
        </div>
      </div>
      <button className="mt-[20px] rounded-[5px] h-[50px] bg-[#56C05A]">
        Save
      </button>
    </div>
  );
}
