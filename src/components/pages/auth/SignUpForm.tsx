"use client";

import { Button } from "@/components/ui/button";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  selectCurrentUser,
  setUser,
  useCurrentToken,
} from "@/redux/features/auth/authSlice";
import { useEffect } from "react";
import { Form } from "@/components/ui/form";
import AppFormInput from "@/components/ui/AppFormInput";
import { Checkbox } from "@/components/ui/checkbox";

export const formSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
});

const SignUpForm = ({}: { from: string }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const router = useRouter();
  const dispatch = useAppDispatch();
  const token = useAppSelector(useCurrentToken);
  const user = useAppSelector(selectCurrentUser);

  const [registerUser] = useRegisterMutation();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await registerUser(values)
      .unwrap()
      .then((res) => {
        toast.success(res?.message || "Successfully registered.");

        dispatch(setUser({ user: res.data }));

        if (res?.data?.emailVerified) {
          router.push("/");
        } else {
          router.push(`/auth/verify-user?email=${res?.data?.email}`);
        }
      })
      .catch((res) => {
        toast.error(res?.data?.message || "something went wrong");
      });
  };

  useEffect(() => {
    if (token) {
      router.push("/");
      return;
    } else if (user && !user?.emailVerified) {
      router.push(`/auth/verify-user?email=${user?.email}`);
      toast.info("Verify your email and try again.", { toastId: 1 });
      return;
    }
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <AppFormInput
          name="name"
          label="Name"
          type="text"
          placeholder="john Doe"
          formControl={form.control}
        />

        <AppFormInput
          name="email"
          type="email"
          placeholder="m@example.com"
          label="Email"
          formControl={form.control}
        />

        <AppFormInput
          name="password"
          label="Password"
          type="password"
          placeholder="********"
          formControl={form.control}
        />

        <div className="flex items-center space-x-2">
          <Checkbox id="terms" />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Accept terms and conditions
          </label>
        </div>

        <Button type="submit" className="w-full">
          Create an account
        </Button>
        <Button variant="outline" className="w-full">
          Sign up with GitHub
        </Button>
      </form>
    </Form>
  );
};

export default SignUpForm;
