'use client'

import clsx from "clsx";
import { signIn } from "next-auth/react";
import { FaDiscord } from "react-icons/fa6";

export default function LoginPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-5xl font-bold">Faça Login</h1>
            <div className="border shadow-md m-4 p-6">
                <button className={clsx(
                    'px-4 py-2',
                    'flex gap-2 text-white bg-blue-300',
                    'cursor-pointer'
                )} onClick={()=>signIn('discord')}><FaDiscord size={24}/> Login com Discord</button>
            </div>
        </div>
    );
}