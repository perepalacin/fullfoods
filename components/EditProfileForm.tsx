"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Loader2Icon, RocketIcon } from "lucide-react";
import { Separator } from "./ui/separator";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const editProfileFormSchema = z.object({
  username: z
    .string({
      required_error: "Please specify your username",
    })
    .min(4, {
      message: "Your username should at least have 4 characters",
    })
    .max(16, {
      message: "Your username should not exceed 16 characters",
    }),
  bio: z.string().max(250, {
    message: "Your bio should not exceed 250 characters.",
  }),
});

interface EditProfileFormProps {
  originalUsername: string | null;
  originalBio: string | null;
  user_id: string;
}

const EditProfileForm = (params: EditProfileFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();


  const profileForm = useForm<z.infer<typeof editProfileFormSchema>>({
    resolver: zodResolver(editProfileFormSchema),
    defaultValues: {
      username: params.originalUsername || undefined,
      bio: params.originalBio || undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof editProfileFormSchema>) => {
    setIsLoading(true);
    console.log(values);
    if (params.originalBio === values.bio && params.originalUsername === values.username) {
      toast.error("You already have this username and bio", {id: "submitWithoutChanges"})
      setIsLoading(false);
      return null;
    }
    //TODO: Check if the username already exists?
    try {
      if (params.originalUsername) {
        await axios.patch(`/api/profile/${params.user_id}`, values);
      } else {
        await axios.post(`/api/profile/${params.user_id}`, values);
      }

      toast.success("Profile updated succesfully", {id: "profileUpadte"});

    } catch (error) {
      toast.error("Something went wrong, please try again later", {id: "profileUpdateError"});
      setIsLoading(false);  
    }
    setIsLoading(false);
    router.refresh();

  };

  return (
    <div className="w-1/2">
      <Form {...profileForm}>
        <form
          onSubmit={profileForm.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 px-2 md:px-0 items-center"
        >
          <FormField
            name="username"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center w-full">
                <div className="flex flex-row gap-2 w-full items-center">
                  <p className="w-44 text-xl font-semibold">Username:</p>
                  <FormControl>
                    <Input
                      autoFocus={true}
                      placeholder="username"
                      className="w-full text-lg"
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage className="text-[red]" />
              </FormItem>
            )}
          />
          <Separator/>
          <FormField
            name="bio"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center w-full">
                <div className="flex flex-row gap-2 w-full items-start">
                  <p className="w-44 text-xl font-semibold">Bio:</p>
                  <FormControl>
                    <Textarea
                      autoFocus={true}
                      placeholder="Welcome to my profile, here you will be able to find many recipes focused on having a fit and balanced lifestyle"
                      className="w-full text-lg"
                      rows={6}
                      maxLength={250}
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage className="text-[red]" />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={isLoading}
            className="flex flex-row gap-2 w-44"
            variant="mainbutton"
          >
            {isLoading ? (
              <Loader2Icon className="animate-spin w-4 h-4" />
            ) : (
              <RocketIcon className="w-4 h-4" />
            )}
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EditProfileForm;
