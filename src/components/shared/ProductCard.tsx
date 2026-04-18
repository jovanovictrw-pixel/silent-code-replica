import { useState } from "react";
import { Product } from "../../lib/products";
import { ScarcityIndicator } from "./ScarcityIndicator";
import { useCart } from "../../context/CartContext";
import { QuickViewModal } from "./QuickViewModal";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [showQuickView, setShowQuickView] = useState(false);

  const handleAddToBag = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, "M");
  };

  return (
    <>
      <div className="sc-prod-card vt-card sc-fade-target group border border-white/5 bg-[#050505] relative">
        <div className="sc-prod-img-wrap sc-scan-wrap overflow-hidden bg-[#0a0a0a] relative">
          <img
            src={`${product.image}${product.image.includes("?") ? "&" : "?"}fm=webp&q=80&w=800`}
            srcSet={`${product.image}${product.image.includes("?") ? "&" : "?"}fm=webp&q=80&w=400 400w, ${product.image}${product.image.includes("?") ? "&" : "?"}fm=webp&q=80&w=800 800w`}
            sizes="(max-width: 768px) 50vw, 25vw"
            alt={product.name}
            loading="lazy"
            width={800}
            height={1000}
            className="transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-110 group-hover:opacity-60"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?fm=webp&q=80&w=800";
            }}
          />
          <div className="sc-scanline" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true" />

          <button
            className="sc-prod-add-btn sc-glass bg-white/10 hover:bg-white/20 text-white font-extrabold py-5 tracking-widest text-[10px] md:py-4 border-none backdrop-blur-xl"
            onClick={handleAddToBag}
            aria-label={`Add ${product.name} to bag`}
          >
            ADD TO BAG
          </button>

          <div className="flex flex-col gap-2 absolute top-4 left-4 z-10 transition-transform duration-500 group-hover:-translate-y-1">
            {product.labels && product.labels.map(label => (
              <div key={label} className="sc-badge-hw">
                <div className="sc-badge-hw-dot" />
                {label}
              </div>
            ))}
          </div>

          <div className="absolute top-4 right-4 z-10">
            <ScarcityIndicator status={product.stockStatus} />
          </div>
        </div>

        <div className="sc-prod-info p-6">
          <div className="flex justify-between items-start mb-2">
            <div className="sc-prod-name group-hover:text-sc-accent transition-colors duration-300 uppercase tracking-[0.25em] text-[11px] font-bold">
              {product.name}
            </div>
            {/* Color Swatches */}
            <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
               <div className="w-2.5 h-2.5 rounded-full bg-white/20 border border-white/40" />
               <div className="w-2.5 h-2.5 rounded-full bg-stone-800 border border-white/20" />
            </div>
          </div>
          
          <div className="sc-prod-sub text-[10px] text-white/40 uppercase tracking-widest mt-1">
            {product.description}
          </div>

          <div className="flex items-center gap-4 mt-6">
            <div className="sc-prod-price text-[14px] font-heading tracking-widest text-white/90">${product.price}</div>
            {product.originalPrice && product.originalPrice > product.price && (
              <div className="text-[11px] text-white/20 line-through font-mono">
                ${product.originalPrice}
              </div>
            )}
            <div className="flex-1" />
            <div className="text-[8px] text-white/20 tracking-[0.3em] font-heading">
               ID_{product.id.toUpperCase()}
            </div>
          </div>

          <button
            className="sc-prod-quick hover:!text-white flex items-center gap-2 group/btn mt-8 border-b border-white/10 pb-1 w-fit opacity-40 group-hover:opacity-100 transition-all duration-500"
            onClick={() => setShowQuickView(true)}
            aria-label={`Quick view ${product.name}`}
          >
            <span className="text-[9px] tracking-[0.3em] font-bold">ANALYZE_PIECE</span>
            <span className="inline-block transform transition-transform duration-500 group-hover/btn:translate-x-2" aria-hidden="true">→</span>
          </button>
        </div>
      </div>

      {showQuickView && (
        <QuickViewModal
          product={product}
          onClose={() => setShowQuickView(false)}
        />
      )}
    </>
  );
}
