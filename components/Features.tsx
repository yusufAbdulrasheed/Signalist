import { Activity, Bell, LineChart, Shield } from "lucide-react";

const featureGroups = [
  {
    title: "Built for active traders",
    items: [
      {
        icon: <LineChart className="w-5 h-5 text-emerald-400" />,
        label: "Pro‑grade market overview",
        body: "Multi‑panel charts and live heatmaps tuned for fast visual scanning.",
      },
      {
        icon: <Activity className="w-5 h-5 text-sky-400" />,
        label: "Signal‑driven workflow",
        body: "Focus on price action that actually matters, not endless tickers.",
      },
    ],
  },
  {
    title: "Stay ahead of every move",
    items: [
      {
        icon: <Bell className="w-5 h-5 text-amber-300" />,
        label: "Smart alert engine",
        body: "Set granular alerts around price, volume and watchlist symbols.",
      },
      {
        icon: <Shield className="w-5 h-5 text-purple-300" />,
        label: "Safe, secure, and private",
        body: "Best‑practice auth and encrypted data by default.",
      },
    ],
  },
];

export function Features() {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gray-950">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(250,204,21,0.06),transparent_55%),radial-gradient(circle_at_bottom,_rgba(59,130,246,0.25),transparent_55%)]" />

      <div className="relative max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-16">
          <div className="max-w-md space-y-5">
            <p className="text-xs uppercase tracking-[0.2em] text-amber-300/80">
              Why traders love Trade Connect
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white">
              A desk‑grade trading cockpit, in your browser.
            </h2>
            <p className="text-sm sm:text-base text-slate-300/80">
              Trade Connect blends deep market data, responsive charts and intelligent alerts into a
              single, distraction‑free workspace. No plug‑ins, no terminals, no clutter.
            </p>

            <div className="mt-4 flex flex-wrap gap-3 text-xs sm:text-sm text-slate-300/80">
              <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1">
                Real‑time dashboards
              </span>
              <span className="rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1">
                Watchlists & signals
              </span>
              <span className="rounded-full border border-purple-400/30 bg-purple-400/10 px-3 py-1">
                AI‑assisted insights
              </span>
            </div>
          </div>

          <div className="grid w-full gap-6 md:grid-cols-2">
            {featureGroups.map((group) => (
              <div
                key={group.title}
                className="relative overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-b from-slate-900/80 via-slate-900/40 to-slate-950/90 p-5 sm:p-6 shadow-[0_18px_60px_rgba(15,23,42,0.8)]"
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(250,204,21,0.14),transparent_55%)] opacity-60" />
                <div className="relative space-y-4">
                  <h3 className="text-base sm:text-lg font-semibold text-white">
                    {group.title}
                  </h3>
                  <div className="space-y-3">
                    {group.items.map((item) => (
                      <div
                        key={item.label}
                        className="flex gap-3 rounded-xl bg-slate-900/60 px-3 py-3 border border-white/5"
                      >
                        <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-slate-900/80 border border-white/10">
                          {item.icon}
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-slate-50">
                            {item.label}
                          </p>
                          <p className="text-xs text-slate-300/80">{item.body}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
