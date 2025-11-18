import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";
import { betterAuthDB } from "@/lib/mongodb";

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
            autoSignIn: true
        },

        plugins: [nextCookies()]
    });

    return authInstance;
};

export const auth = getAuth();
