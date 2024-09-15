"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import GoogleIcon from "./GoogleIcon";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { toast } from "react-toastify";
import { verifyToken } from "@/lib/verifyToken";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  selectCurrentUser,
  setUser,
  useCurrentToken,
} from "@/redux/features/auth/authSlice";
import { useEffect } from "react";
import AppFormInput from "@/components/ui/AppFormInput";

export const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const SignInForm = ({ from }: { from: string }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();
  const token = useAppSelector(useCurrentToken);
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();

  const [loginUser] = useLoginMutation();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await loginUser(values)
      .unwrap()
      .then((res) => {
        const user = verifyToken(res?.data);
        toast.success(res?.message || "Log in successful ✅.");

        dispatch(setUser({ user, accessToken: res.data }));

        if (res?.data?.emailVerified) {
          router.push(from || "/");
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

        <div className="flex items-center">
          <p></p>
          <Link href="#" className="ml-auto inline-block text-sm underline">
            Forgot your password?
          </Link>
        </div>

        <Button type="submit" className="w-full">
          Login
        </Button>
        <Button variant="outline" className="w-full">
          <GoogleIcon /> Login with Google
        </Button>
      </form>
    </Form>
  );
};

export default SignInForm;
