"use client";

import { useState } from "react";
import { signIn, signUp } from "@/lib/supabase/actions/auth";
import { ColmenaLogoIcon } from "@/components/ColmenaLogo";
import Link from "next/link";

interface LoginFormProps {
  redirect?: string;
}

type Mode = "login" | "signup";

export function LoginForm({ redirect }: LoginFormProps) {
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
    } else {
      window.location.href = mode === "signup" ? "/onboarding" : (redirect ?? "/ingresar");
    }
    setPending(false);
  }

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-sm">
      <Link href="/" className="flex items-center gap-2">
        <ColmenaLogoIcon className="h-[26px] w-[22px]" />
        <span className="text-[21px] font-semibold tracking-[-0.04em] text-secondary leading-none">
          colmena
        </span>
      </Link>

      <div className="text-center">
        <h1 className="text-2xl font-bold text-secondary">
          {mode === "login" ? "Ingresá a colmena" : "Creá tu cuenta"}
        </h1>
        <p className="text-sm text-[#767676] mt-1">
          {mode === "login"
            ? "Ingresá con tu email y contraseña."
            : "Registrate para empezar a donar."}
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
            placeholder="tu@email.com"
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
    </div>
  );
}
