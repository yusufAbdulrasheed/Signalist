import React from "react";

export default function WatchlistPage() {
  return (
    <main className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="text-center animate-fadeIn">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
          Watchlist
        </h1>
        <p className="text-gray-400 text-lg md:text-2xl mb-8">
          Coming Soon
        </p>

        <div className="flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-gray-700 border-t-white rounded-full animate-spin"></div>
        </div>

        <p className="text-gray-500 mt-6 max-w-md mx-auto text-sm md:text-base">
          We're crafting a modern, intelligent, and personalized watchlist for your
          market insights. Stay tuned!
        </p>
      </div>
    </main>
  );
}

