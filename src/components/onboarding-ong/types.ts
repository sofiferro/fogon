export interface OngOnboardingData {
  logoUrl: string;
  nombre: string;
  descripcion: string;
  causas: string[];
  razonSocial: string;
  cuit: string;
}

export interface OngStepProps {
  data: OngOnboardingData;
  onUpdate: (updates: Partial<OngOnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const CAUSAS_ONG = [
  "Salud",
  "Educación",
  "Infancia",
  "Derechos humanos",
  "Alimentación",
  "Medio ambiente",
  "Género",
  "Discapacidad",
];
