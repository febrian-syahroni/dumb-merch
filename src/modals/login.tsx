import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../validations/user";
import { useForm } from "react-hook-form";
import { LoginData } from "../types/user";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <div className="absolute scale-[85%] right-0 top-[-30px] px-[33px] pt-[30px] rounded-[10px] w-[416px] h-[366px] bg-[#181818]">
      <h1 className="text-[36px] font-bold mb-[30px]">Login</h1>
      <div className="text-[#D2D2D2] flex flex-col gap-[20px] mb-[48px]">
        <input
          className="w-full px-4 rounded-[5px] h-[50px] bg-[#474747]"
          type="text"
          placeholder="Email"
        />
        <input
          className="w-full px-4 rounded-[5px] h-[50px] bg-[#474747]"
          type="text"
          placeholder="Password"
        />
      </div>
      <button className="w-full text-[18px] rounded-[5px] h-[50px] bg-[#F74D4D]">
        Login
      </button>
    </div>
  );
}
