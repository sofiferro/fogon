"use client";

import { useState, useRef } from "react";
import { Search, XCircle } from "lucide-react";
import { useSearch } from "@/hooks/useSearch";
import { SearchResultItem } from "./SearchResultItem";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { results, loading } = useSearch(query);

  const showDropdown = open && query.trim().length >= 2;

  function handleClear() {
    setQuery("");
    setOpen(false);
    inputRef.current?.focus();
  }

  return (
    <div className="relative w-full max-w-[720px]">
      {/* Input */}
      <div className="flex items-center gap-3 h-14 px-6 rounded-full bg-white border border-border shadow-[0px_1px_2px_rgba(0,0,0,0.04)]">
        <Search size={18} strokeWidth={2} className="text-[#897c5e] shrink-0" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Buscá causas, ONGs..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          className="flex-1 bg-transparent text-base outline-none placeholder:text-[#897c5e]/80 text-foreground"
        />
        {query && (
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={handleClear}
            aria-label="Limpiar búsqueda"
            className="text-[#897c5e] hover:text-foreground transition-colors"
          >
            <XCircle size={18} strokeWidth={2} />
          </button>
        )}
      </div>

      {/* Dropdown de resultados */}
      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-border rounded-2xl shadow-[0px_4px_16px_rgba(0,0,0,0.08)] overflow-hidden z-50 py-2">
          {loading && (
            <p className="text-sm text-[#897c5e] px-4 py-3">Buscando...</p>
          )}
          {!loading && results.length === 0 && (
            <p className="text-sm text-[#897c5e] px-4 py-3">
              No hay causas para &ldquo;{query}&rdquo;
            </p>
          )}
          {!loading && results.map((result) => (
            <SearchResultItem
              key={result.id}
              result={result}
              onSelect={() => setOpen(false)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
