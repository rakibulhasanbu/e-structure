import AuthWrapper from "@/components/pages/auth/AuthWrapper";
import OTPForm from "@/components/pages/auth/OTPForm";
import { OTPExpire } from "@/components/pages/auth/re-send-timer";
import { ISearchParams } from "@/types";
import verifyOtpSvg from "@/assets/svg/otp.svg";

const page = ({ searchParams }: ISearchParams) => {
  const targetDate = new Date(Date.now() + 2 * 60 * 1000);

  return (
    <AuthWrapper
      label="Verify User"
      des="Please enter the 6-digit OTP sent to your registered email."
      imageUrl={verifyOtpSvg}
    >
      <OTPForm />
      <OTPExpire email={searchParams.email} targetDate={targetDate} />
    </AuthWrapper>
  );
};

export default page;
