import { Product } from "../../lib/products";
import { ScarcityIndicator } from "./ScarcityIndicator";

interface BundleCardProps {
  product: Product;
}

export function BundleCard({ product }: BundleCardProps) {
  return (
    <div className="sc-prod-card sc-fade-target border-2 border-white/5 bg-[#0d0d0d]">
      <div className="sc-prod-img-wrap block">
        <img src={product.image} alt={product.name} className="opacity-80 group-hover:opacity-100" />
        <div className="absolute top-4 left-4 bg-white text-black text-[9px] px-2 py-1 tracking-[0.2em] font-bold uppercase z-10">
          BUNDLE
        </div>
        <ScarcityIndicator status={product.stockStatus} />
        {product.originalPrice && (
          <div className="absolute top-4 right-4 bg-green-600 text-white text-[9px] px-2 py-1 tracking-[0.2em] font-bold uppercase z-10">
            SAVE ${product.originalPrice - product.price}
          </div>
        )}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[85%] bg-black/80 backdrop-blur-md border border-white/10 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
           <p className="text-[8px] text-white/50 uppercase tracking-[0.2em] mb-2 text-center">Contains {product.details.length} Items</p>
           <div className="flex justify-center gap-1">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-1.5 h-1.5 bg-white/20 rounded-full" />
              ))}
           </div>
        </div>
      </div>

      <div className="sc-prod-info">
        <div className="sc-prod-name text-white">{product.name}</div>
        <div className="sc-prod-sub line-clamp-2">{product.description}</div>
        
        <div className="flex items-center gap-3 mt-4">
          <div className="sc-prod-price text-green-500">${product.price}</div>
          {product.originalPrice && (
            <div className="text-[12px] text-muted-foreground line-through opacity-50">
              ${product.originalPrice}
            </div>
          )}
        </div>

        <button className="sc-prod-add-btn !relative !transform-none !mt-6 !translate-y-0 w-full">
          ADD KIT TO BAG
        </button>
      </div>
    </div>
  );
}
