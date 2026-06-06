"use client";

import { useState } from "react";
import { FilterPill } from "./FilterPill";

const FILTERS = [
  "Todas",
  "Urgente",
  "Plata",
  "Cosas",
  "Voluntariado",
  "Salud",
  "Niñez",
  "Alimentación",
  "Derechos",
];

export function FilterRow() {
  const [active, setActive] = useState("Todas");

  return (
    <div className="flex gap-2 items-center justify-center flex-wrap">
      {FILTERS.map((filter) => (
        <FilterPill
          key={filter}
          label={filter}
          active={active === filter}
          onClick={() => setActive(filter)}
        />
      ))}
    </div>
  );
}
