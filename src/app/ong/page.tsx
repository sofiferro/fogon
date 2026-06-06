import Link from "next/link";
import { Plus } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MisCampanias } from "@/components/ong/MisCampanias";
import type { CampaniaOng } from "@/components/ong/CampaniaCardOng";

// TODO: reemplazar con fetch real desde Supabase
const MOCK_CAMPANIAS: CampaniaOng[] = [
  {
    id: "1",
    titulo: "Tratamientos 2026",
    descripcion:
      "Financiamos medicamentos y controles para personas con VIH que no tienen cobertura de salud en CABA y alrededores.",
    imagenUrl: null,
    estado: "activa",
    tipoNecesidad: "plata",
    objetivoMonto: 150000,
    objetivoCantidad: null,
    recaudado: 87000,
    donantes: 38,
    diasRestantes: 18,
  },
  {
    id: "2",
    titulo: "Bolsones alimentarios — invierno 2026",
    descripcion:
      "Distribuimos bolsones de alimentos secos a familias en situación de vulnerabilidad en el conurbano bonaerense.",
    imagenUrl: null,
    estado: "activa",
    tipoNecesidad: "especie",
    objetivoMonto: 40000,
    objetivoCantidad: null,
    recaudado: 23000,
    donantes: 14,
    diasRestantes: 34,
  },
  {
    id: "3",
    titulo: "Voluntarios médicos Q3",
    descripcion:
      "Necesitamos médicos, enfermeros y psicólogos para acompañamiento en consultorios externos. Modalidad presencial.",
    imagenUrl: null,
    estado: "borrador",
    tipoNecesidad: "voluntariado",
    objetivoMonto: null,
    objetivoCantidad: 20,
    recaudado: 0,
    donantes: 0,
    diasRestantes: null,
  },
  {
    id: "4",
    titulo: "Kits de insumos sanitarios 2025",
    descripcion:
      "Campaña cerrada. Distribuimos 1.200 kits con preservativos, jeringas y material informativo en puntos de distribución.",
    imagenUrl: null,
    estado: "cerrada",
    tipoNecesidad: "plata",
    objetivoMonto: 58000,
    objetivoCantidad: null,
    recaudado: 58000,
    donantes: 61,
    diasRestantes: 0,
  },
];

export default function OngHomePage() {
  return (
    <div className="flex flex-col gap-6 px-8 py-7">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Mis campañas</h1>
        <Link href="/ong/causas/nueva" className={cn(buttonVariants({ variant: "secondary" }), "gap-2 rounded-full px-5")}>
            <Plus className="size-4" />
            Nueva campaña
        </Link>
      </div>

      <MisCampanias campanias={MOCK_CAMPANIAS} />
    </div>
  );
}
