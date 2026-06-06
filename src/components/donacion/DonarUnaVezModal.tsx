"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const MONTOS_PRESET = [1000, 5000, 10000, 20000, 50000, 100000];

function formatPreset(monto: number) {
  return `$${monto.toLocaleString("es-AR")}`;
}

interface DonarUnaVezModalProps {
  ongNombre: string;
  onClose: () => void;
  onConfirm?: (monto: number) => void;
}

export function DonarUnaVezModal({ ongNombre, onClose, onConfirm }: DonarUnaVezModalProps) {
  const [seleccionado, setSeleccionado] = useState<number>(10000);
  const [mostrarOtro, setMostrarOtro] = useState(false);
  const [otroMonto, setOtroMonto] = useState("");

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const montoFinal = mostrarOtro
    ? Number(otroMonto.replace(/\D/g, "")) || 0
    : seleccionado;

  function handlePreset(monto: number) {
    setSeleccionado(monto);
    setMostrarOtro(false);
    setOtroMonto("");
  }

  function handleOtroMonto() {
    setSeleccionado(0);
    setMostrarOtro(true);
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[1px]"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Doná por única vez a ${ongNombre}`}
        onClick={(e) => e.stopPropagation()}
        className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-full max-w-[380px] bg-card rounded-2xl shadow-xl p-6 flex flex-col gap-5"
      >
        <h2 className="font-bold text-lg text-foreground">Doná por única vez</h2>

        <div className="flex flex-col gap-3">
          <p className="text-sm font-medium text-muted-foreground">Elegí un monto</p>

          <div className="grid grid-cols-3 gap-2">
            {MONTOS_PRESET.map((monto) => (
              <button
                key={monto}
                onClick={() => handlePreset(monto)}
                className={cn(
                  "h-10 rounded-full border text-sm font-medium transition-all",
                  seleccionado === monto && !mostrarOtro
                    ? "border-secondary bg-secondary text-secondary-foreground"
                    : "border-border bg-transparent text-foreground hover:bg-muted"
                )}
              >
                {formatPreset(monto)}
              </button>
            ))}
          </div>

          {mostrarOtro ? (
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground select-none">
                $
              </span>
              <Input
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus
                type="number"
                className="pl-7"
                placeholder="Ingresá el monto"
                value={otroMonto}
                onChange={(e) => setOtroMonto(e.target.value)}
              />
            </div>
          ) : (
            <button
              onClick={handleOtroMonto}
              className="self-center text-sm text-secondary underline-offset-2 hover:underline"
            >
              Otro monto
            </button>
          )}
        </div>

        <Button
          variant="secondary"
          className="w-full h-11 rounded-full"
          disabled={!montoFinal}
          onClick={() => montoFinal && onConfirm?.(montoFinal)}
        >
          Donar por única vez
        </Button>
      </div>
    </>
  );
}
