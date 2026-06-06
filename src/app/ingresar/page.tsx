import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Hero } from "@/components/hero/Hero";
import { CausasSection } from "@/components/cards/CausasSection";
import { OngsSection } from "@/components/cards/OngsSection";

export default async function IngresarPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const { data: ong } = await supabase
      .from("ong")
      .select("id")
      .eq("user_id", user.id)
      .maybeSingle();

    if (ong) redirect("/ong/dashboard");
  }

  return (
    <main className="flex flex-col gap-[60px] pb-20">
      <Hero />
      <CausasSection title="Nuevas causas" />
      <CausasSection title="Causas urgentes" urgenciaMin={4} />
      <OngsSection />
    </main>
  );
}
