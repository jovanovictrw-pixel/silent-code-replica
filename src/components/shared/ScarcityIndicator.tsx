interface ScarcityIndicatorProps {
  status: "in-stock" | "low-stock" | "sold-out";
}

export function ScarcityIndicator({ status }: ScarcityIndicatorProps) {
  if (status === "in-stock") return null;

  const config = {
    "low-stock": {
      label: "LOW STOCK",
      className: "bg-red-600 text-white",
      pulse: true
    },
    "sold-out": {
      label: "SOLD OUT",
      className: "bg-neutral-800 text-white/50",
      pulse: false
    }
  };

  const item = config[status as keyof typeof config];
  if (!item) return null;

  return (
    <div className={`
      absolute top-4 right-4 text-[9px] px-2 py-1 tracking-[0.2em] font-bold uppercase z-10 shadow-lg 
      ${item.className}
      ${item.pulse ? 'animate-pulse' : ''}
    `}>
      {item.label}
    </div>
  );
}
