'use client';

import { StatusBadge } from "../StatusBadge";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";

type ModalBookInfoProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    rating: string | null;
    review: string | null;
    status: string | null;
};

export function ModalBookInfo({
    open,
    onOpenChange,
    title,
    rating,
    review,
    status
}: ModalBookInfoProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <StatusBadge status={status} />
                </DialogHeader>
                {status === 'read' && (
                    <>
                        <p className="text-sm text-muted-foreground">
                            Avaliação: {rating || "Sem avaliação"}
                        </p>
                        <ScrollArea className="bg-muted max-h-72 rounded-md p-2">
                            <p className="leading-relaxed whitespace-pre-wrap warp-break-words">
                                {review || "Sem resenha"}
                            </p>
                        </ScrollArea>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}