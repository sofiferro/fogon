import { cn } from "@/lib/utils";

interface FilterPillProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export function FilterPill({ label, active = false, onClick }: FilterPillProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-[10px] rounded-full border text-[14px] leading-normal transition-colors whitespace-nowrap",
        active
          ? "bg-[#510d09] text-[rgba(255,242,216,0.92)] border-[#510d09]"
          : "bg-[#fffefa] border-[#e6dbc5] text-[#1a1a1a] hover:border-[#510d09]/40"
      )}
    >
      {label}
    </button>
  );
}
