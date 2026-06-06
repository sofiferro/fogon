import { Hero } from "@/components/hero/Hero";
import { CausasSection } from "@/components/cards/CausasSection";
import { OngsSection } from "@/components/cards/OngsSection";

export default function IngresarPage() {
  return (
    <main className="flex flex-col gap-[60px] pb-20">
      <Hero />
      <CausasSection title="Nuevas causas" />
      <CausasSection title="Causas urgentes" urgenciaMin={4} />
      <OngsSection />
    </main>
  );
}
