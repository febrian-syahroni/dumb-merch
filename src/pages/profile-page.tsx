import photo from "@/assets/febrian.jpg";
import ItemTransaction from "../modals/item-transaction";

export default function ProfilePage() {
  return (
    <div>

      {/* Profile */}
      <div className="flex w-full gap-[25px] justify-between">
        <div className="flex flex-col gap-[25px]">
          <h1 className="font-bold text-[24px] text-[#F74D4D]">My Profile</h1>
          <div className="flex gap-[25px]">
            <img
              className="rounded-md w-[256px] h-[355px] object-cover object-center"
              src={photo}
              alt="img"
            />
            <div className="flex flex-col w-[355px] gap-[10px] text-[13px] justify-between">
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

          <div className="flex flex-col overflow-y-auto hide-scrollbar h-[355px] gap-[15px]">
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
