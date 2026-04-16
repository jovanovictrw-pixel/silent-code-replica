import { useState, useCallback, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { SilentNumenLogo } from "./Brand";
import { InstagramIcon, TikTokIcon, PinterestIcon, XIcon, YouTubeIcon } from "./Icons";
import { useCart } from "../../context/CartContext";
import { CartDrawer } from "./CartDrawer";

const NAV_LINKS = [
  { label: "NEW ARRIVALS", href: "/#products" },
  { label: "SHOP ALL", href: "/#categories", subs: ["New Arrivals", "Best Sellers", "Sale"] },
  { label: "MEN", href: "/category/men", subs: ["Tops", "Hoodies & Sweatshirts", "Outerwear", "Bottoms", "Essentials"] },
  { label: "WOMEN", href: "/category/women", subs: ["Tops", "Hoodies & Sweatshirts", "Outerwear", "Bottoms", "Essentials"] },
  { label: "ACCESSORIES", href: "/category/accessories", subs: ["Bags", "Headwear", "Socks & Underwear", "Small Leather Goods"] },
  { label: "BEST SELLERS", href: "/#products" },
  { label: "OUR STORY", href: "/#value" },
  { label: "LOOKBOOK", href: "/#ugc" },
  { label: "CONTACT", href: "#footer" },
];

export function Navbar() {
  const [navOpen, setNavOpen] = useState(false);
  const [openSubs, setOpenSubs] = useState<Record<string, boolean>>({});
  const { totalItems, openCart } = useCart();

  const toggleSub = useCallback((label: string) => {
    setOpenSubs(prev => ({ ...prev, [label]: !prev[label] }));
  }, []);

  useEffect(() => {
    document.body.style.overflow = navOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [navOpen]);

  useEffect(() => {
    const onScroll = () => {
      const logo = document.querySelector(".sc-fixed-logo") as HTMLElement;
      const burger = document.querySelector(".sc-fixed-hamburger") as HTMLElement;
      if (logo && burger) {
        const o = window.scrollY > 80 ? "0.75" : "0.92";
        logo.style.opacity = o;
        burger.style.opacity = o;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="sc-fixed-logo" style={navOpen ? { opacity: 0, pointerEvents: "none" } : undefined}>
        <Link to="/">
          <SilentNumenLogo />
        </Link>
      </div>

      {/* Cart Badge */}
      <button
        className="sc-fixed-cart"
        onClick={openCart}
        aria-label={`Open shopping bag (${totalItems} items)`}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
          <line x1="3" y1="6" x2="21" y2="6"/>
          <path d="M16 10a4 4 0 0 1-8 0"/>
        </svg>
        {totalItems > 0 && (
          <span className="sc-cart-badge" aria-hidden="true">{totalItems}</span>
        )}
      </button>

      <button
        className={`sc-fixed-hamburger ${navOpen ? "sc-hamburger-open" : ""}`}
        onClick={() => setNavOpen(!navOpen)}
        aria-label={navOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={navOpen}
        aria-controls="sc-nav-panel"
      >
        <span className="sc-hamburger-line" />
        <span className="sc-hamburger-line" />
        <span className="sc-hamburger-line" />
      </button>

      <div className={`sc-nav-dimmer ${navOpen ? "sc-open" : ""}`} onClick={() => setNavOpen(false)} aria-hidden="true" />

      <nav
        id="sc-nav-panel"
        className={`sc-nav-panel ${navOpen ? "sc-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
      >
        <button className="sc-nav-close" onClick={() => setNavOpen(false)} aria-label="Close navigation">×</button>
        <div className="sc-nav-header">
          <Link to="/" onClick={() => setNavOpen(false)}>
            <SilentNumenLogo size="small" />
          </Link>
        </div>
        
        <div className="sc-nav-links flex flex-col justify-end flex-grow pb-12 overflow-y-auto">
          {NAV_LINKS.map(link => (
            <div key={link.label}>
              {link.href.startsWith("http") || link.href.startsWith("#") ? (
                 <a href={link.href} className="sc-nav-link" onClick={() => setNavOpen(false)}>
                    <span>{link.label}</span>
                 </a>
              ) : (
                <button
                  className="sc-nav-link"
                  onClick={() => link.subs ? toggleSub(link.label) : setNavOpen(false)}
                  aria-expanded={link.subs ? !!openSubs[link.label] : undefined}
                  aria-controls={link.subs ? `sc-sub-${link.label}` : undefined}
                >
                  <Link
                    to={link.href as any}
                    style={{ color: "inherit", textDecoration: "none", display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center" }}
                    onClick={(e) => {
                      if (link.subs) e.preventDefault();
                      else setNavOpen(false);
                    }}
                  >
                    <span>{link.label}</span>
                    {link.subs && <span style={{ fontSize: "10px" }} aria-hidden="true">▾</span>}
                  </Link>
                </button>
              )}
              {link.subs && (
                <div
                  id={`sc-sub-${link.label}`}
                  className={`sc-nav-sub ${openSubs[link.label] ? "sc-sub-open" : ""}`}
                >
                  {link.subs.map(sub => (
                    <Link
                      key={sub}
                      to={`${link.href}?sub=${encodeURIComponent(sub.toLowerCase())}` as any}
                      className="sc-nav-sub-item"
                      onClick={() => setNavOpen(false)}
                    >
                      {sub}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="sc-nav-footer p-10 border-t border-white/5 sc-glass bg-white/5 backdrop-blur-md">
          <div className="sc-nav-socials flex gap-4 mb-8">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="sc-glass bg-white/5 hover:bg-white/10 w-10 h-10 flex items-center justify-center border-white/5 rounded-full" aria-label="Instagram"><InstagramIcon size={18} /></a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="sc-glass bg-white/5 hover:bg-white/10 w-10 h-10 flex items-center justify-center border-white/5 rounded-full" aria-label="TikTok"><TikTokIcon size={18} /></a>
            <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="sc-glass bg-white/5 hover:bg-white/10 w-10 h-10 flex items-center justify-center border-white/5 rounded-full" aria-label="Pinterest"><PinterestIcon size={18} /></a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="sc-glass bg-white/5 hover:bg-white/10 w-10 h-10 flex items-center justify-center border-white/5 rounded-full" aria-label="X (Twitter)"><XIcon size={18} /></a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="sc-glass bg-white/5 hover:bg-white/10 w-10 h-10 flex items-center justify-center border-white/5 rounded-full" aria-label="YouTube"><YouTubeIcon size={18} /></a>
          </div>
          <div className="sc-nav-copyright text-[10px] text-white/30 tracking-widest uppercase opacity-70">© 2026 SilentNumen Studio — All rights reserved</div>
        </div>
      </nav>

      {/* Cart Drawer (portal-adjacent sibling) */}
      <CartDrawer />
    </>
  );
}
