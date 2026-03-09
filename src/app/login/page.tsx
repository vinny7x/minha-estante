'use client';

import { Card } from "@/components/ui/card";
import clsx from "clsx";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaDiscord } from "react-icons/fa6";

export default function LoginPage() {
    const { data: session } = useSession();
    const router = useRouter();
    useEffect(() => {
        if (session?.user) {
            router.push("/library");
        }
    }, [session, router]);
    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-5xl font-bold mb-2">Faça Login</h1>
            <Card className="p-4">
                <button className={clsx(
                    'px-4 py-2',
                    'flex gap-2 text-white bg-blue-300',
                    'cursor-pointer'
                )} onClick={() => signIn('discord')}><FaDiscord size={24} /> Login com Discord</button>
            </Card>
        </div>
    );
}