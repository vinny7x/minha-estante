'use client';

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { authClient, signIn, useSession } from "@/lib/auth/auth-client";
import { ArrowLeft, Loader2, LogIn } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { FaDiscord } from "react-icons/fa6";

export default function LoginPage() {
    const { data: session } = useSession();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const lastLoginMethod = useMemo(() => {
        try {
            return authClient.getLastUsedLoginMethod?.();
        } catch {
            return null;
        }
    }, []);

    useEffect(() => {
        if (session?.user) {
            router.push("/library");
        }
    }, [session, router]);

    function handleDiscordLogin() {
        setIsLoading(true);
        signIn.social({ provider: "discord" });
    }

    const isLastUsed = lastLoginMethod === "discord";

    return (
        <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-6 py-16 text-foreground">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.12),transparent_60%)]" />
            <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />

            <div className="relative z-10 flex w-full max-w-md flex-col items-center gap-8 text-center">
                <Badge
                    variant="secondary"
                    className="border-border bg-secondary text-secondary-foreground"
                >
                    <LogIn className="text-accent" />
                    Acesso à sua estante
                </Badge>

                <div className="flex flex-col gap-4">
                    <h1 className="text-4xl font-bold md:text-5xl">
                        Faça{" "}
                        <span className="text-primary">
                            login
                        </span>
                    </h1>
                    <p className="max-w-md text-lg text-muted-foreground">
                        Entre com sua conta para organizar suas leituras, seguir seu progresso e manter sua biblioteca sempre atualizada.
                    </p>
                </div>

                <div className="relative w-full">
                    <Button
                        size="lg"
                        disabled={isLoading}
                        onClick={handleDiscordLogin}
                        className="group relative w-full gap-3 bg-primary text-primary-foreground transition-all hover:opacity-90 disabled:opacity-70 disabled:hover:opacity-70"
                    >
                        {isLoading ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                            <FaDiscord className="h-5 w-5" />
                        )}
                        {isLoading ? "Entrando..." : "Continuar com Discord"}
                    </Button>
                    {isLastUsed && !isLoading && (
                        <span className="absolute -top-2.5 right-4 rounded-full bg-success px-2 py-0.5 text-xs font-medium text-primary-foreground shadow-lg">
                            Último login
                        </span>
                    )}
                </div>

                <Button asChild variant="ghost" className="gap-2 text-muted-foreground hover:text-foreground">
                    <Link href="/">
                        <ArrowLeft className="h-4 w-4" />
                        Voltar para o início
                    </Link>
                </Button>
            </div>
        </section>
    );
}