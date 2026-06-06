"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface CampaniaDemo {
  id: string;
  titulo: string;
  descripcion: string;
  tipo: "dinero" | "especie" | "voluntariado";
  fechaLimite: string;
  imagenPreview: string | null;
  creadaEn: string;
}

const TIPO_LABEL = { dinero: "Dinero", especie: "Cosas", voluntariado: "Voluntariado" };

export function CampaniasDemoList() {
  const [campanias, setCampanias] = useState<CampaniaDemo[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("campanias_demo");
    if (stored) setCampanias(JSON.parse(stored));
  }, []);

  if (campanias.length === 0) return null;

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-[11px] font-bold text-[rgba(81,13,9,0.5)] tracking-widest uppercase">
        Mis campañas
      </h2>
      <div className="flex flex-col gap-3">
        {campanias.map((c) => (
          <div
            key={c.id}
            className="bg-white rounded-[16px] border-[1.5px] border-[rgba(81,13,9,0.08)] p-4 flex items-center gap-4"
          >
            <div className="w-[52px] h-[52px] rounded-[12px] overflow-hidden shrink-0 bg-[#fff2d8] flex items-center justify-center">
              {c.imagenPreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={c.imagenPreview} alt={c.titulo} className="w-full h-full object-cover" />
              ) : (
                <span className="text-[22px]">{c.tipo === "dinero" ? "💰" : c.tipo === "especie" ? "📦" : "🤝"}</span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[15px] font-bold text-[#510d09] truncate">{c.titulo}</p>
              <p className="text-[13px] text-[rgba(81,13,9,0.5)]">{TIPO_LABEL[c.tipo]}</p>
            </div>
            <span className="text-[11px] text-green-700 bg-green-100 px-2 py-[3px] rounded-full font-medium shrink-0">
              Activa
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
