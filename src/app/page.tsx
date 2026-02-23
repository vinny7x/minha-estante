import { HeroSection } from "@/components/HeroSection";
import { NavBar } from "@/components/NavBar";

export default function Home() {
  return (
    <>
      <NavBar />
      <section id="home">
        <HeroSection />
      </section>
    </>
  );
}