import clsx from "clsx";
import Link from "next/link";
import { ThemeToggleButton } from "../ThemeToogleButton";

export function NavBar() {
  return (
    <nav
      className={clsx(
        "fixed left-1/2 -translate-x-1/2 z-10 justify-center items-center",
        "flex gap-6",
        "px-4 py-2 mt-4",
        'rounded-md',
        "bg-background/60",
        "backdrop-blur-md",
        "border border-border",
      )}
    >
      <NavItem href="#home">Início</NavItem>
      <NavItem href="#features">Funcionalidades</NavItem>
      <NavItem href="/login">Login</NavItem>
      <span><ThemeToggleButton /></span>
    </nav>
  );
}

function NavItem({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const isInternal = href.startsWith('/');
  const classes = clsx(
    "text-sm text-muted-foreground",
    "hover:text-foreground",
    "transition-all duration-200",
    "hover:scale-105"
  );
  if (isInternal) return <Link className={classes} href={href}>{children}</Link>;

  return (
    <a
      href={href}
      className={classes}
    >
      {children}
    </a>
  );
}