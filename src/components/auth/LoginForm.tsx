"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { ColmenaLogoIcon } from "@/components/ColmenaLogo";
import Link from "next/link";

interface LoginFormProps {
  redirect?: string;
}

type Step = "email" | "sent";

export function LoginForm({ redirect }: LoginFormProps) {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setPending(true);

    const supabase = createClient();
    const redirectTo =
      typeof window !== "undefined"
        ? `${window.location.origin}/auth/callback?redirect=${encodeURIComponent(redirect ?? "/ingresar")}`
        : "/auth/callback";

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: redirectTo, shouldCreateUser: true },
    });

    if (error) {
      setError(error.message);
    } else {
      setStep("sent");
    }
    setPending(false);
  }

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-sm">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <ColmenaLogoIcon className="h-[26px] w-[22px]" />
        <span className="text-[21px] font-semibold tracking-[-0.04em] text-secondary leading-none">
          colmena
        </span>
      </Link>

      {step === "email" ? (
        <>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-secondary">Ingresá a colmena</h1>
            <p className="text-sm text-[#767676] mt-1">
              Te mandamos un link mágico a tu mail. Sin contraseña.
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

            {error && <p className="text-sm text-red-600 text-center">{error}</p>}

            <button
              type="submit"
              disabled={pending || !email}
              className="h-11 rounded-full bg-secondary text-secondary-foreground font-medium text-sm hover:bg-secondary/90 transition-colors disabled:opacity-50 mt-1"
            >
              {pending ? "Enviando..." : "Continuar con email"}
            </button>
          </form>
        </>
      ) : (
        <div className="text-center flex flex-col gap-4">
          <div className="text-5xl">📬</div>
          <div>
            <h1 className="text-2xl font-bold text-secondary">Revisá tu mail</h1>
            <p className="text-sm text-[#767676] mt-2">
              Te enviamos un link a <span className="font-medium text-foreground">{email}</span>.
              Hacé click ahí para ingresar.
            </p>
          </div>
          <button
            onClick={() => setStep("email")}
            className="text-sm text-secondary underline-offset-2 hover:underline"
          >
            Usar otro email
          </button>
        </div>
      )}
    </div>
  );
}
