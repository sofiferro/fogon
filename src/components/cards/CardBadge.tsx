interface CardBadgeProps {
  label: string;
}

export function CardBadge({ label }: CardBadgeProps) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-muted border border-border text-secondary text-[12px] leading-4 whitespace-nowrap">
      {label}
    </span>
  );
}
