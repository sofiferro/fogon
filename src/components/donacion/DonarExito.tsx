"use client";

import Link from "next/link";
import { Heart, Package, Users, Check, Copy } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// ── Types ──────────────────────────────────────────────────────────────────

type TipoCausa = "plata" | "especie" | "voluntariado";

interface BaseExito {
  donante: string;
  campania: string;
  ong: string;
  ongId: string;
  fecha: string;
}

export interface ExitoPlata extends BaseExito {
  tipo: "plata";
  monto: number;
  modalidad: "unica" | "mensual";
  impactoDesc?: string;
}

export interface ExitoEspecie extends BaseExito {
  tipo: "especie";
  items: string[];
  contacto: string;
}

export interface ExitoVoluntariado extends BaseExito {
  tipo: "voluntariado";
  oferta: string;
  contacto: string;
}

export type ExitoData = ExitoPlata | ExitoEspecie | ExitoVoluntariado;

// ── Utils ──────────────────────────────────────────────────────────────────

function formatARS(n: number) {
  return `$${n.toLocaleString("es-AR")}`;
}

// ── Sub-components ─────────────────────────────────────────────────────────

function ResumenRow({
  label, value, highlight,
}: {
  label: string; value: string; highlight?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-3 border-b border-[#e6dbc5] last:border-0">
      <span className="text-sm text-foreground/60 shrink-0">{label}</span>
      <span className={cn(
        "text-sm font-semibold text-right",
        highlight ? "text-primary" : "text-foreground"
      )}>
        {value}
      </span>
    </div>
  );
}

const PASOS: Record<"especie" | "voluntariado", { titulo: string; desc: string; done: boolean; pendiente?: boolean }[]> = {
  especie: [
    { titulo: "Tu oferta fue registrada", desc: "Guardamos los items que elegiste y tus datos de contacto.", done: true },
    { titulo: "La ONG te contacta", desc: "Te van a escribir al mail en las próximas 48hs para coordinar entrega o retiro.", done: false, pendiente: true },
    { titulo: "Coordinan los detalles", desc: "Lugar de entrega, horario y condición de los items.", done: false },
    { titulo: "¡Listo!", desc: "Tu aporte llega a quienes más lo necesitan.", done: false },
  ],
  voluntariado: [
    { titulo: "Tu oferta fue registrada", desc: "Guardamos tu disponibilidad y tus datos de contacto.", done: true },
    { titulo: "La ONG te contacta", desc: "Te van a escribir al mail en las próximas 48hs para coordinar los detalles.", done: false, pendiente: true },
    { titulo: "Coordinan los detalles", desc: "Lugar, horario y actividades a realizar.", done: false },
    { titulo: "¡Listo!", desc: "Tu tiempo y energía hacen la diferencia.", done: false },
  ],
};

function Stepper({ tipo }: { tipo: "especie" | "voluntariado" }) {
  const pasos = PASOS[tipo];
  return (
    <div className="flex flex-col">
      {pasos.map((paso, i) => (
        <div key={i} className="flex gap-3">
          <div className="flex flex-col items-center">
            <div className={cn(
              "size-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold mt-0.5",
              paso.done
                ? "bg-primary text-primary-foreground"
                : "bg-[#e6dbc5] text-foreground/50"
            )}>
              {paso.done ? <Check className="size-3.5" /> : i + 1}
            </div>
            {i < pasos.length - 1 && (
              <div className="w-px flex-1 bg-[#e6dbc5] my-1" />
            )}
          </div>
          <div className={cn("flex flex-col gap-0.5 min-w-0", i < pasos.length - 1 ? "pb-5" : "pb-0")}>
            <p className="text-sm font-semibold text-foreground">{paso.titulo}</p>
            <p className="text-xs text-foreground/60 leading-relaxed">{paso.desc}</p>
            {paso.pendiente && (
              <span className="mt-1.5 self-start text-[10px] font-semibold px-2.5 py-1 rounded-full bg-[#fef3c7] text-[#92400e]">
                Pendiente
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Config por tipo ────────────────────────────────────────────────────────

const CONFIG: Record<TipoCausa, {
  seccion: string;
  iconBg: string;
  icon: React.ElementType;
  iconColor: string;
  titulo: (nombre: string) => string;
  subtitulo: (ong: string) => string;
}> = {
  plata: {
    seccion: "DONACIÓN DE PLATA",
    iconBg: "bg-primary/10",
    icon: Heart,
    iconColor: "text-primary",
    titulo: (n) => `¡Gracias, ${n}!`,
    subtitulo: (ong) =>
      `Tu donación fue procesada. ${ong} ya la recibió y te va a llegar un comprobante por mail.`,
  },
  especie: {
    seccion: "DONACIÓN EN ESPECIE",
    iconBg: "bg-orange-100",
    icon: Package,
    iconColor: "text-orange-600",
    titulo: () => "¡Perfecto, ya anotamos tu oferta!",
    subtitulo: (ong) =>
      `${ong} revisó tu información y te va a contactar en las próximas 48hs para coordinar los detalles.`,
  },
  voluntariado: {
    seccion: "VOLUNTARIADO",
    iconBg: "bg-blue-100",
    icon: Users,
    iconColor: "text-blue-600",
    titulo: () => "¡Perfecto, ya anotamos tu oferta!",
    subtitulo: (ong) =>
      `${ong} revisó tu información y te va a contactar en las próximas 48hs para coordinar los detalles.`,
  },
};

// ── Main ───────────────────────────────────────────────────────────────────

export function DonarExito({ data }: { data: ExitoData }) {
  const cfg = CONFIG[data.tipo];
  const Icon = cfg.icon;

  function copiarLink() {
    navigator.clipboard.writeText(window.location.href);
  }

  return (
    <div className="min-h-screen bg-background pt-20 pb-16">
      <div className="max-w-lg mx-auto px-4 flex flex-col gap-5">

        {/* Section label */}
        <p className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest text-center pt-2">
          {cfg.seccion}
        </p>

        {/* Success header */}
        <div className="bg-card border border-[#e6dbc5] rounded-2xl p-8 flex flex-col items-center gap-4 text-center">
          <div className={cn("size-14 rounded-full flex items-center justify-center", cfg.iconBg)}>
            <Icon className={cn("size-6", cfg.iconColor)} />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-xl font-bold text-foreground">
              {cfg.titulo(data.donante)}
            </h1>
            <p className="text-sm text-foreground/60 leading-relaxed max-w-xs">
              {cfg.subtitulo(data.ong)}
            </p>
          </div>
        </div>

        {/* Resumen */}
        <div className="bg-card border border-[#e6dbc5] rounded-2xl p-5">
          <p className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest mb-2">
            Resumen del aporte
          </p>
          <ResumenRow label="Campaña" value={data.campania} />
          <ResumenRow label="ONG" value={data.ong} />

          {data.tipo === "plata" && (
            <>
              <ResumenRow label="Monto" value={formatARS(data.monto)} highlight />
              <ResumenRow label="Modalidad" value={data.modalidad === "unica" ? "Única vez" : "Mensual"} />
              <ResumenRow label="Fecha" value={data.fecha} />
            </>
          )}
          {data.tipo === "especie" && (
            <>
              <ResumenRow label="Lo que ofreciste" value={data.items.join(" · ")} />
              <ResumenRow label="Contacto" value={data.contacto} />
            </>
          )}
          {data.tipo === "voluntariado" && (
            <>
              <ResumenRow label="Tu oferta" value={data.oferta} />
              <ResumenRow label="Contacto" value={data.contacto} />
            </>
          )}
        </div>

        {/* Impacto — solo plata */}
        {data.tipo === "plata" && data.impactoDesc && (
          <div className="flex gap-3 items-start bg-green-50 border border-green-200 rounded-2xl p-4">
            <div className="size-5 rounded-sm bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
              <Heart className="size-3 text-primary" />
            </div>
            <p className="text-sm text-green-800 leading-relaxed">{data.impactoDesc}</p>
          </div>
        )}

        {/* Pasos — especie y voluntariado */}
        {(data.tipo === "especie" || data.tipo === "voluntariado") && (
          <div className="bg-card border border-[#e6dbc5] rounded-2xl p-5">
            <p className="text-sm font-bold text-foreground mb-5">¿Qué pasa ahora?</p>
            <Stepper tipo={data.tipo} />
          </div>
        )}

        {/* Compartir */}
        <div className="flex flex-col gap-3">
          <p className="text-sm text-foreground/60 text-center leading-relaxed">
            Contale a tu red — cada vez que alguien comparte, la campaña llega a más personas.
          </p>
          <div className="flex gap-3">
            <a
              href={`https://wa.me/?text=${encodeURIComponent(`Apoyé "${data.campania}" en Colmena. ¡Sumáte vos también!`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "outline" }), "flex-1 gap-2")}
            >
              <svg viewBox="0 0 24 24" className="size-4 fill-green-600 shrink-0" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>
            <button
              onClick={copiarLink}
              className={cn(buttonVariants({ variant: "outline" }), "flex-1 gap-2")}
            >
              <Copy className="size-4" />
              Copiar link
            </button>
          </div>
        </div>

        {/* CTAs finales */}
        <div className="flex flex-col gap-3">
          <Link
            href="/causas"
            className={cn(buttonVariants({ variant: "outline" }), "w-full")}
          >
            Explorar más causas
          </Link>
          <Link
            href={`/ongs/${data.ongId}`}
            className={cn(buttonVariants({ variant: "outline" }), "w-full")}
          >
            Ver otras campañas de {data.ong}
          </Link>
        </div>

      </div>
    </div>
  );
}
