import Image from "next/image";
import Link from "next/link";
import { HomeIcon, SearchXIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-6 py-16 text-foreground">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.15),transparent_60%)]" />
            <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-sky-500/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />

            <div className="relative z-10 flex w-full max-w-5xl flex-col items-center gap-10 md:flex-row md:gap-14">
                <div className="flex flex-1 justify-center">
                    <Image
                        src="/images/not-found.png"
                        alt="Página não encontrada"
                        width={400}
                        height={400}
                        priority
                        className="h-auto w-full max-w-64 object-contain sm:max-w-80 md:max-w-96"
                    />
                </div>

                <div className="flex flex-1 flex-col items-center gap-6 text-center md:items-start md:text-left">
                    <Badge
                        variant="secondary"
                        className="border-border bg-secondary text-secondary-foreground"
                    >
                        <SearchXIcon className="text-amber-300" />
                        Erro 404
                    </Badge>

                    <h1 className="text-4xl font-bold md:text-6xl">
                        Página{" "}
                        <span className="bg-linear-to-r from-indigo-400 to-sky-400 bg-clip-text text-transparent">
                            não encontrada
                        </span>
                    </h1>

                    <p className="max-w-xl text-lg text-muted-foreground">
                        A página que você está procurando não existe ou foi
                        movida. Que tal voltar para o início e explorar a
                        estante?
                    </p>

                    <Button asChild className="flex items-center gap-2">
                        <Link href="/">
                            <HomeIcon />
                            Voltar para o início
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}