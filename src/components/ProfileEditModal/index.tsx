'use client';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { LoaderIcon, SaveIcon } from "lucide-react";
import { useTransition } from "react";
import { toast } from "react-toastify";
import { updateProfile as action } from "../../actions/user/updateProfile";
type ProfileEditModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    username: string;
    realname: string;
    bio: string;
};

export function ProfileEditModal({
    open,
    onOpenChange,
    username,
    realname,
    bio,
}: ProfileEditModalProps) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Editar perfil</DialogTitle>
                </DialogHeader>

                <form

                    onSubmit={(e) => {
                        const formData = new FormData(e.currentTarget);
                        e.preventDefault();
                        startTransition(async () => {

                            const res = await action(formData);
                            console.log(res);
                            if (res?.success) {
                                toast.success("Perfil atualizado!");
                                onOpenChange(false);
                                router.refresh();
                            } else {
                                toast.error(res?.error);
                            }
                        });
                    }}
                    className="flex flex-col gap-4 mt-2"
                >
                    <label className="text-gray-500 text-sm" htmlFor="username">
                        Nome de usuário:
                    </label>

                    <Input
                        id="username"
                        name="username"
                        defaultValue={username}
                        placeholder="Username"
                    />

                    <label className="text-gray-500 text-sm" htmlFor="realname">
                        Seu nome real:
                    </label>

                    <Input
                        id="realname"
                        name="realname"
                        defaultValue={realname}
                        placeholder="Nome real"
                    />

                    <label className="text-gray-500 text-sm" htmlFor="bio">
                        Sua biografia:
                    </label>

                    <Textarea
                        id="bio"
                        name="bio"
                        defaultValue={bio}
                        placeholder="Sua bio"
                        className="resize-none"
                    />

                    <Button type="submit" className="flex gap-2" disabled={isPending}>
                        {isPending ?
                            (
                                <>
                                    <LoaderIcon className="animate-spin" />
                                    Salvando...
                                </>
                            ) : (
                                <>
                                    <SaveIcon />
                                    Salvar
                                </>
                            )
                        }
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}