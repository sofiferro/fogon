import { cn } from "@/lib/utils";
import type { StepProps } from "../types";

const TIPOS = [
  { value: "plata", label: "Donar plata", desc: "Establecé un monto anual en $" },
  { value: "especie", label: "Donar cosas", desc: "Establecé una cantidad de donaciones" },
  { value: "voluntariado", label: "Voluntariado", desc: "Establecé una cantidad de horas o salidas" },
] as const;

interface StepObjetivoProps extends StepProps {
  onSubmit: () => Promise<void>;
  submitting: boolean;
}

export function StepObjetivo({ data, onUpdate, onBack, onSubmit, submitting }: StepObjetivoProps) {
  const tipoSeleccionado = TIPOS.find((t) => t.value === data.objetivo_tipo);
  const metaLabel =
    data.objetivo_tipo === "plata" ? "Meta anual en pesos (opcional)" : "Meta anual en cantidad (opcional)";
  const metaPlaceholder =
    data.objetivo_tipo === "plata" ? "ej: 50000" : "ej: 12";

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* Tipo */}
      <div className="flex flex-col gap-2">
        {TIPOS.map((tipo) => {
          const activo = data.objetivo_tipo === tipo.value;
          return (
            <button
              key={tipo.value}
              type="button"
              onClick={() => onUpdate({ objetivo_tipo: tipo.value, objetivo_meta: "" })}
              className={cn(
                "flex flex-col items-start px-4 py-3 rounded-xl border text-left transition-colors",
                activo
                  ? "border-secondary bg-secondary/5"
                  : "border-border bg-white hover:border-secondary/40"
              )}
            >
              <span className={cn("text-sm font-medium", activo ? "text-secondary" : "text-foreground")}>
                {tipo.label}
              </span>
              <span className="text-xs text-[#767676] mt-0.5">{tipo.desc}</span>
            </button>
          );
        })}
      </div>

      {/* Meta (solo si hay tipo seleccionado) */}
      {tipoSeleccionado && (
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-foreground">{metaLabel}</label>
          <input
            type="number"
            min={1}
            value={data.objetivo_meta}
            onChange={(e) => onUpdate({ objetivo_meta: e.target.value })}
            placeholder={metaPlaceholder}
            className="h-11 px-4 rounded-xl border border-border bg-white text-sm outline-none focus:border-secondary transition-colors placeholder:text-[#897c5e]/60"
          />
        </div>
      )}

      <div className="flex gap-3 mt-1">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 h-11 rounded-full border border-border text-foreground font-medium text-sm hover:bg-muted/50 transition-colors"
        >
          Atrás
        </button>
        <button
          type="button"
          onClick={onSubmit}
          disabled={!data.objetivo_tipo || submitting}
          className="flex-1 h-11 rounded-full bg-secondary text-secondary-foreground font-medium text-sm hover:bg-secondary/90 transition-colors disabled:opacity-40"
        >
          {submitting ? "Guardando..." : "Empezar"}
        </button>
      </div>
    </div>
  );
}
