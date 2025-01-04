import Landing from "../components/landing";
import Register from "../modals/register";

export default function RegisterPage() {
  return (
    <div className="relative flex justify-between p-[140px] bg-[#0B0B0B] text-white w-full h-screen">
      <div className="relative flex w-full h-full">
        <Landing />
        <Register />
      </div>
    </div>
  );
}
