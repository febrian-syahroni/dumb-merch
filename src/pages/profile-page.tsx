import { useState, useEffect } from "react";
import photo from "@/assets/febrian.jpg";
import ItemTransaction from "../modals/item-transaction";
import api from "@/axios";

interface IUser {
  id: number;
  fullname: string;
  email: string;
  phone: string;
  address: string;
  image?: string;
  gender?: {
    id: number;
    name: string;
  };
}

export default function ProfilePage() {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getProfile = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await api.get<IUser>("/user/profile");
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching profile:", error);
      setError("Failed to load profile. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  if (isLoading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-center py-4 text-red-500">{error}</div>;
  if (!user) return <div className="text-center py-4">No profile data found</div>;

  return (
    <div>
      {/* Profile */}
      <div className="flex w-full gap-[25px] justify-between">
        <div className="flex flex-col gap-[25px]">
          <h1 className="font-bold text-[24px] text-[#F74D4D]">My Profile</h1>
          <div className="flex gap-[25px]">
            <img
              className="rounded-md w-[256px] h-[355px] object-cover object-center"
              src={user?.image || photo}
              alt="img"
            />
            <div className="flex flex-col w-[355px] gap-[10px] text-[13px] justify-between">
              <div className="flex flex-col">
                <h1 className="text-[15px] text-[#F74D4D]">Name</h1>
                <h1>{user?.fullname}</h1>
              </div>
              <div className="flex flex-col">
                <h1 className="text-[15px] text-[#F74D4D]">Email</h1>
                <h1>{user?.email}</h1>
              </div>
              <div className="flex flex-col">
                <h1 className="text-[15px] text-[#F74D4D]">Phone</h1>
                <h1>{user?.phone}</h1>
              </div>
              <div className="flex flex-col">
                <h1 className="text-[15px] text-[#F74D4D]">Gender</h1>
                <h1>{user?.gender?.name}</h1>
              </div>
              <div className="flex flex-col">
                <h1 className="text-[15px] text-[#F74D4D]">Address</h1>
                <h1>{user?.address}</h1>
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
