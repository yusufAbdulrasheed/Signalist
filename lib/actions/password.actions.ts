"use server";

import { auth } from "@/lib/better-auth/auth";
import { enforceValidOtp } from "@/lib/middleware/passwordReset";
import { consumeResetSession } from "@/lib/password-reset/service";

export const requestPasswordResetOtp = async ({
  email,
}: ForgotPasswordFormData) => {
  if (!email) {
    return { success: false, error: "Email is required" };
  }

  try {
    await auth.api.requestPasswordReset({
      body: {
        email,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Password reset request failed", error);
    return { success: false, error: "Unable to send OTP. Try again shortly." };
  }
};

export const verifyPasswordResetOtp = async ({
  email,
  otp,
}: VerifyOtpFormData) => {
  if (!email || !otp) {
    return { success: false, error: "Email and OTP are required" };
  }

  try {
    const session = await enforceValidOtp(email, otp);

    return {
      success: true,
      data: {
        resetSessionToken: session.resetSessionToken,
        expiresAt: session.expiresAt,
      },
    };
  } catch (error) {
    console.error("OTP verification failed", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Invalid OTP provided",
    };
  }
};

export const resetPasswordWithOtp = async ({
  resetSessionToken,
  newPassword,
}: ResetPasswordPayload) => {
  if (!resetSessionToken) {
    return { success: false, error: "OTP session token is required" };
  }

  if (!newPassword || newPassword.length < 8) {
    return { success: false, error: "Password must be at least 8 characters" };
  }

  try {
    const { token } = await consumeResetSession(resetSessionToken);

    await auth.api.resetPassword({
      body: {
        token,
        newPassword,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Password reset failed", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Unable to update password right now",
    };
  }
};


