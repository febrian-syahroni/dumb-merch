import React, { useState } from "react";
import { loginUser } from "../store/slices/login";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { ImSpinner3 } from "react-icons/im";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { loading, error } = useAppSelector((state) => state.login);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Email dan password harus diisi.");
      return;
    }

    const result = await dispatch(loginUser({ email, password }));

    if (loginUser.fulfilled.match(result)) {
      const { roleId } = result.payload;

      // Redirect berdasarkan role
      if (roleId === 1) navigate("/admin/product");
      else if (roleId === 2) navigate("/");
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="scale-[85%] px-[33px] pt-[30px] rounded-[10px] w-[416px] h-[366px] bg-[#181818]">
      <h1 className="text-[36px] font-bold mb-[30px]">Login</h1>
      <div className="text-[#D2D2D2] flex flex-col gap-[20px] mb-[48px]">
        <input
          className="w-full px-4 rounded-[5px] h-[50px] bg-[#474747]"
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full px-4 rounded-[5px] h-[50px] bg-[#474747]"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className={`flex justify-center items-center text-center w-full text-[18px] rounded-[5px] h-[50px] ${
          loading ? "bg-red-300" : "bg-[#F74D4D]"
        }`}>
        <p className={loading ? "animate-spin" : ""}>
          {loading ? <ImSpinner3 /> : "Login"}
        </p>
      </button>
      {error && (
        <p className="text-red-500">
          {error === "Access denied"
            ? "Akses ditolak. Silakan hubungi admin."
            : "Login gagal. Silakan coba lagi."}
        </p>
      )}
    </form>
  );
}
