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

  return (
    <div className="sc-prod-card sc-fade-target group border border-white/10 bg-[#050505] overflow-hidden flex flex-col">
      {/* Editorial Image Grid */}
      <div className="relative h-[520px] w-full grid grid-cols-2 gap-[1px] bg-[#111] overflow-hidden">
        {/* Left Column: Primary Editorial/Model Shot */}
        <div className="relative overflow-hidden bg-black flex items-center justify-center">
          <img 
            src={product.image} 
            alt="Editorial Shot"
            className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
            onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&q=80&w=800'; }}
          />
        </div>
        
        {/* Right Column: Stacked or Single Details */}
        <div className="grid grid-rows-2 gap-[1px]">
          {/* Top/Full Right Shot */}
          <div className={`${isStreetArmor ? 'row-span-2' : ''} relative overflow-hidden bg-black flex items-center justify-center`}>
            <img 
              src={product.gridImages?.[0] || 'https://images.unsplash.com/photo-1544441892-0b310433e147?auto=format&fit=crop&q=80&w=800'} 
              alt="Detail Shot 1"
              className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
              onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1544441892-0b310433e147?auto=format&fit=crop&q=80&w=800'; }}
            />
          </div>
          
          {/* Bottom Shot (if not Street Armor) */}
          {!isStreetArmor && (
            <div className="relative overflow-hidden bg-black flex items-center justify-center">
              <img 
                src={product.gridImages?.[1] || 'https://images.unsplash.com/photo-1621252179027-94459d278660?auto=format&fit=crop&q=80&w=800'} 
                alt="Detail Shot 2"
                className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
                onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1621252179027-94459d278660?auto=format&fit=crop&q=80&w=800'; }}
              />
            </div>
          )}
        </div>

        {/* Technical Overlays */}
        <div className="absolute top-6 left-6 z-20">
          <div className="bg-white text-black text-[9px] px-3 py-1 tracking-[0.4em] font-black uppercase skew-x-[-12deg]">
            <span className="inline-block skew-x-[12deg]">SYSTEM.KIT</span>
          </div>
        </div>

        <div className="absolute top-6 right-6 z-20">
           {badge?.label && (
            <div className={`${badge.className} text-[9px] px-3 py-1 tracking-[0.4em] font-black uppercase skew-x-[-12deg] shadow-2xl`}>
              <span className="inline-block skew-x-[12deg]">{badge.label}</span>
            </div>
           )}
        </div>

        <ScarcityIndicator status={product.stockStatus} />
      </div>

      <div className="sc-prod-info p-7 border-t border-white/5 flex-grow flex flex-col justify-between">
        <div className="mb-8">
          <h3 className="text-white uppercase tracking-[0.3em] text-[13px] font-black mb-2">{product.name}</h3>
          <p className="text-[10px] text-white/30 uppercase tracking-[0.1em] font-medium leading-relaxed mb-4">{product.description}</p>
          
          <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            <span className="text-[7px] text-white/20 uppercase tracking-[0.5em] font-bold">INVENTORY_LIST</span>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              {product.details.map((detail, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <div className="w-1 h-1 bg-sc-accent" />
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
