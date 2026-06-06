"use client";

import { useState } from "react";
import { saveOnboarding } from "@/actions/auth";
import { OnboardingProgress } from "./OnboardingProgress";
import { StepIdentidad } from "./steps/StepIdentidad";
import { StepContacto } from "./steps/StepContacto";
import { StepIntereses } from "./steps/StepIntereses";
import { StepObjetivo } from "./steps/StepObjetivo";
import type { OnboardingData } from "./types";
import { ColmenaLogoIcon } from "@/components/ColmenaLogo";

const STEP_TITLES = [
  { title: "¿Cómo te llamás?", sub: "Usaremos tu nombre para personalizar tu experiencia." },
  { title: "¿Cómo te contactamos?", sub: "Para mantenerte al tanto de las causas que seguís." },
  { title: "¿Qué te interesa?", sub: "Seleccioná al menos una categoría." },
  { title: "¿Cuál es tu objetivo?", sub: "Podés cambiar esto más adelante." },
];

interface OnboardingFlowProps {
  userEmail: string;
}

export function OnboardingFlow({ userEmail }: OnboardingFlowProps) {
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const [data, setData] = useState<OnboardingData>({
    nombre: "",
    apellido: "",
    email: userEmail,
    telefono: "",
    intereses: [],
    objetivo_tipo: "",
    objetivo_meta: "",
  });

  function handleUpdate(updates: Partial<OnboardingData>) {
    setData((prev) => ({ ...prev, ...updates }));
  }

  async function handleSubmit() {
    setSubmitting(true);
    setServerError(null);
    const result = await saveOnboarding({
      ...data,
      objetivo_tipo: data.objetivo_tipo as "plata" | "especie" | "voluntariado",
      objetivo_meta: data.objetivo_meta ? Number(data.objetivo_meta) : null,
    });
    if (result?.error) {
      setServerError(result.error);
      setSubmitting(false);
    }
  }

  const stepProps = {
    data,
    onUpdate: handleUpdate,
    onNext: () => setStep((s) => s + 1),
    onBack: () => setStep((s) => s - 1),
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-sm">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <ColmenaLogoIcon className="h-[26px] w-[22px]" />
        <span className="text-[21px] font-semibold tracking-[-0.04em] text-secondary leading-none">
          colmena
        </span>
      </div>

      {/* Progreso */}
      <OnboardingProgress currentStep={step} />

      {/* Título del paso */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-secondary">{STEP_TITLES[step].title}</h1>
        <p className="text-sm text-[#767676] mt-1">{STEP_TITLES[step].sub}</p>
      </div>

      {/* Steps */}
      {step === 0 && <StepIdentidad {...stepProps} />}
      {step === 1 && <StepContacto {...stepProps} />}
      {step === 2 && <StepIntereses {...stepProps} />}
      {step === 3 && (
        <StepObjetivo {...stepProps} onSubmit={handleSubmit} submitting={submitting} />
      )}

      {serverError && (
        <p className="text-sm text-red-600 text-center">{serverError}</p>
      )}
    </div>
  );
}
