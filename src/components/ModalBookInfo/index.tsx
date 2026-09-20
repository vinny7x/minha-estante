'use client';

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
    LoaderIcon,
    PencilIcon,
    SaveIcon,
    TrashIcon,
    XCircleIcon,
} from "lucide-react";
import { toast } from "react-toastify";
import { deleteBook } from "@/actions/book/deleteBook";
import { editBook } from "@/actions/book/editBook";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogMedia,
    AlertDialogTitle,
} from "../ui/alert-dialog";
import { StatusBadge } from "../StatusBadge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
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
    bookId: string;
    title: string;
    rating: string | null;
    review: string | null;
    status: string | null;
};

export function ModalBookInfo({
    open,
    onOpenChange,
    bookId,
    title,
    rating,
    review,
    status
}: ModalBookInfoProps) {
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const [newStatus, setNewStatus] = useState(status ?? 'reading');
    const [newRating, setNewRating] = useState<number>(Number(rating) || 0);
    const [newReview, setNewReview] = useState(review ?? '');
    const [isSaving, startSaving] = useTransition();
    const [isDeleting, startDeleting] = useTransition();
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    function handleOpenChange(next: boolean) {
        if (!next) setIsEditing(false);
        onOpenChange(next);
    }

    function handleDeleteBook() {
        startDeleting(async () => {
            try {
                await deleteBook({ bookId });
                toast.success("Livro removido da estante");
                setIsDeleteDialogOpen(false);
                onOpenChange(false);
                router.refresh();
            } catch {
                toast.error("Erro ao remover o livro");
            }
        });
    }

    function handleStartEdit() {
        setNewStatus(status ?? 'reading');
        setNewRating(Number(rating) || 0);
        setNewReview(review ?? '');
        setIsEditing(true);
    }

    function handleCancelEdit() {
        setIsEditing(false);
    }

    function handleSave() {
        startSaving(async () => {
            try {
                await editBook({
                    bookId,
                    status: newStatus,
                    rating: newRating,
                    review: newReview,
                });
                toast.success("Livro atualizado com sucesso");
                setIsEditing(false);
                router.refresh();
            } catch {
                toast.error("Erro ao atualizar o livro");
            }
        });
    }

    return (
        <>
            <Dialog open={open} onOpenChange={handleOpenChange}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        {!isEditing && <StatusBadge status={status} />}
                    </DialogHeader>

                    {isEditing ? (
                        <div className="space-y-4">
                            <Select
                                value={newStatus}
                                onValueChange={(value) => setNewStatus(value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="reading">Lendo</SelectItem>
                                    <SelectItem value="read">Lido</SelectItem>
                                    <SelectItem value="wantToRead">Quero ler</SelectItem>
                                </SelectContent>
                            </Select>

                            {newStatus === 'read' && (
                                <>
                                    <Input
                                        type="number"
                                        min={0}
                                        max={5}
                                        step={0.5}
                                        value={newRating}
                                        onChange={(e) => setNewRating(Number(e.target.value))}
                                        placeholder="Nota"
                                    />
                                    <Textarea
                                        maxLength={2000}
                                        value={newReview}
                                        onChange={(e) => setNewReview(e.target.value)}
                                        className="leading-relaxed whitespace-pre-wrap warp-break-words max-h-72"
                                        placeholder="Resenha"
                                    />
                                </>
                            )}

                            <div className="flex justify-end gap-2 pt-2">
                                <Button
                                    variant="outline"
                                    className="flex items-center gap-2"
                                    onClick={handleCancelEdit}
                                >
                                    <XCircleIcon /> Cancelar
                                </Button>
                                <Button
                                    disabled={isSaving}
                                    className="flex items-center gap-2"
                                    onClick={handleSave}
                                >
                                    {isSaving ? (
                                        <LoaderIcon className="animate-spin" />
                                    ) : (
                                        <SaveIcon />
                                    )}
                                    Salvar
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <>
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

                            <div className="mt-4 flex justify-end gap-2">
                                <Button
                                    className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600"
                                    onClick={handleStartEdit}
                                >
                                    <PencilIcon /> Editar
                                </Button>
                                <Button
                                    className="flex items-center gap-2 bg-red-500 hover:bg-red-600"
                                    onClick={() => setIsDeleteDialogOpen(true)}
                                >
                                    <TrashIcon /> Deletar
                                </Button>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>

            <AlertDialog
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
            >
                <AlertDialogContent size="sm">
                    <AlertDialogHeader>
                        <AlertDialogMedia>
                            <TrashIcon className="text-destructive" />
                        </AlertDialogMedia>
                        <AlertDialogTitle>Remover livro</AlertDialogTitle>
                        <AlertDialogDescription>
                            Tem certeza que deseja remover &quot;{title}&quot; da sua
                            estante? Essa ação não pode ser desfeita.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                            variant="destructive"
                            disabled={isDeleting}
                            onClick={handleDeleteBook}
                        >
                            {isDeleting && (
                                <LoaderIcon className="animate-spin" />
                            )}
                            Remover
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}