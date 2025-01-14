import triangle from "@/assets/icons/triangle.svg";
import user from "@/assets/febrian.jpg";

export default function Message() {
  return (
    <div className="flex items-center gap-[20px]">
      <img
        className="p-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 object-cover object-center w-[50px] h-[50px] rounded-full"
        src={user}
        alt="user"
      />
      <div className="relative flex text-xs">
        <img className="absolute -rotate-90" width={30} src={triangle} alt="" />
        <p className="ml-[20px] p-[10px] rounded-[5px] bg-[#575757] text-[#ABABAB]">
          Hello admin, I need your help
        </p>
      </div>
    </div>
  );
}
