import { ChevronLeft, ChevronRight } from "lucide-react";

interface SectionHeaderProps {
  title: string;
}

export function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between w-full">
      <h2 className="text-2xl font-medium text-secondary">{title}</h2>
      <div className="flex gap-1">
        <button
          aria-label="Anterior"
          className="size-8 flex items-center justify-center rounded-full bg-white border border-border shadow-[0px_1px_1px_rgba(0,0,0,0.05)] hover:bg-muted/50 transition-colors"
        >
          <ChevronLeft size={16} strokeWidth={2} className="text-foreground" />
        </button>
        <button
          aria-label="Siguiente"
          className="size-8 flex items-center justify-center rounded-full bg-white border border-border shadow-[0px_1px_1px_rgba(0,0,0,0.05)] hover:bg-muted/50 transition-colors"
        >
          <ChevronRight size={16} strokeWidth={2} className="text-foreground" />
        </button>
      </div>
    </div>
  );
}
