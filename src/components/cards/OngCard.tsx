"use client";

import Link from "next/link";
import { useState } from "react";

export interface OngCardProps {
  id: string;
  nombre: string;
  logoUrl: string | null;
  categoria: string;
  causasActivas: number;
  priority?: boolean;
}

function OngLogo({ src, nombre }: { src: string | null; nombre: string }) {
  const [error, setError] = useState(false);

  if (!src || error) {
    return (
      <span className="text-3xl font-bold text-[#510d09]/30 select-none">
        {nombre.charAt(0).toUpperCase()}
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={nombre}
      onError={() => setError(true)}
      className="w-full h-full object-cover"
    />
  );
}

export function OngCard({ id, nombre, logoUrl, categoria, causasActivas }: OngCardProps) {
  return (
    <div className="flex flex-col items-center gap-4 bg-[#fffefa] border border-[#e6dbc5] rounded-[24px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] pt-4 px-6 pb-6">
      {/* Logo circular */}
      <div className="relative flex items-center justify-center size-[175px] rounded-full border-4 border-[rgba(254,189,48,0.1)] overflow-hidden bg-muted shrink-0">
        <OngLogo src={logoUrl} nombre={nombre} />
      </div>

      {/* Info centrada */}
      <div className="flex flex-col items-center text-center w-full gap-0.5">
        <p className="text-[16px] font-bold text-[#1a1a1a] leading-[1.4] w-full truncate text-center">
          {nombre}
        </p>
        <p className="text-[13px] text-[#767676] leading-normal">
          {categoria} · {causasActivas} {causasActivas === 1 ? "causa activa" : "causas activas"}
        </p>
      </div>

      {/* CTA */}
      <Link
        href={`/ongs/${id}`}
        className="flex items-center justify-center h-8 w-full rounded-full bg-[#fff2d8] border border-[#e6dbc5] text-[#510d09] text-[12px] font-medium hover:bg-[#fff2d8]/70 transition-colors shadow-[0px_1px_1px_rgba(0,0,0,0.05)]"
      >
        Saber más
      </Link>
    </div>
  );
}
