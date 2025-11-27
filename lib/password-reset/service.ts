import crypto from "crypto";

import { connectToDatabase } from "@/database/mongoose";
import { PasswordResetOtp } from "@/database/models/passwordReset.model";

const OTP_EXPIRY_MS = 2 * 60 * 1000; // 2 minutes
const RESET_SESSION_EXPIRY_MS = 10 * 60 * 1000; // 10 minutes to finish reset after OTP verification

const hashOtp = (otp: string) =>
  crypto.createHash("sha256").update(otp).digest("hex");

export const generateNumericOtp = (digits = 6) => {
  const min = 10 ** (digits - 1);
  const max = 10 ** digits - 1;
  return `${Math.floor(Math.random() * (max - min + 1) + min)}`;
};

export const createPasswordResetRequest = async ({
  email,
  token,
  otp,
}: {
  email: string;
  token: string;
  otp: string;
}) => {
  await connectToDatabase();

  await PasswordResetOtp.findOneAndUpdate(
    { email },
    {
      email,
      token,
      otpHash: hashOtp(otp),
      otpExpiresAt: new Date(Date.now() + OTP_EXPIRY_MS),
      verifiedAt: null,
      resetSessionToken: null,
      resetSessionExpiresAt: null,
    },
    {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    },
  );
};

export const verifyOtpAndIssueSession = async ({
  email,
  otp,
}: {
  email: string;
  otp: string;
}) => {
  await connectToDatabase();

  const record = await PasswordResetOtp.findOne({ email }).sort({
    createdAt: -1,
  });

  if (!record) {
    throw new Error("No OTP request found for this email");
  }

  if (record.otpExpiresAt < new Date()) {
    throw new Error("OTP has expired");
  }

  if (record.otpHash !== hashOtp(otp)) {
    throw new Error("Invalid OTP provided");
  }

  const resetSessionToken = crypto.randomUUID();

  record.verifiedAt = new Date();
  record.resetSessionToken = resetSessionToken;
  record.resetSessionExpiresAt = new Date(Date.now() + RESET_SESSION_EXPIRY_MS);

  await record.save();

  return {
    resetSessionToken,
    expiresAt: record.resetSessionExpiresAt,
  };
};

export const consumeResetSession = async (resetSessionToken: string) => {
  await connectToDatabase();

  const record = await PasswordResetOtp.findOne({ resetSessionToken });

  if (!record) {
    throw new Error("Reset session token is invalid");
  }

  if (!record.verifiedAt || !record.resetSessionExpiresAt) {
    throw new Error("OTP has not been verified yet");
  }

  if (record.resetSessionExpiresAt < new Date()) {
    throw new Error("Password reset session has expired");
  }

  const { token, email } = record;

  await PasswordResetOtp.deleteOne({ _id: record._id });

  return { token, email };
};


