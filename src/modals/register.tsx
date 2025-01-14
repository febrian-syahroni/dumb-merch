import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../store/slices/register";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { loading, error } = useAppSelector((state) => state.register);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const result = await dispatch(
      registerUser({ name, email, password })
    );

    if (registerUser.fulfilled.match(result)) {
      navigate("/login"); // Redirect ke halaman login setelah berhasil daftar
    }
  };

  return (
    <form onSubmit={handleRegister} className="absolute scale-[85%] right-0 top-[-40px] px-[33px] pt-[30px] rounded-[10px] w-[416px] h-[500px] bg-[#181818]">
      <h1 className="text-[36px] font-bold mb-[30px]">Register</h1>
      <div className="relative text-[#D2D2D2] flex flex-col gap-[20px] mb-[48px]">
        <input
          className="w-full px-4 rounded-[5px] h-[50px] bg-[#474747]"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
        />
        <input
          className="w-full px-4 rounded-[5px] h-[50px] bg-[#474747]"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          className="w-full px-4 rounded-[5px] h-[50px] bg-[#474747]"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <input
          className="w-full px-4 rounded-[5px] h-[50px] bg-[#474747]"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
        />
      </div>
      <button type="submit" disabled={loading} className={`w-full text-[18px] rounded-[5px] h-[50px] ${loading ? "bg-red-300" : "bg-[#F74D4D]"}`}>
        {loading ? "Registering..." : "Register"}
      </button>
      {error && <p className="text-red-500 text-center">{error}</p>}
    </form>
  );
}
