import Link from "next/link";

import AuthWrapper from "@/components/pages/auth/AuthWrapper";
import SignInForm from "@/components/pages/auth/SignInForm";
import signInSvg from "@/assets/svg/sign-in.svg";

const page = ({ searchParams }: { searchParams: { from: string } }) => {
  return (
    <AuthWrapper
      label="Login"
      des="Enter your email below to login to your account"
      imageUrl={signInSvg}
    >
      <SignInForm from={searchParams.from} />
      <div className="mt-4 text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/auth/sign-up" className="underline">
          Sign up
        </Link>
      </div>
    </AuthWrapper>
  );
};

export default page;
