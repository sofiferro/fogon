"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, Megaphone, Users, BarChart2, Settings } from "lucide-react";
import { ColmenaLogoIcon } from "@/components/ColmenaLogo";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { icon: LayoutGrid,  href: "/ong",          label: "Dashboard",     exact: true },
  { icon: Megaphone,   href: "/ong/causas",   label: "Campañas" },
  { icon: Users,       href: "/ong/donantes", label: "Donantes" },
  { icon: BarChart2,   href: "/ong/reportes", label: "Reportes" },
  { icon: Settings,    href: "/ong/config",   label: "Configuración" },
];

export function OngSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-[60px] bg-secondary z-40 flex flex-col items-center py-4">
      {/* Logo */}
      <Link href="/ong" className="mb-6 mt-1">
        <ColmenaLogoIcon className="h-7 w-6 [filter:brightness(10)]" />
      </Link>

      {/* Nav */}
      <nav className="flex flex-col gap-1 flex-1">
        {NAV_ITEMS.map(({ icon: Icon, href, label, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              title={label}
              className={cn(
                "size-10 rounded-xl flex items-center justify-center transition-colors",
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-secondary-foreground/50 hover:bg-white/10 hover:text-secondary-foreground"
              )}
            >
              <Icon className="size-5" />
            </Link>
          );
        })}
      </nav>

      {/* Avatar */}
      <div className="size-9 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground select-none">
        FH
      </div>
    </aside>
  );
}
