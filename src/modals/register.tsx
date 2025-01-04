export default function Register() {
  return (
    <div className="absolute scale-[85%] right-0 top-[-30px] px-[33px] pt-[30px] rounded-[10px] w-[416px] h-[443px] bg-[#181818]">
      <h1 className="text-[36px] font-bold mb-[30px]">Register</h1>
      <div className="text-[#D2D2D2] flex flex-col gap-[20px] mb-[48px]">
        <input
          className="w-full px-4 rounded-[5px] h-[50px] bg-[#474747]"
          type="text"
          placeholder="Full Name"
        />
        <input
          className="w-full px-4 rounded-[5px] h-[50px] bg-[#474747]"
          type="email"
          placeholder="Email"
        />
        <input
          className="w-full px-4 rounded-[5px] h-[50px] bg-[#474747]"
          type="password"
          placeholder="Password"
        />
      </div>
      <button className="w-full text-[18px] rounded-[5px] h-[50px] bg-[#F74D4D]">
        Register
      </button>
    </div>
  );
}
