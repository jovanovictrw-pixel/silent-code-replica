import { useEffect, useState } from "react";

interface CategoryHeroProps {
  category: string;
  image: string;
}

export function CategoryHero({ category, image }: CategoryHeroProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const specs: Record<string, string[]> = {
    men: ["CORE_PIECES: 12", "FABRICATION: JAPANESE_TWILL", "SEASON: SS25_OBSIDIAN"],
    women: ["CORE_PIECES: 08", "FABRICATION: LIQUID_JERSEY", "SEASON: SS25_NEOFLUX"],
    accessories: ["CORE_PIECES: 15", "FABRICATION: AIRCRAFT_GRADE", "SEASON: SS25_HARDWARE"],
  };

  const currentSpecs = specs[category.toLowerCase()] || ["SYSTEM_ID: UNKNOWN"];

  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      {/* Background Image with Parallax-ish feel */}
      <div className="absolute inset-0 z-0">
        <img 
          src={image} 
          alt={category} 
          className="w-full h-full object-cover transition-transform duration-1000 ease-out"
          style={{ transform: scrolled ? "scale(1.1)" : "scale(1)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <div className="flex justify-center gap-4 mb-8">
          {currentSpecs.map(spec => (
            <div key={spec} className="sc-badge-hw sc-fade-target sc-visible">
              <div className="sc-badge-hw-dot" />
              {spec}
            </div>
          ))}
        </div>

        <h1 className="sc-hero-h1 !text-[clamp(40px,10vw,120px)] !font-light tracking-[0.4em] vt-heading animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-both">
          {category.toUpperCase()}
        </h1>

        <div className="mt-12 flex flex-col items-center">
          <div className="w-px h-24 bg-gradient-to-b from-white to-transparent opacity-50" />
          <div className="sc-hero-sublabel mt-4">SCROLL TO ANALYZE</div>
        </div>
      </div>

      {/* Side Technical Data */}
      <div className="absolute left-10 bottom-20 hidden lg:block z-10">
        <div className="sc-glass bg-white/5 border-white/10 p-6 space-y-4">
          <div className="text-[9px] text-white/40 tracking-[0.2em]">SYSTEM_COORDINATES</div>
          <div className="font-heading text-[10px] text-white tracking-widest">45.4642° N, 9.1900° E</div>
          <div className="w-full h-px bg-white/10" />
          <div className="text-[9px] text-white/40 tracking-[0.2em]">EST_ORIGIN_ID</div>
          <div className="font-heading text-[10px] text-white tracking-widest">SN-TRML-001</div>
        </div>
      </div>
    </section>
  );
}
