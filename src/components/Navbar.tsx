import Link from "next/link";
import { ChevronDown, Search } from "lucide-react";
import { ColmenaLogo } from "./ColmenaLogo";
import { cn } from "@/lib/utils";
import { logout } from "@/lib/supabase/actions/auth";
import type { User } from "@supabase/supabase-js";

const NAV_LINKS = [
  { label: "Causas", href: "/#causas" },
  { label: "ONGs", href: "/#ongs" },
];

interface NavbarProps {
  user?: User | null;
}

export function Navbar({ user }: NavbarProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-6 pt-4">
      <div className="flex items-center gap-6">
        {/* Píldora principal */}
        <nav
          className="flex items-center gap-20 h-12 px-8 rounded-full
            bg-muted border border-border
            shadow-[0px_1px_1px_rgba(0,0,0,0.05)]"
        >
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <ColmenaLogo className="h-[27px] w-auto" />
          </Link>

          {/* Links de navegación */}
          <div className="flex items-center gap-8">
            {/* Buscar */}
            <button className="flex items-center gap-2 text-sm font-medium text-foreground hover:opacity-70 transition-opacity">
              <Search size={16} strokeWidth={2} />
              Buscar
            </button>

            {/* Links con chevron */}
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-1 text-sm font-medium text-foreground hover:opacity-70 transition-opacity"
              >
                {link.label}
                <ChevronDown size={10} strokeWidth={2.5} />
              </Link>
            ))}
          </div>
        </nav>

        {/* Botón Ingresar / Cerrar sesión */}
        {user ? (
          <form action={logout}>
            <button
              type="submit"
              className={cn(
                "h-12 px-6 rounded-full inline-flex items-center justify-center",
                "bg-secondary text-secondary-foreground hover:bg-secondary/90",
                "text-base font-medium shadow-[0px_1px_1px_rgba(0,0,0,0.05)]",
                "transition-colors"
              )}
            >
              Cerrar sesión
            </button>
          </form>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              href="/ong/login"
              className="text-sm font-medium text-foreground hover:opacity-70 transition-opacity"
            >
              Soy una ONG
            </Link>
            <Link
              href="/login"
              className={cn(
                "h-12 px-6 rounded-full inline-flex items-center justify-center",
                "bg-secondary text-secondary-foreground hover:bg-secondary/90",
                "text-base font-medium shadow-[0px_1px_1px_rgba(0,0,0,0.05)]",
                "transition-colors"
              )}
            >
              Ingresar
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
