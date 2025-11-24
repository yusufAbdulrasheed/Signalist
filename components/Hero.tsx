import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative w-full h-[80vh] flex items-center justify-center text-center bg-gradient-to-r from-blue-500 to-purple-600 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 p-4 sm:p-6 md:p-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight">
          Welcome to Trade Connect
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg sm:text-xl md:text-2xl text-gray-200">
          The ultimate platform for modern trading. Connect with the market,
          analyze trends, and execute trades seamlessly.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/sign-up">Get Started for Free</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/about">Learn More</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
