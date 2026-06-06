"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function publicarCampania(data: {
  titulo: string;
  descripcion: string;
  tipo: "dinero" | "especie" | "voluntariado";
  fechaLimite: string;
}): Promise<{ error: string } | void> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "No autenticado." };

  const { data: ong } = await supabase
    .from("ong")
    .select("id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!ong) return { error: "No encontramos tu organización." };

  const tipoMap = { dinero: "dinero", especie: "especie", voluntariado: "voluntariado" } as const;

  const { error } = await supabase.from("campania").insert({
    ong_id: ong.id,
    titulo: data.titulo,
    descripcion: data.descripcion,
    tipo_necesidad: tipoMap[data.tipo],
    fecha_limite: data.fechaLimite || null,
    estado: "activa",
  });

  if (error) return { error: error.message };

  redirect("/ong/dashboard");
}
