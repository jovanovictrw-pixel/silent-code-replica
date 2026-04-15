import { Product } from "../../lib/products";
import { ScarcityIndicator } from "./ScarcityIndicator";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="sc-prod-card sc-fade-target group">
      <div className="sc-prod-img-wrap overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          loading="lazy" 
          className="transition-transform duration-700 ease-out group-hover:scale-110"
        />
        {/* We can add an alt image later if we have more assets */}
        <button className="sc-prod-add-btn">ADD TO BAG</button>
        
        {product.labels && product.labels.map(label => (
          <div key={label} className="absolute top-4 left-4 bg-white text-black text-[9px] px-2 py-1 tracking-[0.2em] font-bold uppercase z-10 shadow-lg">
            {label}
          </div>
        ))}

        <ScarcityIndicator status={product.stockStatus} />
      </div>
      <div className="sc-prod-info">
        <div className="flex justify-between items-start">
          <div className="sc-prod-name group-hover:text-white transition-colors uppercase tracking-widest">{product.name}</div>
        </div>
        <div className="sc-prod-sub text-xs opacity-60 mt-1">{product.description}</div>
        <div className="flex items-center gap-3 mt-3">
          <div className="sc-prod-price font-semibold">${product.price}</div>
          {product.originalPrice && (
            <div className="text-[12px] text-muted-foreground line-through opacity-40">
              ${product.originalPrice}
            </div>
          )}
        </div>
        <button className="sc-prod-quick hover:!text-white flex items-center gap-1 group/btn mt-4">
          QUICK SHOP 
          <span className="inline-block transform transition-transform group-hover/btn:translate-x-1">→</span>
        </button>
      </div>
    </div>
  );
}
