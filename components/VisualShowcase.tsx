import Image from "next/image";

export function VisualShowcase() {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gray-950">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.16),transparent_55%),radial-gradient(circle_at_bottom_right,_rgba(250,204,21,0.18),transparent_55%)]" />

      <div className="relative max-w-6xl mx-auto grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.2fr)] items-center">
        <div className="space-y-5">
          <p className="text-xs uppercase tracking-[0.25em] text-sky-300/80">
            Your trading cockpit
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
            See the whole market at a glance.
          </h2>
          <p className="text-sm sm:text-base text-slate-300/85">
            The dashboard stitches together live indices, heatmaps, timelines and symbol data so you
            can jump from signal to action in seconds. No more juggling tabs and tools.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 text-sm text-slate-200/90">
            <div className="rounded-2xl border border-white/8 bg-slate-900/70 p-4 shadow-lg">
              <p className="text-xs font-medium text-emerald-300/90">Alert‑ready watchlists</p>
              <p className="mt-2 text-xs text-slate-300/80">
                Track your symbols, wire them into alerts and let Trade Connect handle the pinging.
              </p>
            </div>
            <div className="rounded-2xl border border-white/8 bg-slate-900/70 p-4 shadow-lg">
              <p className="text-xs font-medium text-sky-300/90">Context‑rich tiles</p>
              <p className="mt-2 text-xs text-slate-300/80">
                Each widget is tuned to show just enough context so you react, not overthink.
              </p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 rounded-[32px] bg-gradient-to-br from-yellow-400/30 via-sky-400/20 to-purple-500/35 blur-3xl opacity-70" />
          <div className="relative rounded-[28px] border border-white/12 bg-gradient-to-b from-slate-900/95 via-slate-900/85 to-slate-950/95 shadow-[0_30px_120px_rgba(15,23,42,0.9)] overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/5 px-5 py-3 text-xs text-slate-300/80">
              <div className="flex items-center gap-2">
                <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400/90" />
                <span className="font-medium">Live dashboard preview</span>
              </div>
              <span className="rounded-full bg-slate-800/80 px-2 py-0.5 text-[10px] text-slate-300/90">
                Realtime feed
              </span>
            </div>
            <Image
              src="/assets/images/dashboard-preview.png"
              alt="Trade Connect Dashboard"
              width={1200}
              height={675}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
