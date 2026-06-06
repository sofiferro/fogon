export interface OnboardingData {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  intereses: string[];
  objetivo_tipo: "plata" | "especie" | "voluntariado" | "";
  objetivo_meta: string;
}

export interface StepProps {
  data: OnboardingData;
  onUpdate: (updates: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}
