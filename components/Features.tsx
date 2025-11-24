import { Star, BarChart, Zap } from "lucide-react";

const features = [
  {
    icon: <BarChart className="w-12 h-12 text-purple-500" />,
    title: "Advanced Charting",
    description:
      "Leverage our comprehensive charting tools to analyze market trends with precision. Customize indicators and draw tools to fit your strategy.",
  },
  {
    icon: <Zap className="w-12 h-12 text-purple-500" />,
    title: "Real-Time Data",
    description:
      "Stay ahead of the market with lightning-fast, real-time data. Never miss an opportunity with instant updates on prices and news.",
  },
  {
    icon: <Star className="w-12 h-12 text-purple-500" />,
    title: "Personalized Watchlist",
    description:
      "Create and manage your own watchlists to keep track of the assets that matter most to you. Get personalized alerts and insights.",
  },
];

export function Features() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Everything You Need to Succeed
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Trade Connect provides a powerful suite of tools for traders of all
            levels.
          </p>
        </div>
        <div className="mt-16 grid gap-12 md:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="text-center">
              <div className="flex items-center justify-center h-24 w-24 rounded-full bg-purple-100 mx-auto">
                {feature.icon}
              </div>
              <h3 className="mt-6 text-xl font-bold text-gray-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-base text-gray-500">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
