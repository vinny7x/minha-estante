'use client';

import { MoonIcon, SunIcon, MonitorIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function ThemeToggleButton() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const activeTheme = theme ?? 'system';

    if (!mounted) {
        return <div className="h-9 w-9" />;
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className="inline-flex items-center justify-center rounded-md h-8 w-8 text-foreground/80 transition-colors hover:bg-muted hover:text-foreground focus:outline-none disabled:opacity-50 disabled:pointer-events-none border-0 cursor-pointer"
                    aria-label="Selecionar tema"
                >
                    {theme === 'light' ? (
                        <SunIcon className="text-amber-400" aria-hidden="true" />
                    ) : theme === 'dark' ? (
                        <MoonIcon className="text-accent" aria-hidden="true" />
                    ) : (
                        <MonitorIcon className="text-muted-foreground" aria-hidden="true" />
                    )}
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                className="w-40 border bg-popover p-1 text-popover-foreground shadow-lg"
            >
                <DropdownMenuItem
                    className={activeTheme === 'light' ? 'bg-muted/60 font-medium' : 'hover:bg-muted/40 focus:bg-muted/40'}
                    onClick={() => setTheme('light')}
                >
                    <SunIcon aria-hidden="true" />
                    Claro
                </DropdownMenuItem>

                <DropdownMenuItem
                    className={activeTheme === 'dark' ? 'bg-muted/60 font-medium' : 'hover:bg-muted/40 focus:bg-muted/40'}
                    onClick={() => setTheme('dark')}
                >
                    <MoonIcon aria-hidden="true" />
                    Escuro
                </DropdownMenuItem>

                <DropdownMenuItem
                    className={activeTheme === 'system' ? 'bg-muted/60 font-medium' : 'hover:bg-muted/40 focus:bg-muted/40'}
                    onClick={() => setTheme('system')}
                >
                    <MonitorIcon aria-hidden="true" />
                    Sistema
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}