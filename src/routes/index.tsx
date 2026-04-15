import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, useCallback } from "react";
import { useScrollEngine } from "../hooks/useScrollEngine";
import { Navbar } from "../components/shared/Navbar";
import { Footer } from "../components/shared/Footer";
import { InstagramMiniIcon, PackageIcon, ExchangeIcon, LeafIcon, RulerIcon } from "../components/shared/Icons";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SilentCode — Premium Dark Streetwear" },
      { name: "description", content: "Silence is the loudest statement. Explore premium dark streetwear built for those who prefer actions over words." },
      { property: "og:title", content: "SilentCode — Premium Dark Streetwear" },
      { property: "og:description", content: "Silence is the loudest statement. Premium dark streetwear for those who prefer actions over words." },
    ],
  }),
  component: SilentCodePage,
});

/* ─── Content Helpers ─── */
const TICKER_TEXT = "SILENTCODE \u00B7 SS25 \u00B7 SILENCE IS LOUDEST \u00B7 BUILT NOT BOUGHT \u00B7 ACTIONS OVER WORDS \u00B7 ";
const IMAGES = {
  hero: "https://images.unsplash.com/photo-1523398002811-999ca8dec234?q=85&fm=webp&fit=crop",
  men: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&q=80&fm=webp&fit=crop",
  women: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800&q=80&fm=webp&fit=crop",
  accessories: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80&fm=webp&fit=crop",
  product1: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&q=80&fm=webp&fit=crop",
  product1alt: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&q=80&fm=webp&fit=crop",
  product2: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80&fm=webp&fit=crop",
  product2alt: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=600&q=80&fm=webp&fit=crop",
  product3: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80&fm=webp&fit=crop",
  product3alt: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80&fm=webp&fit=crop",
  product4: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80&fm=webp&fit=crop",
  product4alt: "https://images.unsplash.com/photo-1548126032-079a0fb0099d?w=600&q=80&fm=webp&fit=crop",
  fabric: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1920&q=80&fm=webp&fit=crop",
  ugc1: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80&fm=webp&fit=crop",
  ugc2: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80&fm=webp&fit=crop",
  ugc3: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&q=80&fm=webp&fit=crop",
  ugc4: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80&fm=webp&fit=crop",
  ugc5: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80&fm=webp&fit=crop",
};

const PRODUCTS = [
  { name: "SILENT HOODIE", sub: "Obsidian / Heavyweight Fleece", price: "$98.00", stars: "★★★★★ 4.9", img: IMAGES.product1, imgAlt: IMAGES.product1alt },
  { name: "CODE TEE", sub: "Ash Grey / 180gsm Cotton", price: "$52.00", stars: "★★★★★ 4.8", img: IMAGES.product2, imgAlt: IMAGES.product2alt },
  { name: "RECON CARGO", sub: "Slate / Ripstop Cotton Blend", price: "$124.00", stars: "★★★★☆ 4.7", img: IMAGES.product3, imgAlt: IMAGES.product3alt },
  { name: "VOID JACKET", sub: "Ink Black / Technical Shell", price: "$210.00", stars: "★★★★★ 4.9", img: IMAGES.product4, imgAlt: IMAGES.product4alt },
];

