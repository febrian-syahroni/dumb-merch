import CardUser from "../modals/card-user";
import send from "@/assets/icons/send.svg";
import Message from "../modals/message";

export default function ComplainPage() {
  return (
    <div className="flex flex-col justify-center bg-[#0B0B0B] text-white w-full h-screen">

      {/* Complain */}
      <div className="flex h-full">
        {/* users */}
        <div className="flex overflow-y-auto hide-scrollbar flex-col gap-[30px] px-[50px] mt-[130px] w-1/3 h-[75%]">
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
        <div className="flex flex-col px-[40px] pb-[50px] justify-end gap-[40px] border-l border-[#272727] w-full">
          <div className="flex flex-col overflow-y-auto hide-scrollbar gap-[20px] h-[70%]">
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
