"use client";

import { FC, useEffect, useMemo, useState } from "react";

import { toast } from "react-toastify";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import { useResendOTPMutation } from "@/redux/features/auth/authApi";

interface OTPPageProps {
  targetDate?: Date;
  email: string;
}

type ITimeLeft = { minutes: string; seconds: string };

export const OTPExpire: FC<OTPPageProps> = ({ email, targetDate }) => {
  const [expireDate, setExpireDate] = useState<Date>();
  const [timeLeft, setTimeLeft] = useState<ITimeLeft>();
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [resendOTP, { isLoading }] = useResendOTPMutation();

  useEffect(() => {
    if (targetDate) setExpireDate(new Date(targetDate));
  }, [targetDate]);

  const calculateTimeLeft = useMemo(() => {
    return () => {
      if (expireDate) {
        const difference = +new Date(expireDate) - +new Date();

        if (difference > 0) {
          const minutes = Math.floor((difference / 1000 / 60) % 60);
          const seconds = Math.floor((difference / 1000) % 60);

          return {
            minutes: minutes < 10 ? `0${minutes}` : `${minutes}`,
            seconds: seconds < 10 ? `0${seconds}` : `${seconds}`,
          };
        }
      }

      return undefined;
    };
  }, [expireDate, timeLeft]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const updatedTimeLeft = calculateTimeLeft();

      setTimeLeft(updatedTimeLeft);
      if (!updatedTimeLeft) {
        setIsResendDisabled(false);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [calculateTimeLeft]);

  const handleResendOTP = async () => {
    await resendOTP({ email })
      .unwrap()
      .then((res) => {
        toast.success(
          res?.message || "Resend Verification OTP in your Email! 📩"
        );

        if (res.data?.expires) {
          setExpireDate(res.data.expires);
          setIsResendDisabled(true);
        }
      })
      .catch((res) => {
        toast.error(res?.message || "Error sending Verification Email");
      });
  };

  return (
    <div className="flex items-center justify-start gap-2.5 pt-4">
      <h3>Didn&apos;t get the email?</h3>
      <button
        className={cn(
          "text-primary/90 transition-all delay-150 hover:text-primary",
          isResendDisabled &&
            "cursor-wait text-muted-foreground hover:text-muted-foreground"
        )}
        disabled={isResendDisabled}
        onClick={() => handleResendOTP()}
      >
        {isResendDisabled ? "Wait to resend OTP" : "Resend OTP"}
      </button>
      {isLoading && <Loader className="animate-spin text-primary" />}
      {timeLeft && (
        <span className="font-sans text-primary font-medium">
          {timeLeft?.minutes}:{timeLeft?.seconds}
        </span>
      )}
    </div>
  );
};
