import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Hero({ isAuthenticated = false }: { isAuthenticated?: boolean }) {
  return (
    <section className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden bg-black text-white">
      {/* background video */}
      

      {/* subtle gradient overlay on top of video */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950/80 via-slate-950/70 to-slate-950/90" />

      {/* animated glow orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="animate-[pulse_4s_ease-in-out_infinite] absolute -top-32 -left-32 h-72 w-72 rounded-full bg-blue-500/30 blur-3xl" />
        <div className="animate-[spin_18s_linear_infinite] absolute -bottom-40 right-10 h-80 w-80 rounded-full bg-purple-600/25 blur-3xl" />
        <div className="animate-[pulse_6s_ease-in-out_infinite] absolute top-1/3 -right-32 h-64 w-64 rounded-full bg-amber-400/20 blur-3xl" />
      </div>

      {/* animated grid */}
      <div className="pointer-events-none absolute inset-0 opacity-30 [mask-image:radial-gradient(circle_at_center,white,transparent)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#1f2937_1px,transparent_0)] bg-[size:24px_24px] animate-[slide_40s_linear_infinite]" />
      </div>

      <div className="relative z-10 px-4 sm:px-6 md:px-8 max-w-5xl mx-auto flex flex-col items-center text-center">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-400/10 px-4 py-1 text-xs sm:text-sm font-medium text-amber-200 animate-[fade-in_0.9s_ease-out_forwards]">
          Live markets. Smart alerts. One sleek dashboard.
        </p>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-br from-white via-amber-200 to-amber-500 animate-[fade-up_0.7s_ease-out_forwards]">
          Turn every signal
          <span className="block text-amber-300">into a trading advantage.</span>
        </h1>

        <p className="mt-6 max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-slate-200/80 animate-[fade-up_0.8s_ease-out_forwards]">
          Trade Connect gives you a real‑time view of the market, curated watchlists,
          and AI‑powered alerts – all inside a beautiful, focused dashboard.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4 animate-[fade-up_0.9s_ease-out_forwards]">
          {isAuthenticated ? (
            <>
              <Button
                asChild
                size="lg"
                className="yellow-btn px-8 py-6 text-base sm:text-lg shadow-[0_20px_80px_rgba(250,204,21,0.35)] hover:shadow-[0_24px_90px_rgba(250,204,21,0.5)] transition-all"
              >
                <Link href="/dashboard">View live dashboard</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-slate-500/80 bg-slate-900/60 text-slate-100 hover:bg-slate-800/80"
              >
                <Link href="#explore">Explore more</Link>
              </Button>
            </>
          ) : (
            <>
              <Button
                asChild
                size="lg"
                className="yellow-btn px-8 py-6 text-base sm:text-lg shadow-[0_20px_80px_rgba(250,204,21,0.35)] hover:shadow-[0_24px_90px_rgba(250,204,21,0.5)] transition-all"
              >
                <Link href="/sign-up">Get started in 60 seconds</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-slate-500/80 bg-slate-900/60 text-slate-100 hover:bg-slate-800/80"
              >
                <Link href="/dashboard">View live dashboard</Link>
              </Button>
            </>
          )}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-slate-300/80 animate-[fade-up_1s_ease-out_forwards]">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Real‑time market overview</span>
          </div>
          <span className="hidden sm:inline text-slate-600">•</span>
          <span>Smart alerts on your watchlist</span>
          <span className="hidden sm:inline text-slate-600">•</span>
          <span>No credit card required</span>
        </div>
      </div>
    </section>
  );
}
