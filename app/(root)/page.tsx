import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { VisualShowcase } from "@/components/VisualShowcase";

const HomePage = () => {
  return (
    <main className="flex flex-col min-h-screen">
      <Hero />
      <Features />
      <VisualShowcase />
      <Footer />
    </main>
  );
};

export default HomePage;
