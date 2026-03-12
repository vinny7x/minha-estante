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

                <p className="text-sm text-muted-foreground">
                    Avaliação: {rating || "Sem avaliação"}
                </p>
                <ScrollArea className="bg-muted h-42 p-2 rounded">
                    <p className="leading-relaxed text-wrap break-all">

                        {review || "Sem resenha"}
                    </p>

                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}