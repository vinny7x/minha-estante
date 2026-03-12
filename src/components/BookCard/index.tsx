'use client';

import { Card } from "../ui/card";
import { useState } from "react";
import { ModalBookInfo } from "../ModalBookInfo";
import { StatusBadge } from "../StatusBadge";



type BookCardProps = {
    coverUrl: string | null;
    title: string;
    authors: string | null;
    status: string | null;
    rating: string | null;
    review: string | null;
};

export function BookCard({
    authors,
    coverUrl,
    title,
    status,
    rating,
    review
}: BookCardProps) {

    const [isModalOpen, setOpenModal] = useState(false);

    return (
        <>
            <Card
                onClick={() => setOpenModal(true)}
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

                    <StatusBadge status={status} />
                </div>
            </Card>

            <ModalBookInfo
                open={isModalOpen}
                onOpenChange={setOpenModal}
                title={title}
                rating={rating}
                review={review}
                status={status}
            />
        </>
    );
}