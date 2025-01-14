import Landing from "../components/landing";
import Login from "../modals/login";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center px-[90px] py-[140px] bg-[#0B0B0B] text-white w-full h-screen">
        <Landing />
        <Login />
    </div>
  );
}
