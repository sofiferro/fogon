import { createAdminClient } from "@/lib/supabase/admin";
import { SectionHeader } from "./SectionHeader";
import { OngCard } from "./OngCard";

interface OngsSectionProps {
  title?: string;
  limit?: number;
}

export async function OngsSection({ title = "Conocé ONGs", limit = 5 }: OngsSectionProps) {
  const supabase = createAdminClient();

  // Traer todas las ONGs
  const { data: todasOngs } = await supabase
    .from("ong")
    .select("id, nombre, logo_url");

  if (!todasOngs?.length) return null;

  // Contar campañas activas por ONG
  const { data: campanias } = await supabase
    .from("campania")
    .select("ong_id")
    .eq("estado", "activa");

  const conteo = new Map<string, number>();
  for (const c of campanias ?? []) {
    conteo.set(c.ong_id, (conteo.get(c.ong_id) ?? 0) + 1);
  }

  const ongs = todasOngs
    .map((ong) => ({
      id: ong.id,
      nombre: ong.nombre,
      logoUrl: ong.logo_url,
      causasActivas: conteo.get(ong.id) ?? 0,
    }))
    .sort((a, b) => b.causasActivas - a.causasActivas)
    .slice(0, limit);

  if (!ongs.length) return null;

  return (
    <section className="flex flex-col gap-5 px-20 w-full">
      <SectionHeader title={title} />
      <div className="grid grid-cols-5 gap-3 w-full">
        {ongs.map((ong) => (
          <OngCard
            key={ong.id}
            id={ong.id}
            nombre={ong.nombre}
            logoUrl={ong.logoUrl}
            categoria=""
            causasActivas={ong.causasActivas}
            priority
          />
        ))}
      </div>
    </section>
  );
}
