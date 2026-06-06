"use client";

import { useState } from "react";
import { signIn, signUp } from "@/lib/supabase/actions/auth";
import { ColmenaLogo } from "@/components/ColmenaLogo";
import Link from "next/link";

interface OngLoginFormProps {
  redirect?: string;
}

type Mode = "login" | "signup";

export function OngLoginForm({ redirect }: OngLoginFormProps) {
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setPending(true);

    const action = mode === "login" ? signIn : signUp;
    const result = await action(email, password);

    if (result.error) {
      setError(result.error);
      setPending(false);
      return;
    }

    // Redirigir a onboarding/ong — el page server ya chequea si tiene ONG y redirige a dashboard
    window.location.href = redirect ?? "/onboarding/ong";
  }

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-sm">
      <Link href="/">
        <ColmenaLogo className="h-[27px] w-auto" />
      </Link>

      <div className="text-center">
        <h1 className="text-2xl font-bold text-secondary">
          {mode === "login" ? "Ingresá a colmena" : "Creá tu cuenta de ONG"}
        </h1>
        <p className="text-sm text-[#767676] mt-1">
          {mode === "login"
            ? "Ingresá con tu email y contraseña."
            : "Registrate para empezar a recibir donaciones."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-medium text-foreground">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@ong.org"
            className="h-11 px-4 rounded-xl border border-border bg-white text-sm outline-none focus:border-secondary transition-colors placeholder:text-[#897c5e]/60"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-sm font-medium text-foreground">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mínimo 6 caracteres"
            className="h-11 px-4 rounded-xl border border-border bg-white text-sm outline-none focus:border-secondary transition-colors placeholder:text-[#897c5e]/60"
          />
        </div>

        {error && <p className="text-sm text-red-600 text-center">{error}</p>}

        <button
          type="submit"
          disabled={pending || !email || !password}
          className="h-11 rounded-full bg-secondary text-secondary-foreground font-medium text-sm hover:bg-secondary/90 transition-colors disabled:opacity-50 mt-1"
        >
          {pending
            ? "Procesando..."
            : mode === "login"
              ? "Iniciar sesión"
              : "Crear cuenta"}
        </button>
      </form>

      <button
        onClick={() => {
          setMode(mode === "login" ? "signup" : "login");
          setError(null);
        }}
        className="text-sm text-secondary underline-offset-2 hover:underline"
      >
        {mode === "login"
          ? "No tengo cuenta, quiero registrarme"
          : "Ya tengo cuenta, quiero ingresar"}
      </button>

      <p className="text-sm text-[#767676]">
        <Link href="/login" className="text-secondary underline-offset-2 hover:underline">
          Soy donante, ingresar ahí
        </Link>
      </p>
    </div>
  );
}
