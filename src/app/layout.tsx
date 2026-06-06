import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "fogon",
  description: "Plataforma que conecta ONGs con donantes",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <html lang="es">
      <body className="antialiased">
        <Navbar user={user} />
        {children}
      </body>
    </html>
  );
}
