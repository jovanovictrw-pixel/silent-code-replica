import { Product, products } from "../../lib/products";
import { ScarcityIndicator } from "./ScarcityIndicator";

interface BundleCardProps {
  product: Product;
}

export function BundleCard({ product }: BundleCardProps) {
  // Find the sub-items to get their images
  const bundleItems = product.bundleItemIds 
    ? products.filter(p => product.bundleItemIds?.includes(p.id)) 
    : [];

  // Metadata overrides for hierarchy
  const isStreetArmor = product.id === "mb1";
  const isMidnightRider = product.id === "mb2";
  const isOmniLayer = product.id === "mb3";

  const badgeConfig = {
    mb1: { label: "FULL DEPLOYMENT", className: "bg-black text-white" },
    mb2: { 
      label: product.originalPrice ? `-${Math.round((1 - product.price / product.originalPrice) * 100)}% OFFSET` : "", 
      className: "bg-sc-accent text-white" 
    },
    mb3: { label: "SYSTEM COMPLETE", className: "bg-[#1a1a1a] text-white" }
  };

  const badge = badgeConfig[product.id as keyof typeof badgeConfig];

  const [schematic, setSchematic] = useState(false);

  return (
    <div className={`sc-prod-card vt-card sc-fade-target group border border-white/10 bg-[#050505] overflow-hidden flex flex-col relative ${schematic ? 'sc-schematic-active' : ''}`}>
      {/* Editorial Image Grid */}
      <div className={`relative h-[520px] w-full grid grid-cols-2 gap-[1px] bg-[#111] overflow-hidden transition-all duration-700 ${schematic ? 'opacity-20 grayscale brightness-150' : ''}`}>
        {/* Left Column: Primary Editorial/Model Shot */}
        <div className="relative overflow-hidden bg-black flex items-center justify-center">
          <img 
            src={`${product.image}${product.image.includes('?') ? '&' : '?'}fm=webp&q=80&w=800`}
            srcSet={`${product.image}${product.image.includes('?') ? '&' : '?'}fm=webp&q=80&w=400 400w, ${product.image}${product.image.includes('?') ? '&' : '?'}fm=webp&q=80&w=800 800w`}
            sizes="(max-width: 768px) 50vw, 25vw"
            alt="Editorial Shot"
            className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
            onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?fm=webp&q=80&w=800'; }}
          />
        </div>
        
        {/* Right Column: Stacked or Single Details */}
        <div className="grid grid-rows-2 gap-[1px]">
          {/* Top/Full Right Shot */}
          <div className={`${isStreetArmor ? 'row-span-2' : ''} relative overflow-hidden bg-black flex items-center justify-center`}>
            <img 
              src={`${product.gridImages?.[0] || 'https://images.unsplash.com/photo-1544441892-0b310433e147?auto=format&fit=crop&q=80&w=800'}${ (product.gridImages?.[0] || '').includes('?') ? '&' : '?'}fm=webp&q=80&w=800`}
              alt="Detail Shot 1"
              className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
              onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1544441892-0b310433e147?fm=webp&q=80&w=800'; }}
            />
          </div>
          
          {/* Bottom Shot (if not Street Armor) */}
          {!isStreetArmor && (
            <div className="relative overflow-hidden bg-black flex items-center justify-center">
              <img 
                src={`${product.gridImages?.[1] || 'https://images.unsplash.com/photo-1621252179027-94459d278660?auto=format&fit=crop&q=80&w=800'}${ (product.gridImages?.[1] || '').includes('?') ? '&' : '?'}fm=webp&q=80&w=800`}
                alt="Detail Shot 2"
                className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
                onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1621252179027-94459d278660?fm=webp&q=80&w=800'; }}
              />
            </div>
          )}
        </div>

        {/* Technical Overlays */}
        <div className="absolute top-6 left-6 z-20">
          <div className="sc-badge-hw !bg-white !text-black border-none">
            <div className="sc-badge-hw-dot !bg-black !shadow-black/50" />
            SYSTEM_KIT
          </div>
        </div>

        <div className="absolute top-6 right-6 z-20">
           {badge?.label && (
            <div className={`sc-badge-hw ${badge.className}`}>
               <div className="sc-badge-hw-dot" />
               {badge.label}
            </div>
           )}
        </div>

        <ScarcityIndicator status={product.stockStatus} />
      </div>

      {/* Schematic Overlay */}
      {schematic && (
        <div className="absolute inset-0 z-10 flex items-center justify-center p-12 pointer-events-none">
          <div className="w-full h-full border border-white/20 border-dashed rounded-lg flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm">
             <div className="text-[10px] text-white/40 tracking-[0.5em] mb-4">SCHEMATIC_MODE_ACTIVE</div>
             <div className="grid grid-cols-2 gap-8 w-full max-w-xs opacity-60">
                <div className="h-20 border border-white/20" />
                <div className="h-20 border border-white/20" />
                <div className="h-20 border border-white/20" />
                <div className="h-20 border border-white/20" />
             </div>
          </div>
        </div>
      )}

      <div className="sc-prod-info p-7 border-t border-white/5 flex-grow flex flex-col justify-between">
        <div className="mb-8">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-white uppercase tracking-[0.3em] text-[13px] font-black">{product.name}</h3>
            <button 
              onClick={() => setSchematic(!schematic)}
              className={`text-[8px] tracking-widest font-heading px-3 py-1 border transition-colors ${schematic ? 'bg-white text-black border-white' : 'text-white/40 border-white/10 hover:border-white/30'}`}
            >
              {schematic ? 'RENDER_REALITY' : 'VIEW_SCHEMATIC'}
            </button>
          </div>
          <p className="text-[10px] text-white/30 uppercase tracking-[0.1em] font-medium leading-relaxed mb-6">{product.description}</p>
          
          <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            <span className="text-[7px] text-white/20 uppercase tracking-[0.5em] font-bold">SYSTEM_COMPONENTS</span>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              {product.details.map((detail, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <div className="w-1 h-1 bg-white/40" />
                  <span className="text-[9px] text-white/60 uppercase tracking-widest">{detail}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex items-end justify-between pt-6 border-t border-white/5">
          <div className="flex flex-col gap-1">
            <span className="text-[8px] text-white/20 uppercase tracking-[0.4em]">{isOmniLayer ? "Integrated System Price" : "Acquisition Price"}</span>
            <div className="flex items-center gap-3">
              <span className="text-[18px] font-mono text-white font-bold tracking-tighter">${product.price}</span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-[12px] text-white/20 line-through font-mono tracking-tighter">${product.originalPrice}</span>
              )}
            </div>
          </div>
          <button className="bg-white text-black px-6 py-3 text-[10px] font-black tracking-[0.2em] uppercase hover:bg-sc-accent hover:text-white transition-all duration-300 active:scale-95 shadow-2xl shadow-white/5">
            {isOmniLayer ? "INITIALIZE" : "ACQUIRE KIT"}
          </button>
        </div>
      </div>
    </div>
  );
}
