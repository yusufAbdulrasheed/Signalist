"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import FooterLink from "@/components/Forms/FooterLink";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  requestPasswordResetOtp,
  resetPasswordWithOtp,
  verifyPasswordResetOtp,
} from "@/lib/actions/password.actions";

const VerifyResetPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email") ?? "";

  const [step, setStep] = useState<"otp" | "reset">("otp");
  const [resetSessionToken, setResetSessionToken] = useState<string | null>(null);
  const [isResending, setIsResending] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<{ otp: string }>({
    defaultValues: { otp: "" },
    mode: "onBlur",
  });

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    watch,
    formState: { errors: passwordErrors, isSubmitting: isSubmittingPassword },
  } = useForm<ResetPasswordFormInputs>({
    defaultValues: { newPassword: "", confirmPassword: "" },
    mode: "onBlur",
  });

  const confirmPassword = watch("confirmPassword");
  const newPassword = watch("newPassword");

  const onOtpSubmit = async ({ otp }: { otp: string }) => {
    if (!email) {
      toast.error("Missing account email. Start over.");
      router.push("/forgot-password");
      return;
    }

    const { success, data, error } = await verifyPasswordResetOtp({ email, otp });

    if (!success || !data) {
      toast.error(error || "Invalid OTP");
      return;
    }

    setResetSessionToken(data.resetSessionToken);
    setStep("reset");
    toast.success("OTP verified. Set a new password.");
  };

  const onPasswordSubmit = async (values: ResetPasswordFormInputs) => {
    if (!resetSessionToken) {
      toast.error("OTP session expired. Request a new code.");
      setStep("otp");
      return;
    }

    if (values.newPassword !== values.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    const response = await resetPasswordWithOtp({
      resetSessionToken,
      newPassword: values.newPassword,
    });

    if (!response.success) {
      toast.error(response.error || "Unable to update password");
      return;
    }

    toast.success("Password updated. You can log in now.");
    router.push("/sign-in");
  };

  const handleResend = async () => {
    if (!email) {
      toast.error("Missing account email. Start over.");
      router.push("/forgot-password");
      return;
    }

    setIsResending(true);
    try {
      const response = await requestPasswordResetOtp({ email });

      if (!response.success) {
        toast.error(response.error || "Unable to resend OTP right now.");
        return;
      }

      toast.success("A new OTP was sent to your email.");
    } finally {
      setIsResending(false);
    }
  };

  const disableResetButton = useMemo(() => {
    return !newPassword || newPassword !== confirmPassword;
  }, [newPassword, confirmPassword]);

  if (!email) {
    return (
      <div className="space-y-4">
        <h1 className="form-title">Verify OTP</h1>
        <p className="text-sm text-neutral-400">
          We couldn&apos;t detect your email address. Please restart the process.
        </p>
        <Button onClick={() => router.push("/forgot-password")} className="yellow-btn w-full">
          Restart reset flow
        </Button>
      </div>
    );
  }

  return (
    <>
      <h1 className="form-title">
        {step === "otp" ? "Enter OTP" : "Choose a new password"}
      </h1>
      {step === "otp" ? (
        <form onSubmit={handleSubmit(onOtpSubmit)} className="space-y-5">
          <p className="text-sm text-neutral-400">
            We sent a 6-digit code to <span className="font-semibold text-white">{email}</span>. Enter it
            below within 2 minutes.
          </p>
          <div className="space-y-2">
            <label htmlFor="otp" className="form-label">
              One-time password
            </label>
            <Input
              id="otp"
              inputMode="numeric"
              maxLength={6}
              className="text-center text-2xl tracking-[0.5rem]"
              {...register("otp", {
                required: "OTP is required",
                minLength: { value: 6, message: "OTP must be 6 digits" },
                maxLength: { value: 6, message: "OTP must be 6 digits" },
                pattern: { value: /^[0-9]{6}$/, message: "OTP must be numeric" },
              })}
            />
            {errors.otp && <p className="text-sm text-red-500">{errors.otp.message}</p>}
          </div>
          <div className="flex items-center justify-between text-sm text-neutral-400">
            <span>Didn&apos;t receive it?</span>
            <button
              type="button"
              onClick={handleResend}
              disabled={isResending}
              className="text-yellow-300 hover:underline disabled:opacity-50"
            >
              {isResending ? "Resending..." : "Resend code"}
            </button>
          </div>
          <Button type="submit" disabled={isSubmitting} className="yellow-btn w-full">
            {isSubmitting ? "Verifying..." : "Verify OTP"}
          </Button>
          <FooterLink text="Entered the wrong email?" linkText="Start over" href="/forgot-password" />
        </form>
      ) : (
        <form onSubmit={handlePasswordSubmit(onPasswordSubmit)} className="space-y-5">
          <p className="text-sm text-neutral-400">
            OTP verified for <span className="font-semibold text-white">{email}</span>. Create a strong
            password to secure your account.
          </p>
          <div className="space-y-2">
            <label htmlFor="newPassword" className="form-label">
              New password
            </label>
            <Input
              id="newPassword"
              type="password"
              placeholder="Enter a new password"
              {...registerPassword("newPassword", {
                required: "Password is required",
                minLength: { value: 8, message: "At least 8 characters" },
              })}
            />
            {passwordErrors.newPassword && (
              <p className="text-sm text-red-500">{passwordErrors.newPassword.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm password
            </label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Re-enter your password"
              {...registerPassword("confirmPassword", {
                required: "Please confirm your password",
              })}
            />
            {passwordErrors.confirmPassword && (
              <p className="text-sm text-red-500">{passwordErrors.confirmPassword.message}</p>
            )}
          </div>
          <Button
            type="submit"
            disabled={isSubmittingPassword || disableResetButton}
            className="yellow-btn w-full"
          >
            {isSubmittingPassword ? "Updating..." : "Update password"}
          </Button>
          <FooterLink text="All set?" linkText="Return to login" href="/sign-in" />
        </form>
      )}
    </>
  );
};

export default VerifyResetPage;


