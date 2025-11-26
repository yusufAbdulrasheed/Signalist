import { Schema, model, models } from "mongoose";

const PasswordResetOtpSchema = new Schema(
  {
    email: { type: String, required: true, index: true },
    otpHash: { type: String, required: true },
    otpExpiresAt: { type: Date, required: true },
    token: { type: String, required: true },
    resetSessionToken: { type: String, default: null },
    resetSessionExpiresAt: { type: Date, default: null },
    verifiedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
  },
);

export const PasswordResetOtp =
  models.PasswordResetOtp || model("PasswordResetOtp", PasswordResetOtpSchema);


