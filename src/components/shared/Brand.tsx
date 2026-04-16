export function SilentNumenLogo({ size = "default" }: { size?: "default" | "small" }) {
  const w = size === "small" ? 140 : 160;
  const h = size === "small" ? 38 : 44;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width={w - 2} height={h - 2} stroke="white" strokeWidth="1" fill="none" />
      <text x={w / 2} y={h / 2 - 3} textAnchor="middle" fill="white"
        fontFamily="'Josefin Sans', sans-serif" fontSize="13" fontWeight="400"
        letterSpacing="0.35em" dominantBaseline="middle"
        style={{ textTransform: "uppercase" }}>
        SILENTNUMEN
      </text>
      <text x={w / 2} y={h / 2 + 12} textAnchor="middle" fill="white"
        fontFamily="'Josefin Sans', sans-serif" fontSize="7" fontWeight="300"
        letterSpacing="0.4em" dominantBaseline="middle">
        STUDIO · MMXXV
      </text>
    </svg>
  );
}
