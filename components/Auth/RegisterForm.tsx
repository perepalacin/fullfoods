"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Loader2Icon } from "lucide-react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTransition } from "react";
import { redirect, useRouter } from "next/navigation";
import { signUpWithEmailAndPassword } from "@/actions/auth/actions";

const FormSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6, {
      message: "Password is required.",
    }),
    confirm: z.string().min(8, {
      message: "Password is required.",
    }),
  })
  .refine((data) => data.confirm === data.password, {
    message: "Password did not match",
    path: ["confirm"],
  });
export default function RegisterForm() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirm: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    startTransition(async () => {
      const result = await signUpWithEmailAndPassword(data);
      const { error } = JSON.parse(result);

      if (error?.message) {
        toast.error(error.message, { id: "failedRegister" });
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="example@gmail.com"
                  {...field}
                  type="email"
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="password"
                  {...field}
                  type="password"
                  onChange={field.onChange}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Confirm Password"
                  {...field}
                  type="password"
                  onChange={field.onChange}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full flex gap-2">
          Register
          <Loader2Icon className={cn("animate-spin", { hidden: !isPending })} />
        </Button>
      </form>
    </Form>
  );
}
