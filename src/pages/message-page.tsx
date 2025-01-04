import logo from "@/src/assets/logo.svg";
import CardUser from "../modals/card-user";
import send from "@/src/assets/icons/send.svg";
import Message from "../modals/message";

export default function MessagePage() {
  return (
    <div className="relative flex flex-col justify-center bg-[#0B0B0B] text-white w-full h-screen">
      {/* Header */}
      <div className="absolute flex justify-between px-[50px] py-[20px] left-0 top-0 w-full">
        <img width={50} src={logo} alt="logo" />
        <div className="flex text-[15px] font-bold items-center gap-[23px]">
          <p className="text-[#F74D4D]">Complain</p>
          <p>Profile</p>
          <p>Logout</p>
        </div>
      </div>

      {/* Complain */}
      <div className="flex h-full">
        {/* users */}
        <div className="flex overflow-y-auto scrollbar flex-col gap-[30px] px-[50px] mt-[130px] w-1/3">
          <CardUser />
          <CardUser />
          <CardUser />
          <CardUser />
          <CardUser />
          <CardUser />
          <CardUser />
          <CardUser />
          <CardUser />
          <CardUser />
          <CardUser />
          <CardUser />
          <CardUser />
        </div>
        <div className="flex flex-col px-[40px] pb-[50px] justify-end gap-[40px] border-l w-full">
          <div className="flex flex-col overflow-y-auto scrollbar gap-[20px] h-[70%]">
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
          </div>
          <div className="relative">
            <input
              type="text"
              className="h-[30px] w-full px-[20px] py-[20px] bg-[#232323]"
              placeholder="Send Message"
            />

            <img
              className="absolute right-[20px] top-[5px]"
              width={30}
              src={send}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}
