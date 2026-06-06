import { Hero } from "@/components/hero/Hero";
import { CausasSection } from "@/components/cards/CausasSection";
import { OngsSection } from "@/components/cards/OngsSection";

const FILTER_TO_TIPO: Record<string, "dinero" | "especie" | "voluntariado"> = {
  Plata: "dinero",
  Cosas: "especie",
  Voluntariado: "voluntariado",
};

export default function Home({
  searchParams,
}: {
  searchParams: { filter?: string };
}) {
  const filter = searchParams.filter;

  let content: React.ReactNode;

  if (!filter || filter === "Todas") {
    content = (
      <>
        <CausasSection title="Nuevas causas" />
        <CausasSection title="Causas urgentes" urgenciaMin={4} />
      </>
    );
  } else if (filter === "Urgente") {
    content = <CausasSection title="Causas urgentes" urgenciaMin={4} limit={12} />;
  } else if (FILTER_TO_TIPO[filter]) {
    content = (
      <CausasSection
        title={`Causas · ${filter}`}
        tipoNecesidad={FILTER_TO_TIPO[filter]}
        limit={12}
      />
    );
  } else {
    content = <CausasSection title={`Causas · ${filter}`} limit={12} />;
  }

  return (
    <main className="flex flex-col gap-[60px] pb-20">
      <Hero />
      {content}
      <OngsSection />
    </main>
  );
}
