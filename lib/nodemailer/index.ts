import nodemailer from 'nodemailer'
import {WELCOME_EMAIL_TEMPLATE} from '@/lib/nodemailer/template'
import { NEWS_SUMMARY_EMAIL_PROMPT } from '../inngest/prompts'

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD
    }
})

export const sendWelcomeEmail = async({ email, name, intro}: WelcomeEmailData) =>{
    const htmlTemplate = WELCOME_EMAIL_TEMPLATE
        .replace('{{name}}', name)
        .replace('{{intro}}', intro)
    
    const mailOptions = {
        from: '"Trade Connect" <noreply@gmail.com>',
        to: email,
        subject: `Welcome to Trade Connect - your stock market toolkit is ready!`,
        text: `Thanks for joining Trade Connect`,
        html: htmlTemplate
    }

    await transporter.sendMail(mailOptions)
} 

export const sendNewsSummaryEmail = async (
    { email, date, newsContent }: { email: string; date: string; newsContent: string }
): Promise<void> => {
    const htmlTemplate = NEWS_SUMMARY_EMAIL_PROMPT
        .replace('{{date}}', date)
        .replace('{{newsContent}}', newsContent);

    const mailOptions = {
        from:`Trade Connect News" <signalist@jsmastery.pro>`,
        to: email,
        subject: `📈 Market News Summary Today - ${date}`,
        text: `Today's market news summary from Signalist`,
        html: htmlTemplate,
    };

    await transporter.sendMail(mailOptions);
};