"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import InputField from "@/components/Forms/inputField";
import FooterLink from "@/components/Forms/FooterLink";
import { Button } from "@/components/ui/button";
import { requestPasswordResetOtp } from "@/lib/actions/password.actions";

const ForgotPasswordPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    defaultValues: { email: "" },
    mode: "onBlur",
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    const response = await requestPasswordResetOtp(data);

    if (!response.success) {
      toast.error(response.error || "Unable to send OTP");
      return;
    }

    toast.success("We sent an OTP to your inbox");
    router.push(`/forgot-password/verify?email=${encodeURIComponent(data.email)}`);
  };

  return (
    <>
      <h1 className="form-title">Forgot password</h1>
      <p className="mb-6 text-sm text-neutral-400">
        Enter the email address connected to your Trade Connect account. We&apos;ll email you a
        one-time password that expires in 2 minutes.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <InputField
          name="email"
          label="Email"
          placeholder="Enter your account email"
          register={register}
          error={errors.email}
          validation={{
            required: "Email is required",
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Invalid email address",
          }}
        />
        <Button type="submit" disabled={isSubmitting} className="yellow-btn w-full mt-5">
          {isSubmitting ? "Sending OTP..." : "Send reset OTP"}
        </Button>
        <FooterLink text="Remembered your password?" linkText="Return to login" href="/sign-in" />
      </form>
    </>
  );
};

export default ForgotPasswordPage;


