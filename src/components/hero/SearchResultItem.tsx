import Link from "next/link";
import type { SearchResult } from "@/hooks/useSearch";
import { causaSlug } from "@/lib/slug";

const TIPO_LABEL: Record<string, string> = {
  dinero: "Dinero",
  especie: "Cosas",
  voluntariado: "Voluntariado",
};

interface SearchResultItemProps {
  result: SearchResult;
  onSelect: () => void;
}

export function SearchResultItem({ result, onSelect }: SearchResultItemProps) {
  return (
    <Link
      href={`/login?redirect=/causas/${causaSlug(result.titulo, result.id)}`}
      onClick={onSelect}
      className="flex items-start gap-3 px-4 py-3 hover:bg-muted/60 transition-colors rounded-xl"
    >
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">{result.titulo}</p>
        <p className="text-xs text-[#767676] truncate mt-0.5">
          {result.ongs?.nombre ?? "ONG"} · {TIPO_LABEL[result.tipo_necesidad] ?? result.tipo_necesidad}
          {result.urgencia >= 4 && (
            <span className="ml-1 text-secondary font-medium">· Urgente</span>
          )}
        </p>
      </div>
    </Link>
  );
}
