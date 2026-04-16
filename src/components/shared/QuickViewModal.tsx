import { useState } from "react";
import { Product } from "../../lib/products";
import { useCart } from "../../context/CartContext";

const SIZES = ["XS", "S", "M", "L", "XL", "2XL"];

interface QuickViewModalProps {
  product: Product;
  onClose: () => void;
}

export function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const [selectedSize, setSelectedSize] = useState("M");
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart(product, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="sc-qv-backdrop"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Quick view: ${product.name}`}
        className="sc-qv-modal"
      >
        {/* Close */}
        <button className="sc-qv-close" onClick={onClose} aria-label="Close quick view">×</button>

        {/* Image */}
        <div className="sc-qv-img-wrap">
          <img
            src={`${product.image}${product.image.includes("?") ? "&" : "?"}fm=webp&q=80&w=900`}
            alt={product.name}
            className="sc-qv-img"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://images.unsplash.com/photo-1556821840-3a63f95609a7?fm=webp&q=80&w=900";
            }}
          />
          {product.stockStatus === "low-stock" && (
            <div className="sc-qv-badge-low">LOW STOCK</div>
          )}
          {product.stockStatus === "sold-out" && (
            <div className="sc-qv-badge-sold">SOLD OUT</div>
          )}
        </div>

        {/* Info */}
        <div className="sc-qv-info">
          <div className="sc-qv-category">{product.category.toUpperCase()}</div>
          <h2 className="sc-qv-name">{product.name}</h2>
          <div className="sc-qv-sub">{product.description}</div>

          <div className="sc-qv-price-row">
            <span className="sc-qv-price">${product.price}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="sc-qv-orig-price">${product.originalPrice}</span>
            )}
          </div>

          {/* Details */}
          <ul className="sc-qv-details">
            {product.details.map((d) => (
              <li key={d} className="sc-qv-detail-item">
                <span className="sc-qv-bullet" />
                {d}
              </li>
            ))}
          </ul>

          {/* Size Selector */}
          <div className="sc-qv-size-label">SELECT SIZE</div>
          <div className="sc-qv-sizes">
            {SIZES.map((s) => (
              <button
                key={s}
                className={`sc-qv-size-btn ${selectedSize === s ? "sc-qv-size-active" : ""}`}
                onClick={() => setSelectedSize(s)}
                aria-pressed={selectedSize === s}
              >
                {s}
              </button>
            ))}
          </div>

          {/* CTAs */}
          <button
            className={`sc-btn-primary sc-qv-add-btn ${product.stockStatus === "sold-out" ? "opacity-40 cursor-not-allowed" : ""}`}
            onClick={handleAdd}
            disabled={product.stockStatus === "sold-out"}
            aria-label={`Add ${product.name} size ${selectedSize} to bag`}
          >
            {added ? "✓ ADDED TO BAG" : product.stockStatus === "sold-out" ? "SOLD OUT" : "ADD TO BAG"}
          </button>

          <a
            href={`/product/${product.id}`}
            className="sc-qv-full-link"
          >
            VIEW FULL DETAILS →
          </a>
        </div>
      </div>
    </>
  );
}
