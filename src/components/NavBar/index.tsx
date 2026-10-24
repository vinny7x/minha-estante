'use client';

import clsx from "clsx";
import { BookOpen, Library, LogIn, LogOut, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "@/lib/auth/auth-client";
import { ThemeToggleButton } from "../ThemeToogleButton";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navLinks = [
  { href: "/", label: "Início", icon: BookOpen },
  { href: "/library", label: "Minha estante", icon: Library },
];

export function NavBar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const user = session?.user;
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : user?.email?.slice(0, 2).toUpperCase() || "ME";

  return (
    <header className="sticky top-0 left-0 right-0 z-50 px-2 py-1.5 sm:px-4 sm:py-2">
      <nav
        className={clsx(
          "mx-auto flex w-full max-w-6xl items-center justify-between gap-2",
          "rounded-lg px-2 py-1 sm:px-4 sm:py-1.5 md:px-6",
          "bg-background/70 backdrop-blur-xl",
          "border border-border/60 shadow-sm"
        )}
      >
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <BookOpen className="h-4 w-4" />
          </div>
          <span className="hidden text-sm font-semibold tracking-tight sm:block">
            Minha Estante
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm",
                  active
                    ? "bg-primary/10 text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/60"
                )}
              >
                <Icon className="h-4 w-4" />
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-0.5">
          <ThemeToggleButton />
          <div className="hidden sm:flex">
            {session === undefined ? (
              <div className="h-8 w-8" />
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.image || ""} alt={user.name || user.email || "Usuário"} />
                      <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="flex flex-col gap-1">
                    <span className="text-sm font-medium">{user.name || "Usuário"}</span>
                    <span className="text-xs text-muted-foreground">{user.email}</span>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/library">Minha estante</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/logout" className="flex items-center gap-2">
                      <LogOut className="h-4 w-4" />
                      Sair
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild size="sm" className="gap-1.5">
                <Link href="/login">
                  <LogIn className="h-4 w-4" />
                  Entrar
                </Link>
              </Button>
            )}
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Abrir menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-70">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <BookOpen className="h-4 w-4" />
                  </div>
                  Minha Estante
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-2 px-4">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const active = isActive(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={clsx(
                        "flex items-center gap-2 rounded-lg px-3 py-2 text-sm",
                        active
                          ? "bg-primary/10 text-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent/60"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {link.label}
                    </Link>
                  );
                })}
                <div className="mt-2 border-t border-border pt-2">
                  {session === undefined ? (
                    <div className="h-9 w-full" />
                  ) : session?.user ? (
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2 px-2">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={session.user.image || ""} alt={session.user.name || session.user.email || "Usuário"} />
                          <AvatarFallback>
                            {session.user.name
                              ? session.user.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")
                                  .slice(0, 2)
                                  .toUpperCase()
                              : session.user.email?.slice(0, 2).toUpperCase() || "ME"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">{session.user.name || "Usuário"}</span>
                          <span className="text-xs text-muted-foreground">{session.user.email}</span>
                        </div>
                      </div>
                      <Button asChild variant="ghost" className="w-full justify-start gap-2">
                        <Link href="/library">Minha estante</Link>
                      </Button>
                      <Button asChild variant="ghost" className="w-full justify-start gap-2">
                        <Link href="/logout">
                          <LogOut className="h-4 w-4" />
                          Sair
                        </Link>
                      </Button>
                    </div>
                  ) : (
                    <Button asChild className="w-full justify-start gap-2">
                      <Link href="/login">
                        <LogIn className="h-4 w-4" />
                        Entrar
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
