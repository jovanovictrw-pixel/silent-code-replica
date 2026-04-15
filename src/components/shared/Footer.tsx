import { Link } from "@tanstack/react-router";
import { SilentCodeLogo } from "./Brand";
import { InstagramIcon, TikTokIcon, PinterestIcon, XIcon, YouTubeIcon } from "./Icons";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="sc-footer" id="footer">
      <div className="sc-footer-grid">
        <div>
          <SilentCodeLogo size="small" />
          <div className="sc-footer-lang">
            <span className="sc-lang-active">EN</span> | <span>DE</span> | <span>FR</span>
          </div>
          <div className="sc-footer-socials">
            <div style={{ display: "flex", gap: "14px" }}>
              <a href="#" aria-label="Instagram"><InstagramIcon size={16} /></a>
              <a href="#" aria-label="TikTok"><TikTokIcon size={16} /></a>
              <a href="#" aria-label="Pinterest"><PinterestIcon size={16} /></a>
              <a href="#" aria-label="X"><XIcon size={16} /></a>
              <a href="#" aria-label="YouTube"><YouTubeIcon size={16} /></a>
            </div>
          </div>
        </div>
        <div>
          <div className="sc-footer-col-header">SHOP</div>
          <Link to="/" className="sc-footer-link">NEW ARRIVALS</Link>
          <Link to="/" className="sc-footer-link">BEST SELLERS</Link>
          <Link to="/category/men" className="sc-footer-link">MEN</Link>
          <Link to="/category/women" className="sc-footer-link">WOMEN</Link>
          <Link to="/category/accessories" className="sc-footer-link">ACCESSORIES</Link>
        </div>
        <div>
          <div className="sc-footer-col-header">ASSISTANCE</div>
          <a className="sc-footer-link">SHIPPING & RETURNS</a>
          <a className="sc-footer-link">SIZE GUIDE</a>
          <a className="sc-footer-link">CONTACT US</a>
          <a className="sc-footer-link">PRIVACY POLICY</a>
          <a className="sc-footer-link">TERMS OF SERVICE</a>
        </div>
      </div>
      <div className="sc-footer-divider" />
      <div className="sc-footer-bottom">
        <div className="sc-footer-copy">© 2026 SILENTCODE STUDIO — BUILT NOT BOUGHT.</div>
        <button className="sc-footer-top sc-glass bg-white/5 hover:bg-white/10 text-white/60 hover:text-white border-white/5 backdrop-blur-md px-6 py-3 text-[10px] tracking-[0.2em]" onClick={scrollToTop}>
          BACK TO TOP ↑
        </button>
      </div>
    </footer>
  );
}
