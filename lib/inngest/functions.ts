import { inngest } from "@/lib/inngest/client"
import { NEWS_SUMMARY_EMAIL_PROMPT, PERSONALIZED_WELCOME_EMAIL_PROMPT } from "./prompts"
import { sendNewsSummaryEmail, sendWelcomeEmail } from "@/lib/nodemailer"
import { getAllUsersForNewsEmail } from "@/lib/actions/user.action"
import { getWatchlistSymbolsByEmail } from "@/lib/actions/watchlist.actions"
import { getNews } from "@/lib/actions/finnhub.actions"
import { getFormattedTodayDate } from "@/lib/utils"

// Define response interface for AI inference
interface AiInferResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
  }>;
}

// User type
type UserForNewsEmail = {
  email: string;
  name?: string;
  country?: string;
  investmentGoals?: string;
  riskTolerance?: string;
  preferredIndustry?: string;
};

// Market news article type
type MarketNewsArticle = {
  id?: string;
  symbol?: string;
  headline?: string;
  summary?: string;
  source?: string;
  url?: string;
  datetime?: string | number;
};

// Send Welcome Email Function
export const sendSignUpEmail = inngest.createFunction(
  { id: "sign-up-email" },
  { event: "app/user.create" },
  async ({ event, step }) => {
    const userProfile = `
       - Country: ${event.data.country}
       - Investment goals: ${event.data.investmentGoals}
       - Risk tolerance: ${event.data.riskTolerance}
       - Preferred industry: ${event.data.preferredIndustry}
    `;
    const prompt = PERSONALIZED_WELCOME_EMAIL_PROMPT.replace('{{userProfile}}', userProfile);

    const response = await step.ai.infer('generate-welcome-intro', {
        model: step.ai.models.gemini({ model: 'gemini-2.5-flash-lite' }),
        body: {
          contents: [
            {
              role: 'user',
              parts: [{ text: prompt }]
            }
          ]
        }
      }) as AiInferResponse;

    await step.run('send-welcome-email', async () => {
      const part = response.candidates?.[0]?.content?.parts?.[0];
      const introText = (part && 'text' in part ? part.text : null) || 'Thanks for joining Trade Connect. You now have the tools to track markets and make smarter moves';

      const { data: { email, name } } = event;

      return await sendWelcomeEmail({
        email,
        name,
        intro: introText
      });
    });

    return {
      success: true,
      message: 'Welcome email sent successfully'
    };
  }
);

// Daily News Summary Function
export const sendDailyNewsSummary = inngest.createFunction(
  { id: 'daily-news-summary' },
  [
    { event: 'app/send.daily.news' },
    { cron: '0 12 * * *' }
  ],
  async ({ step }) => {
    // Step #1: Get all users for news delivery
    const users = await step.run('get-all-users', getAllUsersForNewsEmail);
    if (!users || users.length === 0) return { success: false, message: "No user found for news email" };

    // Step #2: Fetch personalized news for each user
    const results: Array<{ user: UserForNewsEmail; articles: MarketNewsArticle[] }> = [];
    for (const user of users as UserForNewsEmail[]) {
      try {
        const symbols = await getWatchlistSymbolsByEmail(user.email);
        let articles = await getNews(symbols);
        // Enforce max 6 articles per user
        articles = (articles || []).slice(0, 6);
        // Fallback to general news if no articles
        if (articles.length === 0) {
          articles = await getNews();
          articles = (articles || []).slice(0, 6);
        }
        // Normalize id to string
        const normalizedArticles: MarketNewsArticle[] = (articles || []).map(article => ({
          ...article,
          id: article.id !== undefined ? String(article.id) : undefined,
        }));
        results.push({ user, articles: normalizedArticles });
      } catch (error) {
        console.error('daily-news: error preparing user news', user.email, error);
        results.push({ user, articles: [] });
      }
    }

    // Step #3: Summarize news via AI for each user
    const userNewsSummaries: Array<{ user: UserForNewsEmail; newsContent: string | null }> = [];
    for (const { user, articles } of results) {
      try {
        const prompt = NEWS_SUMMARY_EMAIL_PROMPT.replace('{{newsData}}', JSON.stringify(articles, null, 2));

        const response = await step.ai.infer(`summarize-news-${user.email}`, {
            model: step.ai.models.gemini({ model: 'gemini-2.5-flash-lite' }),
            body: {
              contents: [
                {
                  role: 'user',
                  parts: [{ text: prompt }]
                }
              ]
            }
          }) as AiInferResponse;
        const part = response.candidates?.[0]?.content?.parts?.[0];
        const newsContent = (part && 'text' in part ? part.text : null) || 'No market news.';
        userNewsSummaries.push({ user, newsContent });
      } catch (error) {
        console.error('Failed to summarize news for:', user.email, error);
        userNewsSummaries.push({ user, newsContent: null });
      }
    }

    // Step #4: Send emails
    await step.run('send-news-emails', async () => {
      await Promise.all(
        userNewsSummaries.map(async ({ user, newsContent }) => {
          if (!newsContent) return false;
          return await sendNewsSummaryEmail({ email: user.email, date: getFormattedTodayDate(), newsContent });
        })
      );
    });

    return { success: true, message: 'Daily news summary emails sent successfully' };
  }
);