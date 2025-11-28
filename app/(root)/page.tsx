export const dynamic = "force-dynamic"

import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { VisualShowcase } from "@/components/VisualShowcase";
import Header from "@/components/Header";
import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";

const HomePage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  const user = session?.user
    ? {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
      }
    : null;

  return (
    <main className="flex flex-col min-h-screen text-gray-100">
      {user && <Header user={user} />}
      <Hero isAuthenticated={!!user} />
      <section id="explore">
        <Features />
        <VisualShowcase />
      </section>
      <Footer />
    </main>
  );
};

export default HomePage;
