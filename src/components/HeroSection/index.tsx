import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function HeroSection() {
    return (
        <section
            id="home"
            className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-zinc-950 px-6 text-center text-white"
        >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.18),transparent_60%)]" />
            <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-sky-500/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />

            <div className="relative z-10 flex max-w-3xl flex-col items-center gap-6">
                <Badge
                    variant="secondary"
                    className="border-white/10 bg-white/10 text-white"
                >
                    <Sparkles className="text-amber-300" />
                    Sua biblioteca digital
                </Badge>

                <h1 className="text-5xl font-bold md:text-7xl">
                    Minha{" "}
                    <span className="bg-gradient-to-r from-indigo-400 to-sky-400 bg-clip-text text-transparent">
                        Estante
                    </span>
                </h1>

                <p className="max-w-xl text-lg text-white/70">
                    Organize seus livros, acompanhe leituras e construa sua
                    biblioteca digital de forma simples e elegante.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4">
                    <Button asChild className="flex items-center gap-2">
                        <Link href="/login">
                            Começar agora
                            <ArrowRight />
                        </Link>
                    </Button>
                    <Button
                        asChild
                        variant="outline"
                        className="border-white/20 bg-transparent text-white hover:bg-white/10"
                    >
                        <a href="#features">Conhecer funcionalidades</a>
                    </Button>
                </div>
            </div>

            <a
                href="#features"
                aria-label="Rolar para as funcionalidades"
                className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 transition-colors hover:text-white"
            >
                <ChevronDown className="size-6 animate-bounce" />
            </a>
        </section>
    );
}