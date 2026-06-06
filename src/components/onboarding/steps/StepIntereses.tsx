import { cn } from "@/lib/utils";
import type { StepProps } from "../types";

const INTERESES = [
  "Salud",
  "Niñez",
  "Alimentación",
  "Derechos",
  "Educación",
  "Medioambiente",
  "Animales",
  "Personas mayores",
  "Discapacidad",
];

export function StepIntereses({ data, onUpdate, onNext, onBack }: StepProps) {
  function toggle(interes: string) {
    const ya = data.intereses.includes(interes);
    onUpdate({
      intereses: ya
        ? data.intereses.filter((i) => i !== interes)
        : [...data.intereses, interes],
    });
  }

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex flex-wrap gap-2">
        {INTERESES.map((interes) => {
          const activo = data.intereses.includes(interes);
          return (
            <button
              key={interes}
              type="button"
              onClick={() => toggle(interes)}
              className={cn(
                "px-4 py-2.5 rounded-full border text-sm transition-colors",
                activo
                  ? "bg-secondary text-secondary-foreground border-secondary"
                  : "bg-white border-border text-foreground hover:border-secondary/40"
              )}
            >
              {interes}
            </button>
          );
        })}
      </div>

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
          onClick={onNext}
          disabled={data.intereses.length === 0}
          className="flex-1 h-11 rounded-full bg-secondary text-secondary-foreground font-medium text-sm hover:bg-secondary/90 transition-colors disabled:opacity-40"
        >
          Continuar
        </button>
      </div>
    </div>
  );
}
