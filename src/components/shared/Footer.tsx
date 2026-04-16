import { Link } from "@tanstack/react-router";
import { SilentNumenLogo } from "./Brand";
import { InstagramIcon, TikTokIcon, PinterestIcon, XIcon, YouTubeIcon } from "./Icons";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="sc-footer" id="footer">
      <div className="sc-footer-grid">
        <div>
          <SilentNumenLogo size="small" />
          <div className="sc-footer-lang">
            <span className="sc-lang-active">EN</span> | <span>DE</span> | <span>FR</span>
          </div>
          <div className="sc-footer-socials">
            <div style={{ display: "flex", gap: "14px" }}>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><InstagramIcon size={16} /></a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok"><TikTokIcon size={16} /></a>
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" aria-label="Pinterest"><PinterestIcon size={16} /></a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)"><XIcon size={16} /></a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><YouTubeIcon size={16} /></a>
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
          <a href="/#value" className="sc-footer-link">SHIPPING &amp; RETURNS</a>
          <a href="/#value" className="sc-footer-link">SIZE GUIDE</a>
          <a href="#footer" className="sc-footer-link">CONTACT US</a>
          <a href="/#value" className="sc-footer-link">PRIVACY POLICY</a>
          <a href="/#value" className="sc-footer-link">TERMS OF SERVICE</a>
        </div>
      </div>
      <div className="sc-footer-divider" />
      <div className="sc-footer-bottom">
        <div className="sc-footer-copy">© 2026 SILENTNUMEN STUDIO — BUILT NOT BOUGHT.</div>
        <button
          className="sc-footer-top sc-glass bg-white/5 hover:bg-white/10 text-white/60 hover:text-white border-white/5 backdrop-blur-md px-6 py-3 text-[10px] tracking-[0.2em]"
          onClick={scrollToTop}
        >
          BACK TO TOP ↑
        </button>
      </div>
    </footer>
  );
}
