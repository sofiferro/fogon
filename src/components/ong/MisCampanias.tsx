"use client";

import { useState } from "react";
import Link from "next/link";
import { Megaphone, Plus } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CampaniaCardOng } from "./CampaniaCardOng";
import type { CampaniaOng, EstadoCampania } from "./CampaniaCardOng";

type Filtro = "todas" | EstadoCampania;

const FILTROS: { id: Filtro; label: string }[] = [
  { id: "todas",    label: "Todas" },
  { id: "activa",   label: "Activas" },
  { id: "borrador", label: "Borradores" },
  { id: "cerrada",  label: "Cerradas" },
];

const EMPTY_LABELS: Record<Filtro, string> = {
  todas:    "Todavía no creaste ninguna campaña.",
  activa:   "No tenés campañas activas.",
  borrador: "No tenés borradores guardados.",
  cerrada:  "No tenés campañas cerradas.",
};

interface MisCampaniasProps {
  campanias: CampaniaOng[];
}

export function MisCampanias({ campanias }: MisCampaniasProps) {
  const [filtro, setFiltro] = useState<Filtro>("todas");

  const visibles = filtro === "todas"
    ? campanias
    : campanias.filter((c) => c.estado === filtro);

  return (
    <div className="flex flex-col gap-6">
      {/* Filtros */}
      <div className="flex gap-2">
        {FILTROS.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setFiltro(id)}
            className={cn(
              "px-4 h-9 rounded-full text-sm font-medium border transition-all",
              filtro === id
                ? "bg-secondary text-secondary-foreground border-secondary"
                : "bg-card text-foreground border-border hover:bg-muted"
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Grid o empty state */}
      {visibles.length > 0 ? (
        <div className="grid grid-cols-2 gap-5">
          {visibles.map((c) => (
            <CampaniaCardOng key={c.id} campania={c} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
          <div className="size-14 rounded-2xl bg-muted flex items-center justify-center">
            <Megaphone className="size-7 text-muted-foreground" />
          </div>
          <div>
            <p className="font-semibold text-foreground">{EMPTY_LABELS[filtro]}</p>
            <p className="text-sm text-muted-foreground mt-1">
              Creá una campaña para empezar a recibir donaciones.
            </p>
          </div>
          <Link href="/ong/causas/nueva" className={cn(buttonVariants({ variant: "secondary", size: "sm" }), "gap-1.5 rounded-full")}>
              <Plus className="size-4" />
              Nueva campaña
          </Link>
        </div>
      )}
    </div>
  );
}
