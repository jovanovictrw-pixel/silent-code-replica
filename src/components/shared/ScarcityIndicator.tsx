interface ScarcityIndicatorProps {
  status: "in-stock" | "low-stock" | "sold-out";
}

export function ScarcityIndicator({ status }: ScarcityIndicatorProps) {
  if (status === "in-stock") return null;

  const config = {
    "low-stock": {
      label: "LOW STOCK",
      className: "sc-glass bg-red-900/30 text-red-200 border-red-500/40 backdrop-blur-xl sc-scarcity-pulse",
    },
    "sold-out": {
      label: "SOLD OUT",
      className: "sc-glass bg-neutral-900/60 text-white/30 backdrop-blur-xl grayscale",
    },
  };

  const item = config[status as keyof typeof config];
  if (!item) return null;

  return (
    <div
      className={`
        absolute top-4 right-4 text-[9px] px-2 py-1 tracking-[0.3em] font-black uppercase z-20 skew-x-[-12deg]
        ${item.className}
      `}
    >
      <span className="inline-block skew-x-[12deg]">{item.label}</span>
    </div>
  );
}
