import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, useCallback } from "react";
import { useScrollEngine } from "../hooks/useScrollEngine";
import { useFadeOnScroll } from "../hooks/useFadeOnScroll";
import { Navbar } from "../components/shared/Navbar";
import { Footer } from "../components/shared/Footer";
import { InstagramMiniIcon, PackageIcon, ExchangeIcon, LeafIcon, RulerIcon } from "../components/shared/Icons";
import { products } from "../lib/products";
import { useCart } from "../context/CartContext";

export const Route = createFileRoute("/")(({
  head: () => ({
    meta: [
      { title: "SilentNumen — Premium Dark Streetwear" },
      { name: "description", content: "Silence is the loudest statement. Explore premium dark streetwear built for those who prefer actions over words." },
      { property: "og:title", content: "SilentNumen — Premium Dark Streetwear" },
      { property: "og:description", content: "SilentNumen — Premium dark streetwear for those who prefer actions over words." },
    ],
  }),
  component: SilentNumenPage,
} as any));

/* ─── Content Helpers ─── */
const TICKER_TEXT = "SILENTNUMEN · SS25 · SILENCE IS LOUDEST · BUILT NOT BOUGHT · ACTIONS OVER WORDS · ";

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1523398002811-999ca8dec234?q=85&auto=format&fit=crop",
  men: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&q=80&auto=format&fit=crop",
  women: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800&q=80&auto=format&fit=crop",
  accessories: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80&auto=format&fit=crop",
  fabric: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1920&q=80&auto=format&fit=crop",
  ugc1: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80&auto=format&fit=crop",
  ugc2: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80&auto=format&fit=crop",
  ugc3: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&q=80&auto=format&fit=crop",
  ugc4: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80&auto=format&fit=crop",
  ugc5: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80&auto=format&fit=crop",
};

// Pull from shared product data instead of hardcoding
const HOMEPAGE_PRODUCT_IDS = ["m1", "m4", "m2", "m5"];
const HOMEPAGE_PRODUCTS = products.filter(p => HOMEPAGE_PRODUCT_IDS.includes(p.id));

