import { Providers } from "@/components/providers";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Fleet } from "@/components/fleet";
import { Experience } from "@/components/experience";
import { Destinations } from "@/components/destinations";
import { CtaBanner } from "@/components/cta-banner";
import { Testimonials } from "@/components/testimonials";
import { Press } from "@/components/press";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <Providers>
      <span id="top" />
      <Header />
      <main>
        <Hero />
        <About />
        <Fleet />
        <Experience />
        <Destinations />
        <CtaBanner />
        <Testimonials />
        <Press />
        <Footer />
      </main>
    </Providers>
  );
}
