import clsx from "clsx";

export function NavBar() {
  return (
    <nav
      className={clsx(
        "fixed left-1/2 -translate-x-1/2",
        "flex gap-6",
        "px-6 py-3 mt-4",
        "rounded-full",
        "bg-black/30 backdrop-blur-md",
        "border border-white/10",
        "shadow-xl"
      )}
    >
      <NavItem href="#">Início</NavItem>
      <NavItem href="#">Funcionalidades</NavItem>
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
  return (
    <a
      href={href}
      className={clsx(
        "text-sm text-white/70",
        "hover:text-white",
        "transition-all duration-200",
        "hover:scale-105"
      )}
    >
      {children}
    </a>
  );
}