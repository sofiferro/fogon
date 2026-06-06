import type { StepProps } from "../types";

export function StepContacto({ data, onUpdate, onNext, onBack }: StepProps) {
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onNext();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-foreground">Email</label>
        <input
          type="email"
          required
          value={data.email}
          onChange={(e) => onUpdate({ email: e.target.value })}
          placeholder="tu@email.com"
          className="h-11 px-4 rounded-xl border border-border bg-white text-sm outline-none focus:border-secondary transition-colors placeholder:text-[#897c5e]/60"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-foreground">
          Teléfono{" "}
          <span className="text-[#897c5e] font-normal">(opcional)</span>
        </label>
        <input
          type="tel"
          value={data.telefono}
          onChange={(e) => onUpdate({ telefono: e.target.value })}
          placeholder="+54 9 11 1234-5678"
          className="h-11 px-4 rounded-xl border border-border bg-white text-sm outline-none focus:border-secondary transition-colors placeholder:text-[#897c5e]/60"
        />
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
          type="submit"
          disabled={!data.email.trim()}
          className="flex-1 h-11 rounded-full bg-secondary text-secondary-foreground font-medium text-sm hover:bg-secondary/90 transition-colors disabled:opacity-40"
        >
          Continuar
        </button>
      </div>
    </form>
  );
}
