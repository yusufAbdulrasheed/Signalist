import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";
import { betterAuthDB } from "@/lib/mongodb";
import { sendPasswordResetOtpEmail } from "@/lib/nodemailer";
import {
  createPasswordResetRequest,
  generateNumericOtp,
} from "@/lib/password-reset/service";

let authInstance: ReturnType<typeof betterAuth> | null = null;

export const getAuth = () => {
    if (authInstance) return authInstance;

    authInstance = betterAuth({
        database: mongodbAdapter(betterAuthDB),
        secret: process.env.BETTER_AUTH_SECRET,
        baseURL: process.env.BETTER_AUTH_URL,

        emailAndPassword: {
            enabled: true,
            disableSignUp: false,
            requireEmailVerification: false,
            minPasswordLength: 8,
            maxPasswordLength: 128,
            autoSignIn: true,
            resetPasswordTokenExpiresIn: 120,
            sendResetPassword: async ({ user, token }) => {
                const otp = generateNumericOtp();

                await createPasswordResetRequest({
                    email: user.email,
                    token,
                    otp,
                });

                await sendPasswordResetOtpEmail({
                    email: user.email,
                    name: user.name,
                    otp,
                    expiryInMinutes: 2,
                });
            },
        },

        plugins: [nextCookies()]
    });

    return authInstance;
};

export const auth = getAuth();
