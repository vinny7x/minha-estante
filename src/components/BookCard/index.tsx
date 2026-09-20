'use client';

import { useState, type KeyboardEvent } from "react";
import { StarIcon } from "lucide-react";
import { Card } from "../ui/card";
import { ModalBookInfo } from "../ModalBookInfo";
import { StatusBadge } from "../StatusBadge";

type BookCardProps = {
    bookId: string;
    coverUrl: string | null;
    title: string;
    authors: string | null;
    status: string | null;
    rating: string | null;
    review: string | null;
};

export function BookCard({
    bookId,
    authors,
    coverUrl,
    title,
    status,
    rating,
    review
}: BookCardProps) {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setIsModalOpen(true);
        }
    };

    return (
        <>
            <Card
                onClick={openModal}
                onKeyDown={handleKeyDown}
                role="button"
                tabIndex={0}
                aria-haspopup="dialog"
                aria-label={`Abrir detalhes de ${title}`}
                className="group cursor-pointer overflow-hidden transition hover:shadow-lg pt-0 bg-muted basis-40 sm:basis-48 md:basis-56"
            >
                <div className="aspect-2/3 w-full overflow-hidden bg-muted">
                    {coverUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={coverUrl}
                            alt={`Capa do livro ${title}`}
                            loading="lazy"
                            decoding="async"
                            referrerPolicy="no-referrer"
                            sizes="(min-width: 768px) 224px, (min-width: 640px) 192px, 160px"
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
                    <div className="flex items-center justify-between mt-2">
                        <StatusBadge status={status} />
                        {rating && (
                            <p className="flex items-center gap-1 text-xs text-muted-foreground">
                                <StarIcon
                                    size={12}
                                    className="fill-amber-400 text-amber-400"
                                    aria-hidden="true"
                                />
                                {rating}
                            </p>
                        )}
                    </div>

                </div>
            </Card>

            <ModalBookInfo
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
                bookId={bookId}
                title={title}
                rating={rating}
                review={review}
                status={status}
            />
        </>
    );
}