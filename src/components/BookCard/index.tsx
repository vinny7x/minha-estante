'use clinet';

import { BookmarkIcon, BookOpenIcon, CheckIcon } from "lucide-react";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import clsx from "clsx";
type BookStatus = "reading" | "read" | "wantToRead";

const statusConfig: Record<
    BookStatus,
    {
        label: string;
        icon: React.ElementType;
        className: string;
    }
> = {
    read: {
        label: "Lido",
        icon: CheckIcon,
        className: "bg-green-500 hover:bg-green-500/90 text-white",
    },
    reading: {
        label: "Lendo",
        icon: BookOpenIcon,
        className: "bg-yellow-500 hover:bg-yellow-500/90 text-white",
    },
    wantToRead: {
        label: "Quero ler",
        icon: BookmarkIcon,
        className: "bg-blue-500 hover:bg-blue-500/90 text-white",
    },
};

type BookCardProps = {
    bookId: string;
    coverUrl: string;
    title: string;
    authors: string;
    status: string;
};

export function BookCard({ bookId, authors, coverUrl, title, status }: BookCardProps) {
    return (
        <Card
            key={bookId}
            className="group cursor-pointer overflow-hidden transition hover:shadow-lg pt-0 bg-muted basis-40 sm:basis-48 md:basis-56"
        >
            <div className="aspect-2/3 w-full overflow-hidden bg-muted">
                {coverUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={coverUrl}
                        alt={`Capa do livro ${title}`}
                        className="h-full w-full object-cover transition group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                        Sem capa
                    </div>
                )}
            </div>

            <div className="p-2 space-y-1">
                <h2 className="text-sm font-semibold line-clamp-2">
                    {title}
                </h2>

                {authors && (
                    <p className="text-xs text-muted-foreground line-clamp-1">
                        {authors}
                    </p>
                )}

                {status && statusConfig[status as BookStatus] ? (
                    (() => {
                        const { label, icon: Icon, className } =
                            statusConfig[status as BookStatus];

                        return (
                            <Badge
                                className={clsx(
                                    "flex items-center gap-1 text-xs font-medium",
                                    className
                                )}
                            >
                                <Icon size={14} />
                                {label}
                            </Badge>
                        );
                    })()
                ) : (
                    <Badge variant="secondary" className="text-xs">
                        Desconhecido
                    </Badge>
                )}
            </div>
        </Card>
    );
}