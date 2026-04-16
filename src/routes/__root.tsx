import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { CartProvider } from "../context/CartContext";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#000", color: "#fff", textAlign: "center", padding: "20px" }}>
      <div>
        <div style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: "10px", letterSpacing: "0.4em", color: "#555", marginBottom: "24px", textTransform: "uppercase" }}>Error 404</div>
        <h1 style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: "clamp(48px, 8vw, 100px)", fontWeight: 100, letterSpacing: "0.1em", margin: 0 }}>NOT FOUND</h1>
        <p style={{ fontFamily: "'PT Sans', sans-serif", color: "#888", marginTop: "16px", marginBottom: "48px" }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: "11px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#000", background: "#fff", padding: "16px 44px", textDecoration: "none", display: "inline-block" }}
        >
          RETURN HOME
        </Link>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "SilentCode — Premium Dark Streetwear" },
      { name: "description", content: "Silence is the loudest statement. Explore premium dark streetwear built for those who prefer actions over words." },
      { name: "author", content: "SilentCode Studio" },
      { property: "og:title", content: "SilentCode — Premium Dark Streetwear" },
      { property: "og:description", content: "Silence is the loudest statement. Explore premium dark streetwear built for those who prefer actions over words." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://images.unsplash.com/photo-1523398002811-999ca8dec234?q=85&auto=format&fit=crop&w=1200&h=630" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@silentcode" },
      { name: "twitter:image", content: "https://images.unsplash.com/photo-1523398002811-999ca8dec234?q=85&auto=format&fit=crop&w=1200&h=630" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>◼</text></svg>" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <CartProvider>
          {children}
        </CartProvider>
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
