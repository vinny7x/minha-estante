import Link from "next/link";
import { FaDiscord } from "react-icons/fa6";
import { Button } from "@/components/ui/button";

export function CTASection() {
    return (
        <section className="bg-zinc-950 px-6 py-24 text-center text-white">
            <div className="mx-auto max-w-2xl">
                <h2 className="text-3xl font-bold md:text-4xl">
                    Pronto para organizar sua estante?
                </h2>
                <p className="mt-3 text-white/70">
                    Entre com sua conta do Discord e comece a catalogar suas
                    leituras hoje mesmo.
                </p>
                <Button asChild size="lg" className="mt-8 flex items-center gap-2">
                    <Link href="/login" className="flex items-center gap-2">
                        <FaDiscord className="size-5" />
                        Entrar com Discord
                    </Link>
                </Button>
            </div>
        </section>
    );
}