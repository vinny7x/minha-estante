import type { Metadata } from "next";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { CTASection } from "@/components/CTASection";

export const metadata: Metadata = {
    title: "Minha Estante",
    description:
        "Organize seus livros, acompanhe leituras e construa sua biblioteca digital de forma simples e elegante.",
};

export default function Home() {
    return (
        <>
            <HeroSection />
            <FeaturesSection />
            <CTASection />
        </>
    );
}