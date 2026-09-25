
'use client';

import { MoonIcon, SunIcon, MonitorIcon } from 'lucide-react';
import { useTheme } from 'next-themes';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function ThemeToggleButton() {
    const { theme, setTheme } = useTheme();

    return (
        <DropdownMenu >
            <DropdownMenuTrigger asChild>
                <button
                    className="inline-flex items-center justify-center rounded-md p-2 text-sm font-medium transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none border-0 cursor-pointer"
                    aria-label="Selecionar tema"
                >
                    {theme === 'light' ? (
                        <SunIcon color="yellow" />
                    ) : theme === 'dark' ? (
                        <MoonIcon color="white" />
                    ) : (
                        <MonitorIcon color="gray" />
                    )}
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-40 bg-black/30 border border-white/10 backdrop-blur-md">
                <DropdownMenuItem onClick={() => setTheme('light')}>
                    <SunIcon color="yellow" />
                    Claro
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => setTheme('dark')}>
                    <MoonIcon color="white" />
                    Escuro
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => setTheme('system')}>
                    <MonitorIcon color="gray" />
                    Sistema
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}