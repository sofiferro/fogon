"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
  ArrowLeft, ImagePlus, X, Coins, List, Hand, Plus, Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type TipoNecesidad = "dinero" | "especie" | "voluntariado";

const URGENCIA_OPTIONS = [
  { value: "1", label: "Baja" },
  { value: "2", label: "Media-baja" },
  { value: "3", label: "Media" },
  { value: "4", label: "Alta" },
  { value: "5", label: "Urgente" },
];

const TIPO_OPTIONS: { id: TipoNecesidad; label: string; icon: React.ElementType }[] = [
  { id: "dinero", label: "Dinero", icon: Coins },
  { id: "especie", label: "Lista de pedidos", icon: List },
  { id: "voluntariado", label: "Voluntariado", icon: Hand },
];

const selectClass =
  "h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 appearance-none";

const textareaClass =
  "w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm min-h-28 resize-none outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 placeholder:text-muted-foreground";

export function CrearCausaForm() {
  const [imagenPreview, setImagenPreview] = useState<string | null>(null);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [tipo, setTipo] = useState<TipoNecesidad>("dinero");
  const [objetivoMonto, setObjetivoMonto] = useState("");
  const [items, setItems] = useState<{ id: string; nombre: string }[]>([]);
  const [nuevoItem, setNuevoItem] = useState("");
  const [cantidadVoluntarios, setCantidadVoluntarios] = useState("");
  const [rolesVoluntarios, setRolesVoluntarios] = useState("");
  const [fechaLimite, setFechaLimite] = useState("");
  const [urgencia, setUrgencia] = useState("");
  const [metrica, setMetrica] = useState("");

  const fileRef = useRef<HTMLInputElement>(null);

  function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setImagenPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  }

  function removeImage() {
    setImagenPreview(null);
    if (fileRef.current) fileRef.current.value = "";
  }

  function addItem() {
    if (!nuevoItem.trim()) return;
    setItems((prev) => [...prev, { id: crypto.randomUUID(), nombre: nuevoItem.trim() }]);
    setNuevoItem("");
  }

  const tipoLabel = tipo === "dinero" ? "dinero" : tipo === "especie" ? "cosas" : "voluntariado";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-border bg-card px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/ong">
            <Button variant="ghost" size="icon-sm">
              <ArrowLeft />
            </Button>
          </Link>
          <h1 className="font-semibold">Nueva campaña</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Guardar borrador</Button>
          <Button variant="secondary" size="sm">Publicar campaña</Button>
        </div>
      </header>

      {/* Body */}
      <div className="flex-1">
        <div className="max-w-4xl mx-auto px-6 py-8 grid grid-cols-[1fr_272px] gap-8 items-start">

          {/* Form */}
          <div className="space-y-4">

            {/* Imagen de portada */}
            <section className="bg-card rounded-xl border border-border p-5 space-y-3">
              <h2 className="text-sm font-semibold">Imagen de portada</h2>
              {imagenPreview ? (
                <div className="relative rounded-lg overflow-hidden h-48">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imagenPreview} alt="portada" className="w-full h-full object-cover" />
                  <button
                    onClick={removeImage}
                    className="absolute top-2 right-2 bg-secondary/90 text-secondary-foreground rounded-full p-1 hover:bg-secondary transition-colors"
                  >
                    <X className="size-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => fileRef.current?.click()}
                  className="w-full h-48 rounded-lg border-2 border-dashed border-border hover:border-ring/50 bg-muted/40 hover:bg-muted transition-colors flex flex-col items-center justify-center gap-2 text-muted-foreground"
                >
                  <ImagePlus className="size-7" />
                  <span className="text-sm">Subir imagen de portada</span>
                </button>
              )}
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImage} />
            </section>

            {/* Información básica */}
            <section className="bg-card rounded-xl border border-border p-5 space-y-4">
              <h2 className="text-sm font-semibold">Información básica</h2>
              <div className="space-y-1.5">
                <Label>Título de la campaña</Label>
                <Input
                  placeholder="Ej: Juguetes para niños hospitalizados"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label>Descripción</Label>
                <textarea
                  className={textareaClass}
                  placeholder="Contá el propósito de la campaña, a quiénes ayuda y cómo se van a usar los recursos"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                />
              </div>
            </section>

            {/* ¿Qué necesitás? */}
            <section className="bg-card rounded-xl border border-border p-5 space-y-4">
              <h2 className="text-sm font-semibold">¿Qué necesitás?</h2>
              <div className="grid grid-cols-3 gap-3">
                {TIPO_OPTIONS.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setTipo(id)}
                    className={cn(
                      "flex flex-col items-center gap-2 py-4 rounded-xl border-2 text-sm font-medium transition-all",
                      tipo === id
                        ? "border-secondary bg-secondary text-secondary-foreground"
                        : "border-border hover:bg-muted"
                    )}
                  >
                    <Icon className="size-5" />
                    {label}
                  </button>
                ))}
              </div>

              {/* Dinero */}
              {tipo === "dinero" && (
                <div className="space-y-4 pt-2 border-t border-border">
                  <h3 className="text-sm font-semibold pt-2">Recaudación</h3>
                  <div className="space-y-1.5">
                    <Label>Objetivo de recaudación</Label>
                    <div className="relative">
                      <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-sm text-muted-foreground select-none">
                        $
                      </span>
                      <Input
                        type="number"
                        className="pl-6"
                        placeholder="0"
                        value={objetivoMonto}
                        onChange={(e) => setObjetivoMonto(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label>Fecha límite de la campaña</Label>
                      <Input type="date" value={fechaLimite} onChange={(e) => setFechaLimite(e.target.value)} />
                    </div>
                    <div className="space-y-1.5">
                      <Label>Urgencia</Label>
                      <select className={selectClass} value={urgencia} onChange={(e) => setUrgencia(e.target.value)}>
                        <option value="" />
                        {URGENCIA_OPTIONS.map((o) => (
                          <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Lista de pedidos */}
              {tipo === "especie" && (
                <div className="space-y-4 pt-2 border-t border-border">
                  <h3 className="text-sm font-semibold pt-2">Lista de pedidos</h3>
                  <div className="space-y-2">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center gap-2">
                        <span className="flex-1 text-sm px-2.5 py-1.5 bg-muted rounded-lg border border-border truncate">
                          {item.nombre}
                        </span>
                        <button
                          onClick={() => setItems((prev) => prev.filter((i) => i.id !== item.id))}
                          className="text-muted-foreground hover:text-destructive transition-colors shrink-0"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    ))}
                    <div className="flex gap-2">
                      <Input
                        placeholder="Ej: Mantas de polar, talle L"
                        value={nuevoItem}
                        onChange={(e) => setNuevoItem(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && addItem()}
                      />
                      <Button variant="outline" size="icon" onClick={addItem}>
                        <Plus />
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label>Fecha límite</Label>
                      <Input type="date" value={fechaLimite} onChange={(e) => setFechaLimite(e.target.value)} />
                    </div>
                    <div className="space-y-1.5">
                      <Label>Urgencia</Label>
                      <select className={selectClass} value={urgencia} onChange={(e) => setUrgencia(e.target.value)}>
                        <option value="" />
                        {URGENCIA_OPTIONS.map((o) => (
                          <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Voluntariado */}
              {tipo === "voluntariado" && (
                <div className="space-y-4 pt-2 border-t border-border">
                  <h3 className="text-sm font-semibold pt-2">Voluntariado</h3>
                  <div className="space-y-1.5">
                    <Label>¿Qué tipo de voluntarios necesitás?</Label>
                    <Input
                      placeholder="Ej: Personas con auto para repartir viandas"
                      value={rolesVoluntarios}
                      onChange={(e) => setRolesVoluntarios(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Cantidad de voluntarios</Label>
                    <Input
                      type="number"
                      placeholder="0"
                      value={cantidadVoluntarios}
                      onChange={(e) => setCantidadVoluntarios(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label>Fecha límite</Label>
                      <Input type="date" value={fechaLimite} onChange={(e) => setFechaLimite(e.target.value)} />
                    </div>
                    <div className="space-y-1.5">
                      <Label>Urgencia</Label>
                      <select className={selectClass} value={urgencia} onChange={(e) => setUrgencia(e.target.value)}>
                        <option value="" />
                        {URGENCIA_OPTIONS.map((o) => (
                          <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* Métrica de impacto */}
            <section className="bg-card rounded-xl border border-border p-5 space-y-3">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-semibold">Métrica de impacto</h2>
                <span className="text-[11px] font-medium bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                  Opcional
                </span>
              </div>
              <div className="space-y-1.5">
                <Label>Métrica asociada</Label>
                <Input
                  placeholder="Ej: personas beneficiadas, kilos distribuidos, familias asistidas"
                  value={metrica}
                  onChange={(e) => setMetrica(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Al publicar actualizaciones vas a poder reportar el progreso de esta métrica.
                </p>
              </div>
            </section>
          </div>

          {/* Preview */}
          <div className="sticky top-20 space-y-3">
            <p className="text-[11px] font-semibold text-muted-foreground tracking-widest uppercase">
              Vista previa
            </p>
            <div className="bg-[#fffefa] border border-[#e6dbc5] rounded-[20px] overflow-hidden shadow-sm">
              <div className="relative h-36 bg-secondary">
                {imagenPreview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={imagenPreview} alt="preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-secondary-foreground/25 text-xs">
                    Imagen
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />
              </div>
              <div className="p-4 space-y-2.5">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-bold text-sm leading-tight text-[#1a1a1a] line-clamp-2">
                    {titulo || "Título de la campaña"}
                  </p>
                  <span className="shrink-0 text-[10px] font-medium bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                    Activa
                  </span>
                </div>
                <p className="text-xs text-[#767676] line-clamp-2">
                  {descripcion || "Tu descripción aparecerá aquí..."}
                </p>
                {tipo === "dinero" && (
                  <>
                    <p className="text-sm font-semibold text-[#1a1a1a]">
                      ${objetivoMonto ? Number(objetivoMonto).toLocaleString("es-AR") : "0"}
                    </p>
                    <div
                      className="h-1.5 w-full rounded-full overflow-hidden"
                      style={{ background: "rgba(230,219,197,0.5)" }}
                    >
                      <div className="h-full w-0 bg-[#510d09] rounded-full" />
                    </div>
                  </>
                )}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-medium bg-[#febd30] text-[#510d09] px-2 py-0.5 rounded-full">
                    {tipoLabel}
                  </span>
                  <span className="text-[11px] text-[#767676]">0 donantes</span>
                </div>
                <button className="text-[11px] text-secondary font-medium flex items-center gap-0.5">
                  Ver campaña completa <span>›</span>
                </button>
              </div>
            </div>
            <p className="text-[11px] text-center text-muted-foreground">
              Así aparece en el feed de donantes.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="sticky bottom-0 border-t border-border bg-card px-6 py-4 flex items-center justify-between">
        <Link href="/ong">
          <Button variant="ghost" size="sm">← Cancelar</Button>
        </Link>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Guardar borrador</Button>
          <Button variant="secondary" size="sm">Publicar campaña</Button>
        </div>
      </footer>
    </div>
  );
}
