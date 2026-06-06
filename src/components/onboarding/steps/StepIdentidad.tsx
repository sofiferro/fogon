import type { StepProps } from "../types";

export function StepIdentidad({ data, onUpdate, onNext }: StepProps) {
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onNext();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-foreground">Nombre</label>
        <input
          type="text"
          required
          value={data.nombre}
          onChange={(e) => onUpdate({ nombre: e.target.value })}
          placeholder="María"
          className="h-11 px-4 rounded-xl border border-border bg-white text-sm outline-none focus:border-secondary transition-colors placeholder:text-[#897c5e]/60"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-foreground">Apellido</label>
        <input
          type="text"
          required
          value={data.apellido}
          onChange={(e) => onUpdate({ apellido: e.target.value })}
          placeholder="González"
          className="h-11 px-4 rounded-xl border border-border bg-white text-sm outline-none focus:border-secondary transition-colors placeholder:text-[#897c5e]/60"
        />
      </div>

      <button
        type="submit"
        disabled={!data.nombre.trim() || !data.apellido.trim()}
        className="h-11 rounded-full bg-secondary text-secondary-foreground font-medium text-sm hover:bg-secondary/90 transition-colors disabled:opacity-40 mt-1"
      >
        Continuar
      </button>
    </form>
  );
}
