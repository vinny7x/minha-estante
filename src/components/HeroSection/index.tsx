import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function HeroSection() {
    return (
        <section
            id="home"
            className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-6 text-center text-foreground"
        >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.15),transparent_60%)]" />
            <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-sky-500/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />

            <div className="relative z-10 flex max-w-3xl flex-col items-center gap-6">
                <Badge
                    variant="secondary"
                    className="border-border bg-secondary text-secondary-foreground"
                >
                    <Sparkles className="text-amber-400" />
                    Sua biblioteca digital
                </Badge>

                <h1 className="text-5xl font-bold md:text-7xl">
                    Minha{" "}
                    <span className="bg-linear-to-r from-indigo-400 to-sky-400 bg-clip-text text-transparent">
                        Estante
                    </span>
                </h1>

                <p className="max-w-xl text-lg text-muted-foreground">
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
                        className="border-border text-foreground hover:bg-accent"
                    >
                        <a href="#features">Conhecer funcionalidades</a>
                    </Button>
                </div>
            </div>

            <a
                href="#features"
                aria-label="Rolar para as funcionalidades"
                className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground transition-colors hover:text-foreground"
            >
                <ChevronDown className="size-6 animate-bounce" />
            </a>
        </section>
    );
}