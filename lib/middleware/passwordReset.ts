import { verifyOtpAndIssueSession } from "@/lib/password-reset/service";

export const enforceValidOtp = async (email: string, otp: string) => {
  if (!email || !otp) {
    throw new Error("Email and OTP are required");
  }

  return verifyOtpAndIssueSession({ email, otp });
};