function SilentNumenPage() {
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [curtainDone, setCurtainDone] = useState(() => {
    // Skip curtain on repeat visits within the same session
    return sessionStorage.getItem("sc_curtain_shown") === "1";
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();

  useScrollEngine();
  useFadeOnScroll([]);

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    // When lerp is active, use offsetTop on window.scrollTo to avoid desync
    window.scrollTo({ top: el.offsetTop, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (curtainDone) return; // Already dismissed
    const curtain = document.getElementById("sc-curtain-el");
    if (curtain) {
      const onEnd = () => {
        setCurtainDone(true);
        sessionStorage.setItem("sc_curtain_shown", "1");
      };
      curtain.addEventListener("animationend", onEnd);
      return () => curtain.removeEventListener("animationend", onEnd);
    }
  }, [curtainDone]);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production: send `email` to your email service (Resend, Mailchimp, etc.)
    console.info("Email signup:", email);
    setEmailSubmitted(true);
  };

  return (
    <>
      <div className="sc-progress-bar" aria-hidden="true" />

      {!curtainDone && (
        <div id="sc-curtain-el" className="sc-curtain" aria-hidden="true" />
      )}

      <Navbar />

      <div ref={containerRef} className="sc-lerp-wrapper sc-blur-target">
        {/* ═══ HERO ═══ */}
        <section className="sc-hero" id="hero">
          <img
            src={`${IMAGES.hero}&fm=webp&q=85&w=1920`}
            srcSet={`${IMAGES.hero}&fm=webp&q=85&w=800 800w, ${IMAGES.hero}&fm=webp&q=85&w=1200 1200w, ${IMAGES.hero}&fm=webp&q=85&w=1920 1920w`}
            sizes="100vw"
            alt="Model wearing SilentNumen SS25 dark streetwear — obsidian hoodie editorial"
            width={1920}
            height={1080}
            className="sc-hero-bg vt-hero"
          />
          <div className="sc-hero-overlay" aria-hidden="true" />
          <div className="sc-hero-content">
            <div className="sc-hero-line" aria-hidden="true" />
            <div className="sc-hero-sublabel">SS 2025 COLLECTION</div>
            <h1 className="sc-hero-h1 vt-heading">SILENCE IS THE LOUDEST STATEMENT.</h1>
            <div style={{ marginTop: "40px" }} className="flex flex-col md:flex-row gap-6 justify-center items-center">
              <button
                className="sc-btn-hw"
                onClick={() => scrollToSection("categories")}
              >
                DISCOVER_SYSTEMS
              </button>
              <button
                className="sc-btn-primary"
                onClick={() => scrollToSection("products")}
              >
                ACQUIRE_NEW_DROPS
              </button>
            </div>
          </div>
          <div className="sc-scroll-indicator" aria-hidden="true">
            <div className="sc-scroll-text">Scroll</div>
            <div className="sc-scroll-line" />
          </div>
        </section>

        {/* ═══ TICKER STRIP ═══ */}
        <div className="sc-ticker sc-glass border-l-0 border-r-0 border-white/5 py-4" aria-hidden="true">
          <div className="sc-ticker-track">
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i} className="sc-ticker-text">{TICKER_TEXT}</span>
            ))}
          </div>
        </div>

        {/* ═══ CATEGORIES ═══ */}
        <section className="sc-categories" id="categories">
          <div className="sc-section-label sc-sticky-title" style={{ marginBottom: "100px" }}>DISCOVER COLLECTIONS</div>
          
          <div className="sc-cat-staggered">
            {[
              { 
                num: "01",
                label: "MEN", 
                desc: "Brutalist silhouettes, structured outerwear, and tapered bottoms engineered for the urban environment.",
                cta: "EXPLORE MEN →", 
                img: IMAGES.men, 
                href: "/category/men" 
              },
              { 
                num: "02",
                label: "WOMEN", 
                desc: "Neo-grunge aesthetics balanced with high-fashion drapes and precision-cut technical fabrics.",
                cta: "EXPLORE WOMEN →", 
                img: IMAGES.women, 
                href: "/category/women" 
              },
              { 
                num: "03",
                label: "ACCESSORIES", 
                desc: "Industrial-grade hardware and modular carry systems designed to complement the minimalist uniform.",
                cta: "EXPLORE ACCESSORIES →", 
                img: IMAGES.accessories, 
                href: "/category/accessories" 
              },
            ].map((cat) => (
              <div key={cat.label} className="sc-cat-row sc-fade-target">
                <div 
                  className="sc-cat-visual group"
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = ((e.clientX - rect.left) / rect.width) * 100;
                    const y = ((e.clientY - rect.top) / rect.height) * 100;
                    e.currentTarget.style.setProperty('--x', `${x}%`);
                    e.currentTarget.style.setProperty('--y', `${y}%`);
                  }}
                >
                  <Link to={cat.href as any} className="block w-full h-full">
                    <img 
                      src={cat.img} 
                      alt={`${cat.label} collection`} 
                      loading="lazy" 
                      width={1200} 
                      height={1600} 
                    />
                    <div className="sc-lens-flare" />
                  </Link>
                </div>
                
                <div className="sc-cat-info">
                  <div className="sc-cat-number">{cat.num}</div>
                  <div className="sc-cat-label !mb-2">CATEGORY_{cat.num}</div>
                  <h3 className="sc-cat-title">{cat.label}</h3>
                  <p className="sc-cat-desc">{cat.desc}</p>
                  <Link 
                    to={cat.href as any} 
                    className="sc-btn-primary sc-glass bg-white/5 border-white/10 text-white hover:bg-white/10"
                  >
                    {cat.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <button
            className="sc-shop-all-banner sc-fade-target"
            onClick={() => scrollToSection("products")}
            aria-label="View the full collection"
          >
            <div className="sc-shop-all-line" aria-hidden="true" />
            <div className="sc-shop-all-text">VIEW ALL SYSTEMS [SS25]</div>
            <div className="sc-shop-all-line" aria-hidden="true" />
          </button>
        </section>

        {/* ═══ BEST SELLERS ═══ */}
        <section className="sc-products" id="products">
          <div className="sc-section-label sc-fade-target">MOST WANTED</div>
          <h2 className="sc-section-h2 sc-fade-target sc-sticky-title">THE ESSENTIALS</h2>
          <p className="sc-section-body sc-fade-target">Our highest-rated, fastest-selling pieces. Updated each season.</p>
          <div className="sc-prod-grid-4">
            {HOMEPAGE_PRODUCTS.map(p => (
              <div key={p.id} className="sc-prod-card sc-fade-target">
                <div className="sc-prod-img-wrap">
                  <img
                    src={`${p.image}${p.image.includes("?") ? "&" : "?"}fm=webp&q=80&w=800`}
                    alt={p.name}
                    loading="lazy"
                    width={800}
                    height={1000}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?fm=webp&q=80&w=800";
                    }}
                  />
                  <img
                    src={`${p.image}${p.image.includes("?") ? "&" : "?"}fm=webp&q=80&w=800&sat=-100`}
                    alt={`${p.name} alternate view`}
                    loading="lazy"
                    className="sc-prod-img-alt"
                    aria-hidden="true"
                  />
                  <button
                    className="sc-prod-add-btn"
                    onClick={() => addToCart(p, "M")}
                    aria-label={`Add ${p.name} to bag`}
                  >
                    ADD TO BAG
                  </button>
                </div>
                <div className="sc-prod-info">
                  <div className="sc-prod-name">{p.name}</div>
                  <div className="sc-prod-sub">{p.description}</div>
                  <div className="sc-prod-price">${p.price}</div>
                  {p.stockStatus === "low-stock" && (
                    <div style={{ fontSize: "9px", color: "#e53e3e", letterSpacing: "0.25em", marginTop: "6px", fontFamily: "var(--sc-font-heading)", textTransform: "uppercase" }}>
                      LOW STOCK
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "60px" }} className="sc-fade-target">
            <Link to="/category/men" className="sc-btn-primary" style={{ display: "inline-block" }}>
              SHOP ALL COLLECTIONS
            </Link>
            <p style={{ fontFamily: "var(--sc-font-body)", fontSize: "13px", fontStyle: "italic", color: "#777", marginTop: "14px" }}>
              Rated 4.8 / 5 by over 2,400 customers
            </p>
          </div>
        </section>

        {/* ═══ TICKER STRIP 2 ═══ */}
        <div className="sc-ticker" aria-hidden="true">
          <div className="sc-ticker-track">
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i} className="sc-ticker-text">{TICKER_TEXT}</span>
            ))}
          </div>
        </div>

        {/* ═══ VALUE PROPOSITION ═══ */}
        <section className="sc-value sc-parallax-section" id="value">
          <img src={IMAGES.fabric} alt="" className="sc-parallax-layer-bg" aria-hidden="true" style={{ opacity: 0.08 }} />
          <div className="sc-parallax-layer-mid" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.9) 100%)" }} aria-hidden="true" />
          <div className="sc-value-content sc-parallax-layer-fg">
            <div className="sc-section-label sc-fade-target sc-sticky-title" style={{ letterSpacing: "0.45em" }}>THE SILENTNUMEN DIFFERENCE</div>
            <h2 className="sc-value-h2 sc-fade-target">BUILT FOR THOSE WHO PREFER ACTIONS OVER WORDS.</h2>
            <p className="sc-value-body sc-fade-target">
              Every SilentNumen piece begins as a sketch on paper — then it becomes a conversation between a fabric supplier,
              a pattern cutter, and a small factory. No shortcuts. No fast fashion. Just considered design for people who know the difference.
            </p>
            <div className="sc-benefits-grid">
              {[
                { icon: <PackageIcon />, label: "FREE SHIPPING", sub: "On all orders over $100" },
                { icon: <ExchangeIcon />, label: "FREE EXCHANGES", sub: "Hassle-free within 30 days" },
                { icon: <LeafIcon />, label: "RESPONSIBLE MATERIALS", sub: "GOTS-certified organic cotton" },
                { icon: <RulerIcon />, label: "TAILORED SIZING", sub: "XS to 4XL in every style" },
              ].map(b => (
                <div key={b.label} className="sc-benefit sc-fade-target">
                  {b.icon}
                  <div className="sc-benefit-label">{b.label}</div>
                  <div className="sc-benefit-sub">{b.sub}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: "60px", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }} className="sc-fade-target">
              <a href="/#value" className="sc-link-underline">LEARN OUR STORY →</a>
              <a href="/#value" className="sc-link-underline">SEE OUR SUSTAINABILITY IMPACT →</a>
            </div>
          </div>
        </section>

        {/* ═══ UGC ═══ */}
        <section className="sc-ugc" id="ugc">
          <div className="sc-section-label sc-fade-target">AS SEEN IN THE WILD</div>
          <h2 className="sc-section-h2 sc-fade-target">WEAR IT YOUR WAY</h2>
          <p className="sc-section-body sc-fade-target">Tag @silentnumen on Instagram to be featured.</p>
          <div className="sc-ugc-grid">
            {[IMAGES.ugc1, IMAGES.ugc2, IMAGES.ugc3, IMAGES.ugc4, IMAGES.ugc5].map((img, i) => (
              <button
                key={i}
                className="sc-ugc-tile sc-fade-target"
                onClick={() => scrollToSection("products")}
                aria-label={`Shop this street style look (${i + 1} of 5)`}
              >
                <img src={img} alt={`Street style look ${i + 1} wearing SilentNumen`} loading="lazy" width={600} height={600} />
                <div className="sc-ugc-hover" aria-hidden="true">
                  <span className="sc-ugc-hover-text">SHOP THE LOOK</span>
                  <InstagramMiniIcon />
                </div>
              </button>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "50px" }} className="sc-fade-target">
            <a
              href="https://instagram.com/silentnumen"
              target="_blank"
              rel="noopener noreferrer"
              className="sc-btn-primary"
              style={{ display: "inline-block" }}
            >
              FOLLOW @SILENTNUMEN
            </a>
            <p style={{ fontFamily: "var(--sc-font-body)", fontSize: "13px", color: "#777", marginTop: "14px" }}>
              Join 84,000 followers on Instagram
            </p>
          </div>
        </section>

        {/* ═══ EMAIL CAPTURE ═══ */}
        <section className="sc-email sc-parallax-section" id="email">
          <img src={IMAGES.fabric} alt="" className="sc-parallax-layer-bg" aria-hidden="true" style={{ opacity: 0.05 }} />
          <div className="sc-parallax-layer-mid" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.95) 100%)" }} aria-hidden="true" />
          <div className="sc-email-content sc-parallax-layer-fg">
            <div className="sc-section-label sc-fade-target" style={{ letterSpacing: "0.45em" }}>JOIN THE CLUB</div>
            <h2 className="sc-email-h2 sc-fade-target">FIRST TO KNOW. FIRST TO WEAR.</h2>
            <p className="sc-email-body sc-fade-target">
              Sign up for early access to new drops, exclusive member discounts, and behind-the-scenes content from the studio.
            </p>
            {!emailSubmitted ? (
              <form className="sc-email-row sc-fade-target max-w-lg mx-auto" onSubmit={handleEmailSubmit}>
                <input
                  type="email"
                  className="sc-email-input sc-glass bg-white/5 border-white/10 text-white placeholder:text-white/30 px-6 py-4 focus:bg-white/10 transition-all outline-none"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-label="Email address for newsletter signup"
                />
                <button
                  type="submit"
                  className="sc-email-submit sc-glass bg-white text-black hover:bg-white/90 border-none font-bold tracking-widest px-8"
                >
                  GET EARLY ACCESS
                </button>
              </form>
            ) : (
              <div className="sc-email-confirm sc-glass bg-white/10 backdrop-blur-xl border-white/20 p-8 text-center" style={{ marginTop: "44px" }}>
                YOU'RE IN. WELCOME TO THE CLUB.
              </div>
            )}
            {!emailSubmitted && <p className="sc-email-micro sc-fade-target">No spam, just style. Unsubscribe anytime.</p>}
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
