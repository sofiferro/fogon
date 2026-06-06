"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function saveOnboarding(formData: {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  intereses: string[];
  objetivo_tipo: "plata" | "especie" | "voluntariado";
  objetivo_meta: number | null;
}): Promise<{ error: string } | void> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "No autenticado." };

  const { data: donante, error: donanteError } = await supabase
    .from("donante")
    .insert({
      user_id: user.id,
      tipo: "persona",
      email: formData.email,
      telefono: formData.telefono || null,
      nombre: formData.nombre,
      apellido: formData.apellido,
      intereses: formData.intereses,
    })
    .select("id")
    .single();

  if (donanteError) return { error: donanteError.message };

  if (formData.objetivo_tipo) {
    const isPlata = formData.objetivo_tipo === "plata";
    await supabase.from("objetivo_donante").insert({
      donante_id: donante.id,
      anio: new Date().getFullYear(),
      tipo: formData.objetivo_tipo,
      meta_monto: isPlata ? formData.objetivo_meta : null,
      meta_cantidad: !isPlata ? formData.objetivo_meta : null,
      progreso_cantidad: 0,
      progreso_monto: 0,
      estado: formData.objetivo_meta ? "en_curso" : "sin_meta",
    });
  }

  redirect("/ingresar");
}
