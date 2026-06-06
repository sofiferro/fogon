"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { TipoNecesidad } from "@/types/campania";

export interface SearchResult {
  id: string;
  titulo: string;
  descripcion: string;
  tipo_necesidad: TipoNecesidad;
  urgencia: number;
  imagen_url: string | null;
  ongs: { nombre: string; logo_url: string | null } | null;
}

export function useSearch(query: string) {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      const supabase = createClient();
      const { data } = await supabase
        .from("campania")
        .select("id, titulo, descripcion, tipo_necesidad, urgencia, imagen_url, ong(nombre, logo_url)")
        .or(`titulo.ilike.%${query}%,descripcion.ilike.%${query}%`)
        .eq("estado", "activa")
        .limit(8);

      setResults((data as unknown as SearchResult[]) ?? []);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return { results, loading };
}
