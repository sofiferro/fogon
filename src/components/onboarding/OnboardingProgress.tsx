import { cn } from "@/lib/utils";

const STEPS = ["¿Quién sos?", "Tu contacto", "Tus intereses", "Tu objetivo"];

interface OnboardingProgressProps {
  currentStep: number;
}

export function OnboardingProgress({ currentStep }: OnboardingProgressProps) {
  return (
    <div className="flex flex-col items-center gap-3 w-full">
      {/* Barra */}
      <div className="flex gap-1.5 w-full max-w-xs">
        {STEPS.map((_, i) => (
          <div
            key={i}
            className={cn(
              "flex-1 h-1 rounded-full transition-colors duration-300",
              i <= currentStep ? "bg-secondary" : "bg-border"
            )}
          />
        ))}
      </div>
      {/* Label del paso actual */}
      <p className="text-xs text-[#897c5e]">
        Paso {currentStep + 1} de {STEPS.length} · {STEPS[currentStep]}
      </p>
    </div>
  );
}
