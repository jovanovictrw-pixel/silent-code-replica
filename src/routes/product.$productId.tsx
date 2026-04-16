import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { products } from "../lib/products";
import { Navbar } from "../components/shared/Navbar";
import { Footer } from "../components/shared/Footer";
import { useCart } from "../context/CartContext";
import { useFadeOnScroll } from "../hooks/useFadeOnScroll";

const SIZES = ["XS", "S", "M", "L", "XL", "2XL"];

export const Route = createFileRoute("/product/$productId")({
  head: ({ params }) => {
    const product = products.find(p => p.id === params.productId);
    const title = product ? `${product.name} — SilentCode` : "Product — SilentCode";
    const description = product ? product.description : "Shop premium dark streetwear at SilentCode.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        ...(product ? [{ property: "og:image", content: product.image }] : []),
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ProductDetailPage,
});

function ProductDetailPage() {
  const { productId } = Route.useParams();
  const product = products.find(p => p.id === productId);
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState("M");
  const [added, setAdded] = useState(false);

  useFadeOnScroll([productId]);

  if (!product) {
    return (
      <div className="bg-black min-h-screen text-white flex items-center justify-center">
        <div className="text-center">
          <div className="sc-section-label mb-4">404</div>
          <h1 className="sc-section-h2 mb-8">PRODUCT NOT FOUND</h1>
          <Link to="/" className="sc-btn-primary" style={{ display: "inline-block" }}>RETURN HOME</Link>
        </div>
      </div>
    );
  }

  // Get related products from the same category
  const related = products
    .filter(p => p.category === product.category && p.id !== product.id && !p.isBundle)
    .slice(0, 4);

  const handleAdd = () => {
    addToCart(product, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />

      <main className="sc-pdp-main">
        {/* Breadcrumb */}
        <nav className="sc-pdp-breadcrumb" aria-label="Breadcrumb">
          <Link to="/" className="sc-pdp-bc-link">Home</Link>
          <span className="sc-pdp-bc-sep" aria-hidden="true"> / </span>
          <Link to={`/category/${product.category}` as any} className="sc-pdp-bc-link">{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</Link>
          <span className="sc-pdp-bc-sep" aria-hidden="true"> / </span>
          <span className="sc-pdp-bc-current">{product.name}</span>
        </nav>

        <div className="sc-pdp-grid">
          {/* Image */}
          <div className="sc-pdp-img-col sc-fade-target">
            <div className="sc-pdp-img-wrap">
              <img
                src={`${product.image}${product.image.includes("?") ? "&" : "?"}fm=webp&q=85&w=1000`}
                alt={product.name}
                width={1000}
                height={1250}
                className="sc-pdp-img"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://images.unsplash.com/photo-1556821840-3a63f95609a7?fm=webp&q=85&w=1000";
                }}
              />
              {product.stockStatus === "low-stock" && (
                <div className="sc-qv-badge-low">LOW STOCK</div>
              )}
              {product.stockStatus === "sold-out" && (
                <div className="sc-qv-badge-sold">SOLD OUT</div>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="sc-pdp-info-col sc-fade-target">
            <div className="sc-pdp-category">{product.category.toUpperCase()}</div>
            <h1 className="sc-pdp-name">{product.name}</h1>
            <div className="sc-pdp-sub">{product.description}</div>

            <div className="sc-pdp-price-row">
              <span className="sc-pdp-price">${product.price}</span>
              {product.originalPrice && product.originalPrice > product.price && (
                <>
                  <span className="sc-pdp-orig-price">${product.originalPrice}</span>
                  <span className="sc-pdp-discount">
                    -{Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                  </span>
                </>
              )}
            </div>

            {/* Details */}
            <ul className="sc-pdp-details">
              {product.details.map((d) => (
                <li key={d} className="sc-pdp-detail-item">
                  <span className="sc-pdp-bullet" aria-hidden="true" />
                  {d}
                </li>
              ))}
            </ul>

            {/* Size */}
            <div className="sc-pdp-size-label">SELECT SIZE</div>
            <div className="sc-pdp-sizes" role="group" aria-label="Select a size">
              {SIZES.map((s) => (
                <button
                  key={s}
                  className={`sc-pdp-size-btn ${selectedSize === s ? "sc-pdp-size-active" : ""}`}
                  onClick={() => setSelectedSize(s)}
                  aria-pressed={selectedSize === s}
                >
                  {s}
                </button>
              ))}
            </div>

            {/* CTAs */}
            <button
              className={`sc-btn-primary sc-pdp-add-btn ${product.stockStatus === "sold-out" ? "sc-pdp-sold-out" : ""}`}
              onClick={handleAdd}
              disabled={product.stockStatus === "sold-out"}
              aria-label={`Add ${product.name} size ${selectedSize} to bag`}
            >
              {added ? "✓ ADDED TO BAG" : product.stockStatus === "sold-out" ? "SOLD OUT" : "ADD TO BAG"}
            </button>

            <a href="/#value" className="sc-pdp-shipping-note">
              Free shipping on orders over $100. Free exchanges within 30 days.
            </a>

            <Link to={`/category/${product.category}` as any} className="sc-pdp-back-cat">
              ← MORE FROM {product.category.toUpperCase()}
            </Link>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <section className="sc-pdp-related">
            <div className="sc-section-label sc-fade-target" style={{ marginBottom: "40px" }}>YOU MAY ALSO LIKE</div>
            <div className="sc-prod-grid-4">
              {related.map(p => (
                <Link key={p.id} to={`/product/${p.id}` as any} className="sc-prod-card sc-fade-target group block border border-white/5 bg-[#050505]">
                  <div className="sc-prod-img-wrap overflow-hidden bg-[#0a0a0a]">
                    <img
                      src={`${p.image}${p.image.includes("?") ? "&" : "?"}fm=webp&q=80&w=600`}
                      alt={p.name}
                      loading="lazy"
                      width={600}
                      height={750}
                      className="transition-all duration-700 group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://images.unsplash.com/photo-1556821840-3a63f95609a7?fm=webp&q=80&w=600";
                      }}
                    />
                  </div>
                  <div className="sc-prod-info p-5">
                    <div className="sc-prod-name">{p.name}</div>
                    <div className="sc-prod-price mt-3">${p.price}</div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
