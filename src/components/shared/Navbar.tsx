import { useState, useCallback, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { SilentCodeLogo } from "./Brand";
import { InstagramIcon, TikTokIcon, PinterestIcon, XIcon, YouTubeIcon } from "./Icons";

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
          <SilentCodeLogo />
        </Link>
      </div>

      <button
        className={`sc-fixed-hamburger ${navOpen ? "sc-hamburger-open" : ""}`}
        onClick={() => setNavOpen(!navOpen)}
        aria-label="Toggle navigation"
      >
        <span className="sc-hamburger-line" />
        <span className="sc-hamburger-line" />
        <span className="sc-hamburger-line" />
      </button>

      <div className={`sc-nav-dimmer ${navOpen ? "sc-open" : ""}`} onClick={() => setNavOpen(false)} />

      <nav className={`sc-nav-panel ${navOpen ? "sc-open" : ""}`}>
        <button className="sc-nav-close" onClick={() => setNavOpen(false)} aria-label="Close navigation">×</button>
        <div className="sc-nav-header">
          <Link to="/" onClick={() => setNavOpen(false)}>
            <SilentCodeLogo size="small" />
          </Link>
        </div>
        <div className="sc-nav-links">
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
                >
                  <Link to={link.href as any} style={{ color: 'inherit', textDecoration: 'none', display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }} onClick={(e) => { 
                    if(link.subs) e.preventDefault();
                    else setNavOpen(false);
                  }}>
                    <span>{link.label}</span>
                    {link.subs && <span style={{ fontSize: "10px" }}>▾</span>}
                  </Link>
                </button>
              )}
              {link.subs && (
                <div className={`sc-nav-sub ${openSubs[link.label] ? "sc-sub-open" : ""}`}>
                  {link.subs.map(sub => (
                    <Link 
                      key={sub} 
                      to={link.href as any} 
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
        <div className="sc-nav-footer">
          <div className="sc-nav-socials">
            <div style={{ display: "flex", gap: "16px" }}>
              <a href="#" aria-label="Instagram"><InstagramIcon size={18} /></a>
              <a href="#" aria-label="TikTok"><TikTokIcon size={18} /></a>
              <a href="#" aria-label="Pinterest"><PinterestIcon size={18} /></a>
              <a href="#" aria-label="X"><XIcon size={18} /></a>
              <a href="#" aria-label="YouTube"><YouTubeIcon size={18} /></a>
            </div>
          </div>
          <div className="sc-nav-copyright">© 2026 SilentCode Studio — All rights reserved</div>
        </div>
      </nav>
    </>
  );
}
