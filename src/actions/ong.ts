"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function saveOngOnboarding(formData: {
  nombre: string;
  descripcion: string;
  logoUrl: string | null;
  razonSocial: string;
  cuit: string;
}): Promise<{ error: string } | void> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "No autenticado." };

  const { error } = await supabase.from("ong").insert({
    user_id: user.id,
    nombre: formData.nombre,
    descripcion: formData.descripcion,
    logo_url: formData.logoUrl || null,
    razon_social: formData.razonSocial || null,
    cuit: formData.cuit || null,
  });

  if (error) return { error: error.message };

  redirect("/ong/dashboard");
}
