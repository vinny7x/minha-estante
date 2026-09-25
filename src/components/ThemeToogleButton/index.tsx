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

    const activeTheme = theme ?? 'system';

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className="inline-flex items-center justify-center rounded-md p-2 text-foreground/80 transition-colors hover:bg-accent hover:text-foreground focus:outline-none disabled:opacity-50 disabled:pointer-events-none border-0 cursor-pointer"
                    aria-label="Selecionar tema"
                >
                    {theme === 'light' ? (
                        <SunIcon className="text-amber-400" aria-hidden="true" />
                    ) : theme === 'dark' ? (
                        <MoonIcon className="text-sky-300" aria-hidden="true" />
                    ) : (
                        <MonitorIcon className="text-muted-foreground" aria-hidden="true" />
                    )}
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                className="w-40 border bg-background/90 p-1 text-foreground shadow-lg backdrop-blur-md"
            >
                <DropdownMenuItem
                    className={activeTheme === 'light' ? 'bg-muted font-medium' : ''}
                    onClick={() => setTheme('light')}
                >
                    <SunIcon aria-hidden="true" />
                    Claro
                </DropdownMenuItem>

                <DropdownMenuItem
                    className={activeTheme === 'dark' ? 'bg-muted font-medium' : ''}
                    onClick={() => setTheme('dark')}
                >
                    <MoonIcon aria-hidden="true" />
                    Escuro
                </DropdownMenuItem>

                <DropdownMenuItem
                    className={activeTheme === 'system' ? 'bg-muted font-medium' : ''}
                    onClick={() => setTheme('system')}
                >
                    <MonitorIcon aria-hidden="true" />
                    Sistema
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}