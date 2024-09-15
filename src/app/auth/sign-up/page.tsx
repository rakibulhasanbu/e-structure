import Link from "next/link";

import AuthWrapper from "@/components/pages/auth/AuthWrapper";
import SignUpForm from "@/components/pages/auth/SignUpForm";
import signUpSvg from "@/assets/svg/sign-up.svg";

const page = ({ searchParams }: { searchParams: { from: string } }) => {
  return (
    <AuthWrapper
      imageUrl={signUpSvg}
      label="Sign Up"
      des="Enter your information to create an account"
    >
      <SignUpForm from={searchParams.from} />
      <div className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <Link href="/auth/sign-in" className="underline">
          Sign in
        </Link>
      </div>
    </AuthWrapper>
  );
};

export default page;
