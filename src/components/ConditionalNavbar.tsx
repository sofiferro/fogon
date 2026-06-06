"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import type { User } from "@supabase/supabase-js";

interface ConditionalNavbarProps {
  user?: User | null;
}

export function ConditionalNavbar({ user }: ConditionalNavbarProps) {
  const pathname = usePathname();
  if (pathname.startsWith("/onboarding") || pathname.startsWith("/login")) return null;
  return <Navbar user={user} />;
}
