import logo from "@/src/assets/logo.svg";
import photo from "@/src/assets/febrian.jpg";
import ItemTransaction from "../modals/item-transaction";

export default function ProfilePage() {
  return (
    <div className="relative flex justify-between items-center px-[80px] bg-[#0B0B0B] text-white w-full h-screen">
      {/* Header */}
      <div className="absolute flex justify-between px-[50px] py-[20px] left-0 top-0 w-full">
        <img width={50} src={logo} alt="logo" />
        <div className="flex text-[15px] font-bold items-center gap-[23px]">
          <p>Complain</p>
          <p className="text-[#F74D4D]">Profile</p>
          <p>Logout</p>
        </div>
      </div>

      {/* Profile */}
      <div className="flex w-full justify-between">
        <div className="flex flex-col gap-[25px]">
          <h1 className="font-bold text-[24px] text-[#F74D4D]">My Profile</h1>
          <div className="flex gap-[25px]">
            <img
              className="rounded-md w-[256px] h-[355px] object-cover object-center"
              src={photo}
              alt="img"
            />
            <div className="flex flex-col w-[355px] text-[13px] justify-between">
              <div className="flex flex-col">
                <h1 className="text-[15px] text-[#F74D4D]">Name</h1>
                <h1>Febrian Syahroni</h1>
              </div>
              <div className="flex flex-col">
                <h1 className="text-[15px] text-[#F74D4D]">Email</h1>
                <h1>febrian@mail.com</h1>
              </div>
              <div className="flex flex-col">
                <h1 className="text-[15px] text-[#F74D4D]">Phone</h1>
                <h1>0812345678</h1>
              </div>
              <div className="flex flex-col">
                <h1 className="text-[15px] text-[#F74D4D]">Gender</h1>
                <h1>Febrian Syahroni</h1>
              </div>
              <div className="flex flex-col">
                <h1 className="text-[15px] text-[#F74D4D]">Address</h1>
                <h1>
                  Lorem ipsum odor amet, consectetuer adipiscing elit. Rutrum
                  enim tellus litora montes sodales donec sodales. Posuere
                  vivamus enim consequat mauris sem. Sapien efficitur pharetra
                  hac, tempor curabitur finibus porta urna.
                </h1>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-[25px]">
          <h1 className="font-bold text-[24px] text-[#F74D4D]">
            My Transaction
          </h1>

          <div className="flex flex-col overflow-y-auto scrollbar h-[355px] gap-[15px]">
            {/* Transactions */}
            <ItemTransaction />
            <ItemTransaction />
            <ItemTransaction />
            <ItemTransaction />
            <ItemTransaction />
            <ItemTransaction />
            <ItemTransaction />
            <ItemTransaction />
          </div>
        </div>
      </div>
    </div>
  );
}
