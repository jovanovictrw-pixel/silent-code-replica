import { Product } from "../../lib/products";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const isBundle = product.isBundle;
  
  return (
    <div className="sc-prod-card sc-fade-target">
      <div className="sc-prod-img-wrap">
        <img src={product.image} alt={product.name} loading="lazy" />
        {/* We can add an alt image later if we have more assets */}
        <button className="sc-prod-add-btn">ADD TO BAG</button>
        
        {product.labels && product.labels.map(label => (
          <div key={label} className="absolute top-4 left-4 bg-white text-black text-[9px] px-2 py-1 tracking-[0.2em] font-semibold uppercase z-10">
            {label}
          </div>
        ))}

        {product.stockStatus === "low-stock" && (
          <div className="absolute top-4 right-4 bg-red-600 text-white text-[9px] px-2 py-1 tracking-[0.2em] font-semibold uppercase z-10">
            LOW STOCK
          </div>
        )}
      </div>
      <div className="sc-prod-info">
        <div className="flex justify-between items-start">
          <div className="sc-prod-name">{product.name}</div>
          {isBundle && (
            <div className="text-[10px] text-green-500 font-bold mt-3.5 tracking-wider">
              BUNDLE DEAL
            </div>
          )}
        </div>
        <div className="sc-prod-sub">{product.description}</div>
        <div className="flex items-center gap-3 mt-2.5">
          <div className="sc-prod-price">${product.price}</div>
          {product.originalPrice && (
            <div className="text-[12px] text-muted-foreground line-through opacity-50">
              ${product.originalPrice}
            </div>
          )}
        </div>
        {isBundle && product.originalPrice && (
          <div className="text-[10px] text-white opacity-40 mt-1 tracking-widest uppercase">
            Save ${product.originalPrice - product.price}
          </div>
        )}
        <button className="sc-prod-quick">QUICK VIEW →</button>
      </div>
    </div>
  );
}
