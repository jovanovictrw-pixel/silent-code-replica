import { Product } from "../../lib/products";
import { ScarcityIndicator } from "./ScarcityIndicator";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="sc-prod-card vt-card sc-fade-target group border border-white/5 bg-[#050505] relative">
      <div className="sc-prod-img-wrap overflow-hidden bg-[#0a0a0a] relative">
        <img 
          src={`${product.image}${product.image.includes('?') ? '&' : '?'}fm=webp&q=80&w=800`}
          srcSet={`${product.image}${product.image.includes('?') ? '&' : '?'}fm=webp&q=80&w=400 400w, ${product.image}${product.image.includes('?') ? '&' : '?'}fm=webp&q=80&w=800 800w, ${product.image}${product.image.includes('?') ? '&' : '?'}fm=webp&q=80&w=1200 1200w`}
          sizes="(max-width: 768px) 100vw, 33vw"
          alt={product.name} 
          loading="lazy" 
          className="transition-all duration-1000 cubic-bezier(0.23, 1, 0.32, 1) group-hover:scale-110 group-hover:opacity-80"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?fm=webp&q=80&w=800';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Mobile-first: Positioning interactive button higher on mobile if needed, but here bottom of card is good for reachability */}
        <button className="sc-prod-add-btn backdrop-blur-md bg-white/90 hover:bg-white text-black font-extrabold py-5 tracking-widest text-[10px] md:py-4">
          ADD TO BAG
        </button>
        
        <div className="flex flex-col gap-2 absolute top-4 left-4 z-10">
          {product.labels && product.labels.map(label => (
            <div key={label} className="bg-white/95 backdrop-blur-sm text-black text-[8px] px-2 py-1 tracking-[0.3em] font-black uppercase shadow-2xl skew-x-[-12deg]">
              <span className="inline-block skew-x-[12deg]">{label}</span>
            </div>
          ))}
        </div>

        <ScarcityIndicator status={product.stockStatus} />
      </div>

      <div className="sc-prod-info p-5">
        <div className="flex justify-between items-start mb-1">
          <div className="sc-prod-name group-hover:text-sc-accent transition-colors duration-300 uppercase tracking-[0.25em] text-[11px] font-bold">
            {product.name}
          </div>
        </div>
        <div className="sc-prod-sub text-[10px] text-white/40 uppercase tracking-widest mt-1">
          {product.description}
        </div>
        
        <div className="flex items-center gap-4 mt-5 transition-transform duration-500 group-hover:translate-x-1">
          <div className="sc-prod-price text-[13px] font-mono tracking-tighter text-white/90">${product.price}</div>
          {product.originalPrice && (
            <div className="text-[11px] text-white/20 line-through font-mono">
              ${product.originalPrice}
            </div>
          )}
        </div>
        
        <button className="sc-prod-quick hover:!text-white flex items-center gap-2 group/btn mt-6 border-b border-white/10 pb-1 w-fit opacity-40 group-hover:opacity-100 transition-all duration-500">
          <span className="text-[9px] tracking-[0.3em] font-bold">QUICK SHOP</span>
          <span className="inline-block transform transition-transform duration-500 group-hover/btn:translate-x-2">→</span>
        </button>
      </div>
    </div>
  );
}