function SilentCodePage() {
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [curtainDone, setCurtainDone] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Activate the scroll engine
  useScrollEngine();

  const scrollToSection = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    const curtain = document.getElementById("sc-curtain-el");
    if (curtain) {
      const onEnd = () => setCurtainDone(true);
      curtain.addEventListener("animationend", onEnd);
      return () => curtain.removeEventListener("animationend", onEnd);
    }
  }, []);

  useEffect(() => {
    const targets = document.querySelectorAll(".sc-fade-target");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).classList.add("sc-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    targets.forEach((t, i) => {
      (t as HTMLElement).style.transitionDelay = `${(i % 6) * 80}ms`;
      observer.observe(t);
    });

    return () => observer.disconnect();
  }, []);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailSubmitted(true);
  };

  return (
    <>
      <div className="sc-progress-bar" />

      {!curtainDone && (
        <div id="sc-curtain-el" className="sc-curtain" aria-hidden="true" />
      )}

      <Navbar />

      <div ref={containerRef} className="sc-lerp-wrapper sc-blur-target">
        {/* ═══ SECTION 2 — HERO ═══ */}
        <section className="sc-hero" id="hero">
          <img 
            src={`${IMAGES.hero}&fm=webp&q=85&w=1920`} 
            srcSet={`${IMAGES.hero}&fm=webp&q=85&w=800 800w, ${IMAGES.hero}&fm=webp&q=85&w=1200 1200w, ${IMAGES.hero}&fm=webp&q=85&w=1920 1920w`}
            sizes="100vw"
            alt="Dark fashion editorial" 
            className="sc-hero-bg vt-hero" 
          />
          <div className="sc-hero-overlay" />
          <div className="sc-hero-content">
            <div className="sc-hero-line" />
            <div className="sc-hero-sublabel">SS 2025 COLLECTION</div>
            <h1 className="sc-hero-h1 vt-heading">SILENCE IS THE LOUDEST STATEMENT.</h1>
            <div style={{ marginTop: "40px" }}>
              <button className="sc-btn-primary" onClick={() => scrollToSection("products")}>SHOP NEW ARRIVALS</button>
            </div>
            <div style={{ marginTop: "20px" }}>
              <button className="sc-link-secondary" onClick={() => scrollToSection("email")}>
                GET 15% OFF YOUR FIRST ORDER →
              </button>
            </div>
          </div>
          <div className="sc-scroll-indicator">
            <div className="sc-scroll-text">Scroll</div>
            <div className="sc-scroll-line" />
          </div>
        </section>

        {/* ═══ TICKER STRIP ═══ */}
        <div className="sc-ticker">
          <div className="sc-ticker-track">
            {Array.from({ length: 12 }).map((_, i) => (
              <span key={i} className="sc-ticker-text">{TICKER_TEXT}</span>
            ))}
          </div>
        </div>

        {/* ═══ SECTION 3 — CATEGORIES ═══ */}
        <section className="sc-categories" id="categories">
          <div className="sc-section-label sc-fade-target sc-sticky-title" style={{ marginBottom: "50px" }}>SHOP BY CATEGORY</div>
          <div className="sc-cat-grid">
            {[
              { label: "MEN", cta: "EXPLORE MEN →", img: IMAGES.men, href: "/category/men" },
              { label: "WOMEN", cta: "EXPLORE WOMEN →", img: IMAGES.women, href: "/category/women" },
              { label: "ACCESSORIES", cta: "EXPLORE ACCESSORIES →", img: IMAGES.accessories, href: "/category/accessories" },
            ].map(cat => (
              <Link to={cat.href as any} key={cat.label} className="sc-cat-tile sc-fade-target">
                <img src={cat.img} alt={cat.label} loading="lazy" />
                <div className="sc-cat-overlay" />
                <div className="sc-cat-content">
                  <div className="sc-cat-label">{cat.label}</div>
                  <span className="sc-cat-cta">{cat.cta}</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="sc-shop-all-banner sc-fade-target" onClick={() => scrollToSection("products")}>
            <div className="sc-shop-all-line" />
            <div className="sc-shop-all-text">VIEW THE FULL COLLECTION</div>
            <div className="sc-shop-all-line" />
          </div>
        </section>

        {/* ═══ SECTION 4 — BEST SELLERS ═══ */}
        <section className="sc-products" id="products">
          <div className="sc-section-label sc-fade-target">MOST WANTED</div>
          <h2 className="sc-section-h2 sc-fade-target sc-sticky-title">THE ESSENTIALS</h2>
          <p className="sc-section-body sc-fade-target">Our highest-rated, fastest-selling pieces. Updated each season.</p>
          <div className="sc-prod-grid-4">
            {PRODUCTS.map(p => (
              <div key={p.name} className="sc-prod-card sc-fade-target">
                <div className="sc-prod-img-wrap">
                  <img src={p.img} alt={p.name} loading="lazy" />
                  <img src={p.imgAlt} alt={`${p.name} worn`} loading="lazy" className="sc-prod-img-alt" />
                  <button className="sc-prod-add-btn">ADD TO BAG</button>
                </div>
                <div className="sc-prod-info">
                  <div className="sc-prod-stars">{p.stars}</div>
                  <div className="sc-prod-name">{p.name}</div>
                  <div className="sc-prod-sub">{p.sub}</div>
                  <div className="sc-prod-price">{p.price}</div>
                  <button className="sc-prod-quick">QUICK ADD →</button>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "60px" }} className="sc-fade-target">
            <button className="sc-btn-primary">SHOP ALL BEST SELLERS</button>
            <p style={{ fontFamily: "var(--sc-font-body)", fontSize: "13px", fontStyle: "italic", color: "#666", marginTop: "14px" }}>
              Rated 4.8 / 5 by over 2,400 customers
            </p>
          </div>
        </section>

        {/* ═══ TICKER STRIP 2 ═══ */}
        <div className="sc-ticker">
          <div className="sc-ticker-track">
            {Array.from({ length: 12 }).map((_, i) => (
              <span key={i} className="sc-ticker-text">{TICKER_TEXT}</span>
            ))}
          </div>
        </div>

        {/* ═══ SECTION 5 — VALUE PROPOSITION ═══ */}
        <section className="sc-value sc-parallax-section" id="value">
          <img src={IMAGES.fabric} alt="" className="sc-parallax-layer-bg" aria-hidden="true" style={{ opacity: 0.08 }} />
          <div className="sc-parallax-layer-mid" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.9) 100%)" }} />
          <div className="sc-value-content sc-parallax-layer-fg">
            <div className="sc-section-label sc-fade-target sc-sticky-title" style={{ letterSpacing: "0.45em" }}>THE SILENTCODE DIFFERENCE</div>
            <h2 className="sc-value-h2 sc-fade-target">BUILT FOR THOSE WHO PREFER ACTIONS OVER WORDS.</h2>
            <p className="sc-value-body sc-fade-target">
              Every SilentCode piece begins as a sketch on paper — then it becomes a conversation between a fabric supplier,
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
              <a href="#" className="sc-link-underline">LEARN OUR STORY →</a>
              <a href="#" className="sc-link-underline">SEE OUR SUSTAINABILITY IMPACT →</a>
            </div>
          </div>
        </section>

        {/* ═══ SECTION 6 — UGC ═══ */}
        <section className="sc-ugc" id="ugc">
          <div className="sc-section-label sc-fade-target">AS SEEN IN THE WILD</div>
          <h2 className="sc-section-h2 sc-fade-target">WEAR IT YOUR WAY</h2>
          <p className="sc-section-body sc-fade-target">Tag @silentcode on Instagram to be featured.</p>
          <div className="sc-ugc-grid">
            {[IMAGES.ugc1, IMAGES.ugc2, IMAGES.ugc3, IMAGES.ugc4, IMAGES.ugc5].map((img, i) => (
              <div key={i} className="sc-ugc-tile sc-fade-target" onClick={() => scrollToSection("products")}>
                <img src={img} alt={`Street style ${i + 1}`} loading="lazy" />
                <div className="sc-ugc-hover">
                  <span className="sc-ugc-hover-text">SHOP THE LOOK</span>
                  <InstagramMiniIcon />
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "50px" }} className="sc-fade-target">
            <button className="sc-btn-primary">FOLLOW @SILENTCODE</button>
            <p style={{ fontFamily: "var(--sc-font-body)", fontSize: "13px", color: "#555", marginTop: "14px" }}>
              Join 84,000 followers on Instagram
            </p>
          </div>
        </section>

        {/* ═══ SECTION 7 — EMAIL CAPTURE ═══ */}
        <section className="sc-email sc-parallax-section" id="email">
          <img src={IMAGES.fabric} alt="" className="sc-parallax-layer-bg" aria-hidden="true" style={{ opacity: 0.05 }} />
          <div className="sc-parallax-layer-mid" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.95) 100%)" }} />
          <div className="sc-email-content sc-parallax-layer-fg">
            <div className="sc-section-label sc-fade-target" style={{ letterSpacing: "0.45em" }}>JOIN THE CLUB</div>
            <h2 className="sc-email-h2 sc-fade-target">FIRST TO KNOW. FIRST TO WEAR.</h2>
            <p className="sc-email-body sc-fade-target">
              Sign up for early access to new drops, exclusive member discounts, and behind-the-scenes content from the studio.
            </p>
            {!emailSubmitted ? (
              <form className="sc-email-row sc-fade-target" onSubmit={handleEmailSubmit}>
                <input type="email" className="sc-email-input" placeholder="Your email address" required />
                <button type="submit" className="sc-email-submit">GET EARLY ACCESS</button>
              </form>
            ) : (
              <div className="sc-email-confirm" style={{ marginTop: "44px" }}>
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
