import nodemailer from "nodemailer";
import {
  WELCOME_EMAIL_TEMPLATE,
  PASSWORD_RESET_OTP_TEMPLATE,
} from "@/lib/nodemailer/template";
import { NEWS_SUMMARY_EMAIL_PROMPT } from "../inngest/prompts";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

export const sendWelcomeEmail = async ({
  email,
  name,
  intro,
}: WelcomeEmailData) => {
  const htmlTemplate = WELCOME_EMAIL_TEMPLATE.replace("{{name}}", name).replace(
    "{{intro}}",
    intro,
  );

  const mailOptions = {
    from: '"Signalist" <noreply@gmail.com>',
    to: email,
    subject: `Welcome to Signalist - your stock market toolkit is ready!`,
    text: `Thanks for joining Signalist`,
    html: htmlTemplate,
  };

  await transporter.sendMail(mailOptions);
};

export const sendNewsSummaryEmail = async ({
  email,
  date,
  newsContent,
}: {
  email: string;
  date: string;
  newsContent: string;
}): Promise<void> => {
  const htmlTemplate = NEWS_SUMMARY_EMAIL_PROMPT.replace(
    "{{date}}",
    date,
  ).replace("{{newsContent}}", newsContent);

  const mailOptions = {
    from: `Signalist News" <signalist@jsmastery.pro>`,
    to: email,
    subject: `📈 Market News Summary Today - ${date}`,
    text: `Today's market news summary from Signalist`,
    html: htmlTemplate,
  };

  await transporter.sendMail(mailOptions);
};

export const sendPasswordResetOtpEmail = async ({
  email,
  name,
  otp,
  expiryInMinutes = 2,
}: {
  email: string;
  name?: string | null;
  otp: string;
  expiryInMinutes?: number;
}) => {
  const htmlTemplate = PASSWORD_RESET_OTP_TEMPLATE.replace(
    "{{name}}",
    name ?? "there",
  )
    .replace("{{otp}}", otp)
    .replace("{{expiry}}", `${expiryInMinutes}`);

  await transporter.sendMail({
    from: '"Signalist" <noreply@gmail.com>',
    to: email,
    subject: "Your Signalist password reset code",
    text: `Use ${otp} to reset your Signalists password. This code expires in ${expiryInMinutes} minutes.`,
    html: htmlTemplate,
  });
};