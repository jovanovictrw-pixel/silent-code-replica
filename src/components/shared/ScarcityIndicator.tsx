interface ScarcityIndicatorProps {
  status: "in-stock" | "low-stock" | "sold-out";
}

export function ScarcityIndicator({ status }: ScarcityIndicatorProps) {
  if (status === "in-stock") return null;

  const config = {
    "low-stock": {
      label: "LOW STOCK",
      className: "sc-glass bg-red-900/30 text-red-200 border-red-500/40 backdrop-blur-xl",
      pulse: "animate-[sc-low-box-pulse_2s_infinite]"
    },
    "sold-out": {
      label: "SOLD OUT",
      className: "sc-glass bg-neutral-900/60 text-white/30 backdrop-blur-xl grayscale",
      pulse: ""
    }
  };

  const item = config[status as keyof typeof config];
  if (!item) return null;

  return (
    <div className={`
      absolute top-4 right-4 text-[9px] px-2 py-1 tracking-[0.3em] font-black uppercase z-20 skew-x-[-12deg]
      ${item.className}
      ${item.pulse}
    `}>
      <span className="inline-block skew-x-[12deg]">{item.label}</span>
      
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes sc-low-box-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(220, 0, 0, 0); }
          50% { box-shadow: 0 0 20px 5px rgba(220, 0, 0, 0.6); }
        }
      `}} />
    </div>
  );
}
