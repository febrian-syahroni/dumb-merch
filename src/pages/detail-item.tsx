import logo from "@/src/assets/logo.svg";

export default function DetailItem() {
  return (
    <div className="relative flex flex-col justify-center items-center px-[80px] bg-[#0B0B0B] text-white w-full h-screen">
      {/* Header */}
      <div className="absolute flex justify-between px-[50px] py-[20px] left-0 top-0 w-full">
        <img width={50} src={logo} alt="logo" />
        <div className="flex text-[15px] font-bold items-center gap-[23px]">
          <p>Complain</p>
          <p>Profile</p>
          <p>Logout</p>
        </div>
      </div>

      {/* Detail */}
      <div className="flex flex-col w-[70%] gap-[38px]">
        <div className="flex justify-center w-auto h-[400px]items-center gap-[54px]">
          <div className="w-[300px] h-[400px] bg-slate-500"></div>
          <div className="flex flex-col w-[59%] text-[13px] justify-between">
            <h1 className="text-[40px] font-bold text-[#F74D4D]">Mouse</h1>
            <p>stock : 600</p>
            <div className="flex gap-1">
              <div className="flex flex-col">
                <p>-</p>
                <p>-</p>
                <p>-</p>
                <p>-</p>
                <p>-</p>
              </div>
              <div className="flex flex-col">
                <p>Wireless Mouse</p>
                <p>Wireless Mouse</p>
                <p>Wireless Mouse</p>
                <p>Wireless Mouse</p>
                <p>Wireless Mouse</p>
              </div>
            </div>
            <p>
              Lorem ipsum odor amet, consectetuer adipiscing elit. Himenaeos dis
              mus venenatis litora lorem vehicula. Nisi litora suspendisse
              maecenas facilisis eu etiam malesuada, montes ultrices. Proin
              sagittis tempor vitae duis faucibus integer pellentesque. Bibendum
              varius diam curabitur curabitur; mus facilisi. Accumsan vel
              feugiat justo purus tempus justo iaculis duis. Ad habitasse velit
              orci commodo curae condimentum gravida facilisi vel. Curae integer
              parturient tempus quam libero hendrerit.
            </p>
            <h1 className="text-right font-bold text-[20px] text-[#F74D4D]">
              Rp.300.900
            </h1>
          </div>
        </div>
        <button className="rounded-[5px] ml-auto w-[58%] h-[40px] bg-[#F74D4D]">
          Buy
        </button>
      </div>
    </div>
  );
}
