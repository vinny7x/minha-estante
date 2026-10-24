import { ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroSection() {
    return (
        <section
            id="home"
            className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-6 text-center text-foreground"
        >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.12),transparent_60%)]" />
            <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />

            <div className="relative flex max-w-3xl flex-col items-center gap-6">

                <h1 className="text-5xl font-bold md:text-7xl">
                    Minha{" "}
                    <span className="text-primary">
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