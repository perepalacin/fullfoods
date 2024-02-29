//TODO: FIX this, the api call is not working + bug fix any issue that may appear


"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Loader2Icon, RocketIcon } from "lucide-react";

interface EditPFPProps {
  originalPicture: string | null;
  user_id: string;
}

//TODO: Test this component without an originalPicture
const EditProfilePicture = (params: EditPFPProps) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  if (!params.user_id) {
    router.push("/");
  }

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    if (params.originalPicture === selectedImage) {
      toast.error("You already have this profile picture", {
        id: "submitWithoutChanges",
      });
      setIsLoading(false);
      return null;
    }

    if (params.originalPicture) {
      let index = params.originalPicture.indexOf("profile_pictures");
      var result = params.originalPicture.substring(index + "profile_pictures".length +1);
      result = "/" + result;
      const formData = new FormData();
      if (selectedImage !== null) {
        formData.append('image', selectedImage);
      } else {
        toast.error("The picture selected is currently not supported.", {
          id: "missingPictureBeforeAPICall",
        });
        setIsLoading(false);
        return null;
      }
      formData.append('path', result);
      try {
          await axios.patch(
            `/api/profilepicture/${params.user_id}}`, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
              data: formData, // Use the data option to specify the request body
            });
        toast.success("Profile picture updated succesfully", {
          id: "profileUpadte",
        });
      } catch (error) {
        toast.error("Something went wrong, please try again later", {
          id: "profileUpdateError",
        });
        setIsLoading(false);
      }
      setIsLoading(false);
      setSelectedImage(null);
      setImageUrl(null);
      router.refresh();
    }
    //TODO: Check if the username already exists?
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {params.originalPicture && !selectedImage ? (
        <div className="max-w-[70px] h-[70px] md:max-w-[200px] md:h-[200px] overflow-clip rounded-full">
          <Image
            src={params.originalPicture}
            alt="User's profile picture"
            width={300}
            height={300}
            className="object-cover h-[80px] md:h-[200px]"
          />
        </div>
      ) : (
        <></>
      )}
      {params.originalPicture && selectedImage && imageUrl ? (
        <div className="max-w-[70px] h-[70px] md:max-w-[200px] md:h-[200px] overflow-clip rounded-full">
          <Image
            src={imageUrl}
            alt="User's profile picture"
            width={300}
            height={300}
            className="object-cover h-[80px] md:h-[200px]"
          />
        </div>
      ) : (
        <></>
      )}
      {params.originalPicture ? (
        <Button variant={"secondary"} className="relative" disabled={isLoading}>
          Change Picture
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            disabled={isLoading}
            className="absolute w-full h-full opacity-0"
          />
        </Button>
      ) : (
        <Button disabled={isLoading}>Add a picture</Button>
      )}
      {selectedImage && imageUrl ? (
        <Button variant={"mainbutton"} onClick={handleSubmit} disabled={isLoading}>
          Save changes
          {isLoading ? 
          <Loader2Icon className="animate-spin w-4 h-4 ml-2" />
          :
          <></>
          }
        </Button>
      ) : (
        <></>
      )}
    </div>
  );
};

export default EditProfilePicture;
