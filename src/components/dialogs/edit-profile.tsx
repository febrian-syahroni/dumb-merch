import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import api from "@/axios";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { Image } from "lucide-react";

interface ProfileFormData {
  fullname: string;
  phone: string;
  address: string;
  genderId: string;
  image?: FileList;
}

export function EditProfile({ onSuccess }: { onSuccess?: () => void }) {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset, formState: { errors }, watch } = useForm<ProfileFormData>();
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const selectedImage = watch("image");

  useEffect(() => {
    if (selectedImage?.[0]) {
      const file = selectedImage[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [selectedImage]);

  const loadProfile = async () => {
    try {
      const response = await api.get("/user/profile");
      const profile = response.data;
      reset({
        fullname: profile.fullname,
        phone: profile.phone,
        address: profile.address,
        genderId: profile.gender?.id.toString() || "1"
      });
      setPreviewImage(null);
    } catch (error) {
      console.error("Error loading profile:", error);
      toast({
        title: "Failed to load profile data",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (open) {
      loadProfile();
    }
  }, [open]);

  const onSubmit = async (data: ProfileFormData) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("fullname", data.fullname);
      formData.append("phone", data.phone);
      formData.append("address", data.address);
      formData.append("genderId", data.genderId);

      if (data.image?.[0]) {
        formData.append("image", data.image[0]);
      }

      await api.put("/user/update", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast({
        title: "Profile updated successfully",
      });
      setOpen(false);
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Failed to update profile",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-[5px] h-full bg-[#56C05A] hover:bg-[#3D3D3D]">
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-500 text-white sm:max-w-[425px] pb-[50px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="hide-scrollbar flex flex-col overflow-y-auto h-[500px] grid gap-4 py-4"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="image" className="font-semibold">
              Profile Image
            </label>
            <div className="relative">
              <input
                id="image"
                type="file"
                accept="image/*"
                {...register("image")}
                className="hidden"
              />
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-gray-400 transition-colors"
                onClick={() => document.getElementById("image")?.click()}
              >
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="mx-auto max-h-40 object-contain"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <Image className="w-8 h-8" />
                    <span>Click to upload image</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="fullname" className="font-semibold">
              Full Name
            </label>
            <input
              id="fullname"
              type="text"
              {...register("fullname", { required: "Full name is required" })}
              className="border bg-transparent border-gray-300 p-2 rounded"
            />
            {errors.fullname && (
              <span className="text-red-400 text-sm">{errors.fullname.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="phone" className="font-semibold">
              Phone
            </label>
            <input
              id="phone"
              type="text"
              {...register("phone", { required: "Phone number is required" })}
              className="border bg-transparent border-gray-300 p-2 rounded"
            />
            {errors.phone && (
              <span className="text-red-400 text-sm">{errors.phone.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="address" className="font-semibold">
              Address
            </label>
            <textarea
              id="address"
              {...register("address", { required: "Address is required" })}
              className="border min-h-[100px] bg-transparent border-gray-300 p-2 rounded"
              rows={3}
            />
            {errors.address && (
              <span className="text-red-400 text-sm">{errors.address.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="gender" className="font-semibold">
              Gender
            </label>
            <select
              id="gender"
              {...register("genderId", { required: "Gender is required" })}
              className="border bg-transparent border-gray-300 p-2 rounded"
            >
              <option className="bg-[#3D3D3D]" value="1">Male</option>
              <option className="bg-[#3D3D3D]" value="2">Female</option>
            </select>
            {errors.genderId && (
              <span className="text-red-400 text-sm">{errors.genderId.message}</span>
            )}
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="bg-[#56C05A] hover:bg-[#3D3D3D] mt-4"
          >
            {isLoading ? "Updating..." : "Update Profile"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
