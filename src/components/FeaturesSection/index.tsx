import { BookMarked, LineChart, Search } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
    {
        icon: Search,
        title: "Busque seus livros",
        description:
            "Encontre qualquer título usando a integração com o Google Books e adicione-o à sua estante em segundos.",
    },
    {
        icon: BookMarked,
        title: "Organize sua estante",
        description:
            "Classifique seus livros como Lendo, Lido ou Quero ler e mantenha sua coleção sempre em ordem.",
    },
    {
        icon: LineChart,
        title: "Acompanhe sua leitura",
        description:
            "Visualize páginas e livros lidos, dê notas e registre resenhas das suas leituras favoritas.",
    },
];

export function FeaturesSection() {
    return (
        <section id="features" className="mx-auto max-w-5xl scroll-mt-24 px-6 py-24">
            <div className="mb-12 text-center">
                <h2 className="text-3xl font-bold md:text-4xl">
                    Funcionalidades
                </h2>
                <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
                    Tudo o que você precisa para transformar a leitura em um
                    hábito organizado.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {features.map(({ icon: Icon, title, description }) => (
                    <Card
                        key={title}
                        className="gap-3 p-6 transition hover:shadow-md"
                    >
                        <span className="flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <Icon className="size-6" />
                        </span>
                        <h3 className="text-lg font-semibold">{title}</h3>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                            {description}
                        </p>
                    </Card>
                ))}
            </div>
        </section>
    );
}