import Landing from "../components/landing";
import Login from "../modals/login";

export default function LoginPage() {
  return (
    <div className="relative flex justify-between p-[140px] bg-[#0B0B0B] text-white w-full h-screen">
      <div className="relative flex w-full h-full">
        <Landing />
        <Login />
      </div>
    </div>
  );
}
