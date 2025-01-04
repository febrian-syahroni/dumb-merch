import dumbMerch from "@/src/assets/dumb-merch.svg";
import motto from "@/src/assets/easy-fast-reliable.svg";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="absolute scale-[85%] left-[-60px] inset-y-0 flex flex-col justify-center">
      <div>
        <div className="mb-[35px]">
          <img width={264} height={264} src={dumbMerch} />
        </div>
      </div>
      <div className="flex flex-col mb-[84px]">
        <img
          width={619}
          height={76}
          src={motto}
          alt="Easy, Fast and Reliable"
        />
        <p className="text-[#6A6A6A] text-[18px] w-[60%]">
          Go shopping for merchandise, just go to dumb merch shopping the
          biggest merchandise in Indonesia
        </p>
      </div>
      <div className="flex font-semibold">
        <Link to="/login">
          <button className="bg-[#F74D4D] rounded-[5px] w-[135px] h-[40px]">
            Login
          </button>
        </Link>
        <Link to="/register">
          <button className="bg-transparent text-[#B7B7B7] rounded-[5px] w-[135px] h-[40px]">
            Register
          </button>
        </Link>
      </div>
    </div>
  );
}
