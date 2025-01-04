import user from "@/src/assets/febrian.jpg";

export default function CardUser() {
  return (
    <div className="flex items-center gap-[20px]">
      <img
        className="p-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 object-cover object-center w-[50px] h-[50px] rounded-full"
        src={user}
        alt="user"
      />
      <div className="flex flex-col gap-1 text-xs">
        <h1>febrian_syahroni</h1>
        <p className="text-[#ABABAB]">Hello admin, I need your help</p>
      </div>
    </div>
  );
}
