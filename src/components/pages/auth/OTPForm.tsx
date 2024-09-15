"use client";

import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useVerifyUserMutation } from "@/redux/features/auth/authApi";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setUser, useCurrentToken } from "@/redux/features/auth/authSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { InputOTP, InputOTPSlot } from "@/components/ui/input-otp";

export const formSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

const OTPForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pin: "",
    },
  });

  const router = useRouter();
  const dispatch = useAppDispatch();
  const [verifyUser] = useVerifyUserMutation();
  const token = useAppSelector(useCurrentToken);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);

    await verifyUser({ token: values.pin })
      .unwrap()
      .then((res) => {
        toast.success(res?.message || "Successfully registered.");

        dispatch(setUser({ user: null }));

        router.push("/auth/sign-in");
      })
      .catch((res) => {
        toast.error(res?.data?.message || "something went wrong");
      });
  };

  useEffect(() => {
    if (token) {
      console.log("🚀 ~ useEffect ~ token:", token);
      router.push("/");
      toast.info("You are already logged in.", { toastId: 1 });
      return;
    }
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <FormField
          control={form.control}
          name="pin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>OTP Password</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <div
                    className="flex items-center
                  justify-between gap-5"
                  >
                    <InputOTPSlot className="size-12" index={0} />
                    <InputOTPSlot className="size-12" index={1} />
                    <InputOTPSlot className="size-12" index={2} />
                    <InputOTPSlot className="size-12" index={3} />
                    <InputOTPSlot className="size-12" index={4} />
                    <InputOTPSlot className="size-12" index={5} />
                  </div>
                </InputOTP>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default OTPForm;
