import { createClient } from "@/lib/supabase/server";
import { SectionHeader } from "./SectionHeader";
import { OngCard } from "./OngCard";

interface OngsSectionProps {
  title?: string;
  limit?: number;
}

export async function OngsSection({ title = "Conocé ONGs", limit = 5 }: OngsSectionProps) {
  const supabase = await createClient();

  // Traemos ONGs distintas que tienen campañas activas (sin necesitar leer ong directamente)
  const { data: campanias } = await supabase
    .from("campania")
    .select("ong_id, tipo_necesidad")
    .eq("estado", "activa");

  if (!campanias?.length) return null;

  // Agrupamos por ong_id
  const ongMap = new Map<string, { causasActivas: number; tipos: string[] }>();
  for (const c of campanias) {
    if (!c.ong_id) continue;
    const entry = ongMap.get(c.ong_id) ?? { causasActivas: 0, tipos: [] };
    entry.causasActivas += 1;
    if (!entry.tipos.includes(c.tipo_necesidad)) entry.tipos.push(c.tipo_necesidad);
    ongMap.set(c.ong_id, entry);
  }

  const ongIds = Array.from(ongMap.keys()).slice(0, limit);
  if (!ongIds.length) return null;

  return (
    <section className="flex flex-col gap-5 px-20 w-full">
      <SectionHeader title={title} />
      <div className="grid grid-cols-5 gap-3 w-full">
        {ongIds.map((ongId) => {
          const info = ongMap.get(ongId)!;
          const tipoLabel = info.tipos[0] === "plata" ? "Dinero" : info.tipos[0] === "especie" ? "Especie" : "Voluntariado";
          return (
            <OngCard
              key={ongId}
              id={ongId}
              nombre={ongId.slice(0, 8).toUpperCase()}
              logoUrl={null}
              categoria={tipoLabel}
              causasActivas={info.causasActivas}
            />
          );
        })}
      </div>
    </section>
  );
}
