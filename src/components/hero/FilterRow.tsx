"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FilterPill } from "./FilterPill";

const FILTERS = [
  "Todas",
  "Urgente",
  "Dinero",
  "Cosas",
  "Voluntariado",
  "Salud",
  "Niñez",
  "Alimentación",
  "Derechos",
];

export function FilterRow() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const active = searchParams.get("filter") ?? "Todas";

  function handleFilter(filter: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (filter === "Todas") {
      params.delete("filter");
    } else {
      params.set("filter", filter);
    }
    const qs = params.toString();
    router.push(qs ? `/?${qs}` : "/");
  }

  return (
    <div className="flex gap-2 items-center justify-center flex-wrap">
      {FILTERS.map((filter) => (
        <FilterPill
          key={filter}
          label={filter}
          active={active === filter}
          onClick={() => handleFilter(filter)}
        />
      ))}
    </div>
  );
}
